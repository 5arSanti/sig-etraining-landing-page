import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { businessLines, successCases } from '@/content/company';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('renders tenure, five lines, eight cases, and a mailto contact block', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByText('22 años')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver el SIG' })).toHaveAttribute('href', '/sig');
    for (const line of businessLines) {
      expect(screen.getByText(line.title)).toBeInTheDocument();
    }
    expect(successCases).toHaveLength(8);
    for (const item of successCases) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    }
    const mail = screen.getByRole('link', { name: 'comunicaciones@etraining.edu.co' });
    expect(mail).toHaveAttribute('href', 'mailto:comunicaciones@etraining.edu.co');
    expect(document.getElementById('contacto')).not.toBeNull();
  });
});
