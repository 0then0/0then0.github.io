import { describe, expect, it } from 'vitest';
import { projects } from '../src/data/projects.ts';
import { englishProjectText, type Lang, LOCALES, MESSAGES, PROJECT_TEXTS } from '../src/i18n/index.ts';

const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
const isPlural = (v: unknown): v is Record<string, string> => typeof v === 'object' && v !== null && 'other' in v;

/** Walks two message trees in parallel and yields [path, english, translated] for every string. */
function* pairs(en: unknown, tr: unknown, path = ''): Generator<[string, unknown, unknown]> {
  if (typeof en === 'string') {
    yield [path, en, tr];
    return;
  }
  if (isPlural(en)) {
    for (const key of Object.keys(tr as object)) yield [`${path}.${key}`, en.other, (tr as Record<string, string>)[key]];
    return;
  }
  if (en && typeof en === 'object') {
    for (const key of Object.keys(en))
      yield* pairs((en as Record<string, unknown>)[key], (tr as Record<string, unknown>)?.[key], `${path}.${key}`);
  }
}

/** Plural objects in a message tree. */
function* plurals(tree: unknown, path = ''): Generator<[string, Record<string, string>]> {
  if (isPlural(tree)) yield [path, tree];
  else if (tree && typeof tree === 'object' && !Array.isArray(tree))
    for (const [key, value] of Object.entries(tree)) yield* plurals(value, `${path}.${key}`);
}

const ruleTerms = new Set(projects.flatMap((p) => p.detail?.downloads?.map((r) => r.label) ?? []));

describe.each(LOCALES.map((l) => l.code).filter((c) => c !== 'en'))('%s translation', (lang) => {
  const messages = MESSAGES[lang as Lang];
  const texts = PROJECT_TEXTS[lang as Exclude<Lang, 'en'>];

  it('keeps the placeholders of every English message', () => {
    const mismatched: string[] = [];
    for (const [path, en, tr] of pairs(MESSAGES.en, messages)) {
      if (path === '.meta.sentenceGap') continue;
      if (typeof tr !== 'string' || tr.trim() === '') mismatched.push(`${path}: missing`);
      else if (path.startsWith('.terms.')) continue;
      else if (placeholders(String(en)).join() !== placeholders(tr).join()) mismatched.push(`${path}: ${tr}`);
    }
    expect(mismatched).toEqual([]);
  });

  it('has every plural form the language uses', () => {
    const rules = new Intl.PluralRules(lang);
    const needed = new Set(Array.from({ length: 201 }, (_, n) => rules.select(n)));
    const missing: string[] = [];
    for (const [path, forms] of plurals(messages)) for (const form of needed) if (!(form in forms)) missing.push(`${path}.${form}`);
    expect(missing).toEqual([]);
  });

  it('translates every download format label used by the catalog', () => {
    expect([...ruleTerms].filter((label) => !(label in messages.terms))).toEqual([]);
  });

  it('has catalog texts for every project and every translatable field', () => {
    const problems: string[] = [];
    for (const project of projects) {
      const en = englishProjectText(project);
      const tr = texts[project.slug];
      if (!tr) {
        problems.push(`${project.slug}: missing`);
        continue;
      }
      for (const field of ['tagline', 'primary', 'forkNote', 'downloadNote'] as const) {
        if (en[field] && !tr[field]) problems.push(`${project.slug}.${field}`);
      }
      if ((en.secondary?.length ?? 0) !== (tr.secondary?.length ?? 0)) problems.push(`${project.slug}.secondary`);
    }
    for (const slug of Object.keys(texts)) if (!projects.some((p) => p.slug === slug)) problems.push(`${slug}: unknown project`);
    expect(problems).toEqual([]);
  });
});

describe('English terms', () => {
  it('lists every download format label so translators see it', () => {
    expect([...ruleTerms].filter((label) => !(label in MESSAGES.en.terms))).toEqual([]);
  });
});
