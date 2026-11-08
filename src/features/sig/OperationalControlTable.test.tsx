import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OPERATIONAL_CONTROLS } from '@/content/sig.controls';
import { OperationalControlTable } from './OperationalControlTable';

describe('OperationalControlTable', () => {
  it('groups fifteen controls into five processes and shows LOTO', () => {
    render(<OperationalControlTable rows={OPERATIONAL_CONTROLS} />);
    expect(OPERATIONAL_CONTROLS).toHaveLength(15);
    expect(screen.getByText(/Desarrollo de software a la medida/)).toBeInTheDocument();
    expect(screen.getByText(/LOTO/)).toBeInTheDocument();
    expect(screen.getByText(/pausas activas/i)).toBeInTheDocument();
  });
});
