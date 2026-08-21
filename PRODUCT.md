# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React + TypeScript + React Router. Tailwind CSS only as layout engine, with Etraining brand tokens (orange, charcoal, amber). No backend. Spanish only.

## Users

Primary: academic evaluators who watch a live defense and later open the URL alone.

Secondary: Grupo 2 presenters, who walk the site on a projector or call and then leave it as a reviewable artifact.

## Product Purpose

This is not the official Etraining website. It is an academic presentation that uses Etraining as the case company for an Integrated Management System (SIG).

The visitor must:

1. Understand who Etraining is, in the company's own brand language.
2. Enter a SIG precinct and inspect five completed deliverables in the browser.
3. See that Política SIG and Infografía are planned and empty, not fake.

Success: an evaluator can follow the live walkthrough and later open any topic, read the explanation, and see the original attachment without downloading first.

## Positioning

A brand-faithful Etraining shell with a permanent academic ribbon, plus a document-theater SIG that official etraining.co does not have.

## Operating Context

Presenters share a static site (local `vite` or a static host). Evaluators use a desktop browser first; mobile must still read and open attachments. No login. No CMS.

Source materials live in `assets/` today and will move under `public/` during implementation:

- `1-entradas-salidas/` — SIPOC photo + markdown table
- `2-pestel/` — PESTEL + SIG scope, markdown + PDF
- `3-matriz-interesados/` — stakeholder matrix, markdown + PDF
- `4-mapa-de-procesos/` — process map PDF (markdown empty)
- `5-matriz-raci/` — RACI workbook (`.xlsx`)
- `logo-etraining.webp` — official logo

## Capabilities and Constraints

Confirmed:

- Company surfaces: Home and Nosotros only.
- SIG surfaces: lobby + one room per topic, with in-browser viewers.
- RACI renders as an interactive grid parsed from the `.xlsx`.
- SIPOC shows a transcribed table and the original notebook photo.
- Keyboard previous/next on SIG rooms for live presenting.
- Contact is a static `#contacto` block with public address, phone, and `mailto:comunicaciones@etraining.edu.co`. No form backend.
- v1 does not embed the official YouTube essence video.

Undecided (not blocking v1):

- Hosting target (local, GitHub Pages, or other static host).

Must not:

- Invent Política SIG or Infografía content.
- Publish financials, reorganization, or non-public claims from the 2025 management report.
- Clone Blog, Brochure, search, or standalone Soluciones/Casos routes.

## Brand Commitments

Name: Etraining (also E-Training S.A.S. in legal texts). Visual authority: https://etraining.co/ and `public/brand/logo-etraining.webp`, plus the official plum/orange/amber system (deep plum surfaces, vibrant orange CTAs, amber accents).

Voice: institutional, pedagogical, Colombian Spanish. Claims only from the public site (misión, propósito, five business lines, alliances, public case facts).

Academic identity is mandatory: a permanent ribbon states this is a SIG presentation by Grupo 2 and names the team.

## Evidence on Hand

Public site copy and cases from etraining.co. Logo file in the repo. Five SIG deliverables listed above. Team names and RACI roles from `5-matriz-raci.xlsx`.

Do not fabricate testimonials, extra certifications, or impact numbers that are not on the public site or in the SIG markdown.

## Product Principles

1. Brand is costume; the SIG is the assignment.
2. Original attachments stay visible; UI never replaces the deliverable.
3. Empty future topics stay empty and labeled.
4. Public company facts only.
5. One typed manifest drives all SIG topics; pages do not hard-code file types.

## Accessibility & Inclusion

Spanish UI. Keyboard access for SIG room navigation. Visible focus. Iframes for PDFs have titles. Orange/amber on dark or light must keep readable contrast. Mobile: explanation then viewer, full width.
