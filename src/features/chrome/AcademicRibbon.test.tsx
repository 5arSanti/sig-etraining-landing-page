import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { TEAM } from '@/content/team';
import { AcademicRibbon } from './AcademicRibbon';

describe('AcademicRibbon', () => {
  it('states this is a Grupo 2 SIG presentation and names the team', () => {
    render(
      <MemoryRouter>
        <AcademicRibbon />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Presentación SIG/i)).toBeInTheDocument();
    expect(screen.getByText(/Grupo 2/i)).toBeInTheDocument();
    for (const member of TEAM) {
      expect(screen.getByText(new RegExp(member.name))).toBeInTheDocument();
    }
  });
});
