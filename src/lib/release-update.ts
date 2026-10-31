import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { z } from 'zod';
import { type Release, type ReleaseSnapshot, type RepoEntry, SNAPSHOT_SCHEMA_VERSION, snapshotSchema } from './release-schema.ts';

export const SNAPSHOT_SOURCE = 'GitHub REST API: GET /repos/{owner}/{repo}/releases';

/** Subset of the GitHub release object that the snapshot uses. */
const apiAssetSchema = z.object({
  name: z.string(),
  size: z.number(),
  content_type: z.string(),
  browser_download_url: z.string(),
  digest: z.string().nullable().optional(),
  updated_at: z.string(),
  state: z.string().optional(),
});

const apiReleaseSchema = z.object({
  tag_name: z.string(),
  name: z.string().nullable(),
  html_url: z.string(),
  draft: z.boolean(),
  prerelease: z.boolean(),
  published_at: z.string().nullable(),
  assets: z.array(apiAssetSchema),
});

export type ApiRelease = z.infer<typeof apiReleaseSchema>;

/** A SemVer prerelease suffix (v1.0.0-rc.1) counts as a prerelease even if the release flag was forgotten. */
const PRERELEASE_TAG = /^v?\d+(?:\.\d+)*-/;

export function isStableRelease(release: ApiRelease): boolean {
  return !release.draft && !release.prerelease && release.published_at !== null && !PRERELEASE_TAG.test(release.tag_name);
}

export function buildRepoEntry(repo: string, apiReleases: readonly ApiRelease[]): RepoEntry {
  const published = apiReleases
    .filter((r) => !r.draft && r.published_at !== null)
    .sort((a, b) => Date.parse(b.published_at ?? '') - Date.parse(a.published_at ?? ''));
  const stableIndex = published.findIndex(isStableRelease);
  const stable = stableIndex === -1 ? undefined : published[stableIndex];
  const newerPrereleases = stableIndex === -1 ? published.length : stableIndex;

  let latestStable: Release | null = null;
  if (stable) {
    latestStable = {
      tag: stable.tag_name,
      name: stable.name ?? stable.tag_name,
      htmlUrl: stable.html_url,
      publishedAt: stable.published_at ?? '',
      prerelease: false,
      assets: stable.assets
        .filter((a) => a.state === undefined || a.state === 'uploaded')
        .map((a) => ({
          name: a.name,
          size: a.size,
          contentType: a.content_type,
          downloadUrl: a.browser_download_url,
          digest: a.digest ?? null,
          updatedAt: a.updated_at,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    };
  }
  return { repo, htmlUrl: `https://github.com/${repo}`, latestStable, newerPrereleases };
}

export interface FetchOptions {
  fetchImpl?: typeof fetch;
  token?: string | undefined;
  timeoutMs?: number;
  retries?: number;
  /** Delay before retry n (1-based); injectable for tests. */
  backoffMs?: (attempt: number) => number;
}

export class FetchError extends Error {
  readonly transient: boolean;

  constructor(message: string, transient: boolean) {
    super(message);
    this.name = 'FetchError';
    this.transient = transient;
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchRepoReleases(repo: string, options: FetchOptions = {}): Promise<ApiRelease[]> {
  const { fetchImpl = fetch, token, timeoutMs = 15_000, retries = 2, backoffMs = (n) => 1_000 * 2 ** n } = options;
  const url = `https://api.github.com/repos/${repo}/releases?per_page=30`;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': '0then0-catalog-release-snapshot',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  let lastError: FetchError | undefined;
  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) await sleep(backoffMs(attempt));
    try {
      const response = await fetchImpl(url, { headers, signal: AbortSignal.timeout(timeoutMs) });
      if (response.status === 404) throw new FetchError(`${repo}: repository not found (404)`, false);
      const rateLimited = response.status === 429 || (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0');
      if (rateLimited) throw new FetchError(`${repo}: GitHub API rate limit reached`, false);
      if (response.status >= 500) throw new FetchError(`${repo}: HTTP ${response.status}`, true);
      if (!response.ok) throw new FetchError(`${repo}: HTTP ${response.status}`, false);
      const parsed = z.array(apiReleaseSchema).safeParse(await response.json());
      if (!parsed.success) throw new FetchError(`${repo}: unexpected API response: ${parsed.error.message}`, false);
      return parsed.data;
    } catch (error) {
      lastError =
        error instanceof FetchError ? error : new FetchError(`${repo}: ${error instanceof Error ? error.message : String(error)}`, true);
      if (!lastError.transient) break;
    }
  }
  throw lastError ?? new FetchError(`${repo}: unknown error`, true);
}

export async function readSnapshot(path: string): Promise<ReleaseSnapshot | null> {
  try {
    return snapshotSchema.parse(JSON.parse(await readFile(path, 'utf8')));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }
}

export interface UpdateOptions extends FetchOptions {
  repos: readonly string[];
  path: string;
  now?: () => Date;
  concurrency?: number;
}

export interface UpdateResult {
  snapshot: ReleaseSnapshot;
  changes: string[];
}

function describeChanges(previous: ReleaseSnapshot | null, next: ReleaseSnapshot): string[] {
  const changes: string[] = [];
  for (const [repo, entry] of Object.entries(next.repos)) {
    const before = previous?.repos[repo]?.latestStable?.tag ?? 'none';
    const after = entry.latestStable?.tag ?? 'none';
    if (before !== after) changes.push(`${repo}: ${before} -> ${after}`);
  }
  for (const repo of Object.keys(previous?.repos ?? {})) {
    if (!(repo in next.repos)) changes.push(`${repo}: removed from catalog`);
  }
  return changes;
}

/**
 * Fetches every repository, validates the complete result, and only then
 * replaces the snapshot file atomically. Any failure leaves the previous file untouched.
 */
export async function updateSnapshot(options: UpdateOptions): Promise<UpdateResult> {
  const { repos, path, now = () => new Date(), concurrency = 4 } = options;
  if (repos.length === 0) throw new Error('No repositories to check');
  const previous = await readSnapshot(path);

  const entries: RepoEntry[] = [];
  const failures: string[] = [];
  const queue = [...new Set(repos)];
  await Promise.all(
    Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
      for (let repo = queue.shift(); repo !== undefined; repo = queue.shift()) {
        try {
          entries.push(buildRepoEntry(repo, await fetchRepoReleases(repo, options)));
        } catch (error) {
          failures.push(error instanceof Error ? error.message : String(error));
        }
      }
    }),
  );
  if (failures.length > 0) {
    throw new Error(`Snapshot not updated; ${failures.length} repositories failed:\n- ${failures.join('\n- ')}`);
  }

  // A stable release never disappears silently: deleting a release must be a reviewed decision.
  const lost = entries.filter((e) => e.latestStable === null && previous?.repos[e.repo]?.latestStable).map((e) => e.repo);
  if (lost.length > 0) {
    throw new Error(`Snapshot not updated; previously published stable releases are missing: ${lost.join(', ')}`);
  }

  entries.sort((a, b) => a.repo.localeCompare(b.repo));
  const snapshot = snapshotSchema.parse({
    schemaVersion: SNAPSHOT_SCHEMA_VERSION,
    source: SNAPSHOT_SOURCE,
    checkedAt: now().toISOString(),
    repos: Object.fromEntries(entries.map((e) => [e.repo, e])),
  });

  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.${process.pid}.tmp`;
  await writeFile(temporary, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  await rename(temporary, path);
  return { snapshot, changes: describeChanges(previous, snapshot) };
}
