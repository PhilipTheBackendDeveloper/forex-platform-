# Test strategy

| Layer | Tool | Scope today | Command |
|---|---|---|---|
| Static | ESLint (`eslint-config-next`), `tsc --noEmit` strict | whole repo | `pnpm lint`, `pnpm typecheck` |
| Unit | Vitest | course filter & price formatting, navigation integrity (no `#` links, active-path logic), content integrity (unique slugs, no unapproved prices, integrations off), Zod schemas | `pnpm test` |
| E2E smoke | Playwright (installed Chrome locally, Chromium in CI) at 1440 & 390 | every public route: 200, single `h1`, no `href="#"`, no horizontal overflow, no broken eager images, no console errors; 404; `/signin` redirect | `pnpm test:e2e` |
| E2E behaviour | Playwright | mobile menu (open/Escape/navigate-close), course search + empty state, form validation + honest "not sent" result, FAQ toggle, login never fakes sign-in, reduced-motion visibility | `pnpm test:e2e` |
| Visual | `scripts/capture-screenshots.mjs` | 390/768/1440 full-page captures of ours + reference for manual comparison | `pnpm screenshots` |

## Next
- Integration tests for Server Actions/services once a DB exists (test DB in CI).
- Payment webhook tests: signature failure, duplicate event, amount mismatch, success → single entitlement.
- Axe accessibility scan in Playwright (`@axe-core/playwright`).
- Visual regression baselines once the client approves the design.
