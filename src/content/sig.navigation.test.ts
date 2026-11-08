import { describe, expect, it } from 'vitest';
import { getAdjacentSlug, getReadyTopics } from './sig.navigation';
import { SIG_TOPICS } from './sig.manifest';

describe('getAdjacentSlug', () => {
  it('walks fourteen ready topics including 12–14', () => {
    expect(getReadyTopics(SIG_TOPICS)).toHaveLength(14);
    expect(getAdjacentSlug('riesgos-calidad', 'next')).toBe('control-operacional');
    expect(getAdjacentSlug('control-operacional', 'next')).toBe('seguimiento-medicion');
    expect(getAdjacentSlug('seguimiento-medicion', 'next')).toBe('emergencias');
    expect(getAdjacentSlug('emergencias', 'next')).toBeNull();
    expect(getAdjacentSlug('emergencias', 'prev')).toBe('seguimiento-medicion');
    expect(getAdjacentSlug('control-operacional', 'prev')).toBe('riesgos-calidad');
  });
});
