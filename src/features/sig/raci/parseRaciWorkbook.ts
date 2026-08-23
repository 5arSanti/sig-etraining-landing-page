import * as XLSX from 'xlsx';

export type RaciLetter = 'R' | 'A' | 'C' | 'I';

export type RaciMatrixRow =
  | { kind: 'section'; label: string }
  | {
      kind: 'activity';
      priority: string;
      status: string;
      activity: string;
      assignments: string[];
    };

export type RaciMatrix = {
  title: string;
  roleHeaders: string[];
  groupHeaders: string[];
  rows: RaciMatrixRow[];
};

export type RolesRow = {
  person: string;
  role: string;
  processes: string;
  responsibilities: string;
};

export type RolesTable = {
  headers: string[];
  rows: RolesRow[];
};

export type ParsedRaciWorkbook = {
  matrix: RaciMatrix | null;
  roles: RolesTable | null;
};

const RACI_COL_START = 3;
const RACI_COL_COUNT = 6;

export function classifyRaciCell(value: string): RaciLetter | null {
  const normalized = value.trim().toUpperCase();
  if (normalized === 'R' || normalized === 'A' || normalized === 'C' || normalized === 'I') {
    return normalized;
  }
  return null;
}

function normalizeCell(value: unknown): string {
  return String(value ?? '')
    .replace(/\r\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function trimRows(rows: unknown[][]): string[][] {
  let maxCol = 0;
  const normalized = rows.map((row) => {
    const cells = row.map(normalizeCell);
    for (let i = cells.length - 1; i >= 0; i -= 1) {
      if (cells[i]) {
        maxCol = Math.max(maxCol, i + 1);
        break;
      }
    }
    return cells;
  });

  return normalized.map((row) => row.slice(0, maxCol));
}

function fillGroupHeaders(raw: string[]): string[] {
  const groups: string[] = [];
  let current = '';
  for (let i = 0; i < RACI_COL_COUNT; i += 1) {
    const value = raw[i] ?? '';
    if (value) {
      current = value;
    }
    groups.push(current);
  }
  return groups;
}

export function parseMatrixSheet(rows: string[][]): RaciMatrix | null {
  if (rows.length < 4) {
    return null;
  }

  const title = rows[0]?.[0] ?? 'Matriz RACI';
  const roleHeaders = rows[1]?.slice(RACI_COL_START, RACI_COL_START + RACI_COL_COUNT) ?? [];
  const groupHeaders = fillGroupHeaders(
    rows[2]?.slice(RACI_COL_START, RACI_COL_START + RACI_COL_COUNT) ?? [],
  );

  const parsedRows: RaciMatrixRow[] = [];

  for (let i = 3; i < rows.length; i += 1) {
    const row = rows[i];
    const priority = row[0] ?? '';
    const status = row[1] ?? '';
    const activity = row[2] ?? '';
    const assignments = row.slice(RACI_COL_START, RACI_COL_START + RACI_COL_COUNT);

    if (!priority && !status && !activity && assignments.every((cell) => !cell)) {
      continue;
    }

    const hasAssignment = assignments.some((cell) => classifyRaciCell(cell));
    const isSection = !priority && !status && activity && !hasAssignment;

    if (isSection) {
      parsedRows.push({ kind: 'section', label: activity });
      continue;
    }

    if (!activity && !hasAssignment) {
      continue;
    }

    parsedRows.push({
      kind: 'activity',
      priority,
      status,
      activity,
      assignments,
    });
  }

  return {
    title,
    roleHeaders,
    groupHeaders,
    rows: parsedRows,
  };
}

export function parseRolesSheet(rows: string[][]): RolesTable | null {
  const dataRows = rows.filter((row) => row.some((cell) => cell.trim()));
  if (dataRows.length < 2) {
    return null;
  }

  const [headerRow, ...bodyRows] = dataRows;
  const headers = headerRow.slice(0, 4);
  const roleRows: RolesRow[] = bodyRows
    .map((row) => ({
      person: row[0] ?? '',
      role: row[1] ?? '',
      processes: row[2] ?? '',
      responsibilities: row[3] ?? '',
    }))
    .filter((row) => row.person && row.role);

  if (roleRows.length === 0) {
    return null;
  }

  return { headers, rows: roleRows };
}

export function parseRaciWorkbook(data: ArrayBuffer | Uint8Array): ParsedRaciWorkbook {
  const book = XLSX.read(data, { type: 'array' });
  let matrix: RaciMatrix | null = null;
  let roles: RolesTable | null = null;

  for (const name of book.SheetNames) {
    const sheet = book.Sheets[name];
    const rawRows = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
      header: 1,
      raw: false,
      defval: '',
    });
    const rows = trimRows(rawRows);
    const lower = name.toLowerCase();

    if (lower.includes('matriz') && !matrix) {
      matrix = parseMatrixSheet(rows);
    } else if (lower.includes('roles') && !roles) {
      roles = parseRolesSheet(rows);
    }
  }

  return { matrix, roles };
}

/** @deprecated Use ParsedRaciWorkbook; kept for transitional imports. */
export type RaciSheet = { name: string; rows: string[][] };
