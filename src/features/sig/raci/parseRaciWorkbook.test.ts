import { describe, expect, it } from 'vitest';
import * as XLSX from 'xlsx';
import { readFileSync } from 'node:fs';
import {
  classifyRaciCell,
  parseMatrixSheet,
  parseRaciWorkbook,
  parseRolesSheet,
} from './parseRaciWorkbook';

describe('classifyRaciCell', () => {
  it('maps R A C I and ignores other text', () => {
    expect(classifyRaciCell('R')).toBe('R');
    expect(classifyRaciCell('a')).toBe('A');
    expect(classifyRaciCell('Consultado')).toBeNull();
    expect(classifyRaciCell('')).toBeNull();
  });
});

describe('parseRaciWorkbook', () => {
  it('reads matrix and roles sheets from the SIG workbook', () => {
    const buffer = readFileSync('public/sig/matriz-raci/5-matriz-raci.xlsx');
    const workbook = parseRaciWorkbook(Uint8Array.from(buffer));

    expect(workbook.matrix?.title).toContain('E-TRAINING');
    expect(workbook.matrix?.roleHeaders).toHaveLength(6);
    expect(workbook.matrix?.rows.some((row) => row.kind === 'section')).toBe(true);
    expect(workbook.matrix?.rows.some((row) => row.kind === 'activity')).toBe(true);
    expect(workbook.roles?.rows.length).toBeGreaterThanOrEqual(6);
  });

  it('reads a minimal synthetic workbook', () => {
    const book = XLSX.utils.book_new();
    const sheet = XLSX.utils.aoa_to_sheet([
      ['E-TRAINING'],
      ['', '', '', 'Líder SIG'],
      ['PRIORIDAD', 'ESTADO', 'ACTIVIDAD', 'Grupo'],
      ['Alta', 'Completo', 'Definir objetivos', 'A'],
    ]);
    XLSX.utils.book_append_sheet(book, sheet, 'Matriz RACI');
    const buffer = XLSX.write(book, { type: 'array', bookType: 'xlsx' }) as ArrayBuffer;
    const workbook = parseRaciWorkbook(buffer);
    expect(workbook.matrix?.rows.some((row) => row.kind === 'activity')).toBe(true);
  });
});

describe('parseMatrixSheet', () => {
  it('detects section headers without RACI assignments', () => {
    const matrix = parseMatrixSheet([
      ['E-TRAINING'],
      ['', '', '', 'Líder SIG'],
      ['PRIORIDAD', 'ESTADO', 'ACTIVIDAD', 'Grupo'],
      ['', '', 'Direccionamiento estratégico'],
      ['Alta', 'Completo', 'Definir objetivos', 'A'],
    ]);

    expect(matrix?.rows[0]).toEqual({ kind: 'section', label: 'Direccionamiento estratégico' });
    expect(matrix?.rows[1]).toMatchObject({
      kind: 'activity',
      activity: 'Definir objetivos',
      assignments: ['A'],
    });
  });
});

describe('parseRolesSheet', () => {
  it('maps people and roles', () => {
    const roles = parseRolesSheet([
      ['Persona', 'Rol asignado', 'Procesos', 'Responsabilidades'],
      ['Johel Arias', 'Líder SIG', 'Calidad', 'Coordinar SIG'],
    ]);

    expect(roles?.rows[0]).toEqual({
      person: 'Johel Arias',
      role: 'Líder SIG',
      processes: 'Calidad',
      responsibilities: 'Coordinar SIG',
    });
  });
});
