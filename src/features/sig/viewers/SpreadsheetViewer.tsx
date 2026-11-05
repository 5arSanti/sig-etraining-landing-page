import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { DownloadLink } from './DownloadLink';

interface SpreadsheetViewerProps {
  src: string;
  downloadHref: string;
}

type SheetTable = {
  name: string;
  rows: string[][];
};

type ViewerState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; sheets: SheetTable[]; active: number };

function cellText(value: unknown): string {
  if (value == null) return '';
  return String(value);
}

function parseWorkbook(buffer: ArrayBuffer): SheetTable[] {
  const book = XLSX.read(buffer, { type: 'array' });
  return book.SheetNames.map((name) => {
    const sheet = book.Sheets[name];
    const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet ?? {}, {
      header: 1,
      defval: '',
      raw: false,
    });
    return {
      name,
      rows: rows.map((row) => (Array.isArray(row) ? row.map(cellText) : [])),
    };
  }).filter((sheet) => sheet.rows.some((row) => row.some((cell) => cell.trim() !== '')));
}

export function SpreadsheetViewer({ src, downloadHref }: SpreadsheetViewerProps) {
  const [state, setState] = useState<ViewerState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });

    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.arrayBuffer();
      })
      .then((buffer) => {
        if (cancelled) return;
        setState({ status: 'ready', sheets: parseWorkbook(buffer), active: 0 });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (state.status === 'loading') {
    return (
      <div className="flex items-center justify-center rounded-lg bg-white p-8 shadow-sm">
        <p className="text-brand-charcoal">Cargando hoja…</p>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="space-y-4">
        <div className="rounded-lg bg-red-50 p-4 text-red-800">
          <p>No se pudo leer el Excel.</p>
        </div>
        <DownloadLink href={downloadHref} />
      </div>
    );
  }

  const sheet = state.sheets[state.active];

  return (
    <div className="space-y-4">
      {state.sheets.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {state.sheets.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setState({ ...state, active: index })}
              className={`rounded-[var(--radius-pill)] px-3 py-1.5 text-sm font-semibold ${
                index === state.active
                  ? 'bg-brand-plum text-white'
                  : 'bg-white text-brand-plum ring-1 ring-brand-plum/20'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      ) : null}
      <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="min-w-full text-left text-sm text-brand-plum-ink">
          <tbody>
            {(sheet?.rows ?? []).map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-brand-plum/10">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-3 py-2 ${rowIndex === 0 ? 'font-semibold text-brand-plum' : ''}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DownloadLink href={downloadHref} />
    </div>
  );
}
