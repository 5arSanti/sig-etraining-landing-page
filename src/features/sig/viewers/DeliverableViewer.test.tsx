import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { SigTopic } from '@/content/sig.manifest';
import { DeliverableViewer } from './DeliverableViewer';

function topic(partial: Partial<SigTopic> & Pick<SigTopic, 'kind' | 'title'>): SigTopic {
  return {
    slug: 'pestel',
    number: 2,
    summary: '',
    body: '',
    files: ['/sig/pestel/2-pestel.pdf'],
    ...partial,
  };
}

describe('DeliverableViewer', () => {
  it('embeds a titled PDF with a download link', () => {
    render(<DeliverableViewer topic={topic({ kind: 'pdf', title: 'PESTEL y alcance SIG' })} />);
    const frame = screen.getByTitle('PESTEL y alcance SIG');
    expect(frame.tagName).toBe('IFRAME');
    expect(screen.getByRole('link', { name: /descargar/i })).toHaveAttribute(
      'href',
      '/sig/pestel/2-pestel.pdf',
    );
  });

  it('shows the source image for an image topic', () => {
    render(
      <DeliverableViewer
        topic={topic({
          kind: 'image',
          title: 'Entradas y salidas (SIPOC)',
          slug: 'entradas-salidas',
          files: ['/sig/entradas-salidas/1-entradas-salidas.jpg'],
        })}
      />,
    );
    expect(screen.getByRole('img', { name: /SIPOC/i })).toHaveAttribute(
      'src',
      '/sig/entradas-salidas/1-entradas-salidas.jpg',
    );
  });

  it('shows the construction empty state for placeholders', () => {
    render(
      <DeliverableViewer
        topic={topic({ kind: 'placeholder', title: 'Tema futuro', files: [] })}
      />,
    );
    expect(screen.getByText('Este tema se publicará aquí.')).toBeInTheDocument();
    expect(screen.getByText('Contenido en construcción')).toBeInTheDocument();
  });

  it('renders the política text document without a download link', () => {
    render(
      <DeliverableViewer
        topic={topic({
          kind: 'text',
          title: 'Política del SIG',
          slug: 'politica-sig',
          files: [],
          textContent:
            'En Etraining SAS nos comprometemos a satisfacer los requisitos y expectativas de nuestros clientes.',
        })}
      />,
    );

    expect(
      screen.getByText(/En Etraining SAS nos comprometemos a satisfacer/i),
    ).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /descargar/i })).not.toBeInTheDocument();
  });

  it('shows error and download link when xlsx fails to load', async () => {
    const originalFetch = global.fetch;
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    render(
      <DeliverableViewer
        topic={topic({
          kind: 'xlsx',
          title: 'Matriz RACI',
          files: ['/sig/raci/matriz.xlsx'],
        })}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('No se pudo leer el Excel.')).toBeInTheDocument();
    });

    expect(screen.getByRole('link', { name: /descargar/i })).toHaveAttribute(
      'href',
      '/sig/raci/matriz.xlsx',
    );

    global.fetch = originalFetch;
  });
});
