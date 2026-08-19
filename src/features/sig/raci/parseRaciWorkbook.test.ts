import { describe, expect, it } from 'vitest';
import * as XLSX from 'xlsx';
import { classifyRaciCell, parseRaciWorkbook } from './parseRaciWorkbook';

describe('classifyRaciCell', () => {
  it('maps R A C I and ignores other text', () => {
    expect(classifyRaciCell('R')).toBe('R');
    expect(classifyRaciCell('a')).toBe('A');
    expect(classifyRaciCell('Consultado')).toBeNull();
    expect(classifyRaciCell('')).toBeNull();
  });
});

describe('parseRaciWorkbook', () => {
  it('reads each sheet as a grid of strings', () => {
    const book = XLSX.utils.book_new();
    const sheet = XLSX.utils.aoa_to_sheet([
      ['Actividad', 'Lider SIG'],
      ['Definir objetivos', 'A'],
    ]);
    XLSX.utils.book_append_sheet(book, sheet, 'Matriz');
    const buffer = XLSX.write(book, { type: 'array', bookType: 'xlsx' }) as ArrayBuffer;
    const sheets = parseRaciWorkbook(buffer);
    expect(sheets).toHaveLength(1);
    expect(sheets[0]?.name).toBe('Matriz');
    expect(sheets[0]?.rows[1]?.[1]).toBe('A');
  });
});
