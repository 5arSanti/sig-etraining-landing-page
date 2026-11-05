import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { SIG_TOPICS } from '@/content/sig.manifest';
import { SigLobbyPage } from './SigLobbyPage';

describe('SigLobbyPage', () => {
  it('renders fourteen topic cards and three construction labels', () => {
    render(
      <MemoryRouter>
        <SigLobbyPage />
      </MemoryRouter>,
    );

    for (const topic of SIG_TOPICS) {
      expect(screen.getByText(topic.title)).toBeInTheDocument();
    }
    expect(screen.getAllByText('Contenido en construcción')).toHaveLength(3);
    expect(screen.getByText('ISO 14001')).toBeInTheDocument();
    expect(screen.getByText('ISO 45001')).toBeInTheDocument();
    expect(screen.getByText('ISO 27001')).toBeInTheDocument();
    expect(screen.getByText('ISO 9001')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Control operacional/i })).toHaveAttribute(
      'href',
      '/sig/control-operacional',
    );
  });
});
