import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as XLSX from 'xlsx';
import { SpreadsheetViewer } from './SpreadsheetViewer';

describe('SpreadsheetViewer', () => {
  it('renders sheet rows and a download link', async () => {
    const originalFetch = global.fetch;
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      book,
      XLSX.utils.aoa_to_sheet([
        ['Actividad', 'Riesgo', 'Control'],
        ['Revisión por fase', 'Revisión superficial', 'Checklist único'],
      ]),
      'Hoja1',
    );
    const buffer = XLSX.write(book, { type: 'array', bookType: 'xlsx' }) as ArrayBuffer;
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        arrayBuffer: () => Promise.resolve(buffer),
      } as Response),
    );

    render(
      <SpreadsheetViewer
        src="/sig/riesgos-calidad/11-riesgos-calidad.xlsx"
        downloadHref="/sig/riesgos-calidad/11-riesgos-calidad.xlsx"
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Checklist único')).toBeInTheDocument();
    });
    expect(screen.queryByText('Leyenda RACI')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /descargar/i })).toHaveAttribute(
      'href',
      '/sig/riesgos-calidad/11-riesgos-calidad.xlsx',
    );
    global.fetch = originalFetch;
  });

  it('shows error and download when fetch fails', async () => {
    const originalFetch = global.fetch;
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));
    render(
      <SpreadsheetViewer
        src="/sig/riesgos-calidad/11-riesgos-calidad.xlsx"
        downloadHref="/sig/riesgos-calidad/11-riesgos-calidad.xlsx"
      />,
    );
    await waitFor(() => {
      expect(screen.getByText('No se pudo leer el Excel.')).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: /descargar/i })).toBeInTheDocument();
    global.fetch = originalFetch;
  });
});
