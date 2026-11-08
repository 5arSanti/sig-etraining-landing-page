# SIG ready rooms 12–14 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn SIG rooms 12–14 into ready hybrid rooms (typed reading aid + original files) and add a lobby ISO clause map, with Recharts only on seguimiento.

**Architecture:** Keep `DeliverableViewer` as the attachment switch. Mount `OperationalControlTable`, `IndicatorDashboard`, and `EmergencyBoard` in `SigRoomPage` the same way `SipocTable` is mounted. Clause links live in `sig.isoClauses.ts` and render in `IsoClauseMap` on the lobby. Indicator numbers are typed; do not parse the PDF.

**Tech Stack:** Existing Vite + React 19 + TypeScript + React Router 7 + Tailwind 4 + Vitest + Testing Library + SheetJS. Add `recharts` (BarChart API) in Task 4 only.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-11-08-sig-ready-rooms-iso-audit-design.md`. Parent ISO-extension spec still applies except topics 12–14 are ready and keyboard walks 1–14.
- Spanish UI. Brand tokens only (`#5f2157` plum, `#f7941d` orange, `#ffcb05` amber).
- Routes stay `/`, `/nosotros`, `/sig`, `/sig/:slug`.
- Hybrid rooms: aid above, original file(s) full width below. Do not parse the seguimiento PDF. Do not rebuild emergency 3×3 heatmaps. Do not invent 9.2 / 9.3 / 10.2 rooms.
- No new `DeliverableKind`. 12 = `spreadsheet`, 13 = `pdf`, 14 = `image` with `files[1]` xlsx.
- Recharts only on seguimiento. Chart is decorative; the table is the accessible source.
- Tests: Vitest + Testing Library. No Playwright.
- Copy assets into `public/sig/<slug>/` with the ASCII names below; keep originals in `assets/`.
- Work on a feature branch, not `main`.

## File map

| Path | Responsibility |
|---|---|
| `public/sig/control-operacional/12-control-operacional.xlsx` | ISO 8.1 workbook |
| `public/sig/seguimiento-medicion/13-informe-seguimiento-medicion.pdf` | ISO 9.1 informe |
| `public/sig/emergencias/14-impacto-riesgo.png` | Emergency infographic |
| `public/sig/emergencias/14-matriz-desastres.xlsx` | Emergency workbook |
| `src/content/sig.manifest.ts` | Ready 12–14, bodies, files, isoTag |
| `src/content/sig.isoClauses.ts` | Lobby clause columns + gaps |
| `src/content/sig.controls.ts` | 15 operational control rows |
| `src/content/sig.indicators.ts` | 12 indicators + fichas |
| `src/content/sig.emergencies.ts` | 4 events |
| `src/features/sig/IsoClauseMap.tsx` | Lobby “Qué ver en auditoría” |
| `src/features/sig/OperationalControlTable.tsx` | Grouped 5×3 table |
| `src/features/sig/IndicatorDashboard.tsx` | Filter, Recharts, table, ficha |
| `src/features/sig/EmergencyBoard.tsx` | Event selector + matrices |

---

### Task 1: Public files, manifest ready, navigation

**Files:**
- Create: the four `public/sig/<slug>/` files in the file map
- Modify: `src/content/sig.manifest.ts`, `src/content/sig.manifest.test.ts`, `src/content/sig.navigation.test.ts`

**Interfaces:**
- Consumes: existing `SigTopic`, `getReadyTopics`, `getAdjacentSlug`
- Produces: topics 12–14 with `kind` spreadsheet | pdf | image; `files` populated; no `kind: 'placeholder'` left in `SIG_TOPICS`

- [ ] **Step 1: Write the failing tests**

Replace `src/content/sig.manifest.test.ts` with:

```ts
import { describe, expect, it } from 'vitest';
import { SIG_LOBBY_INTRO, SIG_TOPICS } from './sig.manifest';

describe('SIG_TOPICS', () => {
  it('lists fourteen ready topics and no placeholders', () => {
    expect(SIG_TOPICS).toHaveLength(14);
    expect(SIG_TOPICS.filter((topic) => topic.kind === 'placeholder')).toHaveLength(0);
    expect(SIG_TOPICS.filter((topic) => topic.kind !== 'placeholder')).toHaveLength(14);
    expect(SIG_TOPICS[11]?.kind).toBe('spreadsheet');
    expect(SIG_TOPICS[11]?.files).toEqual(['/sig/control-operacional/12-control-operacional.xlsx']);
    expect(SIG_TOPICS[12]?.kind).toBe('pdf');
    expect(SIG_TOPICS[12]?.files).toEqual([
      '/sig/seguimiento-medicion/13-informe-seguimiento-medicion.pdf',
    ]);
    expect(SIG_TOPICS[13]?.kind).toBe('image');
    expect(SIG_TOPICS[13]?.isoTag).toBe('14001 / 45001 / 27001');
    expect(SIG_TOPICS[13]?.files).toEqual([
      '/sig/emergencias/14-impacto-riesgo.png',
      '/sig/emergencias/14-matriz-desastres.xlsx',
    ]);
  });
});

describe('SIG_LOBBY_INTRO', () => {
  it('has meaningful content', () => {
    expect(SIG_LOBBY_INTRO.length).toBeGreaterThan(40);
    expect(SIG_LOBBY_INTRO).toContain('SIG');
  });
});
```

Replace the `getAdjacentSlug` example in `src/content/sig.navigation.test.ts` with:

```ts
  it('walks fourteen ready topics including 12–14', () => {
    expect(getReadyTopics(SIG_TOPICS)).toHaveLength(14);
    expect(getAdjacentSlug('riesgos-calidad', 'next')).toBe('control-operacional');
    expect(getAdjacentSlug('control-operacional', 'next')).toBe('seguimiento-medicion');
    expect(getAdjacentSlug('seguimiento-medicion', 'next')).toBe('emergencias');
    expect(getAdjacentSlug('emergencias', 'next')).toBeNull();
    expect(getAdjacentSlug('emergencias', 'prev')).toBe('seguimiento-medicion');
    expect(getAdjacentSlug('control-operacional', 'prev')).toBe('riesgos-calidad');
  });
```

- [ ] **Step 2: Run tests and confirm they fail**

Run: `npm test -- src/content/sig.manifest.test.ts src/content/sig.navigation.test.ts`

Expected: FAIL (placeholders 3 vs 0, ready 11 vs 14).

- [ ] **Step 3: Copy binaries into `public/sig/`**

```bash
mkdir -p public/sig/control-operacional public/sig/seguimiento-medicion public/sig/emergencias
cp "assets/12-control-operacional/SIG - Control operacional C3 .xlsx" public/sig/control-operacional/12-control-operacional.xlsx
cp "assets/13-seguimiento-y-medicion/Informe Seguimiento y Medicion E-Training.pdf" public/sig/seguimiento-medicion/13-informe-seguimiento-medicion.pdf
cp "assets/14-emergencias/impacto y riesgo.png" public/sig/emergencias/14-impacto-riesgo.png
cp "assets/14-emergencias/matriz_desastres_naturales.xlsx" public/sig/emergencias/14-matriz-desastres.xlsx
```

- [ ] **Step 4: Make topics 12–14 ready in `sig.manifest.ts`**

Replace the three placeholder objects (leave 1–11 unchanged) with:

```ts
  {
    slug: 'control-operacional',
    number: 12,
    title: 'Control operacional',
    summary: 'Cinco procesos y tres controles por proceso (SST, SI, ambiente y calidad).',
    isoTag: '9001 / 14001 / 45001 / 27001',
    body: 'Cinco procesos de Etraining con tres controles cada uno, tomados de SST, seguridad de la información, ambiente y calidad (tres de esas cuatro familias por proceso). Léalo por proceso: tipo de control, control operacional y evidencia. Cita ISO 9001, 14001 y 45001 numeral 8.1, e ISO 27001 numeral 8.1. El Excel es el entregable; la tabla de esta sala es la ayuda de lectura.',
    kind: 'spreadsheet',
    files: ['/sig/control-operacional/12-control-operacional.xlsx'],
  },
  {
    slug: 'seguimiento-medicion',
    number: 13,
    title: 'Seguimiento y medición',
    summary: 'Doce indicadores con línea base y comparación.',
    isoTag: '9001 / 14001 / 45001 / 27001',
    body: 'Doce indicadores (3 ambientales, 3 de SST, 3 de seguridad de la información y 3 de procesos) comparan la línea base de septiembre de 2026 con el resultado de octubre y la meta. La comparación del informe es simulada: 4 de 12 cumplen la meta (33,3 %). Eso no es un nivel de certificación. Cita ISO 9001, 14001, 45001 y 27001 numeral 9.1. El PDF es el entregable; el tablero de esta sala es la ayuda de lectura.',
    kind: 'pdf',
    files: ['/sig/seguimiento-medicion/13-informe-seguimiento-medicion.pdf'],
  },
  {
    slug: 'emergencias',
    number: 14,
    title: 'Emergencias',
    summary: 'Cuatro eventos: antes, durante, después y procesos afectados.',
    isoTag: '14001 / 45001 / 27001',
    body: 'Cuatro eventos (terremoto, inundación, deslizamiento y tormenta eléctrica) con qué hacer antes, durante y después en las áreas organizacional, ambiental, SST y seguridad de la información, y qué procesos se afectan. Cita ISO 14001 8.2 e ISO 45001 8.2, más continuidad de respaldos (27001) y continuidad operativa (9001). La infografía y el Excel son los entregables.',
    kind: 'image',
    files: [
      '/sig/emergencias/14-impacto-riesgo.png',
      '/sig/emergencias/14-matriz-desastres.xlsx',
    ],
  },
```

Remove `owner` and `scope` from these three entries. Keep the optional fields on `SigTopic`.

- [ ] **Step 5: Re-run the two content tests**

Run: `npm test -- src/content/sig.manifest.test.ts src/content/sig.navigation.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add public/sig/control-operacional public/sig/seguimiento-medicion public/sig/emergencias src/content/sig.manifest.ts src/content/sig.manifest.test.ts src/content/sig.navigation.test.ts
git commit -m "$(cat <<'EOF'
Make SIG rooms 12–14 ready and copy their original files into public/.

EOF
)"
```

---

### Task 2: Lobby ISO clause map

**Files:**
- Create: `src/content/sig.isoClauses.ts`, `src/features/sig/IsoClauseMap.tsx`, `src/features/sig/IsoClauseMap.test.tsx`
- Modify: `src/features/sig/SigLobbyPage.tsx`, `src/features/sig/SigLobbyPage.test.tsx`

**Interfaces:**
- Consumes: `SigSlug` from `sig.manifest.ts`
- Produces: `ISO_CLAUSE_COLUMNS`, `ISO_CLAUSE_GAPS`, `IsoClauseMap()`

- [ ] **Step 1: Write the failing lobby test**

Replace `src/features/sig/SigLobbyPage.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { SIG_TOPICS } from '@/content/sig.manifest';
import { SigLobbyPage } from './SigLobbyPage';

describe('SigLobbyPage', () => {
  it('renders fourteen ready cards, the audit map, and no construction labels', () => {
    render(
      <MemoryRouter>
        <SigLobbyPage />
      </MemoryRouter>,
    );

    for (const topic of SIG_TOPICS) {
      expect(screen.getByText(topic.title)).toBeInTheDocument();
    }
    expect(screen.queryByText('Contenido en construcción')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Qué ver en auditoría/i })).toBeInTheDocument();
    expect(screen.getByText(/no son una certificación/i)).toBeInTheDocument();
    expect(screen.getByText(/9\.2/)).toBeInTheDocument();
    const controlLinks = screen.getAllByRole('link', { name: /8\.1 Control operacional/i });
    expect(controlLinks[0]).toHaveAttribute('href', '/sig/control-operacional');
    expect(screen.getAllByRole('link', { name: /8\.2 Emergencias/i })[0]).toHaveAttribute(
      'href',
      '/sig/emergencias',
    );
  });
});
```

- [ ] **Step 2: Run the lobby test**

Run: `npm test -- src/features/sig/SigLobbyPage.test.tsx`

Expected: FAIL (heading not found).

- [ ] **Step 3: Add clause data and `IsoClauseMap`**

Create `src/content/sig.isoClauses.ts`:

```ts
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
```

Create `src/features/sig/IsoClauseMap.tsx`:

```tsx
import { Link } from 'react-router-dom';
import { routes } from '@/app/routes';
import { ISO_CLAUSE_COLUMNS, ISO_CLAUSE_GAPS, ISO_CLAUSE_INTRO } from '@/content/sig.isoClauses';

export function IsoClauseMap() {
  return (
    <section className="mb-10 rounded-[var(--radius-card)] border border-brand-plum/15 bg-brand-cream/60 p-6">
      <h2 className="text-xl font-bold text-brand-plum-ink">Qué ver en auditoría</h2>
      <p className="mt-2 text-sm text-brand-muted">{ISO_CLAUSE_INTRO}</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {ISO_CLAUSE_COLUMNS.map((column) => (
          <div key={column.standard}>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-orange">
              {column.standard}
            </h3>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={`${column.standard}-${link.numeral}-${link.slug}-${link.label}`}>
                  <Link
                    to={routes.sigTopic(link.slug)}
                    className="text-sm font-medium text-brand-plum hover:text-brand-orange"
                  >
                    {`${link.numeral} ${link.label}`.trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-brand-muted">
        Sin evidencia en este teatro: {ISO_CLAUSE_GAPS.join(' · ')}.
      </p>
    </section>
  );
}
```

In `SigLobbyPage.tsx`, import `IsoClauseMap` and render it between the intro paragraph and the topic grid (`mb-10` stays on the intro or move spacing to the map).

- [ ] **Step 4: Re-run lobby test**

Run: `npm test -- src/features/sig/SigLobbyPage.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content/sig.isoClauses.ts src/features/sig/IsoClauseMap.tsx src/features/sig/SigLobbyPage.tsx src/features/sig/SigLobbyPage.test.tsx
git commit -m "$(cat <<'EOF'
Map ISO clauses on the SIG lobby to the rooms that hold evidence.

EOF
)"
```

---

### Task 3: Operational control table

**Files:**
- Create: `src/content/sig.controls.ts`, `src/features/sig/OperationalControlTable.tsx`, `src/features/sig/OperationalControlTable.test.tsx`
- Modify: `src/features/sig/SigRoomPage.tsx`, `src/features/sig/SigRoomPage.test.tsx`

**Interfaces:**
- Consumes: `OPERATIONAL_CONTROLS: OperationalControlRow[]`
- Produces: `OperationalControlTable({ rows })`; `SigRoomPage` mounts it when `topic.slug === 'control-operacional'`

- [ ] **Step 1: Write the failing table and room tests**

Create `src/features/sig/OperationalControlTable.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OPERATIONAL_CONTROLS } from '@/content/sig.controls';
import { OperationalControlTable } from './OperationalControlTable';

describe('OperationalControlTable', () => {
  it('groups fifteen controls into five processes and shows LOTO', () => {
    render(<OperationalControlTable rows={OPERATIONAL_CONTROLS} />);
    expect(OPERATIONAL_CONTROLS).toHaveLength(15);
    expect(screen.getByText('Desarrollo de software a la medida')).toBeInTheDocument();
    expect(screen.getByText(/LOTO/)).toBeInTheDocument();
    expect(screen.getByText(/pausas activas/i)).toBeInTheDocument();
  });
});
```

Add to `src/features/sig/SigRoomPage.test.tsx`:

```tsx
  it('shows the control table and a spreadsheet download in control operacional', () => {
    renderRoom('/sig/control-operacional');
    expect(screen.getByText(/LOTO/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /descargar/i })).toHaveAttribute(
      'href',
      '/sig/control-operacional/12-control-operacional.xlsx',
    );
  });
```

- [ ] **Step 2: Run the tests**

Run: `npm test -- src/features/sig/OperationalControlTable.test.tsx src/features/sig/SigRoomPage.test.tsx`

Expected: FAIL (module not found / LOTO missing).

- [ ] **Step 3: Add `sig.controls.ts` and the table**

Create `src/content/sig.controls.ts` with this exact array (15 rows):

```ts
export type OperationalControlRow = {
  processNumber: number;
  process: string;
  type: 'SST' | 'Seguridad de la información' | 'Ambiental' | 'Calidad';
  control: string;
  evidence: string;
};

export const OPERATIONAL_CONTROLS: OperationalControlRow[] = [
  {
    processNumber: 1,
    process: 'Desarrollo de software a la medida',
    type: 'Seguridad de la información',
    control:
      'Gestión de secretos: ninguna credencial en el repositorio, llaves en el gestor del proveedor y acceso a repos por rol con MFA',
    evidence: 'Pull request aprobado y bitácora de accesos',
  },
  {
    processNumber: 1,
    process: 'Desarrollo de software a la medida',
    type: 'Calidad',
    control:
      'Checklist de paso a producción por fase (requisitos, pruebas y aceptación del cliente) antes de desplegar',
    evidence: 'Acta de cierre de fase firmada',
  },
  {
    processNumber: 1,
    process: 'Desarrollo de software a la medida',
    type: 'Ambiental',
    control: 'Auto-scaling y apagado programado de ambientes de prueba fuera de horario laboral',
    evidence: 'Reporte mensual de consumo en Azure y GCP',
  },
  {
    processNumber: 2,
    process: 'Gestión de infraestructura tecnológica y mesa de ayuda',
    type: 'SST',
    control:
      'Procedimiento LOTO y cumplimiento RETIE para intervenir racks y UPS; solo personal autorizado con EPP dieléctrico',
    evidence: 'Permiso de trabajo eléctrico',
  },
  {
    processNumber: 2,
    process: 'Gestión de infraestructura tecnológica y mesa de ayuda',
    type: 'Ambiental',
    control: 'Entrega de RAEE a gestor autorizado con certificado de disposición final',
    evidence: 'Certificado de disposición final e inventario de baja',
  },
  {
    processNumber: 2,
    process: 'Gestión de infraestructura tecnológica y mesa de ayuda',
    type: 'Seguridad de la información',
    control: 'Borrado seguro de discos antes de dar de baja o reasignar un equipo',
    evidence: 'Acta de borrado por número de serie',
  },
  {
    processNumber: 3,
    process: 'STEAM e innovación educativa',
    type: 'SST',
    control:
      'Extracción localizada con filtro HEPA/carbón activado en el área de impresión 3D, uso de filamento PLA y guantes térmicos',
    evidence: 'Inspección preoperacional del laboratorio',
  },
  {
    processNumber: 3,
    process: 'STEAM e innovación educativa',
    type: 'Ambiental',
    control: 'Segregación de residuos de filamento y empaques, con entrega a reciclador autorizado',
    evidence: 'Registro de pesaje mensual de residuos',
  },
  {
    processNumber: 3,
    process: 'STEAM e innovación educativa',
    type: 'Calidad',
    control: 'Guía de laboratorio validada por el líder pedagógico antes de cada cohorte',
    evidence: 'Guía con control de versión y visto bueno',
  },
  {
    processNumber: 4,
    process: 'Logística y dotación tecnológica',
    type: 'SST',
    control: 'PESV: inspección preoperacional del bus y límite de horas de conducción',
    evidence: 'Lista de chequeo preoperacional',
  },
  {
    processNumber: 4,
    process: 'Logística y dotación tecnológica',
    type: 'Ambiental',
    control:
      'Mantenimiento preventivo, revisión de gases y planeación de rutas para reducir viajes',
    evidence: 'Certificado de revisión técnico-mecánica y plan de rutas',
  },
  {
    processNumber: 4,
    process: 'Logística y dotación tecnológica',
    type: 'Calidad',
    control:
      'Acta de entrega y verificación de equipos con la institución (serial, estado y cantidad)',
    evidence: 'Acta firmada por el supervisor del contrato',
  },
  {
    processNumber: 5,
    process: 'Diseño de contenidos y experiencias de aprendizaje',
    type: 'Calidad',
    control:
      'Revisión pedagógica y de estilo por par, con checklist de accesibilidad y verificación de licencias y derechos de autor de recursos de terceros (Ley 23 de 1982 y Ley 1915 de 2018), antes de publicar en el LMS',
    evidence: 'Formato de revisión diligenciado y registro de licencias por recurso',
  },
  {
    processNumber: 5,
    process: 'Diseño de contenidos y experiencias de aprendizaje',
    type: 'Seguridad de la información',
    control:
      'Clasificación Pública / Interna / Confidencial / Reservada y anonimización de datos de estudiantes en materiales y analítica',
    evidence: 'Matriz de clasificación de la información',
  },
  {
    processNumber: 5,
    process: 'Diseño de contenidos y experiencias de aprendizaje',
    type: 'SST',
    control:
      'Protocolo de pausas activas y verificación ergonómica del puesto (pantalla, silla, iluminación y tiempo continuo) para diseñadores instruccionales y editores de video',
    evidence: 'Inspección de puesto y registro de pausas',
  },
];
```

Create `src/features/sig/OperationalControlTable.tsx`:

```tsx
import type { OperationalControlRow } from '@/content/sig.controls';

export function OperationalControlTable({ rows }: { rows: readonly OperationalControlRow[] }) {
  const processes = [...new Set(rows.map((row) => row.process))];

  return (
    <div className="space-y-6">
      {processes.map((process) => {
        const group = rows.filter((row) => row.process === process);
        const number = group[0]?.processNumber;
        return (
          <section
            key={process}
            className="overflow-x-auto rounded-[var(--radius-card)] border border-brand-plum/15"
          >
            <h3 className="bg-brand-plum px-4 py-2 text-sm font-semibold text-white">
              {number}. {process}
            </h3>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-brand-cream text-left">
                  <th className="px-4 py-2 text-sm font-semibold text-brand-plum">Tipo</th>
                  <th className="px-4 py-2 text-sm font-semibold text-brand-plum">Control</th>
                  <th className="px-4 py-2 text-sm font-semibold text-brand-plum">Evidencia</th>
                </tr>
              </thead>
              <tbody>
                {group.map((row) => (
                  <tr key={`${row.process}-${row.type}-${row.control}`} className="odd:bg-white even:bg-brand-cream/40">
                    <td className="border-t border-brand-plum/10 px-4 py-2 text-sm font-medium text-brand-orange">
                      {row.type}
                    </td>
                    <td className="border-t border-brand-plum/10 px-4 py-2 text-sm text-brand-plum-ink">
                      {row.control}
                    </td>
                    <td className="border-t border-brand-plum/10 px-4 py-2 text-sm text-brand-muted">
                      {row.evidence}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      })}
    </div>
  );
}
```

In `SigRoomPage.tsx`, next to `SipocTable`:

```tsx
import { OPERATIONAL_CONTROLS } from '@/content/sig.controls';
import { OperationalControlTable } from './OperationalControlTable';
```

```tsx
          {topic.sipocRows ? <SipocTable rows={topic.sipocRows} /> : null}
          {topic.slug === 'control-operacional' ? (
            <OperationalControlTable rows={OPERATIONAL_CONTROLS} />
          ) : null}
```

- [ ] **Step 4: Re-run tests**

Run: `npm test -- src/features/sig/OperationalControlTable.test.tsx src/features/sig/SigRoomPage.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content/sig.controls.ts src/features/sig/OperationalControlTable.tsx src/features/sig/OperationalControlTable.test.tsx src/features/sig/SigRoomPage.tsx src/features/sig/SigRoomPage.test.tsx
git commit -m "$(cat <<'EOF'
Show the five-process operational control table above the original workbook.

EOF
)"
```

---

### Task 4: Indicator dashboard and Recharts

**Files:**
- Create: `src/content/sig.indicators.ts`, `src/features/sig/IndicatorDashboard.tsx`, `src/features/sig/IndicatorDashboard.test.tsx`
- Modify: `package.json` / lockfile via `npm install recharts`, `src/features/sig/SigRoomPage.tsx`, `src/features/sig/SigRoomPage.test.tsx`

**Interfaces:**
- Consumes: `SIG_INDICATORS`, `IndicatorComponent`
- Produces: `IndicatorDashboard()` with filter buttons named Ambiental, SST, Información, Procesos, Todos; table always visible; `BarChart` with three `Bar`s (sep, oct, meta)

- [ ] **Step 1: Install Recharts and write failing tests**

Run: `npm install recharts`

Create `src/features/sig/IndicatorDashboard.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
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
    expect(screen.getByText('A1')).toBeInTheDocument();
    expect(screen.getByText('Consumo de energía')).toBeInTheDocument();
    expect(screen.getByText('I1')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Ambiental' }));
    expect(screen.getByText('A1')).toBeInTheDocument();
    expect(screen.queryByText('I1')).not.toBeInTheDocument();
  });
});
```

Add to `SigRoomPage.test.tsx`:

```tsx
  it('shows the indicator summary and the seguimiento PDF', () => {
    renderRoom('/sig/seguimiento-medicion');
    expect(screen.getByText(/4 de 12 cumplen meta/i)).toBeInTheDocument();
    expect(screen.getByTitle('Seguimiento y medición')).toBeInTheDocument();
  });
```

- [ ] **Step 2: Run the tests**

Run: `npm test -- src/features/sig/IndicatorDashboard.test.tsx src/features/sig/SigRoomPage.test.tsx`

Expected: FAIL (module not found).

- [ ] **Step 3: Add indicator data**

Create `src/content/sig.indicators.ts`:

```ts
export type IndicatorComponent = 'ambiental' | 'sst' | 'informacion' | 'procesos';
export type IndicatorStatus = 'Cumple' | 'Mejora, no cumple';

export type SigIndicator = {
  code: string;
  name: string;
  component: IndicatorComponent;
  unit: string;
  baseline: number;
  result: number;
  target: number;
  higherBetter: boolean;
  status: IndicatorStatus;
  formula: string;
  source: string;
  owner: string;
  interpretation: string;
  action: string;
};

export const SIG_INDICATORS: SigIndicator[] = [
  {
    code: 'A1',
    name: 'Consumo de energía',
    component: 'ambiental',
    unit: 'kWh',
    baseline: 1200,
    result: 1050,
    target: 1000,
    higherBetter: false,
    status: 'Mejora, no cumple',
    formula: 'Total de kWh facturados durante el mes.',
    source: 'Factura o registro mensual de energía',
    owner: 'Responsable administrativo / ambiental',
    interpretation: 'El consumo bajó 150 kWh (12,5 %). Quedó 50 kWh por encima de la meta.',
    action: 'Revisar equipos encendidos fuera de horario, reforzar apagado y analizar consumos por sede.',
  },
  {
    code: 'A2',
    name: 'Consumo de agua',
    component: 'ambiental',
    unit: 'm³',
    baseline: 45,
    result: 38,
    target: 40,
    higherBetter: false,
    status: 'Cumple',
    formula: 'Total de m³ consumidos en el mes.',
    source: 'Factura o lectura mensual de agua',
    owner: 'Responsable administrativo / ambiental',
    interpretation: 'El consumo se redujo 7 m³ (15,6 %) y quedó 2 m³ por debajo del límite.',
    action: 'Mantener hábitos de ahorro, revisar fugas y registrar mensualmente el consumo.',
  },
  {
    code: 'A3',
    name: 'Separación de residuos aprovechables',
    component: 'ambiental',
    unit: '%',
    baseline: 55,
    result: 72,
    target: 80,
    higherBetter: true,
    status: 'Mejora, no cumple',
    formula: '(kg aprovechables correctamente separados / total revisado) × 100.',
    source: 'Formato de inspección y pesaje de residuos',
    owner: 'Responsable ambiental / servicios generales',
    interpretation: 'Aumentó 17 pp y sigue 8 pp por debajo de la meta.',
    action: 'Identificar puntos con mezcla, señalizar recipientes y repetir la medición.',
  },
  {
    code: 'S1',
    name: 'Inspecciones SST ejecutadas',
    component: 'sst',
    unit: '%',
    baseline: 70,
    result: 90,
    target: 95,
    higherBetter: true,
    status: 'Mejora, no cumple',
    formula: '(Inspecciones realizadas / inspecciones programadas) × 100.',
    source: 'Cronograma, listas de verificación y actas',
    owner: 'Responsable de SST',
    interpretation: 'La ejecución creció 20 pp; falta una inspección del periodo.',
    action: 'Agendar con anticipación y documentar causas de reprogramación.',
  },
  {
    code: 'S2',
    name: 'Participación en formación SST',
    component: 'sst',
    unit: '%',
    baseline: 65,
    result: 88,
    target: 90,
    higherBetter: true,
    status: 'Mejora, no cumple',
    formula: '(Asistentes / personas convocadas) × 100.',
    source: 'Listados de asistencia y convocatorias',
    owner: 'Responsable de SST / talento humano',
    interpretation: 'Subió 23 pp; quedó 2 pp por debajo de la meta.',
    action: 'Habilitar sesiones de recuperación y avisar con mayor anticipación.',
  },
  {
    code: 'S3',
    name: 'Condiciones inseguras corregidas',
    component: 'sst',
    unit: '%',
    baseline: 60,
    result: 85,
    target: 85,
    higherBetter: true,
    status: 'Cumple',
    formula: '(Condiciones corregidas en plazo / condiciones con plazo vencido) × 100.',
    source: 'Registro de hallazgos, fechas y evidencias de cierre',
    owner: 'Responsable de SST / líderes de área',
    interpretation: 'Mejoró 25 pp y alcanzó exactamente la meta.',
    action: 'Verificar la efectividad de los cierres y priorizar mayor exposición.',
  },
  {
    code: 'I1',
    name: 'Copias de seguridad ejecutadas',
    component: 'informacion',
    unit: '%',
    baseline: 80,
    result: 96,
    target: 98,
    higherBetter: true,
    status: 'Mejora, no cumple',
    formula: '(Respaldos completados / respaldos programados) × 100.',
    source: 'Bitácora automatizada de respaldos',
    owner: 'Responsable de TI',
    interpretation: 'Mejoró 16 pp; faltan 2 pp para la meta.',
    action: 'Configurar alertas, reintentos automáticos y pruebas de restauración.',
  },
  {
    code: 'I2',
    name: 'Incidentes reportados',
    component: 'informacion',
    unit: 'n',
    baseline: 6,
    result: 3,
    target: 2,
    higherBetter: false,
    status: 'Mejora, no cumple',
    formula: 'Conteo de incidentes confirmados registrados en el mes.',
    source: 'Mesa de ayuda y registro de incidentes confirmados',
    owner: 'Responsable de TI / seguridad de la información',
    interpretation: 'Bajaron 50 %. Aún se supera en un caso el máximo.',
    action: 'Analizar causa raíz y reforzar controles de acceso.',
  },
  {
    code: 'I3',
    name: 'Personal formado en seguridad',
    component: 'informacion',
    unit: '%',
    baseline: 60,
    result: 90,
    target: 90,
    higherBetter: true,
    status: 'Cumple',
    formula: '(Colaboradores capacitados / colaboradores objetivo) × 100.',
    source: 'Actas, listas y evaluaciones de formación',
    owner: 'Responsable de TI / talento humano',
    interpretation: 'Avance de 30 pp; se alcanzó la meta.',
    action: 'Ejercicios de phishing y refuerzo para quienes faltan.',
  },
  {
    code: 'P1',
    name: 'Satisfacción de participantes',
    component: 'procesos',
    unit: '%',
    baseline: 82,
    result: 91,
    target: 90,
    higherBetter: true,
    status: 'Cumple',
    formula: '(Respuestas favorables / respuestas válidas) × 100.',
    source: 'Encuestas de cierre de capacitación',
    owner: 'Coordinación académica / calidad',
    interpretation: 'Aumentó 9 pp y superó la meta en 1 pp.',
    action: 'Mantener encuestas y revisar comentarios desfavorables.',
  },
  {
    code: 'P2',
    name: 'Capacitaciones realizadas',
    component: 'procesos',
    unit: '%',
    baseline: 75,
    result: 92,
    target: 95,
    higherBetter: true,
    status: 'Mejora, no cumple',
    formula: '(Capacitaciones ejecutadas / programadas) × 100.',
    source: 'Cronograma académico y registros de ejecución',
    owner: 'Coordinación académica',
    interpretation: 'Mejoró 17 pp; dos sesiones no se realizaron.',
    action: 'Confirmar instructores y recursos; definir sustituciones.',
  },
  {
    code: 'P3',
    name: 'Peticiones atendidas a tiempo',
    component: 'procesos',
    unit: '%',
    baseline: 68,
    result: 89,
    target: 90,
    higherBetter: true,
    status: 'Mejora, no cumple',
    formula: '(Solicitudes respondidas en plazo / solicitudes con vencimiento) × 100.',
    source: 'Registro de PQRS',
    owner: 'Atención al cliente / calidad',
    interpretation: 'Creció 21 pp y quedó 1 pp por debajo de la meta.',
    action: 'Centralizar el registro y activar alertas de vencimiento.',
  },
];

export const INDICATOR_SUMMARY = {
  meetingTarget: SIG_INDICATORS.filter((item) => item.status === 'Cumple').length,
  total: SIG_INDICATORS.length,
};

export const INDICATOR_FILTERS: { id: 'todos' | IndicatorComponent; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'ambiental', label: 'Ambiental' },
  { id: 'sst', label: 'SST' },
  { id: 'informacion', label: 'Información' },
  { id: 'procesos', label: 'Procesos' },
];
```

- [ ] **Step 4: Implement `IndicatorDashboard` and mount it**

Create `src/features/sig/IndicatorDashboard.tsx`:

```tsx
import { Fragment, useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import {
  INDICATOR_FILTERS,
  INDICATOR_SUMMARY,
  SIG_INDICATORS,
  type IndicatorComponent,
  type SigIndicator,
} from '@/content/sig.indicators';

const FILTER_LABEL: Record<IndicatorComponent, string> = {
  ambiental: 'Ambiental',
  sst: 'SST',
  informacion: 'Información',
  procesos: 'Procesos',
};

function deltaLabel(row: SigIndicator): string {
  const delta = row.result - row.baseline;
  const sign = delta > 0 ? '+' : '';
  return `${sign}${delta} ${row.unit}`;
}

export function IndicatorDashboard() {
  const [filter, setFilter] = useState<'todos' | IndicatorComponent>('todos');
  const [openCode, setOpenCode] = useState<string | null>(null);
  const visible = SIG_INDICATORS.filter((row) => filter === 'todos' || row.component === filter);
  const percentRows = visible.filter((row) => row.unit !== 'n');
  const countRows = visible.filter((row) => row.unit === 'n');
  const chips = useMemo(
    () =>
      (['ambiental', 'sst', 'informacion', 'procesos'] as IndicatorComponent[]).map((component) => {
        const group = SIG_INDICATORS.filter((row) => row.component === component);
        const meeting = group.filter((row) => row.status === 'Cumple').length;
        return `${FILTER_LABEL[component]} ${meeting} de ${group.length}`;
      }),
    [],
  );

  return (
    <div className="space-y-6">
      <p className="text-lg font-semibold text-brand-plum-ink">
        {INDICATOR_SUMMARY.meetingTarget} de {INDICATOR_SUMMARY.total} cumplen meta
      </p>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="rounded-[var(--radius-pill)] bg-brand-cream px-3 py-1 text-xs font-semibold text-brand-plum"
          >
            {chip}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {INDICATOR_FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={`rounded-[var(--radius-pill)] px-3 py-1.5 text-sm font-semibold ${
              filter === item.id
                ? 'bg-brand-plum text-white'
                : 'bg-white text-brand-plum ring-1 ring-brand-plum/20'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {percentRows.length > 0 ? (
        <div className="overflow-x-auto" aria-hidden="true">
          <BarChart width={720} height={320} data={percentRows}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="code" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="baseline" name="Línea base" fill="#5f2157" />
            <Bar dataKey="result" name="Resultado" fill="#f7941d" />
            <Bar dataKey="target" name="Meta" fill="#ffcb05" />
          </BarChart>
        </div>
      ) : null}
      {countRows.length > 0 ? (
        <div className="overflow-x-auto" aria-hidden="true">
          <p className="mb-2 text-sm font-semibold text-brand-plum">Incidentes reportados (conteo)</p>
          <BarChart width={360} height={240} data={countRows}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="code" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="baseline" name="Línea base" fill="#5f2157" />
            <Bar dataKey="result" name="Resultado" fill="#f7941d" />
            <Bar dataKey="target" name="Meta" fill="#ffcb05" />
          </BarChart>
        </div>
      ) : null}
      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-brand-plum/15">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-brand-plum text-white">
            <tr>
              <th className="px-3 py-2">Código</th>
              <th className="px-3 py-2">Indicador</th>
              <th className="px-3 py-2">Sep</th>
              <th className="px-3 py-2">Oct</th>
              <th className="px-3 py-2">Meta</th>
              <th className="px-3 py-2">Δ</th>
              <th className="px-3 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <Fragment key={row.code}>
                <tr className="odd:bg-white even:bg-brand-cream/40">
                  <td className="border-t border-brand-plum/10 px-3 py-2 font-semibold">{row.code}</td>
                  <td className="border-t border-brand-plum/10 px-3 py-2">
                    <button
                      type="button"
                      className="text-left font-medium text-brand-plum hover:text-brand-orange"
                      onClick={() => setOpenCode(openCode === row.code ? null : row.code)}
                    >
                      {row.name}
                    </button>
                  </td>
                  <td className="border-t border-brand-plum/10 px-3 py-2">
                    {row.baseline} {row.unit}
                  </td>
                  <td className="border-t border-brand-plum/10 px-3 py-2">
                    {row.result} {row.unit}
                  </td>
                  <td className="border-t border-brand-plum/10 px-3 py-2">
                    {row.target} {row.unit}
                  </td>
                  <td className="border-t border-brand-plum/10 px-3 py-2">{deltaLabel(row)}</td>
                  <td
                    className={`border-t border-brand-plum/10 px-3 py-2 font-medium ${
                      row.status === 'Cumple' ? 'text-emerald-800' : 'text-brand-orange'
                    }`}
                  >
                    {row.status}
                  </td>
                </tr>
                {openCode === row.code ? (
                  <tr>
                    <td colSpan={7} className="bg-brand-cream px-4 py-3 text-sm text-brand-plum-ink/85">
                      <p>
                        <strong>Fórmula:</strong> {row.formula}
                      </p>
                      <p>
                        <strong>Fuente:</strong> {row.source}
                      </p>
                      <p>
                        <strong>Responsable:</strong> {row.owner}
                      </p>
                      <p>
                        <strong>Interpretación:</strong> {row.interpretation}
                      </p>
                      <p>
                        <strong>Acción:</strong> {row.action}
                      </p>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

In `SigRoomPage.tsx`:

```tsx
          {topic.slug === 'seguimiento-medicion' ? <IndicatorDashboard /> : null}
```

- [ ] **Step 5: Run dashboard tests and typecheck**

Run: `npm test -- src/features/sig/IndicatorDashboard.test.tsx src/features/sig/SigRoomPage.test.tsx && npx tsc -b --pretty false`

Expected: PASS; `tsc` clean.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/content/sig.indicators.ts src/features/sig/IndicatorDashboard.tsx src/features/sig/IndicatorDashboard.test.tsx src/features/sig/SigRoomPage.tsx src/features/sig/SigRoomPage.test.tsx
git commit -m "$(cat <<'EOF'
Compare the twelve SIG indicators with Recharts against the original PDF.

EOF
)"
```

---

### Task 5: Emergency board and second spreadsheet

**Files:**
- Create: `src/content/sig.emergencies.ts`, `src/features/sig/EmergencyBoard.tsx`, `src/features/sig/EmergencyBoard.test.tsx`
- Modify: `src/features/sig/SigRoomPage.tsx`, `src/features/sig/SigRoomPage.test.tsx`

**Interfaces:**
- Consumes: `EMERGENCY_EVENTS`, `files[1]` xlsx
- Produces: `EmergencyBoard()`; `SigRoomPage` renders `SpreadsheetViewer` when `topic.files[1]` ends with `.xlsx`

- [ ] **Step 1: Write failing tests**

Create `src/features/sig/EmergencyBoard.test.tsx`:

```tsx
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
```

Add to `SigRoomPage.test.tsx`:

```tsx
  it('shows the emergency infographic and a second spreadsheet download', () => {
    renderRoom('/sig/emergencias');
    expect(screen.getByRole('img', { name: /Emergencias/i })).toHaveAttribute(
      'src',
      '/sig/emergencias/14-impacto-riesgo.png',
    );
    expect(
      screen.getByRole('link', { name: /descargar/i, hidden: false }),
    ).toBeTruthy();
    const downloads = screen.getAllByRole('link', { name: /descargar/i });
    expect(downloads.some((link) => link.getAttribute('href')?.endsWith('14-matriz-desastres.xlsx'))).toBe(
      true,
    );
  });
```

- [ ] **Step 2: Run the tests**

Run: `npm test -- src/features/sig/EmergencyBoard.test.tsx src/features/sig/SigRoomPage.test.tsx`

Expected: FAIL (module not found).

- [ ] **Step 3: Add emergency content**

Create `src/content/sig.emergencies.ts`. Terremoto risk `Crítico`; the other three `Alto`. Button labels use `event.title` (must match `/Tormenta eléctrica/i`).

```ts
export type EmergencyArea = 'Organizacional' | 'Ambiental' | 'SST' | 'Seguridad de la información';

export type EmergencyPhase = {
  area: EmergencyArea;
  before: string;
  during: string;
  after: string;
};

export type EmergencyEvent = {
  id: 'terremoto' | 'inundacion' | 'deslizamiento' | 'tormenta';
  title: string;
  risk: 'Crítico' | 'Alto';
  phases: EmergencyPhase[];
  processes: string[];
};

export const EMERGENCY_EVENTS: EmergencyEvent[] = [
  {
    id: 'terremoto',
    title: 'Terremoto',
    risk: 'Crítico',
    processes: [
      'Direccionamiento estratégico',
      'Ejecución de la formación',
      'Convocatoria y matrícula',
      'Gestión del talento humano',
      'Tecnología y plataformas LMS',
    ],
    phases: [
      {
        area: 'Organizacional',
        before: 'Identificar zonas de riesgo, establecer rutas de evacuación y definir planes de continuidad.',
        during: 'Suspender actividades y evacuar ordenadamente al personal.',
        after: 'Evaluar daños, habilitar espacios alternativos y restablecer las actividades.',
      },
      {
        area: 'Ambiental',
        before: 'Identificar sustancias peligrosas y asegurar el almacenamiento de residuos.',
        during: 'Evitar derrames y controlar posibles fugas de sustancias contaminantes.',
        after: 'Gestionar escombros, separar residuos y evaluar daños ambientales.',
      },
      {
        area: 'SST',
        before: 'Capacitar al personal, realizar simulacros y revisar las condiciones estructurales.',
        during: 'Protegerse durante el movimiento sísmico, evacuar y prestar primeros auxilios.',
        after: 'Identificar lesionados, evaluar riesgos y autorizar el retorno cuando sea seguro.',
      },
      {
        area: 'Seguridad de la información',
        before: 'Realizar copias de seguridad y proteger servidores y equipos tecnológicos.',
        during: 'Desconectar equipos cuando sea seguro y activar protocolos de contingencia.',
        after: 'Recuperar bases de datos, plataformas LMS y sistemas administrativos.',
      },
    ],
  },
  {
    id: 'inundacion',
    title: 'Inundación',
    risk: 'Alto',
    processes: [
      'Ejecución de la formación',
      'Convocatoria y matrícula',
      'Tecnología y plataformas LMS',
      'Gestión documental y de datos',
      'Gestión administrativa y financiera',
    ],
    phases: [
      {
        area: 'Organizacional',
        before: 'Identificar zonas inundables, proteger documentos y establecer alternativas de formación virtual.',
        during: 'Suspender actividades presenciales y trasladar las operaciones a espacios seguros.',
        after: 'Evaluar daños, limpiar instalaciones y restablecer las actividades.',
      },
      {
        area: 'Ambiental',
        before: 'Mantener limpios los drenajes y realizar una adecuada disposición de residuos.',
        during: 'Controlar posibles derrames y evitar la contaminación del agua.',
        after: 'Retirar residuos, gestionar aguas contaminadas y evaluar daños ambientales.',
      },
      {
        area: 'SST',
        before: 'Capacitar al personal sobre evacuación y establecer zonas seguras.',
        during: 'Evitar el contacto con aguas contaminadas, evacuar y prevenir riesgos eléctricos.',
        after: 'Verificar condiciones sanitarias, prevenir enfermedades y evaluar riesgos antes del retorno.',
      },
      {
        area: 'Seguridad de la información',
        before: 'Realizar respaldos en la nube y proteger equipos tecnológicos de la humedad.',
        during: 'Apagar equipos ante riesgos eléctricos y activar contingencias tecnológicas.',
        after: 'Restaurar respaldos, verificar la integridad de los datos y recuperar los servicios.',
      },
    ],
  },
  {
    id: 'deslizamiento',
    title: 'Deslizamiento de tierra',
    risk: 'Alto',
    processes: [
      'Direccionamiento estratégico',
      'Gestión comercial y contratación',
      'Ejecución de la formación',
      'Gestión del talento humano',
      'Tecnología y plataformas LMS',
    ],
    phases: [
      {
        area: 'Organizacional',
        before: 'Identificar zonas vulnerables, establecer rutas alternas y preparar modalidades de trabajo virtual.',
        during: 'Suspender actividades en zonas amenazadas y evacuar cuando sea necesario.',
        after: 'Evaluar instalaciones y accesos, y reanudar las actividades progresivamente.',
      },
      {
        area: 'Ambiental',
        before: 'Identificar zonas susceptibles a erosión y proteger la vegetación.',
        during: 'Evitar intervenir terrenos inestables y prevenir nuevos daños ambientales.',
        after: 'Evaluar daños en el suelo, gestionar residuos y apoyar la recuperación ambiental.',
      },
      {
        area: 'SST',
        before: 'Capacitar al personal para reconocer señales de alerta y establecer protocolos de evacuación.',
        during: 'Evacuar las zonas de peligro y evitar acercarse al terreno inestable.',
        after: 'Atender lesionados y verificar que las instalaciones y rutas sean seguras.',
      },
      {
        area: 'Seguridad de la información',
        before: 'Mantener respaldos en la nube y habilitar accesos remotos a los sistemas.',
        during: 'Activar el acceso remoto y proteger los equipos ubicados en las zonas afectadas.',
        after: 'Verificar los sistemas, recuperar información y restablecer los servicios tecnológicos.',
      },
    ],
  },
  {
    id: 'tormenta',
    title: 'Tormenta eléctrica',
    risk: 'Alto',
    processes: [
      'Tecnología y plataformas LMS',
      'Ejecución de la formación',
      'Gestión documental y de datos',
      'Gestión administrativa y financiera',
      'Gestión del talento humano',
    ],
    phases: [
      {
        area: 'Organizacional',
        before: 'Establecer protocolos ante interrupciones eléctricas y disponer de alternativas para continuar las actividades.',
        during: 'Suspender actividades exteriores y detener temporalmente las operaciones si existe peligro.',
        after: 'Revisar las instalaciones y restablecer las actividades cuando existan condiciones seguras.',
      },
      {
        area: 'Ambiental',
        before: 'Realizar mantenimiento de drenajes y revisar sistemas de protección contra descargas eléctricas.',
        during: 'Controlar posibles incendios y evitar la exposición a zonas abiertas.',
        after: 'Evaluar daños en vegetación e instalaciones y gestionar los residuos generados.',
      },
      {
        area: 'SST',
        before: 'Capacitar al personal sobre riesgos eléctricos y establecer zonas seguras.',
        during: 'Permanecer en espacios cerrados y evitar el contacto con estructuras metálicas.',
        after: 'Verificar condiciones eléctricas, atender lesionados y revisar la seguridad de las instalaciones.',
      },
      {
        area: 'Seguridad de la información',
        before: 'Instalar sistemas UPS, reguladores de voltaje y protección contra sobretensiones.',
        during: 'Activar sistemas de energía de respaldo y proteger los equipos tecnológicos.',
        after: 'Revisar servidores, redes y bases de datos, y recuperar los servicios afectados.',
      },
    ],
  },
];
```

- [ ] **Step 4: Implement `EmergencyBoard` and wire the room**

Create `src/features/sig/EmergencyBoard.tsx`:

```tsx
import { useState } from 'react';
import { EMERGENCY_EVENTS } from '@/content/sig.emergencies';

export function EmergencyBoard() {
  const [selectedId, setSelectedId] = useState(EMERGENCY_EVENTS[0]?.id ?? 'terremoto');
  const selected = EMERGENCY_EVENTS.find((event) => event.id === selectedId) ?? EMERGENCY_EVENTS[0];

  if (!selected) return null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {EMERGENCY_EVENTS.map((event) => (
          <button
            key={event.id}
            type="button"
            onClick={() => setSelectedId(event.id)}
            className={`rounded-[var(--radius-pill)] px-3 py-1.5 text-sm font-semibold ${
              event.id === selectedId
                ? 'bg-brand-plum text-white'
                : 'bg-white text-brand-plum ring-1 ring-brand-plum/20'
            }`}
          >
            {event.title}
          </button>
        ))}
      </div>
      <h3 className="text-xl font-bold text-brand-plum-ink">
        {selected.title} — Riesgo {selected.risk}
      </h3>
      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-brand-plum/15">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-brand-plum text-white">
            <tr>
              <th className="px-3 py-2">Área</th>
              <th className="px-3 py-2">Antes</th>
              <th className="px-3 py-2">Durante</th>
              <th className="px-3 py-2">Después</th>
            </tr>
          </thead>
          <tbody>
            {selected.phases.map((phase) => (
              <tr key={phase.area} className="odd:bg-white even:bg-brand-cream/40">
                <td className="border-t border-brand-plum/10 px-3 py-2 font-semibold text-brand-orange">
                  {phase.area}
                </td>
                <td className="border-t border-brand-plum/10 px-3 py-2">{phase.before}</td>
                <td className="border-t border-brand-plum/10 px-3 py-2">{phase.during}</td>
                <td className="border-t border-brand-plum/10 px-3 py-2">{phase.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-plum">
          Procesos afectados
        </h4>
        <ul className="list-disc space-y-1 pl-5 text-sm text-brand-plum-ink">
          {selected.processes.map((process) => (
            <li key={process}>{process}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

In `SigRoomPage.tsx`:

```tsx
import { assetUrl } from '@/lib/assetUrl';
import { SpreadsheetViewer } from './viewers/SpreadsheetViewer';
import { EmergencyBoard } from './EmergencyBoard';
```

After `DeliverableViewer`:

```tsx
        <section
          className="w-full min-w-0 border-t border-brand-plum/10 pt-8"
          aria-label={topic.kind === 'text' ? 'Documento del tema' : 'Entregable adjunto'}
        >
          <DeliverableViewer topic={topic} />
          {topic.files[1]?.endsWith('.xlsx') ? (
            <div className="mt-8">
              <SpreadsheetViewer
                src={assetUrl(topic.files[1])}
                downloadHref={assetUrl(topic.files[1])}
              />
            </div>
          ) : null}
        </section>
```

Mount `<EmergencyBoard />` when `topic.slug === 'emergencias'`, next to the other aids.

- [ ] **Step 5: Run room tests, full suite, and typecheck**

Run: `npm test && npx tsc -b --pretty false`

Expected: all tests PASS; `tsc` clean.

- [ ] **Step 6: Commit**

```bash
git add src/content/sig.emergencies.ts src/features/sig/EmergencyBoard.tsx src/features/sig/EmergencyBoard.test.tsx src/features/sig/SigRoomPage.tsx src/features/sig/SigRoomPage.test.tsx
git commit -m "$(cat <<'EOF'
Show emergency before/during/after boards with the infographic and workbook.

EOF
)"
```

---

## Spec coverage

| Spec § | Task |
|---|---|
| 3 IA ready 12–14, keyboard 1–14 | 1 |
| 4 Lobby ISO map + gaps | 2 |
| 5 Control 5×3 + spreadsheet | 3 |
| 6 Indicators + Recharts + PDF | 4 |
| 7 Emergencias board + png + xlsx | 5 |
| 8 Modules / no new kind | 2–5 |
| 9 Tests listed | 1–5 |
| 10 No invented 9.2/9.3/10.2, no PDF parse, no 3×3 React heatmaps | all tasks |
