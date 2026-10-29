# Roles and ownership

| Area | Owner | Status |
|---|---|---|
| Public website (all routes before sign-in), `(public)` + `(auth)` UI | Project initiator (public-site developer) | **Confirmed** |
| Shared marketing design system (tokens, `components/ui`, `components/motion`) | Project initiator; Roddy reviews | **Confirmed** |
| Authenticated student dashboard `src/app/(protected)/dashboard/**`, `src/features/dashboard/**` | **Roddy** | **Confirmed** |
| Admin back office `src/app/(protected)/admin/**`, `src/features/admin/**` | **TBD** | ⚠️ Needs agreement |
| Shared backend (`src/server/**`: DB, auth, payments, webhooks, email) | **TBD** — proposal: pair on auth + schema, then split by domain | ⚠️ Needs agreement |
| Infrastructure (GitHub, Vercel/host, DNS, secrets) | **TBD** | ⚠️ Needs agreement |

> Nothing protected is silently assigned to Roddy. Agree the ⚠️ rows and update this table in a PR both of you approve.

## Branches
- `main` — always buildable; protected; merge via PR with CI green.
- `feat/public-site` — public website (this work).
- `feat/dashboard` — Roddy's dashboard. Branch from `main` after the baseline merge.
- Shared contract changes → short-lived `chore/shared-*` branches, merged fast to minimise conflicts.

## Working agreement
- Rebase your own branch on `main` regularly; never force-push shared branches.
- Changes to `src/types/domain.ts`, `globals.css`, `components/ui`, `src/config/navigation.ts` need both reviewers (see `.github/CODEOWNERS.example`).
- Record decisions as ADRs in `docs/architecture/DECISIONS/`.
