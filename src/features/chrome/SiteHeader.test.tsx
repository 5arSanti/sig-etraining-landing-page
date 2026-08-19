import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { SiteHeader } from './SiteHeader';

describe('SiteHeader', () => {
  it('exposes the four nav destinations', () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Nosotros' })).toHaveAttribute('href', '/nosotros');
    expect(
      screen.getByRole('link', { name: 'Sistema Integrado de Gestión' }),
    ).toHaveAttribute('href', '/sig');
    expect(screen.getByRole('link', { name: 'Contacto' })).toHaveAttribute('href', '/#contacto');
  });
});
