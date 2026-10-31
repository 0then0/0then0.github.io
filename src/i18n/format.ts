import type { Lang } from './locales.ts';

export type Plural = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };

/** Replaces {name} placeholders. */
export function fmt(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) => (key in vars ? String(vars[key]) : whole));
}

export function plural(lang: Lang, forms: Plural, n: number, vars: Record<string, string | number> = {}): string {
  const rule = new Intl.PluralRules(lang).select(n);
  return fmt(forms[rule] ?? forms.other, { n: formatNumber(lang, n), ...vars });
}

export function formatNumber(lang: Lang, n: number): string {
  return new Intl.NumberFormat(lang).format(n);
}

export function formatDate(lang: Lang, iso: string): string {
  return new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(iso));
}

export function formatBytes(lang: Lang, bytes: number): string {
  const units = ['byte', 'kilobyte', 'megabyte', 'gigabyte'] as const;
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  return new Intl.NumberFormat(lang, {
    style: 'unit',
    unit: units[unit],
    unitDisplay: 'short',
    maximumFractionDigits: value >= 10 || unit === 0 ? 0 : 1,
  }).format(value);
}
