import { describe, expect, it } from 'vitest';
import { SIG_LOBBY_INTRO, SIG_TOPICS } from './sig.manifest';

describe('SIG_TOPICS', () => {
  it('lists fourteen ready topics and no placeholders', () => {
    expect(SIG_TOPICS).toHaveLength(14);
    expect(SIG_TOPICS.filter((topic) => topic.kind === 'placeholder')).toHaveLength(0);
    expect(SIG_TOPICS.filter((topic) => topic.kind !== 'placeholder')).toHaveLength(14);
    expect(SIG_TOPICS[11]?.kind).toBe('spreadsheet');
    expect(SIG_TOPICS[11]?.files).toEqual(['/sig/control-operacional/12-control-operacional.xlsx']);
    expect(SIG_TOPICS[12]?.kind).toBe('pdf');
    expect(SIG_TOPICS[12]?.files).toEqual([
      '/sig/seguimiento-medicion/13-informe-seguimiento-medicion.pdf',
    ]);
    expect(SIG_TOPICS[13]?.kind).toBe('image');
    expect(SIG_TOPICS[13]?.isoTag).toBe('14001 / 45001 / 27001');
    expect(SIG_TOPICS[13]?.files).toEqual([
      '/sig/emergencias/14-impacto-riesgo.png',
      '/sig/emergencias/14-matriz-desastres.xlsx',
    ]);
  });
});

describe('SIG_LOBBY_INTRO', () => {
  it('has meaningful content', () => {
    expect(SIG_LOBBY_INTRO.length).toBeGreaterThan(40);
    expect(SIG_LOBBY_INTRO).toContain('SIG');
  });
});
