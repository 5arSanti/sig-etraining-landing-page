# Design spec: salas SIG 12–14 listas y mapa de auditoría ISO

Date: 2026-11-08  
Status: approved in brainstorming (approach A + Recharts on monitoring).  
Parent specs: `docs/superpowers/specs/2026-08-18-etraining-sig-landing-design.md`, `docs/superpowers/specs/2026-11-05-sig-iso-extension-design.md`.

## 1. Purpose

Replace the three placeholder SIG rooms with the Grupo 2 deliverables now in `assets/`, so an evaluator can:

1. Read operational controls, monitoring results, and emergency plans without leaving the theater.
2. See original files (xlsx / PDF / PNG) under a typed reading aid.
3. Jump from ISO clause numbers on the lobby to the room that holds the evidence.

This is still an academic document theater, not a certified IMS and not the corporate site.

## 2. Decisions locked

- **Approach:** typed reading aids (SIPOC pattern) plus original attachments. Recharts only on seguimiento, with brand colors, tooltips, and grouped baseline / result / target bars.
- **Hybrid layout in rooms 12–14:** explanation and interactive aid above; original file(s) full width below, with “Ver a detalle” / download as today.
- **ISO map:** compact lobby block “Qué ver en auditoría” (option B). Clause citations also appear in each room body. No 15th room.
- **Source gaps (approved copy, already written into the Excel files):**
  - Control operacional process 5: Calidad (pedagogy **and** licenses) + SI + SST (ergonomics). The duplicate Calidad row is gone.
  - Emergencias: thunderstorm now has five affected processes.
- **Do not parse the seguimiento PDF in the browser.** Indicator numbers are typed from the November 2026 informe.
- **No mockups** during design. No Chart.js. No inventing 9.2 / 9.3 / 10.2 rooms.

The parent ISO-extension spec still applies except: topics 12–14 are **ready**, keyboard walks **1–14**, and essence video / rooms 8–11 stay as shipped.

## 3. Information architecture

Routes unchanged: `/`, `/nosotros`, `/sig`, `/sig/:slug`.

| Nº | Slug | Title | Kind | ISO tag | Status |
|---|---|---|---|---|---|
| 12 | `control-operacional` | Control operacional | spreadsheet | 9001 / 14001 / 45001 / 27001 | ready |
| 13 | `seguimiento-medicion` | Seguimiento y medición | pdf | 9001 / 14001 / 45001 / 27001 | ready |
| 14 | `emergencias` | Emergencias | image (+ xlsx) | 14001 / 45001 / 27001 | ready |

Lobby cards drop “Contenido en construcción”. CTA stays “Ver entregable”.

Keyboard previous/next and the “n / total” counter use all fourteen ready topics. `riesgos-calidad` → `control-operacional` → `seguimiento-medicion` → `emergencias`; next of `emergencias` is null.

## 4. Lobby — “Qué ver en auditoría”

Place a compact four-column block under `SIG_LOBBY_INTRO`, above the topic grid. Title: **Qué ver en auditoría**. Intro sentence: the links point to evidence in this theater; they are not a certification.

| Norma | Links (numeral → room) |
|---|---|
| ISO 9001 | 4.1 PESTEL · 4.2 Interesados · 4.4 SIPOC y mapa · 5.2 Política · 6.1 Riesgos de calidad · 8.1 Control operacional · 9.1 Seguimiento |
| ISO 14001 | 6.1.2 Aspectos e impactos · 8.1 Control operacional · 8.2 Emergencias · 9.1 Seguimiento (A1–A3) |
| ISO 45001 | 6.1.2 VPIR · 8.1 Control operacional · 8.2 Emergencias · 9.1 Seguimiento (S1–S3) |
| ISO 27001 | 6.1 Riesgos de SI · 8.1 Control operacional · 9.1 Seguimiento (I1–I3) · Continuidad en Emergencias |

Honest gaps, visible in the same block (muted, not links): **9.2** auditoría interna, **9.3** revisión por la dirección, **10.2** no conformidad como procedimiento. RACI and infografía stay context, not clause chips.

Each numeral is a `Link` to the room slug. 4.4 may point to `entradas-salidas` (SIPOC) with mapa reachable from that room’s next control; implement as two links: SIPOC and mapa.

## 5. Room 12 — Control operacional

Source: `assets/12-control-operacional/SIG - Control operacional C3 .xlsx` → `public/sig/control-operacional/12-control-operacional.xlsx`.

Body names the five processes, states 3 controls each (SST / SI / ambiental / calidad, three of the four families per process), and cites **ISO 9001/14001/45001 8.1** and **ISO 27001 8.1**.

Reading aid: `OperationalControlTable` grouped by process. Columns: tipo, control, evidencia.

| # | Process | Controls (type) |
|---|---|---|
| 1 | Desarrollo de software a la medida | SI (secretos/MFA), Calidad (checklist paso a producción), Ambiental (auto-scaling / apagado) |
| 2 | Gestión de infraestructura tecnológica y mesa de ayuda | SST (LOTO/RETIE), Ambiental (RAEE), SI (borrado seguro) |
| 3 | STEAM e innovación educativa | SST (HEPA/PLA/guantes), Ambiental (residuos de filamento), Calidad (guía de laboratorio) |
| 4 | Logística y dotación tecnológica | SST (PESV), Ambiental (gases/rutas), Calidad (acta de entrega) |
| 5 | Diseño de contenidos y experiencias de aprendizaje | Calidad (revisión pedagógica **y** licencias Ley 23/1915), SI (clasificación y anonimización), SST (pausas activas y puesto ergonómico) |

Attachment: `SpreadsheetViewer` on the xlsx (`kind: 'spreadsheet'`). No Recharts.

## 6. Room 13 — Seguimiento y medición

Source: `assets/13-seguimiento-y-medicion/Informe Seguimiento y Medicion E-Training.pdf` → `public/sig/seguimiento-medicion/13-informe-seguimiento-medicion.pdf`.

Body: twelve indicators (3 ambiental, 3 SST, 3 SI, 3 procesos), línea base septiembre 2026 vs resultado octubre 2026 vs meta. Cite **ISO 9001/14001/45001/27001 9.1**. State that the comparison in the informe is **simulated** and that 4 of 12 meet the target (33.3 %), which is not a certification level.

### 6.1 Typed indicator set

`higherBetter` false means the target is a ceiling (A1, A2, I2).

| Code | Name | Unit | Sep | Oct | Target | higherBetter | Status |
|---|---|---|---|---|---|---|---|
| A1 | Consumo de energía | kWh | 1200 | 1050 | 1000 | no | Mejora, no cumple |
| A2 | Consumo de agua | m³ | 45 | 38 | 40 | no | Cumple |
| A3 | Separación de residuos aprovechables | % | 55 | 72 | 80 | yes | Mejora, no cumple |
| S1 | Inspecciones SST ejecutadas | % | 70 | 90 | 95 | yes | Mejora, no cumple |
| S2 | Participación en formación SST | % | 65 | 88 | 90 | yes | Mejora, no cumple |
| S3 | Condiciones inseguras corregidas | % | 60 | 85 | 85 | yes | Cumple |
| I1 | Copias de seguridad ejecutadas | % | 80 | 96 | 98 | yes | Mejora, no cumple |
| I2 | Incidentes reportados | n | 6 | 3 | 2 | no | Mejora, no cumple |
| I3 | Personal formado en seguridad | % | 60 | 90 | 90 | yes | Cumple |
| P1 | Satisfacción de participantes | % | 82 | 91 | 90 | yes | Cumple |
| P2 | Capacitaciones realizadas | % | 75 | 92 | 95 | yes | Mejora, no cumple |
| P3 | Peticiones atendidas a tiempo | % | 68 | 89 | 90 | yes | Mejora, no cumple |

Each row also stores short ficha fields from the PDF: formula, source, owner, interpretation, action. Do not invent extra months or values.

### 6.2 Dashboard (Recharts)

`IndicatorDashboard` above the PDF:

1. Summary: **4 de 12 cumplen meta**. Four chips (Ambiental / SST / Información / Procesos) each 1/3.
2. Filter: Todos \| Ambiental \| SST \| Información \| Procesos.
3. Grouped bar chart: one group per visible indicator; three bars — línea base (plum), resultado (orange), meta (amber). Tooltip: values and gap to target. Entrance animation allowed. I2 uses a numeric axis; others may share a % axis **or** split I2 into its own small chart so % bars are not crushed — prefer **two charts** if I2 is in the current filter (counts vs percentages).
4. Accessible table under the chart: código, nombre, sep, oct, meta, Δ, estado. Δ is oct − sep with unit. Status color: cumple = green-ish brand-safe; mejora no cumple = orange. The table is the accessible equivalent of the chart (`aria` on the SVG, table always present).
5. Expanding a row shows the ficha (formula, fuente, responsable, acción). One row open at a time is enough.

If Recharts fails to mount, the table and summary remain. No autoplay video. Attachment: existing `PdfViewer`.

## 7. Room 14 — Emergencias

Sources:

- `assets/14-emergencias/impacto y riesgo.png` → `public/sig/emergencias/14-impacto-riesgo.png`
- `assets/14-emergencias/matriz_desastres_naturales.xlsx` → `public/sig/emergencias/14-matriz-desastres.xlsx`

`kind: 'image'`. `files: [png, xlsx]`. After `DeliverableViewer` (image + lightbox), `SigRoomPage` renders `SpreadsheetViewer` for `files[1]`.

Body cites **ISO 14001 8.2** and **ISO 45001 8.2**, plus continuity/backups (27001) and operational continuity (9001). Lobby chip: **14001 / 45001 / 27001**.

`EmergencyBoard`: event selector (Terremoto — Riesgo crítico; Inundación / Deslizamiento / Tormenta eléctrica — Riesgo alto). For the selected event:

- Table Área × Antes / Durante / Después (Organizacional, Ambiental, SST, SI). Copy is the Excel text; do not rewrite.
- List of affected processes.

Thunderstorm processes (approved): Tecnología y plataformas LMS; Ejecución de la formación; Gestión documental y de datos; Gestión administrativa y financiera; Gestión del talento humano.

The PNG is the probability × impact visual; do not rebuild those 3×3 matrices in React.

## 8. Components and data

| Module | Role |
|---|---|
| `src/content/sig.controls.ts` | 15 operational control rows |
| `src/content/sig.indicators.ts` | 12 indicators + fichas + summary 4/12 |
| `src/content/sig.emergencies.ts` | 4 events, 4 areas, process lists |
| `src/content/sig.isoClauses.ts` | lobby clause links + gap list |
| `src/features/sig/OperationalControlTable.tsx` | grouped 5×3 table |
| `src/features/sig/IndicatorDashboard.tsx` | summary, filter, Recharts, table, ficha |
| `src/features/sig/EmergencyBoard.tsx` | event selector + matrices |
| `src/features/sig/IsoClauseMap.tsx` | lobby four-column block |
| `src/features/sig/SigRoomPage.tsx` | mount aids; second-file spreadsheet |
| `src/features/sig/SigLobbyPage.tsx` | IsoClauseMap under intro |
| `src/content/sig.manifest.ts` | kinds, files, bodies, isoTag; drop owner/scope placeholder copy |

`DeliverableKind` does not add a new kind. Aids sit beside the viewer like `SipocTable`. Recharts is the only new runtime dependency.

Spanish UI. Brand tokens only (plum / orange / amber). Visitor mode stays Read in SIG.

## 9. Errors, accessibility, testing

- PDF/xlsx: existing loading / error / download.
- Chart: decorative relative to the table; do not ship chart-only data.
- Filters and event selector are buttons with accessible names in Spanish.
- Keyboard: arrows walk 1–14; still ignored while a lightbox is open.

Tests:

- Manifest length 14; ready 14; placeholders 0.
- `getAdjacentSlug('riesgos-calidad', 'next') === 'control-operacional'`; `getAdjacentSlug('emergencias', 'next') === null`.
- Lobby: fourteen titles, **no** “Contenido en construcción”, and “Qué ver en auditoría” plus at least 9001 8.1 and 14001 8.2 links.
- Control room: text “LOTO” (or RETIE) and spreadsheet download.
- Seguimiento: “A1” (or “Consumo de energía”), summary “4 de 12”, PDF title/iframe.
- Emergencias: “Terremoto” and the infographic `img`.
- IsoClauseMap: link href `/sig/control-operacional` for 8.1 9001.

## 10. Out of scope

- Inventing 9.2 / 9.3 / 10.2 deliverables or extra indicator months.
- Parsing the PDF at runtime.
- Rebuilding emergency 3×3 heatmaps in React.
- Chart.js, Nivo, or a fifth ISO hub page.
- Autoplay, new company routes, CMS.
- Changing Home / Nosotros / rooms 1–11 except lobby clause map and navigation totals.

## 11. Implementation order

1. Copy the four public files; extend manifest (ready 12–14) and navigation tests.
2. `IsoClauseMap` on the lobby.
3. Control table + spreadsheet room.
4. Indicator dashboard + Recharts + PDF room.
5. Emergency board + image + second spreadsheet.
6. Tests in §9.

Visitor modes stay Persuade on Home/Nosotros and Read in the SIG.
