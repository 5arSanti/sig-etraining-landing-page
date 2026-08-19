import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { SIG_TOPICS } from '@/content/sig.manifest';
import { SigLobbyPage } from './SigLobbyPage';

describe('SigLobbyPage', () => {
  it('renders seven topic cards and marks placeholders as under construction', () => {
    render(
      <MemoryRouter>
        <SigLobbyPage />
      </MemoryRouter>,
    );

    for (const topic of SIG_TOPICS) {
      expect(screen.getByText(topic.title)).toBeInTheDocument();
    }
    expect(screen.getAllByText('Contenido en construcción')).toHaveLength(2);
    expect(screen.getByRole('link', { name: /Entradas y salidas/i })).toHaveAttribute(
      'href',
      '/sig/entradas-salidas',
    );
  });
});
