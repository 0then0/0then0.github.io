import type { CatalogEntry } from '../lib/types.ts';
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
import type { ProjectText, ProjectTexts } from './projects/types.ts';

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
