# Etraining SIG Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a Vite + React + TypeScript site that reconstructs Etraining’s public brand on Home and Nosotros, and presents the Grupo 2 SIG as a document theater with in-browser attachments.

**Architecture:** A static SPA with four routes, shared academic chrome, and typed content modules. SIG pages read only `sig.manifest.ts`; a single `DeliverableViewer` switches on `kind`. No backend.

**Tech Stack:** Vite, React 19, TypeScript, React Router 7, Tailwind CSS 4 (layout only, brand tokens in CSS), Vitest, Testing Library, SheetJS (`xlsx`).

## Global Constraints

- Visual authority is https://etraining.co/ and `public/brand/logo-etraining.webp` (moved from `assets/logo-etraining.webp`). Do not invent a second identity or a generic Tailwind look.
- Spanish UI only. Copy and impact numbers only from the public site or SIG markdown. Do not publish financials, reorganization, or ITMARK.
- Four routes only: `/`, `/nosotros`, `/sig`, `/sig/:slug`. No Soluciones, Casos, Blog, Brochure, or search routes.
- Header nav: Inicio · Nosotros · Sistema Integrado de Gestión · Contacto. Contacto goes to `/#contacto`.
- Ribbon always visible: `Presentación SIG · Grupo 2` plus the six names (wrap on small screens; do not hide behind a menu).
- Tenure copy is **22 years**, not 21.
- v1 does not embed the official YouTube video.
- Contact is a static `#contacto` block: Calle 59 a Bis No 5-53, Oficina 206, Edificio Link 760, Bogotá D.C., 110231, PBX +57 310 2129861, `mailto:comunicaciones@etraining.edu.co`, Lun–Vie 8:00 AM–6:00 PM. No form.
- Política SIG and Infografía stay empty: “Este tema se publicará aquí.” / “Contenido en construcción.” No invented policy or infographic.
- Original attachments stay visible. SIPOC shows transcribed table **and** the notebook photo. RACI is an interactive grid from the `.xlsx` plus download.
- Exhaustive `switch` on `DeliverableKind`. No inline imports. Files stay small. Brand tokens as CSS variables.
- Tests: Vitest + Testing Library. No Playwright in v1.
- Before writing UI, load impeccable `reference/craft-floor.md` and honor PRODUCT.md.
- Directory is not empty: do **not** run `npm create vite` in place. Create the files listed below.

## File map

| Path | Responsibility |
|---|---|
| `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html` | Tooling |
| `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/styles/tokens.css`, `src/test/setup.ts`, `src/vite-env.d.ts` | Boot, tokens, test setup |
| `src/lib/assertNever.ts` | Exhaustive-switch helper |
| `src/app/routes.ts`, `src/app/router.tsx`, `src/app/Layout.tsx`, `src/app/SkipLink.tsx` | Routes and shell |
| `src/content/team.ts`, `src/content/company.ts`, `src/content/nosotros.ts` | Typed company copy |
| `src/content/sig.manifest.ts`, `src/content/sig.navigation.ts` | SIG index and prev/next |
| `src/features/chrome/AcademicRibbon.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx`, `Section.tsx` | Shared chrome |
| `src/features/company/HomePage.tsx`, `NosotrosPage.tsx` plus section components | Company surfaces |
| `src/features/sig/SigLobbyPage.tsx`, `SigRoomPage.tsx`, `SigNotFound.tsx`, `TopicCard.tsx`, `RoomChrome.tsx`, `SipocTable.tsx`, `useSigKeyboardNav.ts` | SIG surfaces |
| `src/features/sig/viewers/*` | Document theater |
| `src/features/sig/raci/parseRaciWorkbook.ts`, `RaciGrid.tsx` | XLSX parse and grid |
| `public/brand/`, `public/sig/<slug>/` | Logo and binaries |
| `src/content/*.test.ts`, `src/features/sig/**/*.test.ts` | Spec tests |

---

### Task 1: Scaffold Vite + React + TypeScript + Tailwind + Vitest

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`, `src/test/setup.ts`, `.gitignore`
- Modify: none (repo already has a 2-line `.gitignore`; replace it)

**Interfaces:**
- Consumes: nothing
- Produces: `npm run dev`, `npm run build`, `npm test` work; `@/` alias → `src/`

Scaffold and config are not TDD (configuration exception). Do not run `npm create vite` in this non-empty repo.

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "sig-etraining-landing-page",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
npm install react react-dom react-router-dom xlsx
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom \
  tailwindcss @tailwindcss/vite vitest jsdom \
  @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Expected: `node_modules/` exists; `xlsx` is in `dependencies`.

- [ ] **Step 3: Write TypeScript configs**

`tsconfig.json`:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

`tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["src"]
}
```

`tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: Write `vite.config.ts`**

```ts
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
});
```

If TypeScript complains about `test`, add `/// <reference types="vitest/config" />` at the top of this file.

- [ ] **Step 5: Write `index.html`, boot files, test setup, gitignore**

`index.html`:

```html
<!doctype html>
<html lang="es-CO">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Etraining · Presentación SIG · Grupo 2</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <!--
      THESIS: A brand-faithful Etraining shell that refuses to impersonate the real site; the SIG document theater is the assignment.
      OWN-WORLD: Logo orange, charcoal, amber #FFC225, Inter, dark overlay bands and light content bands from etraining.co.
      STORY: Evaluator understands Etraining, then inspects each SIG deliverable in the browser.
      FIRST VIEWPORT: Academic ribbon, logo header, hero “Diseñamos nuevas formas de…” with CTAs to contacto and /sig.
      FORM: Pinned etraining.co world; no concept-seed replacement.
      FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
    -->
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />
```

`src/index.css`:

```css
@import 'tailwindcss';
@import './styles/tokens.css';
```

Create empty `src/styles/tokens.css` (filled in Task 2):

```css
/* tokens in Task 2 */
```

`src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

`src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

`src/App.tsx` (temporary; replaced in Task 3):

```tsx
export default function App() {
  return <p>Etraining SIG</p>;
}
```

Replace `.gitignore` with:

```
.cursor
.impeccable
node_modules
dist
*.local
.DS_Store
```

- [ ] **Step 6: Add a smoke test, run it, confirm it fails for the wrong reason then passes**

Create `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the project name', () => {
    render(<App />);
    expect(screen.getByText('Etraining SIG')).toBeInTheDocument();
  });
});
```

Run: `npm test`

Expected: PASS.

If `vite.config.ts` types fail, fix the vitest reference. Then:

```bash
npx tsc -b --pretty false
```

Expected: exit 0.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json index.html src .gitignore
git commit -m "$(cat <<'EOF'
Scaffold Vite, React, TypeScript, Tailwind, and Vitest.

Gives the SIG landing a typed SPA toolchain without wiping existing assets.
EOF
)"
```

---

### Task 2: Brand tokens

**Files:**
- Modify: `src/styles/tokens.css`, `src/index.css`

**Interfaces:**
- Consumes: Tailwind v4 `@import 'tailwindcss'`
- Produces: theme colors `brand-orange`, `brand-charcoal`, `brand-amber`, `brand-dark`, `brand-cream`; font `sans` = Inter

- [ ] **Step 1: Write tokens**

`src/styles/tokens.css`:

```css
@theme {
  --color-brand-orange: #e87c1e;
  --color-brand-charcoal: #2d231e;
  --color-brand-amber: #ffc225;
  --color-brand-dark: #111111;
  --color-brand-cream: #f7f4ef;
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
}

html {
  font-family: var(--font-sans);
  color: var(--color-brand-charcoal);
  background: #ffffff;
}

:focus-visible {
  outline: 2px solid var(--color-brand-orange);
  outline-offset: 2px;
}
```

- [ ] **Step 2: Confirm the app still tests**

Run: `npm test`

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/styles/tokens.css src/index.css
git commit -m "$(cat <<'EOF'
Lock Etraining color and type tokens.

Keeps Tailwind as layout only so the site can follow the official brand.
EOF
)"
```

---

### Task 3: Academic chrome and router

**Files:**
- Create: `src/lib/assertNever.ts`, `src/app/routes.ts`, `src/app/SkipLink.tsx`, `src/app/Layout.tsx`, `src/app/router.tsx`, `src/content/team.ts`, `src/features/chrome/AcademicRibbon.tsx`, `src/features/chrome/SiteHeader.tsx`, `src/features/chrome/SiteFooter.tsx`, `src/features/chrome/Section.tsx`, `src/features/chrome/AcademicRibbon.test.tsx`, `src/features/chrome/SiteHeader.test.tsx`
- Modify: `src/App.tsx`
- Delete after router works: `src/App.test.tsx` (replace with layout tests)

**Interfaces:**
- Consumes: `TEAM` from `src/content/team.ts`
- Produces:
  - `routes.home: '/'`, `routes.nosotros: '/nosotros'`, `routes.sig: '/sig'`, `routes.contacto: '/#contacto'`, `routes.sigTopic(slug: string): string`
  - `assertNever(value: never): never`
  - `TEAM: readonly { name: string; role: string }[]` (six members, exact names below)
  - Layout renders ribbon + header + `<Outlet />` + footer

- [ ] **Step 1: Write failing ribbon test**

`src/content/team.ts` is required by the test import; write the data module first (pure data, not UI):

```ts
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
```

`src/features/chrome/AcademicRibbon.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { TEAM } from '@/content/team';
import { AcademicRibbon } from './AcademicRibbon';

describe('AcademicRibbon', () => {
  it('states this is a Grupo 2 SIG presentation and names the team', () => {
    render(
      <MemoryRouter>
        <AcademicRibbon />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Presentación SIG/i)).toBeInTheDocument();
    expect(screen.getByText(/Grupo 2/i)).toBeInTheDocument();
    for (const member of TEAM) {
      expect(screen.getByText(new RegExp(member.name))).toBeInTheDocument();
    }
  });
});
```

Run: `npx vitest run src/features/chrome/AcademicRibbon.test.tsx`

Expected: FAIL — `AcademicRibbon` is not defined.

- [ ] **Step 2: Implement `assertNever`, routes, ribbon, header, footer, section, skip link, layout, router**

`src/lib/assertNever.ts`:

```ts
export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`);
}
```

`src/app/routes.ts`:

```ts
export const routes = {
  home: '/',
  nosotros: '/nosotros',
  sig: '/sig',
  contacto: '/#contacto',
  sigTopic: (slug: string) => `/sig/${slug}`,
} as const;
```

`src/features/chrome/AcademicRibbon.tsx`:

```tsx
import { Link } from 'react-router-dom';
import { GROUP_LABEL, TEAM } from '@/content/team';
import { routes } from '@/app/routes';

export function AcademicRibbon() {
  const names = TEAM.map((member) => member.name).join(' · ');

  return (
    <div className="bg-brand-dark text-white text-sm leading-snug px-4 py-2">
      <Link to={routes.sig} className="underline-offset-2 hover:underline">
        Presentación SIG · {GROUP_LABEL}
      </Link>
      <span className="block sm:inline sm:before:content-['—'] sm:before:mx-2">{names}</span>
    </div>
  );
}
```

`src/app/SkipLink.tsx`:

```tsx
export function SkipLink() {
  return (
    <a
      href="#contenido"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2"
    >
      Saltar al contenido
    </a>
  );
}
```

`src/features/chrome/SiteHeader.tsx`:

```tsx
import { NavLink } from 'react-router-dom';
import { routes } from '@/app/routes';

const links = [
  { to: routes.home, label: 'Inicio', end: true },
  { to: routes.nosotros, label: 'Nosotros', end: true },
  { to: routes.sig, label: 'Sistema Integrado de Gestión', end: false },
  { to: routes.contacto, label: 'Contacto', end: true },
] as const;

export function SiteHeader() {
  return (
    <header className="bg-white text-brand-charcoal border-b border-black/10 px-4 py-3 flex items-center justify-between gap-4">
      <NavLink to={routes.home} className="flex items-center gap-2 shrink-0">
        <img src="/brand/logo-etraining.webp" alt="Etraining" className="h-8 w-auto" />
      </NavLink>
      <nav aria-label="Principal" className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
        {links.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `hover:text-brand-orange ${isActive && !link.to.includes('#') ? 'text-brand-orange' : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
```

`src/features/chrome/SiteFooter.tsx`:

```tsx
import { GROUP_LABEL, TEAM } from '@/content/team';

export function SiteFooter() {
  return (
    <footer className="bg-brand-dark text-white px-4 py-10 mt-auto">
      <p className="font-semibold">Etraining</p>
      <p>Calle 59 a Bis No 5-53 · Oficina 206 · Edificio Link 760</p>
      <p>Bogotá D.C. · 110231 · Colombia</p>
      <p>PBX: +57 310 2129861</p>
      <p>
        <a className="text-brand-amber underline" href="mailto:comunicaciones@etraining.edu.co">
          comunicaciones@etraining.edu.co
        </a>
      </p>
      <p>Lun – Vie · 8:00 AM – 6:00 PM</p>
      <p className="mt-6 text-sm text-white/80">
        Presentación SIG · {GROUP_LABEL} · {TEAM.map((member) => member.name).join(' · ')}
      </p>
    </footer>
  );
}
```

`src/features/chrome/Section.tsx`:

```tsx
import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  tone?: 'light' | 'dark';
  children: ReactNode;
};

export function Section({ id, tone = 'light', children }: SectionProps) {
  const toneClass = tone === 'dark' ? 'bg-brand-dark text-white' : 'bg-white text-brand-charcoal';
  return (
    <section id={id} className={`${toneClass} px-4 py-16`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
```

`src/app/Layout.tsx`:

```tsx
import { Outlet } from 'react-router-dom';
import { SkipLink } from '@/app/SkipLink';
import { AcademicRibbon } from '@/features/chrome/AcademicRibbon';
import { SiteFooter } from '@/features/chrome/SiteFooter';
import { SiteHeader } from '@/features/chrome/SiteHeader';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SkipLink />
      <AcademicRibbon />
      <SiteHeader />
      <main id="contenido" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
```

Placeholder pages (real pages in Tasks 4 and 8):

`src/features/company/HomePage.tsx`:

```tsx
export function HomePage() {
  return <p>Inicio</p>;
}
```

`src/features/company/NosotrosPage.tsx`:

```tsx
export function NosotrosPage() {
  return <p>Nosotros</p>;
}
```

`src/features/sig/SigLobbyPage.tsx`:

```tsx
export function SigLobbyPage() {
  return <p>SIG</p>;
}
```

`src/app/router.tsx`:

```tsx
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/app/Layout';
import { routes } from '@/app/routes';
import { HomePage } from '@/features/company/HomePage';
import { NosotrosPage } from '@/features/company/NosotrosPage';
import { SigLobbyPage } from '@/features/sig/SigLobbyPage';

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'nosotros', element: <NosotrosPage /> },
      { path: 'sig', element: <SigLobbyPage /> },
    ],
  },
]);
```

`src/App.tsx`:

```tsx
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';

export default function App() {
  return <RouterProvider router={router} />;
}
```

- [ ] **Step 3: Write header test and copy logo into `public/brand/`**

```bash
mkdir -p public/brand
mv assets/logo-etraining.webp public/brand/logo-etraining.webp
```

If `mv` fails because the file is tracked, use `git mv`.

`src/features/chrome/SiteHeader.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { SiteHeader } from './SiteHeader';

describe('SiteHeader', () => {
  it('exposes the four nav destinations', () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Nosotros' })).toHaveAttribute('href', '/nosotros');
    expect(
      screen.getByRole('link', { name: 'Sistema Integrado de Gestión' }),
    ).toHaveAttribute('href', '/sig');
    expect(screen.getByRole('link', { name: 'Contacto' })).toHaveAttribute('href', '/#contacto');
  });
});
```

- [ ] **Step 4: Run tests**

Run: `npm test`

Expected: PASS for ribbon and header. Delete or rewrite `src/App.test.tsx` — `RouterProvider` needs a DOM. Replace `src/App.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('shows academic chrome on home', () => {
    render(<App />);
    expect(screen.getByText(/Presentación SIG/i)).toBeInTheDocument();
  });
});
```

Run: `npm test`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src public/brand .gitignore assets
git commit -m "$(cat <<'EOF'
Add academic ribbon, site chrome, and router shell.

Makes the site read as a Grupo 2 presentation before any company copy lands.
EOF
)"
```

---

### Task 4: Home and Nosotros

**Files:**
- Create: `src/content/company.ts`, `src/content/nosotros.ts`, `src/features/company/HomePage.test.tsx`, `src/features/company/NosotrosPage.test.tsx`
- Modify: `src/features/company/HomePage.tsx`, `src/features/company/NosotrosPage.tsx`
- Optional section files if HomePage would exceed ~200 lines: `Hero.tsx`, `TenureBand.tsx`, `Essence.tsx`, `WhoWeAreTeaser.tsx`, `BusinessLines.tsx`, `Alliances.tsx`, `SuccessCases.tsx`, `ContactBlock.tsx` under `src/features/company/`

**Interfaces:**
- Consumes: `Section`, `routes`
- Produces: Home sections in spec order; Nosotros with mission, purpose, how/why, house brands; `#contacto` id on the contact block

- [ ] **Step 1: Write company content modules**

`src/content/company.ts`:

```ts
export const hero = {
  kicker: 'Diseñamos nuevas formas de',
  title: 'aprender, enseñar y transformar',
  contactCta: 'Contáctanos',
  sigCta: 'Ver el SIG',
};

export const tenure = {
  years: '22 años',
  label: 'de experiencia',
};

export const essence = {
  heading: 'Nuestra esencia',
  body: 'Pasión por la innovación educativa.',
};

export const whoTeaser = {
  heading: '¿Quiénes somos?',
  body: 'Etraining: redefiniendo la educación digital. Somos líderes colombianos en transformación educativa.',
  cta: 'Conoce más',
};

export const portfolioIntro =
  'Transformamos vidas integrando soluciones que preparan a las comunidades para la era digital. Así, impulsamos el futuro del aprendizaje de la mano de nuestras marcas aliadas.';

export const businessLines = [
  {
    title: 'Integrador de servicios educativos',
    body: 'Digitalizamos tu ecosistema de formación presencial y virtual',
  },
  {
    title: 'Diseño de experiencias de aprendizaje',
    body: 'Potenciamos el talento con ecosistemas digitales',
  },
  {
    title: 'STEAM e innovación educativa',
    body: 'Transformamos la educación uniendo creatividad y tecnología.',
  },
  {
    title: 'Analítica de datos, BI y modelos predictivos',
    body: 'Convertimos datos complejos en decisiones inteligentes con BI, analítica avanzada y modelos predictivos',
  },
  {
    title: 'Desarrollo de software a la medida',
    body: 'Creamos soluciones digitales escalables y centradas en el usuario.',
  },
] as const;

export const cloudAlliances = ['Azure', 'AWS', 'Oracle', 'Google Cloud'] as const;
export const houseBrands = ['Emotions', 'Enventors', 'Enséñame'] as const;

export const successCases = [
  {
    title: 'SENA',
    summary: 'Plataforma LMS en la nube (SaaS) para formación de aprendices e instructores.',
    facts: ['5 millones de usuarios', 'Vigencia 2019 – 2024', 'Aliados: Comware y Territorium Life'],
  },
  {
    title: 'Talento TECH',
    summary: 'Bootcamps nacionales en habilidades digitales con MinTIC y Universidad Libre.',
    facts: ['Más de 27.000 beneficiarios', 'Vigencia 2024 – 2026'],
  },
  {
    title: 'Laboratorio de Innovación Educativa STEAM',
    summary: 'Estrategia nacional de laboratorios STEAM con OEI y CISP.',
    facts: ['3.380 instituciones educativas', 'Vigencia 2021 – 2024'],
  },
  {
    title: 'Escuela Judicial Rodrigo Lara Bonilla',
    summary: 'LMS en modalidad b-learning para la Rama Judicial.',
    facts: ['40.000 usuarios', 'Vigencia 2020 – 2022'],
  },
  {
    title: 'Computadores para Educar',
    summary: 'Diplomados Innovatic, Tecnotic y Directic para docentes y familias.',
    facts: ['34.000 docentes', '80.000 padres de familia'],
  },
  {
    title: 'Educación ambiental y gobernanza',
    summary: 'Plan de comunicaciones y gestión del cambio con MinAmbiente y OEI.',
    facts: ['Cerca de 6.000 beneficiarios', 'Vigencia 2022 – 2024'],
  },
  {
    title: 'Campus virtual para emprendedores',
    summary: 'Oferta virtual para empresarios y emprendedores del país.',
    facts: ['Aprox. 80.000 beneficiarios', 'Vigencia 2025 – 2026'],
  },
  {
    title: 'Coljuegos · Enséñame',
    summary: 'Formación institucional en gestión pública y transformación digital.',
    facts: ['193 funcionarios', 'Vigencia 2022'],
  },
] as const;

export const contact = {
  heading: '¡Comienza tu Transformación Hoy!',
  addressLines: [
    'Calle 59 a Bis No 5-53',
    'Oficina 206 Bogotá D.C.',
    'Edificio Link 760',
    '110231 – Colombia',
  ],
  phone: '+57 310 2129861',
  email: 'comunicaciones@etraining.edu.co',
  hours: 'Lun – Vie · 8:00 AM – 6:00 PM',
};
```

`src/content/nosotros.ts`:

```ts
export const nosotros = {
  heading: '¿Quiénes somos?',
  intro:
    'Somos Etraining, una empresa colombiana con más de 22 años de experiencia en la construcción y el desarrollo de procesos de transformación digital de la educación. Contamos con un equipo de expertos en pedagogía, ingeniería, ciencias naturales, sociales, matemáticas, lenguaje, diseño y comunicación, entre otros.',
  followUp:
    'Con ellos, creamos soluciones innovadoras para la generación de proyectos educativos que fomentan la competitividad, empleabilidad y proyección institucional.',
  mission: {
    heading: 'Misión',
    body: 'Integrar educación, tecnología y datos para crear experiencias de aprendizaje que impulsen la transformación educativa, el crecimiento de personas, instituciones y comunidades',
  },
  purpose: {
    heading: 'Nuestro propósito',
    body: 'Sembramos capacidades para que cada familia, institución y comunidad acceda a aprendizaje que transforma vidas y construye futuro.',
  },
  what: {
    heading: '¿Qué hacemos?',
    body: 'En Etraining planeamos, estructuramos y desarrollamos soluciones para las necesidades de gestión del conocimiento de entidades educativas, organizaciones y comunidades. Transformamos la experiencia de educar con innovación en procesos de enseñanza–aprendizaje que facilitan el desarrollo de la actividad académica.',
  },
  how: {
    heading: '¿Cómo lo hacemos?',
    items: [
      'Tipo de conocimiento a impartir',
      'Características del contenido educativo',
      'Docentes o expertos a enrolar',
      'Factores operativos y logísticos',
      'Recursos y servicios tecnológicos a utilizar',
      'Modalidad de formación',
      'Condiciones sociodemográficas',
      'Distribución geográfica',
      'Talento humano requerido',
    ],
  },
  why: {
    heading: '¿Para qué lo hacemos?',
    items: [
      'Proveer la infraestructura tecnológica adecuada e integrar herramientas 4RI (Cuarta Revolución Industrial) al servicio de la práctica educativa.',
      'Suministrar las plataformas educativas y los sistemas de información necesarios para la solución.',
      'Adecuar los contenidos educativos para mejorar el desempeño, las competencias, habilidades y capacidad laboral indispensables por los ciudadanos, las organizaciones y la sociedad del siglo XXI.',
    ],
  },
  brands: {
    heading: 'En el corazón de Etraining',
    body: 'Late la sinergia de nuestras marcas (Emotions, Enventors, Enséñame). Juntos, cubrimos cada dimensión de la educación y el desarrollo de competencias.',
  },
};
```

- [ ] **Step 2: Write failing Home and Nosotros tests**

`src/features/company/HomePage.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { businessLines, successCases } from '@/content/company';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('renders tenure, five lines, eight cases, and a mailto contact block', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByText('22 años')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver el SIG' })).toHaveAttribute('href', '/sig');
    for (const line of businessLines) {
      expect(screen.getByText(line.title)).toBeInTheDocument();
    }
    expect(successCases).toHaveLength(8);
    for (const item of successCases) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    }
    const mail = screen.getByRole('link', { name: 'comunicaciones@etraining.edu.co' });
    expect(mail).toHaveAttribute('href', 'mailto:comunicaciones@etraining.edu.co');
    expect(document.getElementById('contacto')).not.toBeNull();
  });
});
```

`src/features/company/NosotrosPage.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { NosotrosPage } from './NosotrosPage';

describe('NosotrosPage', () => {
  it('states mission, purpose, and house brands', () => {
    render(
      <MemoryRouter>
        <NosotrosPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Misión')).toBeInTheDocument();
    expect(screen.getByText(/Emotions, Enventors, Enséñame/)).toBeInTheDocument();
    expect(screen.getByText(/más de 22 años/)).toBeInTheDocument();
  });
});
```

Run: `npx vitest run src/features/company`

Expected: FAIL — Home still says “Inicio”.

- [ ] **Step 3: Implement Home and Nosotros**

Keep Home as composed sections. Use `Section` with `tone="dark"` for hero, tenure, and closing CTA. Hero CTAs: `Link` to `routes.sig` and `<a href={routes.contacto}>`. Do not embed YouTube. Do not add extra routes. Split into section files if `HomePage.tsx` grows past ~200 lines.

`src/features/company/HomePage.tsx` must include, in order: hero, tenure, essence, who teaser (`Link` to `/nosotros`), portfolio intro + five line cards, alliances (cloud + house brands), eight case cards, closing heading + `#contacto` block using `contact` from `src/content/company.ts`.

`src/features/company/NosotrosPage.tsx` must render every field of `nosotros` from `src/content/nosotros.ts` (intro, follow-up, mission, purpose, what, how list, why list, brands).

Visual: follow etraining.co — large display type on dark bands, orange/amber CTAs, generous padding. Not a generic card grid on gray.

- [ ] **Step 4: Run tests**

Run: `npm test`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content/company.ts src/content/nosotros.ts src/features/company
git commit -m "$(cat <<'EOF'
Add Home and Nosotros from public Etraining copy.

Gives evaluators the company case before they enter the SIG precinct.
EOF
)"
```

---

### Task 5: SIG manifest, assets, and adjacent-topic navigation

**Files:**
- Create: `src/content/sig.manifest.ts`, `src/content/sig.navigation.ts`, `src/content/sig.manifest.test.ts`, `src/content/sig.navigation.test.ts`
- Modify: none
- Move binaries with `git mv` into `public/sig/<slug>/`

**Interfaces:**
- Consumes: nothing from UI
- Produces:

```ts
export type DeliverableKind = 'image' | 'pdf' | 'xlsx' | 'placeholder';

export type SigSlug =
  | 'entradas-salidas'
  | 'pestel'
  | 'matriz-interesados'
  | 'mapa-de-procesos'
  | 'matriz-raci'
  | 'politica-sig'
  | 'infografia';

export type SipocRow = {
  provider: string;
  input: string;
  process: string;
  output: string;
  customer: string;
};

export type SigTopic = {
  slug: SigSlug;
  number: number;
  title: string;
  summary: string;
  body: string;
  kind: DeliverableKind;
  files: string[];
  sipocRows?: readonly SipocRow[];
};

export const SIG_TOPICS: readonly SigTopic[];
export function getTopicBySlug(slug: string): SigTopic | undefined;
export function getReadyTopics(topics?: readonly SigTopic[]): SigTopic[];
export function getAdjacentSlug(
  currentSlug: string,
  direction: 'prev' | 'next',
  topics?: readonly SigTopic[],
): SigSlug | null;
```

`files` are public URLs starting with `/sig/`. Placeholders have `files: []`.

- [ ] **Step 1: Move binaries**

```bash
mkdir -p public/sig/entradas-salidas public/sig/pestel public/sig/matriz-interesados public/sig/mapa-de-procesos public/sig/matriz-raci
git mv assets/1-entradas-salidas/1-entradas-salidas.jpg public/sig/entradas-salidas/1-entradas-salidas.jpg
git mv assets/2-pestel/2-pestel.pdf public/sig/pestel/2-pestel.pdf
git mv assets/3-matriz-interesados/3-matriz-interesados.pdf public/sig/matriz-interesados/3-matriz-interesados.pdf
git mv assets/4-mapa-de-procesos/4-mapa-de-procesos.pdf public/sig/mapa-de-procesos/4-mapa-de-procesos.pdf
git mv assets/5-matriz-raci/5-matriz-raci.xlsx public/sig/matriz-raci/5-matriz-raci.xlsx
```

Leave the `.md` files in `assets/` as source notes. Do not commit PDFs if git-lfs is required; they are already in git.

- [ ] **Step 2: Write failing manifest and navigation tests**

`src/content/sig.manifest.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { SIG_TOPICS } from './sig.manifest';

describe('SIG_TOPICS', () => {
  it('lists seven topics with five ready and two placeholders', () => {
    expect(SIG_TOPICS).toHaveLength(7);
    expect(SIG_TOPICS.map((topic) => topic.slug)).toEqual([
      'entradas-salidas',
      'pestel',
      'matriz-interesados',
      'mapa-de-procesos',
      'matriz-raci',
      'politica-sig',
      'infografia',
    ]);
    expect(SIG_TOPICS.filter((topic) => topic.kind === 'placeholder')).toHaveLength(2);
    expect(SIG_TOPICS.filter((topic) => topic.kind !== 'placeholder')).toHaveLength(5);
    expect(SIG_TOPICS[0]?.kind).toBe('image');
    expect(SIG_TOPICS[0]?.sipocRows).toHaveLength(3);
    expect(SIG_TOPICS[1]?.kind).toBe('pdf');
    expect(SIG_TOPICS[4]?.kind).toBe('xlsx');
  });
});
```

`src/content/sig.navigation.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { getAdjacentSlug, getReadyTopics } from './sig.navigation';
import { SIG_TOPICS } from './sig.manifest';

describe('getAdjacentSlug', () => {
  it('skips placeholders and stops at the ends of the ready sequence', () => {
    expect(getReadyTopics(SIG_TOPICS)).toHaveLength(5);
    expect(getAdjacentSlug('entradas-salidas', 'prev')).toBeNull();
    expect(getAdjacentSlug('entradas-salidas', 'next')).toBe('pestel');
    expect(getAdjacentSlug('pestel', 'next')).toBe('matriz-interesados');
    expect(getAdjacentSlug('matriz-raci', 'next')).toBeNull();
    expect(getAdjacentSlug('matriz-raci', 'prev')).toBe('mapa-de-procesos');
    expect(getAdjacentSlug('politica-sig', 'prev')).toBe('matriz-raci');
    expect(getAdjacentSlug('politica-sig', 'next')).toBeNull();
    expect(getAdjacentSlug('infografia', 'prev')).toBe('matriz-raci');
  });
});
```

Run: `npx vitest run src/content/sig.manifest.test.ts src/content/sig.navigation.test.ts`

Expected: FAIL — modules missing.

- [ ] **Step 3: Implement manifest and navigation**

`src/content/sig.manifest.ts` — export `SIG_TOPICS` in the exact order above.

Topic bodies (use these strings; they are the approved explanations):

1. `entradas-salidas`  
   Summary: `SIPOC de proveedores, entradas, procesos y clientes de Etraining.`  
   Body: `El diagrama SIPOC muestra cómo entra trabajo a Etraining y qué sale al cliente. Emotions aporta hardware para kits de robótica (micro:bit) al público general. Comware aporta licitaciones que Etraining convierte en proyectos cerrados. Google Cloud aporta infraestructura; la salida es seguridad, escalabilidad y redundancia, y el cliente es la propia Etraining.`  
   `sipocRows`: Emotions / Hardware (equipos de cómputo) / Desarrollo de microbits / Kits de robótica / Público general; Comware / Licitación de proyectos / Desarrollo de proyectos / Proyectos finalizados / Público general; Google / Infraestructura nube GCP / Implementación y despliegue de procesos en la nube / Seguridad, escalabilidad y redundancia de proyectos / Etraining.  
   files: `['/sig/entradas-salidas/1-entradas-salidas.jpg']`

2. `pestel`  
   Summary: `Contexto PESTEL y alcance del SIG.`  
   Body: include the six factors (político: continuidad de políticas de transformación digital y contratación pública; económico: ciclo presupuestal público y TRM sobre cloud; social: brecha digital territorial y demanda de reskilling; tecnológico: IA generativa y dependencia de nube de terceros; ecológico: educación ambiental y sostenibilidad digital; legal: Ley 1581 de 2012 y Ley 80/1993 y 1150/2007). Then SIG scope: the SIG administers design, development, implementation, and support of digital education solutions (content, learning experiences, SaaS/LMS, technology kits, institutional clients). Processes: estratégicos (comercial, direccionamiento, licitaciones); misionales (contenidos, software, diseño pedagógico, analítica, conocimiento); gerencia (TH, compras, TI, jurídica, financiera, SST).  
   files: `['/sig/pestel/2-pestel.pdf']`

3. `matriz-interesados`  
   Summary: `Quién tiene poder e interés sobre el SIG.`  
   Body: list the ten stakeholder groups from `assets/3-matriz-interesados/3-matriz-interesados.md`. Then the four quadrants: mantener satisfechos (proveedores tecnológicos, universidades aliadas, cooperación internacional); administrar de cerca (entidades públicas contratantes, alta gerencia, gobernaciones y alcaldías, entidades beneficiarias); monitorear (empresarios y emprendedores); mantener informados (estudiantes, docentes y formadores, equipos técnicos y pedagógicos).  
   files: `['/sig/matriz-interesados/3-matriz-interesados.pdf']`

4. `mapa-de-procesos`  
   Summary: `Mapa de procesos estratégicos, misionales y de soporte.`  
   Body: `El mapa (PDF) es la fuente. Organiza el SIG en procesos estratégicos (dirección, comercial, licitaciones), misionales (contenidos, software, pedagogía, analítica, conocimiento) y de gerencia o soporte (talento humano, compras, TI, jurídica, financiera, SST). Léalo de arriba hacia abajo: la estrategia habilita la operación, y el soporte sostiene ambas.`  
   files: `['/sig/mapa-de-procesos/4-mapa-de-procesos.pdf']`

5. `matriz-raci`  
   Summary: `Responsable, a cargo, consultado e informado por proceso.`  
   Body: `La matriz asigna R (ejecuta), A (aprueba; uno por actividad), C (consultado) e I (informado) a seis roles de liderazgo. Las columnas agrupan gestión estratégica y comercial, operación misional y tecnología, y soporte y cumplimiento. El libro tiene tres hojas: la matriz, las claves desplegables y las personas con su rol.`  
   files: `['/sig/matriz-raci/5-matriz-raci.xlsx']`

6. `politica-sig` — kind `placeholder`, empty files, summary `Política del Sistema Integrado de Gestión.`, body `Este tema se publicará aquí.`

7. `infografia` — kind `placeholder`, empty files, summary `Infografía del SIG.`, body `Este tema se publicará aquí.`

`src/content/sig.navigation.ts`:

```ts
import { SIG_TOPICS, type SigSlug, type SigTopic } from './sig.manifest';

export function getTopicBySlug(
  slug: string,
  topics: readonly SigTopic[] = SIG_TOPICS,
): SigTopic | undefined {
  return topics.find((topic) => topic.slug === slug);
}

export function getReadyTopics(topics: readonly SigTopic[] = SIG_TOPICS): SigTopic[] {
  return topics.filter((topic) => topic.kind !== 'placeholder');
}

export function getAdjacentSlug(
  currentSlug: string,
  direction: 'prev' | 'next',
  topics: readonly SigTopic[] = SIG_TOPICS,
): SigSlug | null {
  const ready = getReadyTopics(topics);
  const currentIndex = ready.findIndex((topic) => topic.slug === currentSlug);
  if (currentIndex === -1) {
    return direction === 'prev' ? (ready.at(-1)?.slug ?? null) : null;
  }
  const target = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
  return ready[target]?.slug ?? null;
}
```

`getTopicBySlug` may live in `sig.navigation.ts` (as above) even though the Interfaces block listed it next to the manifest. Do not duplicate it.

- [ ] **Step 4: Run tests**

Run: `npx vitest run src/content`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content public/sig assets
git commit -m "$(cat <<'EOF'
Add the SIG topic manifest and relocate deliverable files.

Lets every SIG page read one typed index instead of hard-coded filenames.
EOF
)"
```

---

### Task 6: Deliverable viewers (image, pdf, placeholder)

**Files:**
- Create: `src/features/sig/viewers/DownloadLink.tsx`, `ImageViewer.tsx`, `PdfViewer.tsx`, `PlaceholderState.tsx`, `DeliverableViewer.tsx`, `DeliverableViewer.test.tsx`

**Interfaces:**
- Consumes: `assertNever`, `DeliverableKind`, `SigTopic`
- Produces:

```ts
export function DeliverableViewer({ topic }: { topic: SigTopic }): JSX.Element;
export function ImageViewer(props: { src: string; alt: string; downloadHref: string }): JSX.Element;
export function PdfViewer(props: { src: string; title: string; downloadHref: string }): JSX.Element;
export function PlaceholderState(): JSX.Element;
```

XLSX branch may render a labeled stub `data-testid="xlsx-stub"` until Task 7.

- [ ] **Step 1: Write failing viewer tests**

`src/features/sig/viewers/DeliverableViewer.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { SigTopic } from '@/content/sig.manifest';
import { DeliverableViewer } from './DeliverableViewer';

function topic(partial: Partial<SigTopic> & Pick<SigTopic, 'kind' | 'title'>): SigTopic {
  return {
    slug: 'pestel',
    number: 2,
    summary: '',
    body: '',
    files: ['/sig/pestel/2-pestel.pdf'],
    ...partial,
  };
}

describe('DeliverableViewer', () => {
  it('embeds a titled PDF with a download link', () => {
    render(<DeliverableViewer topic={topic({ kind: 'pdf', title: 'PESTEL y alcance SIG' })} />);
    const frame = screen.getByTitle('PESTEL y alcance SIG');
    expect(frame.tagName).toBe('IFRAME');
    expect(screen.getByRole('link', { name: /descargar/i })).toHaveAttribute(
      'href',
      '/sig/pestel/2-pestel.pdf',
    );
  });

  it('shows the source image for an image topic', () => {
    render(
      <DeliverableViewer
        topic={topic({
          kind: 'image',
          title: 'Entradas y salidas (SIPOC)',
          slug: 'entradas-salidas',
          files: ['/sig/entradas-salidas/1-entradas-salidas.jpg'],
        })}
      />,
    );
    expect(screen.getByRole('img', { name: /SIPOC/i })).toHaveAttribute(
      'src',
      '/sig/entradas-salidas/1-entradas-salidas.jpg',
    );
  });

  it('shows the construction empty state for placeholders', () => {
    render(
      <DeliverableViewer
        topic={topic({ kind: 'placeholder', title: 'Política SIG', files: [] })}
      />,
    );
    expect(screen.getByText('Este tema se publicará aquí.')).toBeInTheDocument();
    expect(screen.getByText('Contenido en construcción')).toBeInTheDocument();
  });
});
```

Run: `npx vitest run src/features/sig/viewers/DeliverableViewer.test.tsx`

Expected: FAIL — `DeliverableViewer` is not defined.

- [ ] **Step 2: Implement viewers**

`DownloadLink.tsx`: `<a href={href} download className="...">Descargar adjunto</a>`

`ImageViewer.tsx`: `<img src alt>` plus a button `Ver grande` that toggles a `dialog` (or full-width enlarged image). Always show `DownloadLink`.

`PdfViewer.tsx`:

```tsx
<iframe title={title} src={src} className="h-[70vh] w-full bg-white" />
```

plus `DownloadLink`. No fake PDF renderer.

`PlaceholderState.tsx`:

```tsx
export function PlaceholderState() {
  return (
    <div className="border border-dashed border-black/20 p-8">
      <p className="font-semibold">Contenido en construcción</p>
      <p>Este tema se publicará aquí.</p>
    </div>
  );
}
```

`DeliverableViewer.tsx`:

```tsx
import { assertNever } from '@/lib/assertNever';
import type { SigTopic } from '@/content/sig.manifest';
import { ImageViewer } from './ImageViewer';
import { PdfViewer } from './PdfViewer';
import { PlaceholderState } from './PlaceholderState';

export function DeliverableViewer({ topic }: { topic: SigTopic }) {
  switch (topic.kind) {
    case 'image':
      return (
        <ImageViewer
          src={topic.files[0] ?? ''}
          alt={topic.title}
          downloadHref={topic.files[0] ?? ''}
        />
      );
    case 'pdf':
      return (
        <PdfViewer
          src={topic.files[0] ?? ''}
          title={topic.title}
          downloadHref={topic.files[0] ?? ''}
        />
      );
    case 'xlsx':
      return <div data-testid="xlsx-stub">Matriz RACI</div>;
    case 'placeholder':
      return <PlaceholderState />;
    default:
      return assertNever(topic.kind);
  }
}
```

- [ ] **Step 3: Run tests**

Run: `npx vitest run src/features/sig/viewers`

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/features/sig/viewers src/lib/assertNever.ts
git commit -m "$(cat <<'EOF'
Add SIG deliverable viewers for image, PDF, and placeholders.

Keeps original attachments on screen instead of hiding them behind downloads.
EOF
)"
```

---

### Task 7: RACI parser and grid

**Files:**
- Create: `src/features/sig/raci/parseRaciWorkbook.ts`, `parseRaciWorkbook.test.ts`, `RaciGrid.tsx`, `XlsxViewer.tsx` (move into `src/features/sig/viewers/XlsxViewer.tsx`)
- Modify: `src/features/sig/viewers/DeliverableViewer.tsx` (replace xlsx stub)

**Interfaces:**
- Consumes: `xlsx` (`import * as XLSX from 'xlsx'`), `topic.files[0]`
- Produces:

```ts
export type RaciLetter = 'R' | 'A' | 'C' | 'I';
export type RaciSheet = { name: string; rows: string[][] };
export function parseRaciWorkbook(data: ArrayBuffer): RaciSheet[];
export function classifyRaciCell(value: string): RaciLetter | null;
```

`XlsxViewer` fetches the file, parses, shows tabs for each sheet, colors R/A/C/I cells, shows legend, download link. Loading: `Cargando matriz…`. Error: `No se pudo leer el Excel.` plus download.

- [ ] **Step 1: Write failing parser tests**

`src/features/sig/raci/parseRaciWorkbook.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import * as XLSX from 'xlsx';
import { classifyRaciCell, parseRaciWorkbook } from './parseRaciWorkbook';

describe('classifyRaciCell', () => {
  it('maps R A C I and ignores other text', () => {
    expect(classifyRaciCell('R')).toBe('R');
    expect(classifyRaciCell('a')).toBe('A');
    expect(classifyRaciCell('Consultado')).toBeNull();
    expect(classifyRaciCell('')).toBeNull();
  });
});

describe('parseRaciWorkbook', () => {
  it('reads each sheet as a grid of strings', () => {
    const book = XLSX.utils.book_new();
    const sheet = XLSX.utils.aoa_to_sheet([
      ['Actividad', 'Lider SIG'],
      ['Definir objetivos', 'A'],
    ]);
    XLSX.utils.book_append_sheet(book, sheet, 'Matriz');
    const buffer = XLSX.write(book, { type: 'array', bookType: 'xlsx' }) as ArrayBuffer;
    const sheets = parseRaciWorkbook(buffer);
    expect(sheets).toHaveLength(1);
    expect(sheets[0]?.name).toBe('Matriz');
    expect(sheets[0]?.rows[1]?.[1]).toBe('A');
  });
});
```

Run: `npx vitest run src/features/sig/raci/parseRaciWorkbook.test.ts`

Expected: FAIL — module missing.

- [ ] **Step 2: Implement parser**

```ts
import * as XLSX from 'xlsx';

export type RaciLetter = 'R' | 'A' | 'C' | 'I';
export type RaciSheet = { name: string; rows: string[][] };

export function classifyRaciCell(value: string): RaciLetter | null {
  const normalized = value.trim().toUpperCase();
  if (normalized === 'R' || normalized === 'A' || normalized === 'C' || normalized === 'I') {
    return normalized;
  }
  return null;
}

export function parseRaciWorkbook(data: ArrayBuffer): RaciSheet[] {
  const book = XLSX.read(data, { type: 'array' });
  return book.SheetNames.map((name) => {
    const sheet = book.Sheets[name];
    const rows = XLSX.utils.sheet_to_json<string[]>(sheet, {
      header: 1,
      raw: false,
      defval: '',
    });
    return { name, rows };
  });
}
```

- [ ] **Step 3: Implement `RaciGrid` and `XlsxViewer`; switch `DeliverableViewer`**

Legend (visible above the grid):

- R — Responsable (ejecuta; puede haber varios)
- A — A cargo (aprueba; uno por actividad)
- C — Consultado
- I — Informado

Tabs: one button per `RaciSheet.name`. Active sheet renders a `<table>`. Cells with `classifyRaciCell` get background classes: R green-ish, A orange (`bg-brand-orange text-white`), C amber (`bg-brand-amber text-brand-charcoal`), I muted. Other cells stay plain.

`XlsxViewer({ src, downloadHref }: { src: string; downloadHref: string })`:

- `useEffect` fetch `src` → `arrayBuffer` → `parseRaciWorkbook`
- states: `loading | error | ready`
- on error: message + `DownloadLink`
- on ready: `RaciGrid` + `DownloadLink`

Replace the xlsx stub in `DeliverableViewer`:

```tsx
case 'xlsx':
  return (
    <XlsxViewer src={topic.files[0] ?? ''} downloadHref={topic.files[0] ?? ''} />
  );
```

Add a test in `DeliverableViewer.test.tsx` that an xlsx topic shows `Cargando matriz…` (or the legend after mock). Simplest: mock `global.fetch` to reject and expect `No se pudo leer el Excel.` plus the download link.

- [ ] **Step 4: Run tests**

Run: `npm test`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/sig/raci src/features/sig/viewers
git commit -m "$(cat <<'EOF'
Parse the RACI workbook into a tabbed, colored grid.

Lets evaluators read the Excel in the browser and still download the original.
EOF
)"
```

---

### Task 8: SIG lobby, rooms, keyboard, 404

**Files:**
- Create: `src/features/sig/TopicCard.tsx`, `RoomChrome.tsx`, `SipocTable.tsx`, `SigNotFound.tsx`, `useSigKeyboardNav.ts`, `SigLobbyPage.test.tsx`, `SigRoomPage.test.tsx`, `sig.navigation.keyboard.test.tsx` (or colocate hook tests)
- Modify: `src/features/sig/SigLobbyPage.tsx`, `src/app/router.tsx` (add `:slug` child)
- Create: `src/features/sig/SigRoomPage.tsx`

**Interfaces:**
- Consumes: `SIG_TOPICS`, `getTopicBySlug`, `getAdjacentSlug`, `getReadyTopics`, `DeliverableViewer`
- Produces: lobby grid of seven cards; room two-column desktop / stacked mobile; prev/next among ready topics; ArrowLeft/ArrowRight; unknown slug → `SigNotFound`

Router child:

```ts
{ path: 'sig/:slug', element: <SigRoomPage /> },
```

- [ ] **Step 1: Write failing lobby and room tests**

`src/features/sig/SigLobbyPage.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { SIG_TOPICS } from '@/content/sig.manifest';
import { SigLobbyPage } from './SigLobbyPage';

describe('SigLobbyPage', () => {
  it('renders seven topic cards and marks placeholders as under construction', () => {
    render(
      <MemoryRouter>
        <SigLobbyPage />
      </MemoryRouter>,
    );

    for (const topic of SIG_TOPICS) {
      expect(screen.getByText(topic.title)).toBeInTheDocument();
    }
    expect(screen.getAllByText('Contenido en construcción')).toHaveLength(2);
    expect(screen.getByRole('link', { name: /Entradas y salidas/i })).toHaveAttribute(
      'href',
      '/sig/entradas-salidas',
    );
  });
});
```

`src/features/sig/SigRoomPage.test.tsx` — wrap with `createMemoryRouter`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Layout } from '@/app/Layout';
import { SigLobbyPage } from './SigLobbyPage';
import { SigRoomPage } from './SigRoomPage';

function renderRoom(path: string) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <Layout />,
        children: [
          { path: 'sig', element: <SigLobbyPage /> },
          { path: 'sig/:slug', element: <SigRoomPage /> },
        ],
      },
    ],
    { initialEntries: [path] },
  );
  return render(<RouterProvider router={router} />);
}

describe('SigRoomPage', () => {
  it('shows explanation, SIPOC table, and image for entradas-salidas', () => {
    renderRoom('/sig/entradas-salidas');
    expect(screen.getByRole('heading', { name: /Entradas y salidas/i })).toBeInTheDocument();
    expect(screen.getByText('Emotions')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Entradas y salidas/i })).toBeInTheDocument();
  });

  it('returns a SIG 404 for unknown slugs', () => {
    renderRoom('/sig/no-existe');
    expect(screen.getByText(/no encontramos este tema/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /volver al SIG/i })).toHaveAttribute('href', '/sig');
  });

  it('goes to the next ready topic with ArrowRight', async () => {
    const user = userEvent.setup();
    renderRoom('/sig/entradas-salidas');
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('heading', { name: /PESTEL/i })).toBeInTheDocument();
  });
});
```

Run: `npx vitest run src/features/sig/SigLobbyPage.test.tsx src/features/sig/SigRoomPage.test.tsx`

Expected: FAIL.

- [ ] **Step 2: Implement lobby, room, sipoc table, chrome, hook, 404; wire router**

`TopicCard`: number, title, summary, link to `/sig/${slug}` labeled `Ver entregable` for ready topics. Placeholders still link to the room, and also show `Contenido en construcción` (not a fake disable).

`SipocTable`: render `topic.sipocRows` as `<table>` with headers Proveedor, Entradas, Proceso, Salida, Cliente.

`RoomChrome`: title `h1`, `n / 5` using ready list index when current is ready (hide counter on placeholders), links Anterior / Siguiente / Índice (`/sig`).

`useSigKeyboardNav(prev: SigSlug | null, next: SigSlug | null)`: `useEffect` on `keydown`; ignore when target is `input`/`textarea`; `ArrowLeft` → `navigate(routes.sigTopic(prev))` if prev; `ArrowRight` similarly.

`SigRoomPage`: `useParams().slug` → `getTopicBySlug`. If missing, `<SigNotFound />`. Else two-column layout (`grid gap-8 lg:grid-cols-2`): left explanation (`body` with preserved line breaks via `whitespace-pre-line`) + `SipocTable` if `sipocRows`; right `DeliverableViewer`. Position among ready: `getReadyTopics().findIndex`. Prev/next: `getAdjacentSlug`.

`SigNotFound`: `No encontramos este tema.` + link `Volver al SIG`.

`SigLobbyPage`: intro paragraph (SIG scope from pestel body first sentences or a dedicated `sigLobbyIntro` exported from the manifest file). Then a responsive grid of `TopicCard`.

Add `sigLobbyIntro` constant in `sig.manifest.ts`:

```ts
export const SIG_LOBBY_INTRO =
  'El SIG de Etraining administra el diseño, desarrollo, implementación y el soporte de las soluciones integrales digitales para la educación: contenidos, experiencias de aprendizaje, plataformas SaaS y LMS, dotaciones tecnológicas y servicios a clientes institucionales del sector público o privado.';
```

If adding this constant, extend `sig.manifest.test.ts` with `expect(SIG_LOBBY_INTRO.length).toBeGreaterThan(40)` or assert the lobby page shows a substring.

- [ ] **Step 3: Run the full suite and typecheck**

```bash
npm test
npx tsc -b --pretty false
```

Expected: all tests PASS, `tsc` exit 0.

- [ ] **Step 4: Manual check**

```bash
npm run dev
```

Open `/`, `/nosotros`, `/sig`, `/sig/matriz-raci`, `/sig/politica-sig`, `/sig/no-existe`. Confirm ribbon names wrap, PDF visible, RACI tabs work, arrows skip placeholders, contact mailto works.

- [ ] **Step 5: Commit**

```bash
git add src/features/sig src/app/router.tsx src/content/sig.manifest.ts src/content/sig.manifest.test.ts
git commit -m "$(cat <<'EOF'
Open the SIG lobby and topic rooms with keyboard walkthrough.

Lets presenters advance live and lets evaluators jump straight to a deliverable.
EOF
)"
```

---

### Task 9: README and finish notes

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: the running app
- Produces: how to install, test, and present

- [ ] **Step 1: Replace `README.md`**

```markdown
# Presentación SIG · Etraining · Grupo 2

Landing académica en React + TypeScript. Home y Nosotros reconstruyen la marca pública de Etraining. `/sig` es el teatro de documentos del Sistema Integrado de Gestión.

## Scripts

- `npm install`
- `npm run dev` — http://localhost:5173
- `npm test`
- `npm run build`

## Recorrido

Inicio → Nosotros (opcional) → Sistema Integrado de Gestión → cada tema. Flechas izquierda/derecha avanzan entre temas listos. Política e infografía están vacías a propósito.

## Contenido

Copy de empresa: solo [etraining.co](https://etraining.co/). Entregables SIG: `public/sig/`.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "$(cat <<'EOF'
Document how to run and present the SIG landing.

Gives evaluators and presenters a single entry point to the local site.
EOF
)"
```

---

## Spec coverage (self-review)

| Spec section | Task |
|---|---|
| Purpose / audience / success | 3 ribbon, 8 room+keyboard |
| Four routes, nav, ribbon names | 3 |
| Home sections 1–8, 22 years, no YouTube, mailto | 4 |
| Nosotros | 4 |
| Lobby 7 cards, placeholders labeled | 8 |
| Room columns, prev/next skip placeholders, SIPOC table+photo, PESTEL/interesados/mapa PDFs, RACI grid, empty política/infografía | 6, 7, 8 |
| DeliverableViewer kinds, download on error | 6, 7 |
| Tokens, Inter, etraining.co | 2, 4 |
| Folder map, exhaustive switch, typed manifest | 1, 5, 6 |
| A11y skip link, iframe title, focus | 3, 6 |
| Tests listed in spec §12 | 5, 6, 7, 8 |
| Out of scope (no extra routes, no invented policy, no financials) | 3–4, 8 |
| Asset move to `public/` | 3 (logo), 5 (SIG) |

No Playwright. No CMS. No contact form. Filters on RACI are out (spec asks tabs + colored grid + download, not filters).
