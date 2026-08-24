import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { SIG_TOPICS } from '@/content/sig.manifest';
import { SigLobbyPage } from './SigLobbyPage';

describe('SigLobbyPage', () => {
  it('renders seven ready topic cards without construction labels', () => {
    render(
      <MemoryRouter>
        <SigLobbyPage />
      </MemoryRouter>,
    );

    for (const topic of SIG_TOPICS) {
      expect(screen.getByText(topic.title)).toBeInTheDocument();
    }
    expect(screen.queryByText('Contenido en construcción')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Entradas y salidas/i })).toHaveAttribute(
      'href',
      '/sig/entradas-salidas',
    );
    expect(screen.getByRole('link', { name: /Política del SIG/i })).toHaveAttribute(
      'href',
      '/sig/politica-sig',
    );
  });
});
