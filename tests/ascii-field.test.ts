import { describe, expect, it } from 'vitest';
import { buildCloud, COLS, GLYPHS, LIGHT, ROWS } from '../src/scripts/ascii-field.ts';

describe('glyph field', () => {
  it('fits every glyph into the atlas exactly once', () => {
    expect(GLYPHS.length).toBeLessThanOrEqual(COLS * ROWS);
    expect(new Set(GLYPHS).size).toBe(GLYPHS.length);
    for (const glyph of GLYPHS) expect([...glyph]).toHaveLength(1);
  });

  it('assigns valid atlas indices and uses the whole set', () => {
    const cloud = buildCloud(2400);
    const used = new Set<number>();
    for (let i = 0; i < cloud.count; i++) {
      const glyph = cloud.data[i * 4 + 1] ?? -1;
      expect(Number.isInteger(glyph) && glyph >= 0 && glyph < GLYPHS.length).toBe(true);
      used.add(glyph);
    }
    expect(used.size).toBe(GLYPHS.length);
  });

  it('keeps faint dot-like glyphs a minority in the outer field', () => {
    const cloud = buildCloud(2400);
    const light = new Set(LIGHT);
    let outer = 0;
    let faint = 0;
    for (let i = 0; i < cloud.count; i++) {
      const r = Math.hypot(cloud.pos[i * 3] ?? 0, cloud.pos[i * 3 + 1] ?? 0, cloud.pos[i * 3 + 2] ?? 0);
      if (r < 0.6) continue;
      outer++;
      if (light.has(cloud.data[i * 4 + 1] ?? -1)) faint++;
    }
    expect(faint / outer).toBeLessThan(0.5);
  });
});
