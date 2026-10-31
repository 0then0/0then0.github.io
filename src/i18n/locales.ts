/** Supported interface languages. English is served without a path prefix. */
export const LOCALES = [
  { code: 'en', path: '', label: 'English' },
  { code: 'ru', path: 'ru', label: 'Русский' },
  { code: 'es', path: 'es', label: 'Español' },
  { code: 'de', path: 'de', label: 'Deutsch' },
  { code: 'fr', path: 'fr', label: 'Français' },
  { code: 'ja', path: 'ja', label: '日本語' },
  { code: 'pt-BR', path: 'pt-br', label: 'Português (Brasil)' },
] as const;

export type Lang = (typeof LOCALES)[number]['code'];
export const DEFAULT_LANG = 'en' satisfies Lang;
export const PREFIXED_LOCALES = LOCALES.filter((l) => l.path !== '');

export function localeInfo(lang: Lang) {
  const info = LOCALES.find((l) => l.code === lang);
  if (!info) throw new Error(`Unknown locale ${lang}`);
  return info;
}

export function langFromPath(segment: string | undefined): Lang {
  return LOCALES.find((l) => l.path !== '' && l.path === segment)?.code ?? DEFAULT_LANG;
}

/** Prefixes a root-relative site path ("/projects/") with the language segment. */
export function localePath(lang: Lang, path: string): string {
  const { path: prefix } = localeInfo(lang);
  return prefix ? `/${prefix}${path}` : path;
}

/** Splits "/ru/projects/x/" into the language and the language-neutral path "/projects/x/". */
export function splitLocalePath(pathname: string): { lang: Lang; path: string } {
  const match = pathname.match(/^\/([^/]+)(\/.*)?$/);
  const lang = langFromPath(match?.[1]);
  if (lang === DEFAULT_LANG) return { lang, path: pathname };
  return { lang, path: match?.[2] ?? '/' };
}
