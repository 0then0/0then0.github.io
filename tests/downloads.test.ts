import { describe, expect, it } from 'vitest';
import { planDownloads } from '../src/lib/downloads.ts';
import type { DownloadRule } from '../src/lib/types.ts';
import { entry, release } from './fixtures.ts';

const rule = (overrides: Partial<DownloadRule> & Pick<DownloadRule, 'id' | 'os' | 'asset'>): DownloadRule => ({
  arch: 'x86-64',
  label: overrides.id,
  signing: 'unsigned',
  role: 'recommended',
  steps: [],
  ...overrides,
});

const kinds = (plan: ReturnType<typeof planDownloads>) =>
  Object.fromEntries(plan.byOs.flatMap((g) => g.items).map((i) => [i.rule.id, i.kind]));

describe('planDownloads', () => {
  it('matches versioned asset names exactly and links the checksum file', () => {
    const plan = planDownloads(
      {
        downloads: [rule({ id: 'win', os: 'windows', asset: 'app-{version}-setup.exe' })],
        checksumAsset: 'SHA256SUMS',
      },
      entry(release(['app-1.2.0-setup.exe', 'app-1.2.0-setup.exe.blockmap', 'SHA256SUMS'])),
    );
    expect(kinds(plan)).toEqual({ win: 'recommended' });
    expect(plan.byOs[0]?.items[0]?.asset.name).toBe('app-1.2.0-setup.exe');
    expect(plan.checksum?.name).toBe('SHA256SUMS');
  });

  it('never recommends test-only, debug or not-installable builds, even if a rule says so', () => {
    const plan = planDownloads(
      {
        downloads: [
          rule({ id: 'debug', os: 'android', asset: 'app-{version}-android-debug-TEST-ONLY.apk', signing: 'release-signed' }),
          rule({ id: 'unsigned-apk', os: 'android', asset: 'app-{version}-android-unsigned-NOT-INSTALLABLE.apk', signing: 'unsigned' }),
          rule({ id: 'plain-unsigned-apk', os: 'android', asset: 'app.apk', signing: 'unsigned' }),
          rule({ id: 'sim', os: 'macos', asset: 'app-simulator.zip' }),
        ],
      },
      entry(
        release([
          'app-1.2.0-android-debug-TEST-ONLY.apk',
          'app-1.2.0-android-unsigned-NOT-INSTALLABLE.apk',
          'app.apk',
          'app-simulator.zip',
        ]),
      ),
    );
    expect(kinds(plan)).toEqual({ debug: 'test', 'unsigned-apk': 'test', 'plain-unsigned-apk': 'test', sim: 'test' });
  });

  it('recommends a release-signed APK but never an iOS build', () => {
    const plan = planDownloads(
      {
        downloads: [
          rule({ id: 'apk', os: 'android', asset: 'app-release.apk', signing: 'release-signed' }),
          rule({ id: 'ipa', os: 'ios', asset: 'app-device.zip', signing: 'publisher-signed' }),
        ],
      },
      entry(release(['app-release.apk', 'app-device.zip'])),
    );
    expect(kinds(plan)).toEqual({ apk: 'recommended', ipa: 'test' });
  });

  it('demotes an installer whose format does not belong to the rule OS', () => {
    const plan = planDownloads(
      { downloads: [rule({ id: 'mac', os: 'macos', asset: 'app-setup.exe' })] },
      entry(release(['app-setup.exe'])),
    );
    expect(kinds(plan)).toEqual({ mac: 'test' });
    expect(plan.byOs[0]?.items[0]?.demotedBecause).toMatch(/windows/);
  });

  it('reports rules whose asset is missing instead of linking a different file', () => {
    const plan = planDownloads(
      { downloads: [rule({ id: 'deb', os: 'linux', asset: 'app_{version}_amd64.deb' })] },
      entry(release(['app_1.1.0_amd64.deb', 'app_1.2.0_arm64.deb'])),
    );
    expect(plan.byOs).toEqual([]);
    expect(plan.missing.map((r) => r.id)).toEqual(['deb']);
  });

  it('offers nothing when there is no stable release', () => {
    const plan = planDownloads({ downloads: [rule({ id: 'win', os: 'windows', asset: 'app.exe' })] }, entry(null));
    expect(plan.release).toBeNull();
    expect(plan.byOs).toEqual([]);
  });

  it('refuses a prerelease that slipped into the data', () => {
    const pre = { ...release(['app.exe'], 'v2.0.0-rc.1'), prerelease: true } as unknown as ReturnType<typeof release>;
    const plan = planDownloads({ downloads: [rule({ id: 'win', os: 'windows', asset: 'app.exe' })] }, entry(pre));
    expect(plan.byOs).toEqual([]);
  });
});
