import { describe, expect, it } from 'vitest';
import { type FilterableItem, matches, paramsFromState, stateFromParams } from '../src/scripts/catalog-filter.ts';

const item: FilterableItem = {
  audience: 'everyone',
  category: 'devices',
  platforms: ['macos', 'linux'],
  availability: ['download', 'source'],
  search: 'batterybridge set a laptop charge limit devices and networks macos linux',
};

describe('catalog filters', () => {
  it('combines search terms and facets', () => {
    expect(matches(item, stateFromParams(new URLSearchParams('q=charge laptop&platform=linux')))).toBe(true);
    expect(matches(item, stateFromParams(new URLSearchParams('q=charge printer')))).toBe(false);
    expect(matches(item, stateFromParams(new URLSearchParams('platform=windows')))).toBe(false);
    expect(matches(item, stateFromParams(new URLSearchParams('availability=package')))).toBe(false);
  });

  it('ignores unknown values from a hand-edited URL', () => {
    const state = stateFromParams(new URLSearchParams('platform=amiga&category=devices'), {
      platform: ['', 'macos', 'linux'],
      category: ['', 'devices'],
    });
    expect(state.platform).toBe('');
    expect(matches(item, state)).toBe(true);
  });

  it('round-trips only non-empty values to the URL', () => {
    const state = stateFromParams(new URLSearchParams('q=pdf&audience='));
    expect(paramsFromState(state).toString()).toBe('q=pdf');
  });
});
