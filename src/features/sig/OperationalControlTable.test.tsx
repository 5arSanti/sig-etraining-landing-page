import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { OPERATIONAL_CONTROLS } from '@/content/sig.controls';
import { OperationalControlTable } from './OperationalControlTable';

describe('OperationalControlTable', () => {
  it('shows one process at a time and reveals LOTO on infrastructure', async () => {
    const user = userEvent.setup();
    render(<OperationalControlTable rows={OPERATIONAL_CONTROLS} />);
    expect(OPERATIONAL_CONTROLS).toHaveLength(15);
    expect(screen.getByRole('heading', { name: /Desarrollo de software a la medida/ })).toBeInTheDocument();
    expect(screen.queryByText(/LOTO/)).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /infraestructura tecnológica/i }));
    expect(screen.getByText(/LOTO/)).toBeInTheDocument();
    expect(screen.queryByText(/pausas activas/i)).not.toBeInTheDocument();
  });
});
