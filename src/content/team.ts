export type TeamMember = {
  name: string;
  role: string;
};

export const GROUP_LABEL = 'Grupo 2';

export const TEAM: readonly TeamMember[] = [
  { name: 'Johel Arias', role: 'Líder SIG y Calidad' },
  { name: 'Rebeca Pedrozo', role: 'Líder Comercial y Relaciones' },
  { name: 'Dana Urquijo', role: 'Líder Académico y Pedagógico' },
  { name: 'Mayra Salamanca', role: 'Líder Tecnología, LMS y Datos' },
  { name: 'Nicolás Daza', role: 'Líder Administrativo, Financiero y TH' },
  { name: 'Thomas Jutinico', role: 'Líder Jurídico y Cumplimiento' },
] as const;
