import type { Release, ReleaseAsset, RepoEntry } from './release-schema.ts';
import type { DownloadRule, Os, ProductDetail, Signing } from './types.ts';

/** Signing states that may be offered as an ordinary download button. */
const RECOMMENDABLE: ReadonlySet<Signing> = new Set(['publisher-signed', 'release-signed', 'ad-hoc', 'unsigned', 'not-applicable']);

/**
 * Asset names that announce a test or developer build. These are never
 * recommended, whatever the editorial rule says, so a renamed or
 * misconfigured rule cannot turn a debug APK into a download button.
 */
const TEST_ONLY_NAME =
  /test[-_.]?only|not[-_.]?installable|requires[-_.]?signing|not[-_.]?for[-_.]?device|simulator|debug|unsigned.*\.apk$|\.ipa$/i;

/** Formats that only make sense on one OS; a mismatch indicates a wrong rule. */
const FORMAT_OS: readonly [RegExp, Os][] = [
  [/\.exe$|\.msi$/i, 'windows'],
  [/\.dmg$|\.pkg$/i, 'macos'],
  [/\.deb$|\.rpm$|\.appimage$/i, 'linux'],
  [/\.apk$|\.aab$/i, 'android'],
  [/\.ipa$/i, 'ios'],
  [/\.xpi$/i, 'zotero'],
];

export interface ResolvedDownload {
  rule: DownloadRule;
  asset: ReleaseAsset;
  /**
   * `recommended`: may be a download button. `alternative`: secondary link.
   * `test`: listed by name with its status, never linked as an install.
   */
  kind: 'recommended' | 'alternative' | 'test';
  /** Why a rule was moved to `test`, for build-time reports. */
  demotedBecause?: string;
}

export interface DownloadPlan {
  release: Release | null;
  /** Grouped by OS in rule order. */
  byOs: { os: Os; items: ResolvedDownload[] }[];
  checksum: ReleaseAsset | null;
  /** Rules whose asset is not in the release; shown nowhere, reported by checks. */
  missing: DownloadRule[];
}

export function versionOf(tag: string): string {
  return tag.replace(/^v/, '');
}

export function assetNameFor(template: string, release: Release): string {
  return template.replaceAll('{version}', versionOf(release.tag));
}

function demotion(rule: DownloadRule, asset: ReleaseAsset): string | undefined {
  if (!RECOMMENDABLE.has(rule.signing)) return `signing state "${rule.signing}" is not installable as is`;
  if (TEST_ONLY_NAME.test(asset.name)) return `asset name "${asset.name}" marks a test or developer build`;
  if (rule.os === 'android' && rule.signing !== 'release-signed' && rule.signing !== 'publisher-signed') {
    return 'Android packages must be release-signed to be recommended';
  }
  if (rule.os === 'ios') return 'iOS builds cannot be installed from a download link';
  const expected = FORMAT_OS.find(([pattern]) => pattern.test(asset.name))?.[1];
  if (expected !== undefined && expected !== rule.os) return `asset format belongs to ${expected}, rule says ${rule.os}`;
  return undefined;
}

export function planDownloads(detail: Pick<ProductDetail, 'downloads' | 'checksumAsset'>, entry: RepoEntry | undefined): DownloadPlan {
  const release = entry?.latestStable ?? null;
  const rules = detail.downloads ?? [];
  if (release === null || release.prerelease) {
    return { release: null, byOs: [], checksum: null, missing: [...rules] };
  }

  const assets = new Map(release.assets.map((a) => [a.name, a]));
  const missing: DownloadRule[] = [];
  const byOs: DownloadPlan['byOs'] = [];

  for (const rule of rules) {
    const asset = assets.get(assetNameFor(rule.asset, release));
    if (!asset) {
      missing.push(rule);
      continue;
    }
    const reason = rule.role === 'test' ? undefined : demotion(rule, asset);
    const item: ResolvedDownload =
      rule.role === 'test'
        ? { rule, asset, kind: 'test' }
        : reason === undefined
          ? { rule, asset, kind: rule.role }
          : { rule, asset, kind: 'test', demotedBecause: reason };
    let group = byOs.find((g) => g.os === rule.os);
    if (!group) {
      group = { os: rule.os, items: [] };
      byOs.push(group);
    }
    group.items.push(item);
  }

  const checksumName = detail.checksumAsset ? assetNameFor(detail.checksumAsset, release) : undefined;
  const checksum = checksumName ? (assets.get(checksumName) ?? null) : null;
  return { release, byOs, checksum, missing };
}
