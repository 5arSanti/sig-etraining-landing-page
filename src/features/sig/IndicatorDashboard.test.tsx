import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { SIG_INDICATORS } from '@/content/sig.indicators';
import { IndicatorDashboard } from './IndicatorDashboard';

describe('IndicatorDashboard', () => {
  it('introduces the chart, opens on Ambiental, and reaches I1 from Información', async () => {
    const user = userEvent.setup();
    render(<IndicatorDashboard />);
    expect(SIG_INDICATORS).toHaveLength(12);
    expect(screen.getByRole('heading', { name: /cómo leer estas gráficas/i })).toBeInTheDocument();
    expect(screen.getByText(/línea base de septiembre/i)).toBeInTheDocument();
    expect(screen.getByText(/4 de 12 cumplen meta/i)).toBeInTheDocument();
    expect(screen.getByText(/Respaldos incompletos/i)).toBeInTheDocument();
    const table = screen.getByRole('table', { name: /indicadores del componente/i });
    expect(within(table).getByText('A1')).toBeInTheDocument();
    expect(screen.getByText('Consumo de energía')).toBeInTheDocument();
    expect(within(table).queryByText('I1')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Información' }));
    expect(within(screen.getByRole('table', { name: /indicadores del componente/i })).getByText('I1')).toBeInTheDocument();
  });
});
