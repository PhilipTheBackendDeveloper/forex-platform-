# Project status — updated 2026-10-30 (after the live reference audit)

## Summary
The public site was **rebuilt to match the reference's real multi-page structure** after an interactive audit of the live site (every page crawled at 1440 and 390 px, every non-submit control clicked; see `docs/research/LIVE_AUDIT.md`). It runs locally; **nothing has been pushed or deployed.** All client content we don't have is a visibly marked placeholder.

## Git
- Local repo `/Users/apple/Developer/work/albert-tech/forex-platform`, no remote.
- `main` — foundation commit (scaffold, tokens, shared UI/contracts, docs).
- `feat/public-site` — first public build + this rebuild (see `git log`).
- `feat/dashboard` — not created; Roddy branches from `main`.

## Task board
### Done
- [x] Foundation, tokens, docs, ADRs, CI (session 1)
- [x] **Live interactive audit**: 19 desktop pages + mobile crawl, ~200 screen captures, click results for ~90 controls, audit scripts committed (`scripts/audit-reference*.mjs`)
- [x] Route architecture: `(site)` global header · `(landing)` page sub-headers · standalone `/gold-digger` · standalone `(auth)`
- [x] `FloatingBar` (transparent → floating pill), `PageHeader`, new mobile menu (Sign in / Sign up)
- [x] Homepage rebuilt section by section to the reference layout (11 sections, see REFERENCE_VS_IMPLEMENTATION.md)
- [x] Coaching: sticky pillars + pinned scroll roadmap + two-pane offer; Academy: pinned 6-step story + venues + tiers
- [x] Mastery catalogue/detail, Events (modals, filters), Shop (drawer, modal, floating cart), Collaborations, Blogs/article, Legal, Gold Digger, Sign in / Sign up
- [x] Shared `Dialog` (modal + drawer), `StickyStack`, `ScrollSteps`, `ChartCover` + SVG visuals, assistant panel + `openAssistant()` event
- [x] Proposal form: required single-select category chips, website field, renamed honeypot
- [x] Tests updated + new e2e for modals/drawer/assistant/sub-header/category gating
- [x] Removed a grayscale filter that had been applied to a client photo (photo rule: never alter the subject)

### Done 2026-10-30 (image & feel pass)
- [x] Subject cutouts (Vision, pixel-identical subject) + `PortraitScene`; hero/educator/coaching no longer show bright backdrops or seams
- [x] Hero matches measured reference structure and spacing; buttons resized to reference; stats fit on one line at 390 px
- [x] Market ticker with real indicative data (ECB / CoinGecko), collapses on scroll
- [x] Quieter placeholder badges; tooltip reasons instead of captions
- [x] Verified: lint ✅ · typecheck ✅ · unit 16/16 ✅ · build ✅ · e2e 59 passed, 1 skipped ✅

### Done 2026-10-30 (exact-replica pass)
- [x] Pulled the reference homepage's full server-rendered structure (every section) and rebuilt each section to its measured classes/spacing/animation
- [x] Brand → Albert Tech + favicon/app icon; line-mask heading reveals site-wide; phone simulator; diagonal section edges; original photos in educator; B&W→colour coaching frame
- [x] Verified: lint ✅ · typecheck ✅ · unit 16/16 ✅ · build 33 pages ✅ · e2e 59 passed, 1 skipped ✅ · visual check at 1680×1050 and 390×844

### Next
- [ ] Visual polish pass at 320/360/1024/1920 widths; Safari/Firefox
- [ ] Tailwind canonical-class cleanup (IDE suggestions only)
- [ ] Lighthouse + axe runs on a preview deploy

### Blocked
- [ ] GitHub remote + push, preview deploy — **need your approval**
- [ ] Client content (OPEN_CLIENT_ITEMS.md), photo consent, legal text
- [ ] ADR-002 auth/DB and ADR-003 payments; admin/backend owner with Roddy

## Commands run (final pass, 2026-10-30) and results
| Command | Result |
|---|---|
| `node scripts/audit-reference.mjs` | ✅ 19 desktop + mobile page captures (`docs/research/audit/`) |
| `node scripts/audit-reference-interactions.mjs` (desktop, mobile) | ✅ results JSON + before/after captures |
| `pnpm lint` | ✅ 0 errors, 0 warnings |
| `pnpm typecheck` | ✅ |
| `pnpm test` | ✅ 16/16 |
| `pnpm build` | ✅ 32 static pages |
| `E2E_BASE_URL=http://localhost:3100 pnpm test:e2e` | ✅ 59 passed, 1 skipped (mobile-menu test is mobile-only) |

## Issues hit
- Next 16 `next dev` appends a managed block to `AGENTS.md`; kept it (Next.js recommends committing it).
- A dev-only hydration warning came from stale hot reload after editing `Badge`; the production build + e2e (which fail on console errors) are clean.
- lucide-react v1 has no brand logos → neutral glyphs for social links.

## Known limitations
- No backend: forms, auth, enrolment, checkout, tickets, orders and the assistant only validate and explain that they're not connected.
- Events/shop/cohorts render empty states because no client data exists; their detail UIs are built and covered by type contracts.
- Reference screenshots in `docs/research/audit` are third-party internal research evidence — do not publish.
