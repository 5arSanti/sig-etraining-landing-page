import type { SigSlug } from './sig.manifest';

export type IsoClauseLink = {
  numeral: string;
  label: string;
  slug: SigSlug;
};

export type IsoStandardColumn = {
  standard: string;
  links: IsoClauseLink[];
};

export const ISO_CLAUSE_COLUMNS: IsoStandardColumn[] = [
  {
    standard: 'ISO 9001',
    links: [
      { numeral: '4.1', label: 'PESTEL', slug: 'pestel' },
      { numeral: '4.2', label: 'Interesados', slug: 'matriz-interesados' },
      { numeral: '4.4', label: 'SIPOC', slug: 'entradas-salidas' },
      { numeral: '4.4', label: 'Mapa de procesos', slug: 'mapa-de-procesos' },
      { numeral: '5.2', label: 'Política', slug: 'politica-sig' },
      { numeral: '6.1', label: 'Riesgos de calidad', slug: 'riesgos-calidad' },
      { numeral: '8.1', label: 'Control operacional', slug: 'control-operacional' },
      { numeral: '9.1', label: 'Seguimiento', slug: 'seguimiento-medicion' },
    ],
  },
  {
    standard: 'ISO 14001',
    links: [
      { numeral: '6.1.2', label: 'Aspectos e impactos', slug: 'aspectos-impactos' },
      { numeral: '8.1', label: 'Control operacional', slug: 'control-operacional' },
      { numeral: '8.2', label: 'Emergencias', slug: 'emergencias' },
      { numeral: '9.1', label: 'Seguimiento (A1–A3)', slug: 'seguimiento-medicion' },
    ],
  },
  {
    standard: 'ISO 45001',
    links: [
      { numeral: '6.1.2', label: 'VPIR', slug: 'matriz-vpir' },
      { numeral: '8.1', label: 'Control operacional', slug: 'control-operacional' },
      { numeral: '8.2', label: 'Emergencias', slug: 'emergencias' },
      { numeral: '9.1', label: 'Seguimiento (S1–S3)', slug: 'seguimiento-medicion' },
    ],
  },
  {
    standard: 'ISO 27001',
    links: [
      { numeral: '6.1', label: 'Riesgos de SI', slug: 'riesgos-seguridad-informacion' },
      { numeral: '8.1', label: 'Control operacional', slug: 'control-operacional' },
      { numeral: '9.1', label: 'Seguimiento (I1–I3)', slug: 'seguimiento-medicion' },
      { numeral: '', label: 'Continuidad en Emergencias', slug: 'emergencias' },
    ],
  },
];

export const ISO_CLAUSE_INTRO =
  'Los enlaces llevan a la evidencia de este teatro académico; no son una certificación.';

export const ISO_CLAUSE_GAPS = [
  '9.2 auditoría interna',
  '9.3 revisión por la dirección',
  '10.2 no conformidad como procedimiento',
];
