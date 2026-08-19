import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { NosotrosPage } from './NosotrosPage';

describe('NosotrosPage', () => {
  it('states mission, purpose, and house brands', () => {
    render(
      <MemoryRouter>
        <NosotrosPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Misión')).toBeInTheDocument();
    expect(screen.getByText(/Emotions, Enventors, Enséñame/)).toBeInTheDocument();
    expect(screen.getByText(/más de 22 años/)).toBeInTheDocument();
  });
});
