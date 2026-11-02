import type { CatalogEntry, ProductDetail } from '../lib/types.ts';
import { DEFAULT_LANG, type Lang } from './locales.ts';
import { de } from './messages/de.ts';
import { en, type Messages } from './messages/en.ts';
import { es } from './messages/es.ts';
import { fr } from './messages/fr.ts';
import { ja } from './messages/ja.ts';
import { ptBR } from './messages/pt-BR.ts';
import { ru } from './messages/ru.ts';
import { de as deProjects } from './projects/de.ts';
import { es as esProjects } from './projects/es.ts';
import { fr as frProjects } from './projects/fr.ts';
import { ja as jaProjects } from './projects/ja.ts';
import { ptBR as ptBRProjects } from './projects/pt-BR.ts';
import { ru as ruProjects } from './projects/ru.ts';
import type { ProductDetailText, ProjectText, ProjectTexts } from './projects/types.ts';

export * from './format.ts';
export * from './locales.ts';
export type { Messages, ProjectText };

export const MESSAGES: Record<Lang, Messages> = { en, ru, es, de, fr, ja, 'pt-BR': ptBR };

/** Translated catalog texts; English comes from src/data/projects.ts itself. */
export const PROJECT_TEXTS: Record<Exclude<Lang, 'en'>, ProjectTexts> = {
  ru: ruProjects,
  es: esProjects,
  de: deProjects,
  fr: frProjects,
  ja: jaProjects,
  'pt-BR': ptBRProjects,
};

export function messages(lang: Lang): Messages {
  return MESSAGES[lang];
}

/** Download format or build term in the given language; technical terms without a translation stay as written. */
export function term(lang: Lang, text: string): string {
  return MESSAGES[lang].terms[text] ?? text;
}

export function englishProjectText(project: CatalogEntry): ProjectText {
  const detail = project.detail;
  return {
    task: project.task,
    environment: project.environment,
    name: project.name,
    ...(detail
      ? {
          detail: englishDetailText(detail),
          tagline: detail.tagline,
          primary: detail.primary.label,
          ...(detail.secondary
            ? { secondary: detail.secondary.map((s) => ({ label: s.label, ...(s.note ? { note: s.note } : {}) })) }
            : {}),
          ...(detail.downloadNote ? { downloadNote: detail.downloadNote } : {}),
        }
      : {}),
    ...(project.fork ? { forkNote: project.fork.note } : {}),
  };
}

/** Catalog texts of a project in the given language, falling back to English per field. */
export function projectText(lang: Lang, project: CatalogEntry): Required<Pick<ProjectText, 'task' | 'environment' | 'name'>> & ProjectText {
  const base = englishProjectText(project);
  if (lang === DEFAULT_LANG) return { ...base, name: project.name };
  const local = PROJECT_TEXTS[lang][project.slug];
  return { ...base, ...local, name: local?.name ?? project.name };
}

/** Splits "text {a} text {b}" into literal parts and placeholder names for rendering links inside sentences. */
export function templateParts(template: string): ({ text: string } | { slot: string })[] {
  return template
    .split(/(\{\w+\})/)
    .filter(Boolean)
    .map((part) => (/^\{\w+\}$/.test(part) ? { slot: part.slice(1, -1) } : { text: part }));
}

export function englishDetailText(detail: ProductDetail): ProductDetailText {
  return {
    summary: detail.summary,
    audience: detail.audience,
    scenarios: detail.scenarios,
    media: detail.media.map((m) => ({ ...('alt' in m ? { alt: m.alt } : {}), caption: m.caption })),
    support: detail.support.map((s) => ({ platform: s.platform, note: s.note })),
    limitations: detail.limitations,
    firstRun: detail.firstRun.map((s) => s.text),
    downloadSteps: Object.fromEntries((detail.downloads ?? []).map((r) => [r.id, r.steps])),
  };
}

export function productDetail(lang: Lang, project: CatalogEntry & { detail: ProductDetail }): ProductDetail {
  if (lang === DEFAULT_LANG) return project.detail;
  const local = PROJECT_TEXTS[lang][project.slug]?.detail;
  if (!local) throw new Error(`Missing product description: ${lang}/${project.slug}`);
  return {
    ...project.detail,
    summary: local.summary,
    audience: local.audience,
    scenarios: local.scenarios,
    limitations: local.limitations,
    media: project.detail.media.map((m, i) => ({ ...m, ...local.media[i] })),
    support: project.detail.support.map((s, i) => ({ ...s, ...local.support[i] })),
    firstRun: project.detail.firstRun.map((s, i) => ({ ...s, text: local.firstRun[i] ?? '' })),
    ...(project.detail.downloads
      ? { downloads: project.detail.downloads.map((r) => ({ ...r, steps: local.downloadSteps[r.id] ?? [] })) }
      : {}),
  };
}
