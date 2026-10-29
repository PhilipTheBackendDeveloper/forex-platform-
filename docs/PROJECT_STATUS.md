# Project status — 2026-10-29 (session end ≈ 23:40 GMT / Ghana time)

## Summary
The public website is **implemented and running locally** on `feat/public-site`: 19 public URLs (+3 course and 4 article detail pages, robots, sitemap, health), shared design system, client photos, docs and tests. **Nothing has been pushed or deployed.** All content that the client hasn't supplied is a visibly marked placeholder.

## Git
- Repo: `/Users/apple/Developer/work/albert-tech/forex-platform` (local only, no remote).
- `main` → foundation commit (scaffold, tokens, shared UI/contracts, docs). Verified on its own: lint ✅ typecheck ✅ build ✅.
- `feat/public-site` → public pages + tests on top of `main`.
- `feat/dashboard` → **not created** — Roddy branches from `main` himself.

## Task board
### Done
- [x] Environment audit (Node 22.23.3, pnpm 11.20.0, git 2.56, gh logged in, Chrome present)
- [x] Reference research: 22 routes fetched, robots/sitemap, headers, measured tokens; 30 reference screenshots
- [x] Next.js 16.4.2 scaffold, strict TS, Tailwind 4.3.3, ESLint, Prettier, Vitest, Playwright, CI workflow
- [x] Design tokens (measured), Geist, Motion + reduced motion
- [x] Header (sticky blur, active state), mobile menu (dialog, focus trap, Escape, closes on navigate), footer + risk warning, help launcher
- [x] Homepage (13 sections) with masked client portrait; P0 pages (coaching, academy, mastery courses + detail, gold digger); P1 pages (blogs + detail, events, shop, collaborations, about, 5 legal drafts, login, register, 404/error)
- [x] Lead form: client + server Zod validation, honeypot, honest `not_configured` result
- [x] 7 client photos preserved + manifest (SHA-256), AVIF derivatives, OG image
- [x] Docs: AGENTS.md (+ scoped), brief, open items, roadmap, ADR-001..003, architecture set, research set, design tokens, team contract, QA matrix
- [x] Hero visual-parity pass at 1440/390 (fixed nav contrast over bright backdrop, headline spacing)

### In progress / next
- [ ] Review screenshots at 768 and fix any tablet issues
- [ ] Tailwind canonical-class cleanup (IDE suggestions only; no lint errors)
- [ ] Optional: replicate reference stacked/sticky mastery cards

### Blocked (need decision/credentials)
- [ ] Remote GitHub repo + push — **needs your approval** (commands in docs/architecture/DEPLOYMENT.md)
- [ ] Preview deploy — needs approval + photo publication consent
- [ ] Client content: see OPEN_CLIENT_ITEMS.md (27 items)
- [ ] Auth/DB (ADR-002) and payments (ADR-003) decisions; admin/backend ownership with Roddy

## Commands run (final pass) and results
| Command | Result |
|---|---|
| `pnpm lint` | ✅ 0 errors, 0 warnings |
| `pnpm typecheck` (`next typegen && tsc --noEmit`) | ✅ |
| `pnpm test` (Vitest) | ✅ 2 files, 15 tests passed |
| `pnpm build` | ✅ 32 static pages generated |
| `E2E_BASE_URL=http://localhost:3100 pnpm test:e2e` | ✅ 53 passed, 1 skipped (mobile-menu test is mobile-only by design) |
| `node scripts/audit-routes.mjs` | ✅ 20 route files, no duplicate URLs |
| `node scripts/capture-screenshots.mjs [--reference]` | ✅ reference 30 PNGs; ours 15 routes × 3 widths |

## Issues hit and how they were resolved
- `create-next-app` pinned `next@16.4.3`, which the registry mirror reported as unavailable → pinned **16.4.2** (installs cleanly).
- Very slow network: one `pnpm add` timed out and a retry hung with no open connections → killed it and re-ran with `--prefer-offline` (15 s, from the populated store).
- Cache Components rejected `new Date()` in the footer during prerender → moved to a `"use cache"` helper.
- A stale `next-server` survived a restart and served an old build (rendered the error page) → killed by PID; documented: stop `next-server`, not just `pnpm`.

## Known limitations
- No backend: forms, auth, enrollment and checkout intentionally do nothing beyond validation (clearly labelled).
- Reference full-page home capture is unreliable (sticky sections) — fold comparison used the supplied screenshot.
- Not verified: 320/360/1024/1920 widths, Lighthouse/CWV, axe, Safari/Firefox, real devices.
- Client photos are used without confirmed publication consent — **do not deploy publicly yet**.

## Exact next steps
1. Review locally: `cd forex-platform && pnpm install && pnpm build && pnpm start` → http://localhost:3000.
2. Approve remote creation, then: `gh repo create <org>/forex-platform --private --source=. --remote=origin && git push -u origin main feat/public-site`; open PR `feat/public-site → main`.
3. Share `docs/team/INTEGRATION_CONTRACT.md` + `ROLES_AND_OWNERSHIP.md` with Roddy; agree ADR-002 and admin/backend owners.
4. Send the client `OPEN_CLIENT_ITEMS.md` (brand, consent, copy, prices, legal, links).
5. Connect a preview deployment (password-protected) once consent is confirmed.
