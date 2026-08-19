import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('shows academic chrome on home', () => {
    render(<App />);
    const matches = screen.getAllByText(/Presentación SIG/i);
    expect(matches.length).toBeGreaterThan(0);
  });
});
