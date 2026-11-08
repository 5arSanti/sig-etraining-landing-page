import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { SIG_TOPICS } from '@/content/sig.manifest';
import { SigLobbyPage } from './SigLobbyPage';

describe('SigLobbyPage', () => {
  it('renders fourteen ready cards, the audit map, and no construction labels', () => {
    render(
      <MemoryRouter>
        <SigLobbyPage />
      </MemoryRouter>,
    );

    for (const topic of SIG_TOPICS) {
      expect(screen.getByText(topic.title)).toBeInTheDocument();
    }
    expect(screen.queryByText('Contenido en construcción')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Qué ver en auditoría/i })).toBeInTheDocument();
    expect(screen.getByText(/no son una certificación/i)).toBeInTheDocument();
    expect(screen.getByText(/9\.2/)).toBeInTheDocument();
    const controlLinks = screen.getAllByRole('link', { name: /8\.1 Control operacional/i });
    expect(controlLinks[0]).toHaveAttribute('href', '/sig/control-operacional');
    expect(screen.getAllByRole('link', { name: /8\.2 Emergencias/i })[0]).toHaveAttribute(
      'href',
      '/sig/emergencias',
    );
  });
});
