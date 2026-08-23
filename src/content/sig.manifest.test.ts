import { describe, expect, it } from 'vitest';
import { SIG_LOBBY_INTRO, SIG_TOPICS } from './sig.manifest';

describe('SIG_TOPICS', () => {
  it('lists seven topics with five ready and two placeholders', () => {
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
    expect(SIG_TOPICS.filter((topic) => topic.kind === 'placeholder')).toHaveLength(1);
    expect(SIG_TOPICS.filter((topic) => topic.kind !== 'placeholder')).toHaveLength(6);
    expect(SIG_TOPICS[0]?.kind).toBe('image');
    expect(SIG_TOPICS[0]?.sipocRows).toHaveLength(3);
    expect(SIG_TOPICS[1]?.kind).toBe('pdf');
    expect(SIG_TOPICS[4]?.kind).toBe('xlsx');
  });
});

describe('SIG_LOBBY_INTRO', () => {
  it('has meaningful content', () => {
    expect(SIG_LOBBY_INTRO.length).toBeGreaterThan(40);
    expect(SIG_LOBBY_INTRO).toContain('SIG');
  });
});
