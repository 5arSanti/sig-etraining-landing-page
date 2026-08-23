import { useEffect, useState } from 'react';
import { parseRaciWorkbook, type ParsedRaciWorkbook } from '../raci/parseRaciWorkbook';
import { RaciGrid } from '../raci/RaciGrid';
import { DownloadLink } from './DownloadLink';

interface XlsxViewerProps {
  src: string;
  downloadHref: string;
}

type ViewerState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; workbook: ParsedRaciWorkbook };

export function XlsxViewer({ src, downloadHref }: XlsxViewerProps) {
  const [state, setState] = useState<ViewerState>({ status: 'loading' });

  useEffect(() => {
    setState({ status: 'loading' });

    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.arrayBuffer();
      })
      .then((buffer) => {
        const workbook = parseRaciWorkbook(buffer);
        setState({ status: 'ready', workbook });
      })
      .catch(() => {
        setState({ status: 'error' });
      });
  }, [src]);

  if (state.status === 'loading') {
    return (
      <div className="flex items-center justify-center rounded-lg bg-white p-8 shadow-sm">
        <p className="text-brand-charcoal">Cargando matriz…</p>
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

  return (
    <div className="space-y-4">
      <RaciGrid workbook={state.workbook} />
      <DownloadLink href={downloadHref} />
    </div>
  );
}
