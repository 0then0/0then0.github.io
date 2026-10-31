import type { Release, ReleaseAsset, RepoEntry } from '../src/lib/release-schema.ts';
import type { ApiRelease } from '../src/lib/release-update.ts';

export function asset(name: string, size = 1_000_000): ReleaseAsset {
  return {
    name,
    size,
    contentType: 'application/octet-stream',
    downloadUrl: `https://github.com/example/app/releases/download/v1.2.0/${name}`,
    digest: null,
    updatedAt: '2026-10-01T10:00:00Z',
  };
}

export function release(names: string[], tag = 'v1.2.0'): Release {
  return {
    tag,
    name: tag,
    htmlUrl: `https://github.com/example/app/releases/tag/${tag}`,
    publishedAt: '2026-10-01T10:00:00Z',
    prerelease: false,
    assets: names.map((n) => asset(n)),
  };
}

export function entry(latestStable: Release | null): RepoEntry {
  return { repo: 'example/app', htmlUrl: 'https://github.com/example/app', latestStable, newerPrereleases: 0 };
}

export function apiRelease(tag: string, overrides: Partial<ApiRelease> = {}): ApiRelease {
  return {
    tag_name: tag,
    name: tag,
    html_url: `https://github.com/example/app/releases/tag/${tag}`,
    draft: false,
    prerelease: false,
    published_at: '2026-10-01T10:00:00Z',
    assets: [
      {
        name: `app-${tag}.zip`,
        size: 10,
        content_type: 'application/zip',
        browser_download_url: `https://github.com/example/app/releases/download/${tag}/app-${tag}.zip`,
        digest: null,
        updated_at: '2026-10-01T10:00:00Z',
        state: 'uploaded',
      },
    ],
    ...overrides,
  };
}
