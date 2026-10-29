# AGENTS.md — rules for humans and coding agents

This repository is a **Next.js 16 App Router modular monolith** for a forex-education platform, built by two developers. Read this file fully before changing anything.

## 0. Before you change code
1. Read `docs/PROJECT_BRIEF.md`, `docs/PROJECT_STATUS.md`, `docs/team/ROLES_AND_OWNERSHIP.md` and the ADRs in `docs/architecture/DECISIONS/` that touch your area.
2. Run `git status` and `git branch --show-current`. Work only on your own feature branch. **Never force-push, never rewrite shared history, never commit to another developer's branch.**
3. Next.js 16 differs from older versions you may remember. Check the version-matched docs in `node_modules/next/dist/docs/` (or https://nextjs.org/docs/app) before using an API — e.g. `params` is a Promise, `cacheComponents` is enabled, `next lint` no longer exists.

## 1. Ownership boundaries
| Area | Paths | Owner |
|---|---|---|
| Public site | `src/app/(public)/**`, `src/app/(auth)/**`, `src/features/{home,courses,editorial,events,commerce,cohorts,leads,auth}/**`, `src/content/**` | Public-site owner (project initiator) |
| Student dashboard | `src/app/(protected)/dashboard/**`, `src/features/dashboard/**` | **Roddy** — do not edit |
| Admin | `src/app/(protected)/admin/**`, `src/features/admin/**` | **TBD** — agree in `docs/team/ROLES_AND_OWNERSHIP.md` first |
| Shared contracts | `src/types/**`, `src/config/**`, `src/app/globals.css`, `src/components/{ui,motion}/**`, `src/server/**` | Both — small PRs, both review, merge quickly |

## 2. Engineering rules
- **TypeScript strict.** No `any`, no `@ts-ignore` without a linked issue.
- **Server/client boundary.** Default to Server Components. Add `"use client"` only for interactivity. Anything in `src/server/**` must `import "server-only"` and must never be imported by a client component.
- **Tokens only.** Use semantic Tailwind utilities from `src/app/globals.css` (`bg-background`, `text-muted`, `bg-primary` …). Never hard-code brand hex values in components.
- **Content lives in data, not JSX.** Copy → `src/content/*`; domain records → `src/features/<domain>/data/*` typed with `src/types/domain.ts`. Business values (name, links, flags) → `src/config/site.config.ts`.
- **No dead links.** Every link goes somewhere real, opens a working local interaction, or renders a disabled control with a visible reason (`ButtonLink href={null}`). Never `href="#"`.
- **Honest states.** Loading, empty and error states for every async list (`Loadable<T>`). Forms never claim delivery, payment, sign-in or enrollment that did not happen.
- **Accessibility.** Semantic landmarks, one `h1` per page, labelled controls, visible focus, ≥44 px touch targets, keyboard support, `prefers-reduced-motion` honoured (MotionProvider + CSS).
- **Motion.** Transform/opacity only; no scroll-jacking or autoplay audio; purposeful, short.
- **Images.** `next/image` with static imports and `sizes`; `priority` only for the LCP image.
- **Security.** No secrets in code or `NEXT_PUBLIC_*`. Validate every input on the server (Zod). Authorise at the data boundary (Server Action / Route Handler / service), never only in the UI. Payments: server-initiated, webhook-verified, idempotent; never grant access from a redirect.
- **Metadata.** Every route exports `metadata` or `generateMetadata` with a canonical path. Auth/admin/dashboard routes are `noindex`.

## 3. Content & legal rules
- **Never invent** prices, testimonials, student counts, audience sizes, returns, awards, partner names, availability or legal approvals. Use `PlaceholderBadge` and record the gap in `docs/OPEN_CLIENT_ITEMS.md`.
- No profit promises. Keep the risk disclaimer in the footer and on articles.
- Do not copy code, copy, logos, photos, videos or policies from the reference site (kojoforex.com). Benchmark layout and quality only.
- Client photos (`public/images/client/`) are used with pending publication consent; never edit the subject's appearance.

## 4. Definition of done
- Route loads with no console errors or hydration warnings; required controls work.
- Checked at **390, 768 and 1440 px** (no horizontal scroll, menu works, text fits).
- No broken images or links (`pnpm test:e2e` covers routes).
- `pnpm lint && pnpm typecheck && pnpm test && pnpm build` all pass.
- `docs/PROJECT_STATUS.md` (task board + commands run + results) and any affected docs updated.
- Blockers reported with the exact command and output — never hidden.

## 5. Commands
```bash
pnpm dev          # local dev server (Turbopack)
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
pnpm test         # Vitest unit tests
pnpm build        # production build
pnpm test:e2e     # Playwright smoke tests (uses installed Google Chrome)
pnpm screenshots  # capture 390/768/1440 screenshots to docs/qa/screenshots
```
