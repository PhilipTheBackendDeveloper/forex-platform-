# Changelog

## [Unreleased] — 2026-10-30 · Reference-parity rebuild
### Added
- Interactive audit tooling (`scripts/audit-reference.mjs`, `audit-reference-interactions.mjs`, `capture-scroll.mjs`) and `docs/research/LIVE_AUDIT.md`.
- Two header systems: global `SiteHeader` and per-page `PageHeader`, both on a floating-pill `FloatingBar`; `(site)` / `(landing)` route groups; standalone Gold Digger and auth pages.
- `Dialog` (modal/drawer), `StickyStack`, `ScrollSteps`, SVG visuals + generated `ChartCover`, assistant panel with `openAssistant()` event bus.
- Homepage rebuilt into 11 reference-order sections; coaching/academy pinned scroll sections; events/shop modals, drawer and filters.
### Changed
- Header CTA is now Sign in / Sign up (logged-out reference behaviour); mobile menu redesigned.
- Sign in is email-only; sign-up uses first/last name, email, WhatsApp number and a 3-step stepper (still not connected).
- Proposal form: required category chips, website field; honeypot renamed to `hp`.
- Footer: reference column order, brand row and disclaimer block.
### Removed
- `PageHero`, `EmptyState`, `dashboardEntryHref`, the old `sections.tsx`.
### Fixed
- Removed a grayscale filter applied to a client photo.

## [Unreleased] — 2026-10-29
### Added
- Next.js 16.4.2 App Router scaffold (strict TS, Tailwind v4, ESLint, Turbopack, Cache Components).
- Design tokens (measured from reference where possible), Geist typography, Motion provider with reduced-motion support.
- Shared shell: sticky header, accessible mobile menu, footer with risk warning, help launcher.
- Public routes: `/`, `/gold-digger`, `/coaching`, `/academy`, `/mastery-courses` (+ `[slug]`), `/blogs` (+ `[slug]`), `/events`, `/shop`, `/collaborations`, `/about`, 5 legal drafts, `/login`, `/register`, 404/error pages, `robots.txt`, `sitemap.xml`, `/api/health`.
- Lead form Server Action with dual Zod validation and honest "not configured" result.
- Typed domain contracts (`src/types/domain.ts`) and data adapters with loading/empty/error states.
- Seven client photos imported with manifest; AVIF derivatives; OG image.
- Docs: AGENTS.md, brief, status, open client items, roadmap, ADR-001..003, architecture set, research audit, design tokens, QA matrix.
- Tests: Vitest unit tests; Playwright route smoke + interaction tests; screenshot capture script; CI workflow.
