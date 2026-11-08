import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Layout } from '@/app/Layout';
import { SigLobbyPage } from './SigLobbyPage';
import { SigRoomPage } from './SigRoomPage';

function renderRoom(path: string) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <Layout />,
        children: [
          { path: 'sig', element: <SigLobbyPage /> },
          { path: 'sig/:slug', element: <SigRoomPage /> },
        ],
      },
    ],
    { initialEntries: [path] },
  );
  return render(<RouterProvider router={router} />);
}

describe('SigRoomPage', () => {
  it('shows explanation, SIPOC table, and image for entradas-salidas', () => {
    renderRoom('/sig/entradas-salidas');
    expect(screen.getByRole('heading', { name: /Entradas y salidas/i })).toBeInTheDocument();
    expect(screen.getByText('Emotions')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Entradas y salidas/i })).toBeInTheDocument();
  });

  it('returns a SIG 404 for unknown slugs', () => {
    renderRoom('/sig/no-existe');
    expect(screen.getByText(/no encontramos este tema/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /volver al SIG/i })).toHaveAttribute('href', '/sig');
  });

  it('shows the control table and a spreadsheet download in control operacional', async () => {
    renderRoom('/sig/control-operacional');
    expect(screen.getByText(/LOTO/)).toBeInTheDocument();
    expect(await screen.findByRole('link', { name: /descargar/i })).toHaveAttribute(
      'href',
      '/sig/control-operacional/12-control-operacional.xlsx',
    );
  });

  it('shows the indicator summary and the seguimiento PDF', () => {
    renderRoom('/sig/seguimiento-medicion');
    expect(screen.getByText(/4 de 12 cumplen meta/i)).toBeInTheDocument();
    expect(screen.getByTitle('Seguimiento y medición')).toBeInTheDocument();
  });

  it('goes to the next ready topic with ArrowRight', async () => {
    const user = userEvent.setup();
    renderRoom('/sig/entradas-salidas');
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('heading', { name: /PESTEL/i })).toBeInTheDocument();
  });
});
