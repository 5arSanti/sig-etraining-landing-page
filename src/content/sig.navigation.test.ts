import { describe, expect, it } from 'vitest';
import { getAdjacentSlug, getReadyTopics } from './sig.navigation';
import { SIG_TOPICS } from './sig.manifest';

describe('getAdjacentSlug', () => {
  it('walks eleven ready topics and skips placeholders', () => {
    expect(getReadyTopics(SIG_TOPICS)).toHaveLength(11);
    expect(getAdjacentSlug('entradas-salidas', 'prev')).toBeNull();
    expect(getAdjacentSlug('matriz-raci', 'next')).toBe('politica-sig');
    expect(getAdjacentSlug('politica-sig', 'next')).toBe('infografia');
    expect(getAdjacentSlug('infografia', 'next')).toBe('aspectos-impactos');
    expect(getAdjacentSlug('aspectos-impactos', 'next')).toBe('matriz-vpir');
    expect(getAdjacentSlug('matriz-vpir', 'next')).toBe('riesgos-seguridad-informacion');
    expect(getAdjacentSlug('riesgos-seguridad-informacion', 'next')).toBe('riesgos-calidad');
    expect(getAdjacentSlug('riesgos-calidad', 'next')).toBeNull();
    expect(getAdjacentSlug('riesgos-calidad', 'prev')).toBe('riesgos-seguridad-informacion');
    expect(getAdjacentSlug('control-operacional', 'prev')).toBe('riesgos-calidad');
    expect(getAdjacentSlug('seguimiento-medicion', 'prev')).toBe('riesgos-calidad');
    expect(getAdjacentSlug('emergencias', 'prev')).toBe('riesgos-calidad');
    expect(getAdjacentSlug('emergencias', 'next')).toBeNull();
  });
});
