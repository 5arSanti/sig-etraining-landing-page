import { describe, expect, it } from 'vitest';
import { getAdjacentSlug, getReadyTopics } from './sig.navigation';
import { SIG_TOPICS } from './sig.manifest';

describe('getAdjacentSlug', () => {
  it('walks all seven ready topics in order', () => {
    expect(getReadyTopics(SIG_TOPICS)).toHaveLength(7);
    expect(getAdjacentSlug('entradas-salidas', 'prev')).toBeNull();
    expect(getAdjacentSlug('entradas-salidas', 'next')).toBe('pestel');
    expect(getAdjacentSlug('pestel', 'next')).toBe('matriz-interesados');
    expect(getAdjacentSlug('matriz-raci', 'next')).toBe('politica-sig');
    expect(getAdjacentSlug('politica-sig', 'next')).toBe('infografia');
    expect(getAdjacentSlug('infografia', 'next')).toBeNull();
    expect(getAdjacentSlug('matriz-raci', 'prev')).toBe('mapa-de-procesos');
    expect(getAdjacentSlug('politica-sig', 'prev')).toBe('matriz-raci');
    expect(getAdjacentSlug('infografia', 'prev')).toBe('politica-sig');
  });
});
