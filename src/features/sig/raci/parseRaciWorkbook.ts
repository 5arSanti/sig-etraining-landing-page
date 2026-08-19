import * as XLSX from 'xlsx';

export type RaciLetter = 'R' | 'A' | 'C' | 'I';
export type RaciSheet = { name: string; rows: string[][] };

export function classifyRaciCell(value: string): RaciLetter | null {
  const normalized = value.trim().toUpperCase();
  if (normalized === 'R' || normalized === 'A' || normalized === 'C' || normalized === 'I') {
    return normalized;
  }
  return null;
}

export function parseRaciWorkbook(data: ArrayBuffer): RaciSheet[] {
  const book = XLSX.read(data, { type: 'array' });
  return book.SheetNames.map((name) => {
    const sheet = book.Sheets[name];
    const rows = XLSX.utils.sheet_to_json<string[]>(sheet, {
      header: 1,
      raw: false,
      defval: '',
    });
    return { name, rows };
  });
}
