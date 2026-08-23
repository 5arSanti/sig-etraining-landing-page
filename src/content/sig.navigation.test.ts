import { describe, expect, it } from 'vitest';
import { getAdjacentSlug, getReadyTopics } from './sig.navigation';
import { SIG_TOPICS } from './sig.manifest';

describe('getAdjacentSlug', () => {
  it('skips placeholders and stops at the ends of the ready sequence', () => {
    expect(getReadyTopics(SIG_TOPICS)).toHaveLength(6);
    expect(getAdjacentSlug('entradas-salidas', 'prev')).toBeNull();
    expect(getAdjacentSlug('entradas-salidas', 'next')).toBe('pestel');
    expect(getAdjacentSlug('pestel', 'next')).toBe('matriz-interesados');
    expect(getAdjacentSlug('matriz-raci', 'next')).toBe('infografia');
    expect(getAdjacentSlug('infografia', 'next')).toBeNull();
    expect(getAdjacentSlug('matriz-raci', 'prev')).toBe('mapa-de-procesos');
    expect(getAdjacentSlug('infografia', 'prev')).toBe('matriz-raci');
    expect(getAdjacentSlug('politica-sig', 'prev')).toBe('infografia');
    expect(getAdjacentSlug('politica-sig', 'next')).toBeNull();
  });
});
