# forex-platform

Public website and shared foundations for a forex-education platform (temporary repo name). Visual benchmark: kojoforex.com — **layout and interaction quality only; all content, photos and branding are the client's or clearly-marked placeholders.**

## Stack
Next.js 16.4.2 (App Router, Turbopack, Cache Components) · React 19.3 · TypeScript 5.9 strict · Tailwind CSS 4.3 · Motion for React · Zod · lucide-react · Vitest · Playwright · pnpm 11.

## Quick start
```bash
pnpm install
cp .env.example .env.local
pnpm dev                 # http://localhost:3000
```

## Quality gates
```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
pnpm start -p 3100 &     # then:
pnpm test:e2e            # Playwright smoke + interaction tests (installed Chrome)
pnpm screenshots         # 390/768/1440 captures → docs/qa/screenshots/ours
```

## Where things live
| Need to change… | Edit |
|---|---|
| Brand name, links, feature flags | `src/config/site.config.ts` |
| Colours, radii, fonts | `src/app/globals.css` (`:root`) |
| Navigation & route paths | `src/config/navigation.ts` |
| Page copy | `src/content/*` |
| Courses / articles / cohorts / events / products | `src/features/<domain>/data/*` |
| Client photos | `public/images/client/` + `src/config/assets.ts` |

## Read next
`AGENTS.md` (rules) · `docs/PROJECT_STATUS.md` (what's done) · `docs/OPEN_CLIENT_ITEMS.md` (what the client must supply) · `docs/team/INTEGRATION_CONTRACT.md` (dashboard handoff) · `docs/architecture/` (ADRs & design).

> ⚠️ Not for public deployment until photo consent, branding and legal text are approved.
