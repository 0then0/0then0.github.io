import { type Plural, plural } from '../i18n/format.ts';
import type { Lang } from '../i18n/locales.ts';

/**
 * Client-side filtering of the pre-rendered catalog. The full list is in the
 * HTML, so the page works without JavaScript; this only hides rows and keeps
 * the filter state in the URL query.
 */

export const FILTER_KEYS = ['q', 'audience', 'category', 'platform', 'availability'] as const;
export type FilterKey = (typeof FILTER_KEYS)[number];
export type FilterState = Record<FilterKey, string>;

export interface FilterableItem {
  audience: string;
  category: string;
  platforms: readonly string[];
  availability: readonly string[];
  search: string;
}

export function stateFromParams(params: URLSearchParams, allowed: Partial<Record<FilterKey, readonly string[]>> = {}): FilterState {
  const state = Object.fromEntries(FILTER_KEYS.map((k) => [k, (params.get(k) ?? '').trim()])) as FilterState;
  // Unknown values from a hand-edited URL are ignored instead of hiding everything.
  for (const key of FILTER_KEYS) {
    const values = allowed[key];
    if (values && state[key] !== '' && !values.includes(state[key])) state[key] = '';
  }
  return state;
}

export function paramsFromState(state: FilterState): URLSearchParams {
  const params = new URLSearchParams();
  for (const key of FILTER_KEYS) if (state[key] !== '') params.set(key, state[key]);
  return params;
}

export function matches(item: FilterableItem, state: FilterState): boolean {
  if (state.audience && item.audience !== state.audience) return false;
  if (state.category && item.category !== state.category) return false;
  if (state.platform && !item.platforms.includes(state.platform)) return false;
  if (state.availability && !item.availability.includes(state.availability)) return false;
  const terms = state.q.toLowerCase().split(/\s+/).filter(Boolean);
  return terms.every((term) => item.search.includes(term));
}

const split = (value: string | undefined) => (value ?? '').split(' ').filter(Boolean);

/** Localized count messages, rendered into data-i18n by the catalog page. */
export interface CountMessages {
  lang: Lang;
  count: Plural;
  countFiltered: Plural;
}

export function initCatalogFilters(root: Document = document): void {
  const form = root.querySelector<HTMLFormElement>('[data-filters]');
  const list = root.querySelector<HTMLElement>('[data-catalog]');
  const status = root.querySelector<HTMLElement>('[data-filter-status]');
  const count = root.querySelector<HTMLElement>('[data-count]');
  const empty = root.querySelector<HTMLElement>('[data-empty]');
  const reset = root.querySelector<HTMLButtonElement>('[data-reset]');
  if (!form || !list || !status || !count || !empty || !reset) return;
  const text = JSON.parse(count.dataset.i18n ?? '{}') as CountMessages;

  const rows = [...list.querySelectorAll<HTMLElement>(':scope > li')];
  const items = rows.map((row) => ({
    row,
    item: {
      audience: row.dataset.audience ?? '',
      category: row.dataset.category ?? '',
      platforms: split(row.dataset.platforms),
      availability: split(row.dataset.availability),
      search: row.dataset.search ?? '',
    } satisfies FilterableItem,
  }));
  const field = (key: FilterKey) => form.elements.namedItem(key) as HTMLInputElement | HTMLSelectElement;
  const allowed: Partial<Record<FilterKey, string[]>> = {};
  for (const key of FILTER_KEYS) {
    const el = field(key);
    if (el instanceof HTMLSelectElement) allowed[key] = [...el.options].map((o) => o.value);
  }

  const read = (): FilterState => Object.fromEntries(FILTER_KEYS.map((k) => [k, field(k).value.trim()])) as FilterState;

  const apply = (state: FilterState, updateUrl: boolean) => {
    let visible = 0;
    for (const { row, item } of items) {
      const show = matches(item, state);
      row.hidden = !show;
      if (show) visible++;
    }
    count.textContent =
      visible === items.length
        ? plural(text.lang, text.count, items.length)
        : plural(text.lang, text.countFiltered, visible, { total: items.length });
    empty.hidden = visible > 0;
    reset.hidden = FILTER_KEYS.every((k) => state[k] === '');
    if (updateUrl) {
      const query = paramsFromState(state).toString();
      history.replaceState(null, '', `${location.pathname}${query ? `?${query}` : ''}${location.hash}`);
    }
  };

  const initial = stateFromParams(new URLSearchParams(location.search), allowed);
  for (const key of FILTER_KEYS) field(key).value = initial[key];

  form.addEventListener('input', () => apply(read(), true));
  form.addEventListener('submit', (event) => event.preventDefault());
  reset.addEventListener('click', () => {
    form.reset();
    apply(read(), true);
    field('q').focus();
  });

  form.hidden = false;
  status.hidden = false;
  apply(initial, false);
}
