# SIG ISO extension Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add SIG topics 8–14 (four matrices + three honest placeholders) and replace the Home essence photo with the YouTube embed `dzgA7FLmvsA`, without inventing ISO content that is still unwritten.

**Architecture:** Extend `sig.manifest.ts` as the only SIG index. New `kind: 'spreadsheet'` drives a plain SheetJS table. PDFs reuse `PdfViewer`. Placeholders carry owner and scope. Home essence reads video ids from `company.ts`.

**Tech Stack:** Existing Vite + React 19 + TypeScript + React Router 7 + Tailwind 4 + Vitest + Testing Library + SheetJS (`xlsx`).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-11-05-sig-iso-extension-design.md`. Parent landing spec still applies except: essence **does** embed YouTube; política and infografía are already ready.
- Spanish UI only. Do not invent operational controls, indicator baselines, emergency plans, financials, or reorganization claims.
- Routes stay `/`, `/nosotros`, `/sig`, `/sig/:slug`.
- Document theater: explanation above, attachment full width below. Do not transcribe PDFs 8–10 into HTML tables.
- `kind: 'xlsx'` remains RACI-only. Quality uses `kind: 'spreadsheet'`.
- Placeholders 12–14 are visible, skipped by keyboard prev/next.
- No autoplay on the YouTube iframe. `rel=0`. Fallback text link to the watch URL.
- Exhaustive `switch` on `DeliverableKind`. Tests: Vitest + Testing Library. No Playwright.
- Copy assets into `public/sig/<slug>/` with the ASCII names in the spec; keep originals in `assets/`.

## File map

| Path | Responsibility |
|---|---|
| `public/sig/aspectos-impactos/8-matriz-aspectos-impactos.pdf` | ISO 14001 PDF |
| `public/sig/matriz-vpir/9-matriz-vpir.pdf` | ISO 45001 PDF |
| `public/sig/riesgos-seguridad-informacion/10-riesgos-seguridad-informacion.pdf` | ISO 27001 PDF |
| `public/sig/riesgos-calidad/11-riesgos-calidad.xlsx` | ISO 9001 workbook |
| `src/content/sig.manifest.ts` | Slugs, kinds, isoTag, copy, files |
| `src/content/sig.manifest.test.ts` | Length 14 / ready 11 / placeholders 3 |
| `src/content/sig.navigation.test.ts` | Keyboard skip of 12–14 |
| `src/features/sig/TopicCard.tsx` | ISO chip |
| `src/features/sig/viewers/SpreadsheetViewer.tsx` | Plain xlsx grid |
| `src/features/sig/viewers/PlaceholderState.tsx` | Owner and scope |
| `src/content/company.ts` | `videoId`, `watchUrl`, `embedTitle` |
| `src/features/company/HomePage.tsx` | Essence iframe |

---

### Task 1: Manifest, public files, and navigation

**Files:**
- Create: the four `public/sig/<slug>/` files in the file map
- Modify: `src/content/sig.manifest.ts`, `src/content/sig.manifest.test.ts`, `src/content/sig.navigation.test.ts`

**Interfaces:**
- Consumes: existing `SigTopic`, `getReadyTopics`, `getAdjacentSlug`
- Produces: `DeliverableKind` includes `'spreadsheet'`; `SigTopic.isoTag?: string`; `SigTopic.owner?: string`; `SigTopic.scope?: string`; slugs `aspectos-impactos` | `matriz-vpir` | `riesgos-seguridad-informacion` | `riesgos-calidad` | `control-operacional` | `seguimiento-medicion` | `emergencias`

- [ ] **Step 1: Write the failing manifest and navigation tests**

Replace `src/content/sig.manifest.test.ts` with:

```ts
import { describe, expect, it } from 'vitest';
import { SIG_LOBBY_INTRO, SIG_TOPICS } from './sig.manifest';

describe('SIG_TOPICS', () => {
  it('lists fourteen topics with eleven ready and three placeholders', () => {
    expect(SIG_TOPICS).toHaveLength(14);
    expect(SIG_TOPICS.map((topic) => topic.slug)).toEqual([
      'entradas-salidas',
      'pestel',
      'matriz-interesados',
      'mapa-de-procesos',
      'matriz-raci',
      'politica-sig',
      'infografia',
      'aspectos-impactos',
      'matriz-vpir',
      'riesgos-seguridad-informacion',
      'riesgos-calidad',
      'control-operacional',
      'seguimiento-medicion',
      'emergencias',
    ]);
    expect(SIG_TOPICS.filter((topic) => topic.kind === 'placeholder')).toHaveLength(3);
    expect(SIG_TOPICS.filter((topic) => topic.kind !== 'placeholder')).toHaveLength(11);
    expect(SIG_TOPICS[7]?.kind).toBe('pdf');
    expect(SIG_TOPICS[7]?.isoTag).toBe('ISO 14001');
    expect(SIG_TOPICS[10]?.kind).toBe('spreadsheet');
    expect(SIG_TOPICS[10]?.isoTag).toBe('ISO 9001');
    expect(SIG_TOPICS[11]?.owner).toBe('Rebeca');
    expect(SIG_TOPICS[12]?.owner).toBe('Dana, Mayra y Thomas');
    expect(SIG_TOPICS[13]?.owner).toBe('Nicolás');
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
  it('walks eleven ready topics and skips placeholders', () => {
    expect(getReadyTopics(SIG_TOPICS)).toHaveLength(11);
    expect(getAdjacentSlug('entradas-salidas', 'prev')).toBeNull();
    expect(getAdjacentSlug('matriz-raci', 'next')).toBe('politica-sig');
    expect(getAdjacentSlug('politica-sig', 'next')).toBe('infografia');
    expect(getAdjacentSlug('infografia', 'next')).toBe('aspectos-impactos');
    expect(getAdjacentSlug('aspectos-impactos', 'next')).toBe('matriz-vpir');
    expect(getAdjacentSlug('matriz-vpir', 'next')).toBe('riesgos-seguridad-informacion');
    expect(getAdjacentSlug('riesgos-seguridad-informacion', 'next')).toBe('riesgos-calidad');
    expect(getAdjacentSlug('riesgos-calidad', 'next')).toBeNull();
    expect(getAdjacentSlug('riesgos-calidad', 'prev')).toBe('riesgos-seguridad-informacion');
    expect(getAdjacentSlug('control-operacional', 'prev')).toBe('riesgos-calidad');
    expect(getAdjacentSlug('seguimiento-medicion', 'prev')).toBe('riesgos-calidad');
    expect(getAdjacentSlug('emergencias', 'prev')).toBe('riesgos-calidad');
    expect(getAdjacentSlug('emergencias', 'next')).toBeNull();
  });
```

- [ ] **Step 2: Run tests and confirm they fail**

Run: `npm test -- src/content/sig.manifest.test.ts src/content/sig.navigation.test.ts`

Expected: FAIL (length 7 vs 14).

- [ ] **Step 3: Copy binaries into `public/sig/`**

```bash
mkdir -p public/sig/aspectos-impactos public/sig/matriz-vpir public/sig/riesgos-seguridad-informacion public/sig/riesgos-calidad
cp "assets/8.-matriz-de-aspectos-e-impactos/8. Matriz de aspectos e impactos.pdf" public/sig/aspectos-impactos/8-matriz-aspectos-impactos.pdf
cp "assets/9-matriz-vpir/9. Matriz_VPIR_Etraining - SIG .pdf" public/sig/matriz-vpir/9-matriz-vpir.pdf
cp "assets/10-riesgos-seguridad-informacion/10. Riesgos de Seguridad de la Información.pdf" public/sig/riesgos-seguridad-informacion/10-riesgos-seguridad-informacion.pdf
cp "assets/11-riesgos-calidad/11. Riesgos de Calidad - Etraining.xlsx" public/sig/riesgos-calidad/11-riesgos-calidad.xlsx
```

- [ ] **Step 4: Extend types and `SIG_TOPICS`**

In `src/content/sig.manifest.ts` set:

```ts
export type DeliverableKind = 'image' | 'pdf' | 'xlsx' | 'spreadsheet' | 'text' | 'placeholder';

export type SigSlug =
  | 'entradas-salidas'
  | 'pestel'
  | 'matriz-interesados'
  | 'mapa-de-procesos'
  | 'matriz-raci'
  | 'politica-sig'
  | 'infografia'
  | 'aspectos-impactos'
  | 'matriz-vpir'
  | 'riesgos-seguridad-informacion'
  | 'riesgos-calidad'
  | 'control-operacional'
  | 'seguimiento-medicion'
  | 'emergencias';
```

Add to `SigTopic`: `isoTag?: string; owner?: string; scope?: string;`

Append after `infografia` (leave topics 1–7 as they are):

```ts
  {
    slug: 'aspectos-impactos',
    number: 8,
    title: 'Matriz de aspectos e impactos',
    summary: 'Cinco procesos de Etraining y su impacto ambiental.',
    isoTag: 'ISO 14001',
    body: 'La matriz identifica aspectos e impactos ambientales de cinco procesos. Léala de izquierda a derecha: actividad, aspecto, impacto, medio afectado y control sugerido. (1) Gestión de infraestructura tecnológica / soporte TI interno: RAEE al disponer equipos obsoletos; suelo y agua; gestor autorizado. (2) Logística de dotación de laboratorios STEAM: bus de 30 pasajeros; aire y GEI; mantenimiento, revisión de gases y rutas. (3) Gestión de infraestructura tecnológica: racks on-premise; energía; virtualización y monitoreo. (4) STEAM e innovación educativa: residuo de impresión 3D; suelo; segregación y reciclaje autorizado. (5) Desarrollo de software a la medida: Azure y GCP; energía indirecta; auto-scaling, apagado de ambientes ociosos y proveedores con energía renovable. El PDF es el entregable; no se reconstruye la tabla en HTML.',
    kind: 'pdf',
    files: ['/sig/aspectos-impactos/8-matriz-aspectos-impactos.pdf'],
  },
  {
    slug: 'matriz-vpir',
    number: 9,
    title: 'Matriz VPIR',
    summary: 'Valoración de peligros y riesgos (GTC 45) sobre las mismas actividades.',
    isoTag: 'ISO 45001',
    body: 'La VPIR valora peligros de SST con la metodología GTC 45, sobre las actividades de la matriz ambiental. Las columnas ND, NE, NP, NC y NR construyen el nivel de riesgo; «no aceptable» obliga a las medidas de intervención del PDF. Cuatro valoraciones: manejo de RAEE (químico, NR 300, II; control específico), bus STEAM (accidente de tránsito, NR 1800, I; PESV, límite de horas de conducción e inspección preoperacional), racks y UPS on-premise (eléctrico, NR 400, II; LOTO, RETIE y detección de incendio) e impresión 3D (químico y físico, NR 150, II; extracción HEPA/carbón, PLA y guantes térmicos). El PDF es la evidencia; no se transcribe la grilla numérica.',
    kind: 'pdf',
    files: ['/sig/matriz-vpir/9-matriz-vpir.pdf'],
  },
  {
    slug: 'riesgos-seguridad-informacion',
    number: 10,
    title: 'Riesgos de seguridad de la información',
    summary: 'Cuatro riesgos operativos sobre contratos, datos y Google Drive.',
    isoTag: 'ISO 27001',
    body: 'El entregable cubre cuatro riesgos de la operación diaria: acceso no autorizado, envío incorrecto de información sensible, pérdida o modificación no autorizada de documentos, y mala gestión de permisos en Google Drive. Las consecuencias tocan contratos, datos de clientes y carpetas por departamento. Los controles propuestos son acceso por roles con MFA, clasificación Pública / Interna / Confidencial / Reservada, versionado y respaldos, y revisión periódica de permisos. El PDF es el entregable.',
    kind: 'pdf',
    files: ['/sig/riesgos-seguridad-informacion/10-riesgos-seguridad-informacion.pdf'],
  },
  {
    slug: 'riesgos-calidad',
    number: 11,
    title: 'Riesgos de calidad',
    summary: 'Cinco actividades de PMO y auditoría con su control.',
    isoTag: 'ISO 9001',
    body: 'La hoja cubre revisión por fase, registro de hallazgos, acciones correctivas y preventivas, uso de plantillas institucionales y reportes de auditoría. El control insiste en un checklist único por fase, numeración consecutiva, responsables y fechas, versionado centralizado de formatos e independencia del rol de calidad frente al equipo ejecutor. El Excel es el entregable; se muestra como tabla, no como matriz RACI.',
    kind: 'spreadsheet',
    files: ['/sig/riesgos-calidad/11-riesgos-calidad.xlsx'],
  },
  {
    slug: 'control-operacional',
    number: 12,
    title: 'Control operacional',
    summary: 'Cinco procesos y tres controles por proceso (SST, SI, ambiente y calidad).',
    isoTag: '9001 / 14001 / 45001 / 27001',
    owner: 'Rebeca',
    scope:
      'Elegir cinco procesos de Etraining y asignar tres controles por proceso (SST, seguridad de la información, ambientales y calidad).',
    body: 'Este tema se publicará aquí.',
    kind: 'placeholder',
    files: [],
  },
  {
    slug: 'seguimiento-medicion',
    number: 13,
    title: 'Seguimiento y medición',
    summary: 'Doce indicadores con línea base y comparación.',
    isoTag: '9001 / 14001 / 45001 / 27001',
    owner: 'Dana, Mayra y Thomas',
    scope:
      'Definir doce indicadores (3 ambientales, 3 de SST, 3 de seguridad de la información y 3 de procesos) con línea base y comparación.',
    body: 'Este tema se publicará aquí.',
    kind: 'placeholder',
    files: [],
  },
  {
    slug: 'emergencias',
    number: 14,
    title: 'Emergencias',
    summary: 'Cuatro eventos: antes, durante, después y procesos afectados.',
    isoTag: '14001 / 45001',
    owner: 'Nicolás',
    scope:
      'Cuatro desastres o eventos naturales, qué hacer antes, durante y después, y qué procesos se afectan.',
    body: 'Este tema se publicará aquí.',
    kind: 'placeholder',
    files: [],
  },
```

Do **not** run `npx tsc -b` in this task. `DeliverableViewer` uses `assertNever(topic.kind)`, so adding `'spreadsheet'` to the union fails typecheck until Task 3 adds the case. Vitest still compiles these content tests.

- [ ] **Step 5: Re-run the two content tests**

Run: `npm test -- src/content/sig.manifest.test.ts src/content/sig.navigation.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add public/sig/aspectos-impactos public/sig/matriz-vpir public/sig/riesgos-seguridad-informacion public/sig/riesgos-calidad src/content/sig.manifest.ts src/content/sig.manifest.test.ts src/content/sig.navigation.test.ts
git commit -m "$(cat <<'EOF'
Add SIG topics 8–14 and copy the four ISO matrices into public/.

EOF
)"
```

---

### Task 2: Lobby cards, ISO chips, construction labels

**Files:**
- Modify: `src/features/sig/TopicCard.tsx`, `src/features/sig/SigLobbyPage.test.tsx`

**Interfaces:**
- Consumes: `topic.isoTag`, `topic.kind`
- Produces: ISO chip when `isoTag` is set; lobby shows 14 titles and 3 construction labels

- [ ] **Step 1: Write the failing lobby test**

Replace `src/features/sig/SigLobbyPage.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { SIG_TOPICS } from '@/content/sig.manifest';
import { SigLobbyPage } from './SigLobbyPage';

describe('SigLobbyPage', () => {
  it('renders fourteen topic cards and three construction labels', () => {
    render(
      <MemoryRouter>
        <SigLobbyPage />
      </MemoryRouter>,
    );

    for (const topic of SIG_TOPICS) {
      expect(screen.getByText(topic.title)).toBeInTheDocument();
    }
    expect(screen.getAllByText('Contenido en construcción')).toHaveLength(3);
    expect(screen.getByText('ISO 14001')).toBeInTheDocument();
    expect(screen.getByText('ISO 45001')).toBeInTheDocument();
    expect(screen.getByText('ISO 27001')).toBeInTheDocument();
    expect(screen.getByText('ISO 9001')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Control operacional/i })).toHaveAttribute(
      'href',
      '/sig/control-operacional',
    );
  });
});
```

- [ ] **Step 2: Run lobby test**

Run: `npm test -- src/features/sig/SigLobbyPage.test.tsx`

Expected: FAIL on ISO chips if they are not rendered.

- [ ] **Step 3: Show `isoTag` on `TopicCard`**

After the title row in `src/features/sig/TopicCard.tsx`:

```tsx
      {topic.isoTag ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-orange">
          {topic.isoTag}
        </p>
      ) : null}
```

Keep “Contenido en construcción” for `kind === 'placeholder'` and keep the CTA “Ver entregable” (already in the card). Omit the chip when `isoTag` is missing (topics 1–7).

- [ ] **Step 4: Re-run lobby test**

Run: `npm test -- src/features/sig/SigLobbyPage.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/sig/TopicCard.tsx src/features/sig/SigLobbyPage.test.tsx
git commit -m "$(cat <<'EOF'
Show ISO tags and three construction cards on the SIG lobby.

EOF
)"
```

---

### Task 3: Spreadsheet viewer for quality risks

**Files:**
- Create: `src/features/sig/viewers/SpreadsheetViewer.tsx`, `src/features/sig/viewers/SpreadsheetViewer.test.tsx`
- Modify: `src/features/sig/viewers/DeliverableViewer.tsx`, `src/features/sig/viewers/DeliverableViewer.test.tsx`

**Interfaces:**
- Consumes: `topic.kind === 'spreadsheet'`, `topic.files[0]`
- Produces: `SpreadsheetViewer({ src: string; downloadHref: string })` with loading `Cargando hoja…`, error `No se pudo leer el Excel.` plus download, and a table without RACI legend

- [ ] **Step 1: Write SpreadsheetViewer tests**

Create `src/features/sig/viewers/SpreadsheetViewer.test.tsx`:

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as XLSX from 'xlsx';
import { SpreadsheetViewer } from './SpreadsheetViewer';

describe('SpreadsheetViewer', () => {
  it('renders sheet rows and a download link', async () => {
    const originalFetch = global.fetch;
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      book,
      XLSX.utils.aoa_to_sheet([
        ['Actividad', 'Riesgo', 'Control'],
        ['Revisión por fase', 'Revisión superficial', 'Checklist único'],
      ]),
      'Hoja1',
    );
    const buffer = XLSX.write(book, { type: 'array', bookType: 'xlsx' }) as ArrayBuffer;
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        arrayBuffer: () => Promise.resolve(buffer),
      } as Response),
    );

    render(
      <SpreadsheetViewer
        src="/sig/riesgos-calidad/11-riesgos-calidad.xlsx"
        downloadHref="/sig/riesgos-calidad/11-riesgos-calidad.xlsx"
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Checklist único')).toBeInTheDocument();
    });
    expect(screen.queryByText('Leyenda RACI')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /descargar/i })).toHaveAttribute(
      'href',
      '/sig/riesgos-calidad/11-riesgos-calidad.xlsx',
    );
    global.fetch = originalFetch;
  });

  it('shows error and download when fetch fails', async () => {
    const originalFetch = global.fetch;
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));
    render(
      <SpreadsheetViewer
        src="/sig/riesgos-calidad/11-riesgos-calidad.xlsx"
        downloadHref="/sig/riesgos-calidad/11-riesgos-calidad.xlsx"
      />,
    );
    await waitFor(() => {
      expect(screen.getByText('No se pudo leer el Excel.')).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: /descargar/i })).toBeInTheDocument();
    global.fetch = originalFetch;
  });
});
```

- [ ] **Step 2: Run SpreadsheetViewer tests**

Run: `npm test -- src/features/sig/viewers/SpreadsheetViewer.test.tsx`

Expected: FAIL (module not found).

- [ ] **Step 3: Implement `SpreadsheetViewer`**

Create `src/features/sig/viewers/SpreadsheetViewer.tsx`. Do not import `RaciGrid` or `classifyRaciCell`.

```tsx
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { DownloadLink } from './DownloadLink';

interface SpreadsheetViewerProps {
  src: string;
  downloadHref: string;
}

type SheetTable = {
  name: string;
  rows: string[][];
};

type ViewerState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; sheets: SheetTable[]; active: number };

function cellText(value: unknown): string {
  if (value == null) return '';
  return String(value);
}

function parseWorkbook(buffer: ArrayBuffer): SheetTable[] {
  const book = XLSX.read(buffer, { type: 'array' });
  return book.SheetNames.map((name) => {
    const sheet = book.Sheets[name];
    const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet ?? {}, {
      header: 1,
      defval: '',
      raw: false,
    });
    return {
      name,
      rows: rows.map((row) => (Array.isArray(row) ? row.map(cellText) : [])),
    };
  }).filter((sheet) => sheet.rows.some((row) => row.some((cell) => cell.trim() !== '')));
}

export function SpreadsheetViewer({ src, downloadHref }: SpreadsheetViewerProps) {
  const [state, setState] = useState<ViewerState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });

    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.arrayBuffer();
      })
      .then((buffer) => {
        if (cancelled) return;
        setState({ status: 'ready', sheets: parseWorkbook(buffer), active: 0 });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (state.status === 'loading') {
    return (
      <div className="flex items-center justify-center rounded-lg bg-white p-8 shadow-sm">
        <p className="text-brand-charcoal">Cargando hoja…</p>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="space-y-4">
        <div className="rounded-lg bg-red-50 p-4 text-red-800">
          <p>No se pudo leer el Excel.</p>
        </div>
        <DownloadLink href={downloadHref} />
      </div>
    );
  }

  const sheet = state.sheets[state.active];

  return (
    <div className="space-y-4">
      {state.sheets.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {state.sheets.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setState({ ...state, active: index })}
              className={`rounded-[var(--radius-pill)] px-3 py-1.5 text-sm font-semibold ${
                index === state.active
                  ? 'bg-brand-plum text-white'
                  : 'bg-white text-brand-plum ring-1 ring-brand-plum/20'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      ) : null}
      <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="min-w-full text-left text-sm text-brand-plum-ink">
          <tbody>
            {(sheet?.rows ?? []).map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-brand-plum/10">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-3 py-2 ${rowIndex === 0 ? 'font-semibold text-brand-plum' : ''}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DownloadLink href={downloadHref} />
    </div>
  );
}
```

- [ ] **Step 4: Wire `DeliverableViewer`**

Import `SpreadsheetViewer`. Insert before `case 'text'`:

```tsx
    case 'spreadsheet':
      return <SpreadsheetViewer src={file} downloadHref={file} />;
```

Keep `case 'xlsx'` on `XlsxViewer`. Add this test to `DeliverableViewer.test.tsx`:

```tsx
  it('does not show the RACI legend for a spreadsheet topic', async () => {
    const originalFetch = global.fetch;
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));
    render(
      <DeliverableViewer
        topic={topic({
          kind: 'spreadsheet',
          title: 'Riesgos de calidad',
          slug: 'riesgos-calidad',
          files: ['/sig/riesgos-calidad/11-riesgos-calidad.xlsx'],
        })}
      />,
    );
    await waitFor(() => {
      expect(screen.getByText('No se pudo leer el Excel.')).toBeInTheDocument();
    });
    expect(screen.queryByText('Leyenda RACI')).not.toBeInTheDocument();
    global.fetch = originalFetch;
  });
```

- [ ] **Step 5: Run viewer tests and typecheck**

Run: `npm test -- src/features/sig/viewers/SpreadsheetViewer.test.tsx src/features/sig/viewers/DeliverableViewer.test.tsx && npx tsc -b --pretty false`

Expected: PASS; `tsc` clean.

- [ ] **Step 6: Commit**

```bash
git add src/features/sig/viewers/SpreadsheetViewer.tsx src/features/sig/viewers/SpreadsheetViewer.test.tsx src/features/sig/viewers/DeliverableViewer.tsx src/features/sig/viewers/DeliverableViewer.test.tsx
git commit -m "$(cat <<'EOF'
Render quality-risk workbooks as a plain spreadsheet, not a RACI grid.

EOF
)"
```

---

### Task 4: Placeholder rooms with owner and scope

**Files:**
- Modify: `src/features/sig/viewers/PlaceholderState.tsx`, `src/features/sig/viewers/DeliverableViewer.tsx`, `src/features/sig/viewers/DeliverableViewer.test.tsx`

**Interfaces:**
- Consumes: `topic.owner`, `topic.scope`, `topic.title`
- Produces: `PlaceholderState({ title?: string; owner?: string; scope?: string })`

- [ ] **Step 1: Extend the placeholder test**

Replace the construction empty-state test in `DeliverableViewer.test.tsx` with:

```tsx
  it('shows owner, scope, and the construction empty state for placeholders', () => {
    render(
      <DeliverableViewer
        topic={topic({
          kind: 'placeholder',
          title: 'Control operacional',
          slug: 'control-operacional',
          files: [],
          owner: 'Rebeca',
          scope: 'Cinco procesos y tres controles por proceso.',
        })}
      />,
    );
    expect(screen.getByText('Control operacional')).toBeInTheDocument();
    expect(screen.getByText('Rebeca')).toBeInTheDocument();
    expect(screen.getByText('Cinco procesos y tres controles por proceso.')).toBeInTheDocument();
    expect(screen.getByText('Este tema se publicará aquí.')).toBeInTheDocument();
    expect(screen.getByText('Contenido en construcción')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /descargar/i })).not.toBeInTheDocument();
  });
```

- [ ] **Step 2: Run the test**

Run: `npm test -- src/features/sig/viewers/DeliverableViewer.test.tsx`

Expected: FAIL (owner/scope missing).

- [ ] **Step 3: Implement `PlaceholderState` and pass props**

```tsx
type PlaceholderStateProps = {
  title?: string;
  owner?: string;
  scope?: string;
};

export function PlaceholderState({ title, owner, scope }: PlaceholderStateProps) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-brand-plum/25 bg-brand-cream/40 p-8">
      <p className="font-semibold text-brand-plum">Contenido en construcción</p>
      {title ? <p className="mt-2 text-xl font-bold text-brand-plum-ink">{title}</p> : null}
      {owner ? <p className="mt-2 text-sm font-medium text-brand-orange">{owner}</p> : null}
      {scope ? <p className="mt-3 text-brand-plum-ink/85">{scope}</p> : null}
      <p className="mt-4 text-brand-muted">Este tema se publicará aquí.</p>
    </div>
  );
}
```

In `DeliverableViewer`:

```tsx
    case 'placeholder':
      return (
        <PlaceholderState title={topic.title} owner={topic.owner} scope={topic.scope} />
      );
```

- [ ] **Step 4: Re-run tests**

Run: `npm test -- src/features/sig/viewers/DeliverableViewer.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/sig/viewers/PlaceholderState.tsx src/features/sig/viewers/DeliverableViewer.tsx src/features/sig/viewers/DeliverableViewer.test.tsx
git commit -m "$(cat <<'EOF'
Name placeholder SIG rooms with owner and scope, without fake content.

EOF
)"
```

---

### Task 5: Essence YouTube embed

**Files:**
- Modify: `src/content/company.ts`, `src/features/company/HomePage.tsx`, `src/features/company/HomePage.test.tsx`

**Interfaces:**
- Consumes: `essence.videoId`, `essence.watchUrl`, `essence.embedTitle`
- Produces: iframe `src` contains `dzgA7FLmvsA` and a visible “Ver en YouTube” link; no circular photo overlay

- [ ] **Step 1: Write the failing Home assertion**

Add inside the existing `HomePage` test after the tenure assertion:

```ts
    const video = screen.getByTitle('Video de esencia de Etraining');
    expect(video.tagName).toBe('IFRAME');
    expect(video).toHaveAttribute('src', expect.stringContaining('dzgA7FLmvsA'));
    expect(screen.getByRole('link', { name: /ver en youtube/i })).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=dzgA7FLmvsA',
    );
```

- [ ] **Step 2: Run Home test**

Run: `npm test -- src/features/company/HomePage.test.tsx`

Expected: FAIL (no iframe title).

- [ ] **Step 3: Content + Home markup**

Replace `essence` in `src/content/company.ts` with:

```ts
export const essence = {
  heading: 'Nuestra esencia:',
  body: 'Pasión por la innovación educativa.',
  cta: 'Conoce más',
  videoId: 'dzgA7FLmvsA',
  watchUrl: 'https://www.youtube.com/watch?v=dzgA7FLmvsA',
  embedTitle: 'Video de esencia de Etraining',
};
```

Remove `mediaSrc` and `backdropSrc`.

Replace the circular photo block in `HomePage.tsx` (the `relative mx-auto mb-10 max-w-3xl …` wrapper and its children) with:

```tsx
          <div className="relative mx-auto mb-10 max-w-3xl overflow-hidden rounded-[1.25rem] bg-brand-plum-deep p-4 shadow-[0_10px_30px_rgba(64,10,62,0.35)] md:p-6">
            <span
              className="pointer-events-none absolute left-[8%] top-6 h-16 w-16 rounded-full bg-brand-plum opacity-80"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute bottom-8 right-[6%] h-28 w-28 rounded-full bg-brand-amber/80"
              aria-hidden="true"
            />
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
              <iframe
                title={essence.embedTitle}
                src={`https://www.youtube.com/embed/${essence.videoId}?rel=0`}
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="relative mt-4">
              <a
                href={essence.watchUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-brand-amber underline-offset-2 hover:underline"
              >
                Ver en YouTube
              </a>
            </p>
          </div>
```

Do not put `autoplay=1` in the src. Keep heading, body, and «Conoce más».

- [ ] **Step 4: Run Home test and full suite**

Run: `npm test && npx tsc -b --pretty false`

Expected: all tests PASS; `tsc` clean.

- [ ] **Step 5: Commit**

```bash
git add src/content/company.ts src/features/company/HomePage.tsx src/features/company/HomePage.test.tsx
git commit -m "$(cat <<'EOF'
Embed the Etraining essence video on Home without autoplay.

EOF
)"
```

---

## Spec coverage

| Spec § | Task |
|---|---|
| 3 IA 1–14, ISO tags, keyboard skips placeholders | 1, 2 |
| 4 Essence YouTube, no autoplay, fallback link | 5 |
| 5 Rooms 8–10 PDF copy + public paths | 1 |
| 5.11 spreadsheet kind, not RACI | 3 |
| 6 Placeholders owner/scope, no download | 1, 4 |
| 8 Tests listed | 1–5 |
| 9 No invented ISO content | all tasks |
