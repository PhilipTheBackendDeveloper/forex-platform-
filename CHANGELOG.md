# Changelog

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
