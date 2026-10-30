# Changelog

## [Unreleased] — 2026-10-30 · Exact-replica pass from reference markup
### Added
- Brand renamed to **Albert Tech**; new "A + rising line" mark; `src/app/icon.svg` favicon + `apple-icon.png`.
- `RevealLines`: line-mask heading reveal (reference: overflow-hidden rows, 0.9s cubic-bezier(0.16,1,0.3,1), staggered) used by all section headings.
- `PhoneSimulator`: realistic 3D phone (titanium frame, buttons, Dynamic Island, glare) with a live, looping channel feed.
### Changed (all measured from the reference's server-rendered markup)
- Hero: diagonal bottom edge (`clip-path` 8vw), reference paddings, exposure filter, shine sweep on primary CTA.
- Educator: diagonal top (−8vw overlap), original full-bleed photos with crossfade + wipe reveal, 300px blend, caption; slider dots removed (owner request).
- Testimonials: reference card spec (bento 8/4/4/8, blue borders, grain, hover glow) with labelled placeholder quotes.
- Community: reference two-column layout with wipe-reveal visual panel.
- Beginner, mastery (sticky stack spec incl. 150px rise), coaching (B&W→colour hover frame, moving corners, gradient fee card), blog bento (photo covers), proposal form (pill chips, reference fields), FAQ (rounded-4xl cards, gradient top bar, glass ask bar), socials, footer gradient.
### Fixed
- FAQ answers moved outside the toggle button (valid ARIA), collapsed answers are `inert`.

## [Unreleased] — 2026-10-30 · Image integration, ticker, button sizing
### Added
- `scripts/cutout.swift`: on-device Vision subject cutouts (defringe, feather, auto-trim); 4 cutouts in `public/images/client/cutouts/`.
- `PortraitScene`: places cutouts in a lit navy scene with mask-based edge fades (no seams against gradients) and the reference's 40 s settle-zoom.
- Market ticker strip above the global header (reference parity) using real, keyless sources: ECB daily reference rates (Frankfurter) and CoinGecko; cached `minutes`, hidden if the sources fail, labelled indicative.
### Changed
- Hero rebuilt on the measured reference structure (52% text column + `flex-1` image panel; full-bleed behind text on mobile); headline offset matches the reference.
- Buttons resized to the reference (`px-8 py-4`, 16px, medium, never wrap); unavailable links show their reason as a hover/focus tooltip instead of a caption.
- Placeholder badges made quiet (small neutral pill + amber dot) so previews look finished but stay honest.
- Educator slider and coaching frame use cutouts instead of bright window photos.

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
