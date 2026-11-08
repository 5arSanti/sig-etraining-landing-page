import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { EmergencyBoard } from './EmergencyBoard';

describe('EmergencyBoard', () => {
  it('starts on Terremoto and switches processes for tormenta', async () => {
    const user = userEvent.setup();
    render(<EmergencyBoard />);
    expect(screen.getByRole('heading', { name: /Terremoto/i })).toBeInTheDocument();
    expect(screen.getByText(/rutas de evacuación/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Tormenta eléctrica/i }));
    expect(screen.getByText('Gestión documental y de datos')).toBeInTheDocument();
    expect(screen.queryByText('Convocatoria y matrícula')).not.toBeInTheDocument();
  });
});
