# Design spec: landing Etraining + presentación SIG

Date: 2026-08-18  
Status: approved in conversation; waiting for spec review before the implementation plan.

## 1. Purpose

Build a fully functional React + TypeScript site that does two jobs:

1. Present Etraining with the public brand, palette, and narrative of [etraining.co](https://etraining.co/).
2. Present the Integrated Management System (SIG) as an academic document theater: each topic has an explanation and its original attachment in the browser.

This is a **Grupo 2 academic presentation**, not the real corporate site. Evaluators watch it live and later reopen the URL alone.

## 2. Audience and success

**Audience.** Course evaluators (primary) and the six presenters (secondary).

**Live success.** Presenters move Home → Nosotros (optional) → SIG lobby → topic rooms with previous/next and keyboard arrows. Each room shows the argument and the file without hunting downloads.

**Async success.** An evaluator lands on any SIG URL, understands the topic in one screen, sees the attachment, and can jump to another topic from the lobby.

**Out of success.** Looking indistinguishable from etraining.co. Inventing Política or Infografía. Showing non-public financial or reorganization facts.

## 3. Information architecture

Four routes only:

| Route | Surface |
|---|---|
| `/` | Company Home (marketing reconstruction + sections, not extra routes) |
| `/nosotros` | Who we are, mission, purpose, how/why |
| `/sig` | SIG lobby (topic index) |
| `/sig/:slug` | Topic room (explanation + viewer) |

Unknown slugs render a SIG 404 that links back to `/sig`.

**Global chrome.** Permanent academic ribbon, then site header, then page, then footer.

**Header nav.** Inicio · Nosotros · Sistema Integrado de Gestión · Contacto.  
Contacto scrolls to the Home contact block (`/#contacto` from other routes). No search. No Soluciones dropdown. No Casos as a route.

**Ribbon.** Always visible. Copy: `Presentación SIG · Grupo 2` plus the six names. Links to `/sig`. On small screens the names wrap; they are not hidden behind a menu.

## 4. Company Home

Reconstruct the **public story** of etraining.co on one page. Do not clone unused routes (Soluciones, Casos, Blog, Brochure).

**Section order:**

1. Hero: “Diseñamos nuevas formas de…” with CTAs to `#contacto` and `/sig`.
2. Proof of tenure: **22 years** (Nosotros and project brief; not the stale “21” on the current home).
3. Essence: “Pasión por la innovación educativa.” v1 does not embed the official YouTube video.
4. Who we are teaser + link to `/nosotros`.
5. Portfolio intro and the five business lines as **in-page cards**, not links to missing pages:
   - Integrador de servicios educativos
   - Diseño de experiencias de aprendizaje
   - STEAM e innovación educativa
   - Analítica de datos, BI y modelos predictivos
   - Desarrollo de software a la medida
6. Alliances: Azure, AWS, Oracle, Google Cloud, and house brands Emotions, Enventors, Enséñame.
7. Success cases: **eight emblematic cards** on Home (SENA, Talento TECH, Laboratorio STEAM, Escuela Judicial, Computadores para Educar, MinAmbiente/OEI, Cámara de Comercio / campus empresarios, Coljuegos / Enséñame). Facts only from the public site.
8. Closing CTA + `#contacto`: public address, phone, and `mailto:comunicaciones@etraining.edu.co`. No form.

**Copy rules.** Use public wording. Do not add revenue, reorganization, ITMARK, or management-report claims unless they appear on the public marketing pages we are reconstructing. Prefer fewer true facts over extra impressive ones.

## 5. Nosotros

A Read-mode page, same chrome. Content from [etraining.co/nosotros](https://etraining.co/nosotros/):

- Who we are (22+ years, multidisciplinary team)
- Mission
- Purpose
- What we do / how we do it / why
- House brands: Emotions, Enventors, Enséñame

No SIG content here except the ribbon and nav.

## 6. SIG lobby (`/sig`)

Less marketing, more reading. Short scope paragraph from the PESTEL asset:

The SIG covers design, development, implementation, and support of digital education solutions: content, learning experiences, SaaS/LMS platforms, technology kits, and services to public and private institutional clients.

Then a grid of **seven cards**, numbered and ordered:

| Slug | Title | Viewer | Status |
|---|---|---|---|
| `entradas-salidas` | Entradas y salidas (SIPOC) | image + table | ready |
| `pestel` | PESTEL y alcance SIG | pdf | ready |
| `matriz-interesados` | Matriz de interesados | pdf | ready |
| `mapa-de-procesos` | Mapa de procesos | pdf | ready |
| `matriz-raci` | Matriz RACI | xlsx grid | ready |
| `politica-sig` | Política SIG | none | placeholder |
| `infografia` | Infografía | none | placeholder |

Ready cards: number, title, one-line “what this proves”, link “Ver entregable”.  
Placeholder cards: visible, not fake. Label “Contenido en construcción”. No invented policy or infographic.

## 7. SIG room (`/sig/:slug`)

**Desktop.** Two columns: explanation (left) and attachment viewer (right).  
**Mobile.** Explanation first, viewer full width below.

**Room chrome.** Topic number and title, previous/next, link to lobby, position among **ready** topics (placeholders skipped in the live sequence). Keyboard: ArrowLeft / ArrowRight.

**Explanation source.** Typed content derived from the markdown (and from the attachment when markdown is empty). Tone: why this tool exists in *this* company, then how to read the artifact. Not generic ISO textbook copy.

**Per topic:**

1. **SIPOC.** Transcribed three-row table (Emotions / Comware / Google) **and** the original notebook photo. The photo is the academic evidence; the table is the reading aid.
2. **PESTEL.** Six factors plus SIG scope (strategic, mission, support/gerencia processes) beside the embedded PDF.
3. **Interesados.** Stakeholder list and power/interest groups (mantener satisfechos, administrar de cerca, monitorear, mantener informados) beside the embedded PDF.
4. **Mapa de procesos.** Short reading notes; the PDF is the source of truth (`4-mapa-de-procesos.md` is empty).
5. **RACI.** Legend R / A / C / I, interactive grid from the workbook, tabs for the three sheets (matrix, dropdown keys, people/roles). Download the original `.xlsx`.
6. **Política SIG / Infografía.** Honest empty state: “Este tema se publicará aquí.” Same room chrome. No lorem.

Later, adding those two topics means filling the manifest and dropping files into `public/sig/`. No layout redesign.

## 8. Document theater (viewers)

One component, `DeliverableViewer`, switched by manifest `kind`:

| kind | Behavior |
|---|---|
| `image` | Image with zoom; download link |
| `pdf` | In-browser embed (`iframe`/`object`) with title; download link |
| `xlsx` | Parse with SheetJS into a React table (color R/A/C/I); tab per sheet; download original |
| `placeholder` | Empty state only |

If PDF or XLSX fails to load or parse: error message plus download. The deliverable never disappears.

Assets move from `assets/` to `public/sig/<slug>/` during implementation. Brand logo to `public/brand/`. Keep filenames stable. A TypeScript manifest is the only index pages may import.

## 9. Visual system

Pinned authority: [etraining.co](https://etraining.co/) + `logo-etraining.webp`.

**Mode.** Home and Nosotros: Persuade (marketing reconstruction). SIG: Read, with Operate habits (scan, jump, inspect).

**Tokens (implement from the live site and logo, then lock in CSS variables):**

- Orange of the logo “e” mark (approx `#E87C1E` / site vivid orange)
- Charcoal of “training”
- Amber `#FFC225` (site arrows)
- Dark overlay sections and light content sections, as on the official home
- Typeface: Inter

Do not invent a parallel identity. Do not use a generic Tailwind look. The academic ribbon is the only extra chrome; it must look intentional (small, high contrast, always on), not a leftover banner.

**Team (ribbon and optional SIG credits), from the RACI workbook:**

- Johel Arias — Líder SIG y Calidad
- Rebeca Pedrozo — Líder Comercial y Relaciones
- Dana Urquijo — Líder Académico y Pedagógico
- Mayra Salamanca — Líder Tecnología, LMS y Datos
- Nicolás Daza — Líder Administrativo, Financiero y TH
- Thomas Jutinico — Líder Jurídico y Cumplimiento

## 10. Technical architecture

**Stack.** Vite, React, TypeScript, React Router. Tailwind as layout engine on top of brand tokens. No backend. Spanish only.

**Folders:**

```
src/app/                 layout, router
src/features/company/    Home, Nosotros, company content
src/features/sig/        lobby, room, viewers, RACI grid
src/content/             typed copy + sig.manifest.ts
src/styles/              tokens
public/brand/
public/sig/
```

**Data flow.** Pages read typed content modules. SIG pages read `sig.manifest.ts` (slug, title, summary, body, kind, files). They do not branch on filenames. RACI parsing happens in the xlsx viewer on demand; if parse fails, download remains.

**Reusable units (one job each):** `AcademicRibbon`, `SiteHeader`, `SiteFooter`, `Section`, `TopicCard`, `DeliverableViewer`, `PdfViewer`, `ImageViewer`, `RaciGrid`, `PlaceholderState`.

**Quality.** Strict TypeScript. Exhaustive switches on `kind` and on ready vs placeholder. No inline imports. Small files. Company facts live in content modules, not scattered JSX.

## 11. States, errors, accessibility

- PDF/XLSX loading: skeleton or labeled wait, then content.
- PDF/XLSX error: message + download.
- Placeholder topics: construction state, not a broken viewer.
- Unknown slug: SIG 404 + link to lobby.
- Keyboard: skip link, visible focus, ArrowLeft/ArrowRight in rooms, ribbon does not trap tab.
- PDF iframe has an accessible title.
- Contrast: orange/amber on dark and light must remain readable.
- Mobile: single column; viewer usable without horizontal page scroll.

## 12. Testing

Vitest + Testing Library:

- Manifest lists seven topics, five ready, two placeholder.
- `DeliverableViewer` renders the matching kind.
- Previous/next skips placeholders and stops at ends.
- Unknown slug shows the SIG 404.
- RACI parser maps sample cells to R/A/C/I (fixture, not the full workbook if too heavy).

No requirement for visual regression or Playwright in v1.

## 13. Out of scope (v1)

- Soluciones, Casos, Blog, Brochure as routes
- Search
- Contact form backend
- CMS, auth, i18n, PWA
- Invented Política SIG or Infografía
- Non-public financial or legal process details
- Replacing original PDFs with redesigned diagrams (except SIPOC’s extra transcribed table and RACI’s interactive grid)

## 14. Implementation consequences

1. Scaffold Vite + React + TS + Router + tokenized Tailwind.
2. Lock chrome (ribbon, header, footer) before pages.
3. Build Home and Nosotros from public copy.
4. Relocate assets to `public/` and write `sig.manifest.ts`.
5. Build lobby, room, viewers (image, pdf, xlsx, placeholder).
6. Wire keyboard nav and tests.

Visitor mode stays Persuade on company pages and Read in the SIG. The first viewport of `/` must show brand + academic ribbon + a clear path to the SIG. The first viewport of `/sig` must show the seven-topic grid.
