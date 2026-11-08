import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { SIG_INDICATORS } from '@/content/sig.indicators';
import { IndicatorDashboard } from './IndicatorDashboard';

describe('IndicatorDashboard', () => {
  it('shows 4 of 12, A1, and hides I1 when Ambiental is selected', async () => {
    const user = userEvent.setup();
    render(<IndicatorDashboard />);
    expect(SIG_INDICATORS).toHaveLength(12);
    expect(screen.getByText(/4 de 12 cumplen meta/i)).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getByText('A1')).toBeInTheDocument();
    expect(screen.getByText('Consumo de energía')).toBeInTheDocument();
    expect(within(table).getByText('I1')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Ambiental' }));
    expect(within(screen.getByRole('table')).getByText('A1')).toBeInTheDocument();
    expect(screen.queryByText('I1')).not.toBeInTheDocument();
  });
});
