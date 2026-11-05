import { describe, expect, it } from 'vitest';
import { SIG_LOBBY_INTRO, SIG_TOPICS } from './sig.manifest';

describe('SIG_TOPICS', () => {
  it('lists fourteen topics with eleven ready and three placeholders', () => {
    expect(SIG_TOPICS).toHaveLength(14);
    expect(SIG_TOPICS.map((topic) => topic.slug)).toEqual([
      'entradas-salidas',
      'pestel',
      'matriz-interesados',
      'mapa-de-procesos',
      'matriz-raci',
      'politica-sig',
      'infografia',
      'aspectos-impactos',
      'matriz-vpir',
      'riesgos-seguridad-informacion',
      'riesgos-calidad',
      'control-operacional',
      'seguimiento-medicion',
      'emergencias',
    ]);
    expect(SIG_TOPICS.filter((topic) => topic.kind === 'placeholder')).toHaveLength(3);
    expect(SIG_TOPICS.filter((topic) => topic.kind !== 'placeholder')).toHaveLength(11);
    expect(SIG_TOPICS[7]?.kind).toBe('pdf');
    expect(SIG_TOPICS[7]?.isoTag).toBe('ISO 14001');
    expect(SIG_TOPICS[10]?.kind).toBe('spreadsheet');
    expect(SIG_TOPICS[10]?.isoTag).toBe('ISO 9001');
    expect(SIG_TOPICS[11]?.owner).toBe('Rebeca');
    expect(SIG_TOPICS[12]?.owner).toBe('Dana, Mayra y Thomas');
    expect(SIG_TOPICS[13]?.owner).toBe('Nicolás');
  });
});

describe('SIG_LOBBY_INTRO', () => {
  it('has meaningful content', () => {
    expect(SIG_LOBBY_INTRO.length).toBeGreaterThan(40);
    expect(SIG_LOBBY_INTRO).toContain('SIG');
  });
});
