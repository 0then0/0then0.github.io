import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { projects } from '../src/data/projects.ts';
import { planDownloads } from '../src/lib/downloads.ts';
import { snapshotSchema } from '../src/lib/release-schema.ts';

/** Checks the editorial data against the committed release snapshot and asset files. */
const snapshot = snapshotSchema.parse(JSON.parse(readFileSync(new URL('../src/data/releases.json', import.meta.url), 'utf8')));
const asset = (dir: string, file: string) => new URL(`../src/assets/${dir}/${file}`, import.meta.url);

describe('catalog data', () => {
  it('has unique slugs and repositories', () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    expect(new Set(projects.map((p) => p.repo.toLowerCase())).size).toBe(projects.length);
  });

  it('has release metadata for every listed repository', () => {
    const missing = projects.filter((p) => !(p.repo in snapshot.repos)).map((p) => p.repo);
    expect(missing, 'run npm run releases:update').toEqual([]);
  });

  it('references existing icons and screenshots', () => {
    for (const p of projects) {
      if (p.icon) expect(existsSync(asset('icons', `${p.icon}.svg`)), `${p.slug} icon`).toBe(true);
      for (const m of p.detail?.media ?? []) {
        if (m.kind === 'screenshot') {
          expect(existsSync(asset('screenshots', m.file)), `${p.slug} ${m.file}`).toBe(true);
          expect(m.alt.length, `${p.slug} alt text`).toBeGreaterThan(40);
        }
      }
    }
  });

  it('does not mark a platform as supported when it only has preview builds', () => {
    for (const p of projects) {
      const overlap = (p.previewPlatforms ?? []).filter((x) => p.platforms.includes(x));
      expect(overlap, p.slug).toEqual([]);
    }
  });

  for (const p of projects) {
    const detail = p.detail;
    if (!detail) continue;
    describe(p.name, () => {
      const plan = planDownloads(detail, snapshot.repos[p.repo]);

      it('matches every download rule to an asset of the current stable release', () => {
        expect(plan.missing.map((r) => `${r.id}: ${r.asset}`)).toEqual([]);
      });

      it('links a checksum file when one is declared', () => {
        if (detail.checksumAsset) expect(plan.checksum, detail.checksumAsset).not.toBeNull();
      });

      it('has a recommended installer when the primary action is a download', () => {
        if (detail.primary.kind !== 'download') return;
        const recommended = plan.byOs.flatMap((g) => g.items).filter((i) => i.kind === 'recommended');
        expect(recommended.length).toBeGreaterThan(0);
      });

      it('does not let a recommended rule be silently demoted', () => {
        const demoted = plan.byOs.flatMap((g) => g.items).filter((i) => i.demotedBecause);
        expect(demoted.map((i) => `${i.rule.id}: ${i.demotedBecause}`)).toEqual([]);
      });

      it('has a link target for non-download primary actions', () => {
        if (detail.primary.kind !== 'download') expect(detail.primary.href).toMatch(/^https:\/\//);
      });
    });
  }

  it('lists only projects with a stable release as downloadable', () => {
    const wrong = projects
      .filter((p) => p.availability.includes('download'))
      .filter((p) => (snapshot.repos[p.repo]?.latestStable?.assets.length ?? 0) === 0)
      .map((p) => p.slug);
    expect(wrong).toEqual([]);
  });
});
