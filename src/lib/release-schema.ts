import { z } from 'zod';

/**
 * Release metadata snapshot. It is written by `npm run releases:update`
 * and read at build time; visitors' browsers never call the GitHub API.
 */

export const SNAPSHOT_SCHEMA_VERSION = 1;

const repoName = z.string().regex(/^[\w.-]+\/[\w.-]+$/);
const isoDate = z.iso.datetime({ offset: true });
const githubUrl = z.url().refine((u) => u.startsWith('https://github.com/'), 'must be a github.com URL');

export const assetSchema = z.strictObject({
  name: z.string().min(1),
  size: z.number().int().nonnegative(),
  contentType: z.string(),
  downloadUrl: githubUrl,
  /** GitHub-computed digest such as `sha256:…`; absent on older assets. */
  digest: z
    .string()
    .regex(/^sha256:[0-9a-f]{64}$/)
    .nullable(),
  updatedAt: isoDate,
});

export const releaseSchema = z.strictObject({
  tag: z.string().min(1),
  name: z.string(),
  htmlUrl: githubUrl,
  publishedAt: isoDate,
  prerelease: z.literal(false),
  assets: z.array(assetSchema),
});

export const repoEntrySchema = z.strictObject({
  repo: repoName,
  htmlUrl: githubUrl,
  /** Latest published, non-draft, non-prerelease release, or null if none exists. */
  latestStable: releaseSchema.nullable(),
  /** Number of prereleases newer than latestStable; they are never offered as downloads. */
  newerPrereleases: z.number().int().nonnegative(),
});

export const snapshotSchema = z.strictObject({
  schemaVersion: z.literal(SNAPSHOT_SCHEMA_VERSION),
  source: z.string().min(1),
  checkedAt: isoDate,
  repos: z.record(repoName, repoEntrySchema),
});

export type ReleaseAsset = z.infer<typeof assetSchema>;
export type Release = z.infer<typeof releaseSchema>;
export type RepoEntry = z.infer<typeof repoEntrySchema>;
export type ReleaseSnapshot = z.infer<typeof snapshotSchema>;
