import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ImageViewer } from './ImageViewer';

describe('ImageViewer', () => {
  it('closes the enlarged dialog when Escape is pressed', () => {
    render(
      <ImageViewer
        src="/sig/example.jpg"
        alt="Example diagram"
        downloadHref="/sig/example.jpg"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Ver grande' }));
    expect(screen.getAllByRole('img', { name: 'Example diagram' })).toHaveLength(2);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.getAllByRole('img', { name: 'Example diagram' })).toHaveLength(1);
  });
});
