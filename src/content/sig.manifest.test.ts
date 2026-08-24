import { describe, expect, it } from 'vitest';
import { SIG_LOBBY_INTRO, SIG_TOPICS } from './sig.manifest';

describe('SIG_TOPICS', () => {
  it('lists seven ready topics with política as text and no placeholders', () => {
    expect(SIG_TOPICS).toHaveLength(7);
    expect(SIG_TOPICS.map((topic) => topic.slug)).toEqual([
      'entradas-salidas',
      'pestel',
      'matriz-interesados',
      'mapa-de-procesos',
      'matriz-raci',
      'politica-sig',
      'infografia',
    ]);
    expect(SIG_TOPICS.filter((topic) => topic.kind === 'placeholder')).toHaveLength(0);
    expect(SIG_TOPICS.filter((topic) => topic.kind !== 'placeholder')).toHaveLength(7);
    expect(SIG_TOPICS[0]?.kind).toBe('image');
    expect(SIG_TOPICS[0]?.sipocRows).toHaveLength(3);
    expect(SIG_TOPICS[1]?.kind).toBe('pdf');
    expect(SIG_TOPICS[4]?.kind).toBe('xlsx');
    expect(SIG_TOPICS[5]?.kind).toBe('text');
    expect(SIG_TOPICS[5]?.textContent).toContain('Etraining SAS');
    expect(SIG_TOPICS[6]?.kind).toBe('image');
  });
});

describe('SIG_LOBBY_INTRO', () => {
  it('has meaningful content', () => {
    expect(SIG_LOBBY_INTRO.length).toBeGreaterThan(40);
    expect(SIG_LOBBY_INTRO).toContain('SIG');
  });
});
