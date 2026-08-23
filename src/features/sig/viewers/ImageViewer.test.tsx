import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ImageViewer } from './ImageViewer';

describe('ImageViewer', () => {
  it('opens a centered lightbox with zoom and closes on Escape', () => {
    render(
      <ImageViewer
        src="/sig/example.jpg"
        alt="Example diagram"
        downloadHref="/sig/example.jpg"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Ver a detalle' }));
    expect(screen.getByRole('dialog', { name: 'Example diagram' })).toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: 'Example diagram' })).toHaveLength(2);

    fireEvent.click(screen.getByRole('button', { name: 'Aumentar zoom' }));
    expect(screen.getByText('125%')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByRole('dialog', { name: 'Example diagram' })).not.toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: 'Example diagram' })).toHaveLength(1);
  });
});
