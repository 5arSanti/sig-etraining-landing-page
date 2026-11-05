# Design spec: SIG ISO extension, essence video, audit placeholders

Date: 2026-11-05  
Status: approved in brainstorming (approach A).  
Parent spec: `docs/superpowers/specs/2026-08-18-etraining-sig-landing-design.md`.

## 1. Purpose

Extend the existing Etraining SIG landing so an evaluator can:

1. Watch the official essence video on Home without leaving the page.
2. Open four new SIG rooms whose original matrices are already in `assets/` (environmental aspects, VPIR, information-security risks, quality risks).
3. See three future ISO rooms as honest empty states (operational control, monitoring, emergencies), named with owner and scope, with no invented numbers or plans.

This is still Grupo 2’s academic document theater, not the corporate site. Brand, routes, and chrome stay.

## 2. Decisions locked

- **Approach A:** extend the document theater; do not transcribe the four new matrices into React tables.
- **Lobby:** one numbered index 1–14, ISO tags on cards, no separate hub per standard.
- **Viewers:** explanation plus original attachment (PDF or xlsx), same layout as current rooms (copy above, attachment full width below, “Ver a detalle”).
- **Video:** replace the circular essence photo and fake play button with a YouTube embed of `dzgA7FLmvsA`. No autoplay.
- **Pending ISO work:** visible placeholders. Do not invent 5×3 controls, 12 indicators, or 4 emergency plans.

## 3. Information architecture

Routes unchanged: `/`, `/nosotros`, `/sig`, `/sig/:slug`.

Lobby cards, in this order:

| Nº | Slug | Title | Kind | Status | ISO tag |
|---|---|---|---|---|---|
| 1 | `entradas-salidas` | Entradas y Salidas (SIPOC) | image | ready | (context) |
| 2 | `pestel` | Contexto PESTEL | pdf | ready | (context) |
| 3 | `matriz-interesados` | Matriz de Interesados | pdf | ready | (context) |
| 4 | `mapa-de-procesos` | Mapa de Procesos | pdf | ready | (context) |
| 5 | `matriz-raci` | Matriz RACI | xlsx (RACI grid) | ready | (context) |
| 6 | `politica-sig` | Política del SIG | text | ready | (context) |
| 7 | `infografia` | Infografía del SIG | image | ready | (context) |
| 8 | `aspectos-impactos` | Matriz de aspectos e impactos | pdf | ready | ISO 14001 |
| 9 | `matriz-vpir` | Matriz VPIR | pdf | ready | ISO 45001 |
| 10 | `riesgos-seguridad-informacion` | Riesgos de seguridad de la información | pdf | ready | ISO 27001 |
| 11 | `riesgos-calidad` | Riesgos de calidad | xlsx (plain table) | ready | ISO 9001 |
| 12 | `control-operacional` | Control operacional | placeholder | empty | 9001 / 14001 / 45001 / 27001 |
| 13 | `seguimiento-medicion` | Seguimiento y medición | placeholder | empty | 9001 / 14001 / 45001 / 27001 |
| 14 | `emergencias` | Emergencias | placeholder | empty | 14001 / 45001 |

Keyboard previous/next and the “n / total” counter use **ready** topics only (1–11). Placeholders stay reachable from the lobby and from a direct URL.

`TopicCard` shows an ISO tag when present. Placeholder cards keep “Contenido en construcción” and the Spanish CTA “Ver entregable” (the room then shows the empty state).

## 4. Home — essence video

Keep the orange/amber essence band, heading “Nuestra esencia:”, body “Pasión por la innovación educativa.”, and “Conoce más” to `/nosotros`.

Replace the circular photo and decorative play icon with a 16:9 iframe:

- URL: `https://www.youtube.com/embed/dzgA7FLmvsA`
- Accessible `title` in Spanish (e.g. “Video de esencia de Etraining”).
- `loading="lazy"`, `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"`, `allowFullScreen`.
- Query: `rel=0`. **No autoplay.**
- Container: rounded plum card, optional amber/plum circles as decoration that must not cover player controls.

If the iframe cannot load, keep a visible text link to `https://www.youtube.com/watch?v=dzgA7FLmvsA`. Do not add the video on SIG pages.

`essence.mediaSrc` / fake play overlay go away from Home. Store the embed id in company content, not hardcoded in JSX beyond that module.

## 5. New ready rooms (8–11)

Same room chrome and vertical layout as today. Copy is typed in `sig.manifest.ts` (summary + body). Files move from `assets/` to `public/sig/<slug>/` with stable ASCII names. `DeliverableViewer` stays the single switch on `kind`.

### 8. Aspectos e impactos — ISO 14001

Source: `assets/8.-matriz-de-aspectos-e-impactos/8. Matriz de aspectos e impactos.pdf` → `public/sig/aspectos-impactos/8-matriz-aspectos-impactos.pdf`.

Body must name the five processes and how to read the matrix (activity → aspect → impact → medium → control):

1. Gestión de infraestructura tecnológica / soporte TI interno — RAEE from obsolete computers; soil and water; authorized RAEE manager.
2. Logística de dotación de laboratorios STEAM — 30-passenger STEAM bus; air / GHG; maintenance, gas review, route optimization.
3. Gestión de infraestructura tecnológica — on-premise racks; energy; virtualization and monitoring.
4. STEAM e innovación educativa — 3D printing waste; soil; segregation and authorized recycling.
5. Desarrollo de software a la medida — Azure/GCP; indirect energy; auto-scaling, idle shutdown, renewable-preferring providers.

Do not rebuild the table in HTML. The PDF is the evidence.

### 9. Matriz VPIR — ISO 45001

Source: `assets/9-matriz-vpir/9. Matriz_VPIR_Etraining - SIG .pdf` → `public/sig/matriz-vpir/9-matriz-vpir.pdf`.

Methodology GTC 45; activities taken from the environmental matrix. Body explains ND, NE, NP, NC, NR and that “no aceptable” requires the PDF’s intervention measures. Four valued hazards:

1. RAEE handling — chemical; NR 300 (II); not acceptable with specific control.
2. STEAM bus — road accident; NR 1800 (I); not acceptable; PESV, driving-hour limits, pre-trip inspection.
3. On-premise racks / UPS — electrical; NR 400 (II); not acceptable with specific control; LOTO, RETIE, fire detection.
4. 3D printing — chemical/physical; NR 150 (II); not acceptable with specific control; HEPA/carbon extraction, PLA, thermal gloves.

Do not copy the numeric grid into React.

### 10. Riesgos de seguridad de la información — ISO 27001

Source: `assets/10-riesgos-seguridad-informacion/10. Riesgos de Seguridad de la Información.pdf` → `public/sig/riesgos-seguridad-informacion/10-riesgos-seguridad-informacion.pdf`.

Four operational risks: unauthorized access; misdirected sensitive information; loss or unauthorized change of documents; poorly managed Google Drive permissions. Body ties them to contracts, client data, and departmental folders, and names the proposed controls (RBAC + MFA, classification Pública/Interna/Confidencial/Reservada, versioning and backups, periodic permission reviews). PDF remains the artifact.

### 11. Riesgos de calidad — ISO 9001

Source: `assets/11-riesgos-calidad/11. Riesgos de Calidad - Etraining.xlsx` → `public/sig/riesgos-calidad/11-riesgos-calidad.xlsx`.

Five PMO/audit activities: phase reviews; finding registration; corrective/preventive actions; institutional templates; audit reports. Body stresses a single checklist per phase, consecutive numbering of findings, owners and due dates, centralized template versioning, and independence of the quality role.

**Viewer:** generic xlsx table (SheetJS), tabs if more than one sheet, download original. **Do not** run this file through `RaciGrid` / RACI cell coloring. `kind: 'xlsx'` stays only for the RACI workbook. Quality uses a new `kind: 'spreadsheet'` and `SpreadsheetViewer` so the `DeliverableViewer` switch stays exhaustive and RACI parsing is never a silent fallback.

## 6. Placeholder rooms (12–14)

`kind: 'placeholder'`, `files: []`. Lobby label: “Contenido en construcción”. Room: existing chrome + `PlaceholderState` extended with title, owner, one-sentence scope, and “Este tema se publicará aquí.” No download, no fake charts.

| Slug | Title | Owner in copy | Scope sentence (no invented content) |
|---|---|---|---|
| `control-operacional` | Control operacional | Rebeca | Cinco procesos de Etraining y tres controles por proceso (SST, seguridad de la información, ambientales y calidad). |
| `seguimiento-medicion` | Seguimiento y medición | Dana, Mayra y Thomas | Doce indicadores (3 ambientales, 3 SST, 3 de seguridad de la información, 3 de procesos) con línea base y comparación. |
| `emergencias` | Emergencias | Nicolás | Cuatro eventos o desastres, qué hacer antes, durante y después, y qué procesos se afectan. |

Filling them later is a manifest + `public/sig/` drop, same as política and infografía were.

## 7. Components and data

- Extend `SigSlug` and `SIG_TOPICS` in `src/content/sig.manifest.ts`. Optional `isoTag?: string` for lobby chips; omit it on topics 1–7 (no chip).
- `DeliverableKind` adds `spreadsheet`. Exhaustive switch in `DeliverableViewer`.
- New `SpreadsheetViewer` (plain grid + download). Existing `XlsxViewer`/`RaciGrid` remain RACI-only.
- `PlaceholderState` accepts optional owner and scope props; default copy stays for any future empty topic.
- `TopicCard` renders `isoTag` when set.
- Home: essence iframe from content constants.
- Assets copied, not rewritten. Keep original filenames mapped to ASCII public paths listed above.

## 8. Errors, accessibility, testing

- PDF/xlsx: loading label, then content; on failure, message + download (same as today).
- YouTube: iframe with title; fallback link.
- Placeholders: no download control.
- Keyboard: arrows skip 12–14; Escape still closes lightboxes; arrows do not navigate while a dialog is open.
- Contrast and Spanish UI unchanged.

Tests to update or add:

- Manifest length 14; ready 11; placeholders 3.
- Adjacent nav: `matriz-raci` → `politica-sig` → `infografia` → `aspectos-impactos` → … → `riesgos-calidad`; next of `riesgos-calidad` is null; prev of a placeholder points at last ready (`riesgos-calidad`).
- Lobby renders 14 titles and three “Contenido en construcción”.
- Home contains a YouTube iframe whose `src` includes `dzgA7FLmvsA`.
- Quality room uses spreadsheet viewer, not RACI legend.
- Placeholder room shows owner name and “Este tema se publicará aquí.”

## 9. Out of scope

- Inventing operational controls, indicator baselines, or emergency plans.
- 2025 management-report financials or reorganization claims.
- New company routes, CMS, contact form, autoplay video.
- Rebuilding PDFs as HTML tables (except the existing SIPOC reading aid and RACI grid).
- Grouping the lobby into four ISO columns.

## 10. Implementation order

1. Copy the four files into `public/sig/<slug>/`.
2. Extend the manifest, navigation tests, and TopicCard ISO tag.
3. Spreadsheet viewer + rooms 8–11 copy.
4. PlaceholderState + rooms 12–14.
5. Essence YouTube embed.
6. Tests listed in §8.

Visitor modes stay Persuade on Home/Nosotros and Read in the SIG.
