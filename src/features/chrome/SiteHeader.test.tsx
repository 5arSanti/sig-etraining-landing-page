import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { SiteHeader } from './SiteHeader';

describe('SiteHeader', () => {
  it('exposes the three nav destinations', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));
    const mobileNav = screen.getByRole('navigation', { name: 'Principal móvil' });

    expect(within(mobileNav).getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(within(mobileNav).getByRole('link', { name: 'Nosotros' })).toHaveAttribute(
      'href',
      '/nosotros',
    );
    expect(
      within(mobileNav).getByRole('link', { name: 'Sistema Integrado de Gestión' }),
    ).toHaveAttribute('href', '/sig');
    expect(within(mobileNav).queryByRole('link', { name: 'Contacto' })).not.toBeInTheDocument();
  });
});
