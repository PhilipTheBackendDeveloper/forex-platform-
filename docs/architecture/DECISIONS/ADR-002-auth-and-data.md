# ADR-002 — Auth and database (PROPOSED, needs Roddy + client)

- **Status:** Proposed · **Owner:** TBD (shared backend)

## Options
| Option | Pros | Cons |
|---|---|---|
| **Supabase (Postgres + Auth + Storage)** | Managed Postgres, auth, RLS as defence-in-depth, signed storage URLs; one vendor | Vendor coupling; must still authorise in server code |
| Neon/other Postgres + **Auth.js** | Portable; full control of sessions | More glue code; email/OAuth wiring ourselves |
| Clerk + Postgres | Polished auth UI, MFA | Per-MAU cost; user data split across vendors |

## Recommendation
Managed **PostgreSQL** + a managed auth provider. Leaning **Supabase** for speed (auth, storage for private media, RLS), with all authorisation repeated in `src/server/**` services. Decide with Roddy before Phase 1.

## Non-negotiables regardless of choice
HTTP-only secure session cookies; server-side role checks; password policy ≥10 chars; email verification; rate-limited login and reset; no auth state trusted from the client; audit log for admin actions.
