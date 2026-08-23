import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PdfViewer } from './PdfViewer';

describe('PdfViewer', () => {
  it('opens a fullscreen lightbox for the PDF', () => {
    render(
      <PdfViewer
        src="/sig/pestel/2-pestel.pdf"
        title="Contexto PESTEL"
        downloadHref="/sig/pestel/2-pestel.pdf"
      />,
    );

    expect(screen.getAllByTitle('Contexto PESTEL')).toHaveLength(1);

    fireEvent.click(screen.getByRole('button', { name: 'Ver a detalle' }));

    expect(screen.getByRole('dialog', { name: 'Contexto PESTEL' })).toBeInTheDocument();
    expect(screen.getAllByTitle('Contexto PESTEL')).toHaveLength(2);

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }));

    expect(screen.queryByRole('dialog', { name: 'Contexto PESTEL' })).not.toBeInTheDocument();
    expect(screen.getAllByTitle('Contexto PESTEL')).toHaveLength(1);
  });
});
