import { projects } from '../data/projects.ts';
import snapshotJson from '../data/releases.json';
import { type Lang, messages } from '../i18n/index.ts';
import { type DownloadPlan, planDownloads } from './downloads.ts';
import { type RepoEntry, snapshotSchema } from './release-schema.ts';
import type { CatalogEntry } from './types.ts';

/** Parsed once at build time; an invalid snapshot fails the build. */
export const snapshot = snapshotSchema.parse(snapshotJson);

export function repoEntry(project: Pick<CatalogEntry, 'repo'>): RepoEntry | undefined {
  return snapshot.repos[project.repo];
}

export function latestRelease(project: Pick<CatalogEntry, 'repo'>) {
  return repoEntry(project)?.latestStable ?? null;
}

export function downloadPlan(project: CatalogEntry): DownloadPlan | null {
  return project.detail ? planDownloads(project.detail, repoEntry(project)) : null;
}

export function repoUrl(project: Pick<CatalogEntry, 'repo'>, path = ''): string {
  return `https://github.com/${project.repo}${path}`;
}

export function statusLabel(project: CatalogEntry, lang: Lang): string {
  const m = messages(lang);
  const release = latestRelease(project);
  const maturity = project.maturity ? `${m.labels.maturity[project.maturity]} · ` : '';
  if (release) return `${maturity}${release.tag}`;
  const pre = repoEntry(project)?.newerPrereleases ?? 0;
  return `${maturity}${pre > 0 ? m.status.prereleaseOnly : m.status.noRelease}`;
}

export { projects };
