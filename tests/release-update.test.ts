import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { type ApiRelease, buildRepoEntry, updateSnapshot } from '../src/lib/release-update.ts';
import { apiRelease } from './fixtures.ts';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

/** Fake fetch that serves per-repository responses (or a function per call). */
function fakeFetch(routes: Record<string, (() => Response) | ApiRelease[]>) {
  const calls: string[] = [];
  const impl = (async (input: string | URL | Request) => {
    const url = String(input);
    calls.push(url);
    const repo = url.replace('https://api.github.com/repos/', '').replace(/\/releases.*$/, '');
    const route = routes[repo];
    if (!route) return json({ message: 'Not Found' }, 404);
    return typeof route === 'function' ? route() : json(route);
  }) as typeof fetch;
  return { impl, calls };
}

const noDelay = { backoffMs: () => 0, timeoutMs: 1_000 };

describe('buildRepoEntry', () => {
  it('skips drafts and prereleases, including SemVer prerelease tags not flagged as such', () => {
    const entry = buildRepoEntry('example/app', [
      apiRelease('v2.0.0', { draft: true, published_at: null }),
      apiRelease('v1.3.0-rc.1', { published_at: '2026-10-05T00:00:00Z' }),
      apiRelease('v1.3.0-beta.1', { prerelease: true, published_at: '2026-10-04T00:00:00Z' }),
      apiRelease('v1.2.0', { published_at: '2026-10-03T00:00:00Z' }),
      apiRelease('v1.1.0', { published_at: '2026-09-01T00:00:00Z' }),
    ]);
    expect(entry.latestStable?.tag).toBe('v1.2.0');
    expect(entry.newerPrereleases).toBe(2);
  });

  it('returns null when only prereleases exist', () => {
    const entry = buildRepoEntry('example/app', [apiRelease('v0.1.0-dev.1', { prerelease: true })]);
    expect(entry.latestStable).toBeNull();
    expect(entry.newerPrereleases).toBe(1);
  });

  it('drops assets that are still uploading', () => {
    const release = apiRelease('v1.0.0');
    const [uploaded] = release.assets;
    if (!uploaded) throw new Error('fixture has no asset');
    release.assets.push({ ...uploaded, name: 'partial.zip', state: 'starter' });
    expect(buildRepoEntry('example/app', [release]).latestStable?.assets.map((a) => a.name)).toEqual(['app-v1.0.0.zip']);
  });
});

describe('updateSnapshot', () => {
  let path: string;
  const previous = async () => readFile(path, 'utf8');

  beforeEach(async () => {
    path = join(await mkdtemp(join(tmpdir(), 'snapshot-')), 'releases.json');
    const { impl } = fakeFetch({ 'example/app': [apiRelease('v1.0.0')], 'example/tool': [apiRelease('v0.1.0')] });
    await updateSnapshot({
      repos: ['example/app', 'example/tool'],
      path,
      fetchImpl: impl,
      ...noDelay,
      now: () => new Date('2026-10-01T00:00:00Z'),
    });
  });

  it('writes a validated snapshot with the check time and source', async () => {
    const data = JSON.parse(await previous());
    expect(data.checkedAt).toBe('2026-10-01T00:00:00.000Z');
    expect(data.source).toMatch(/GitHub REST API/);
    expect(data.repos['example/app'].latestStable.tag).toBe('v1.0.0');
  });

  it('keeps the previous snapshot when one repository keeps failing', async () => {
    const before = await previous();
    const { impl, calls } = fakeFetch({ 'example/app': [apiRelease('v1.1.0')], 'example/tool': () => json({}, 502) });
    await expect(updateSnapshot({ repos: ['example/app', 'example/tool'], path, fetchImpl: impl, retries: 2, ...noDelay })).rejects.toThrow(
      /example\/tool: HTTP 502/,
    );
    expect(await previous()).toBe(before);
    expect(calls.filter((c) => c.includes('example/tool'))).toHaveLength(3);
  });

  it('does not retry a permanent error such as rate limiting', async () => {
    const before = await previous();
    const limited = () => new Response('{}', { status: 403, headers: { 'x-ratelimit-remaining': '0' } });
    const { impl, calls } = fakeFetch({ 'example/app': limited, 'example/tool': [apiRelease('v0.2.0')] });
    await expect(updateSnapshot({ repos: ['example/app', 'example/tool'], path, fetchImpl: impl, ...noDelay })).rejects.toThrow(
      /rate limit/,
    );
    expect(calls.filter((c) => c.includes('example/app'))).toHaveLength(1);
    expect(await previous()).toBe(before);
  });

  it('keeps the previous snapshot when the API returns an unexpected shape', async () => {
    const before = await previous();
    const { impl } = fakeFetch({ 'example/app': () => json({ releases: [] }), 'example/tool': [apiRelease('v0.2.0')] });
    await expect(updateSnapshot({ repos: ['example/app', 'example/tool'], path, fetchImpl: impl, ...noDelay })).rejects.toThrow(
      /unexpected API response/,
    );
    expect(await previous()).toBe(before);
  });

  it('refuses to drop a stable release that was previously published', async () => {
    const before = await previous();
    const { impl } = fakeFetch({ 'example/app': [], 'example/tool': [apiRelease('v0.2.0')] });
    await expect(updateSnapshot({ repos: ['example/app', 'example/tool'], path, fetchImpl: impl, ...noDelay })).rejects.toThrow(
      /missing: example\/app/,
    );
    expect(await previous()).toBe(before);
  });

  it('recovers from a transient network error and reports the change', async () => {
    let attempts = 0;
    const flaky = () => {
      attempts++;
      if (attempts === 1) throw new TypeError('fetch failed');
      return json([apiRelease('v1.1.0'), apiRelease('v1.0.0', { published_at: '2026-09-01T00:00:00Z' })]);
    };
    const { impl } = fakeFetch({ 'example/app': flaky, 'example/tool': [apiRelease('v0.1.0')] });
    const result = await updateSnapshot({ repos: ['example/app', 'example/tool'], path, fetchImpl: impl, ...noDelay });
    expect(result.changes).toEqual(['example/app: v1.0.0 -> v1.1.0']);
    expect(JSON.parse(await previous()).repos['example/app'].latestStable.tag).toBe('v1.1.0');
  });

  it('rejects a corrupted existing snapshot instead of silently replacing it', async () => {
    await writeFile(path, '{"schemaVersion": 99}');
    const { impl } = fakeFetch({ 'example/app': [apiRelease('v1.0.0')] });
    await expect(updateSnapshot({ repos: ['example/app'], path, fetchImpl: impl, ...noDelay })).rejects.toThrow();
    expect(await previous()).toBe('{"schemaVersion": 99}');
  });
});
