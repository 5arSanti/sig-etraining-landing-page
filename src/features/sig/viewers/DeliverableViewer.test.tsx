import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
        topic={topic({ kind: 'placeholder', title: 'Política SIG', files: [] })}
      />,
    );
    expect(screen.getByText('Este tema se publicará aquí.')).toBeInTheDocument();
    expect(screen.getByText('Contenido en construcción')).toBeInTheDocument();
  });
});
