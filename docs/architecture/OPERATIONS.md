# Operations

- **Health:** `GET /api/health` → `{"status":"ok"}` for uptime checks.
- **Errors:** `src/app/error.tsx` and `global-error.tsx` log to console today; add an error-monitoring SDK (e.g. Sentry) with PII scrubbing in Phase 1.
- **Logs:** host function logs; never log form payloads, passwords, tokens or full card/mobile-money data.
- **Backups (Phase 1+):** managed Postgres point-in-time recovery; test a restore before launch.
- **Incidents:** payment webhook failures alert immediately; daily reconciliation report of `pending` orders > 1 h old.
- **Dependencies:** weekly update PRs; CI must stay green.
- **Content changes:** until a CMS exists, copy edits happen in `src/content/*` via PR.
