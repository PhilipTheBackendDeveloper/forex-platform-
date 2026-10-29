# ADR-001 — Next.js App Router modular monolith

- **Status:** Accepted (2026-10-29) · **Deciders:** public-site owner; Roddy to countersign
- **Context:** Two developers, one client, a phased platform (marketing → accounts → LMS → payments → admin). Traffic is unknown but realistically low-to-moderate at launch (thousands, not millions, of daily users). Strong consistency is required for payments and entitlements; everything else tolerates eventual consistency.

## Decision
One Next.js **16.4.2** (App Router, React 19.3, Turbopack) application in one repository, organised by feature:

- `src/app/(public)` — marketing routes (URL-transparent route group) with shared header/footer layout.
- `src/app/(auth)` — sign-in/up UI with its own layout, `noindex`.
- `src/app/(protected)/dashboard` (Roddy) and `src/app/(protected)/admin` (TBD) — later phases.
- `src/features/<domain>/{components,data,schemas}` — domain code close to where it's used.
- `src/components/{ui,layout,motion,forms,shared}` — brand-neutral primitives & shell.
- `src/server/**` (`import "server-only"`) — DB, auth, services, integrations (Phase 1+).
- `src/types/domain.ts` — shared read-model contracts.

Pinned versions (2026-10-29): next 16.4.2, react/react-dom 19.3.0, tailwindcss 4.3.3, typescript 5.9.3, eslint 9.39.5 + eslint-config-next 16.4.2; motion, lucide-react, zod, clsx, tailwind-merge, vitest, @playwright/test, prettier pinned exactly in `package.json`.

## Why (system-design reasoning, applied at our scale)
From *System Design: The Complete Course* (Karan Pratap Singh, read 2026-10-29):
- **Monolith vs microservices:** a monolith is simpler to build, test and deploy for a small team; microservices add network failure modes, distributed transactions and ops cost we don't need. We keep module boundaries clean so a service could be extracted later if a real scaling or ownership need appears.
- **CDN & caching:** public pages are static/prerendered and cached at the edge; images go through Next image optimisation (AVIF/WebP) + CDN. Caches are for read-heavy, rarely changing data — never personalised entitlements or order state.
- **SQL vs NoSQL:** relational data with joins and integrity constraints (users ↔ enrollments ↔ orders ↔ payments) → **PostgreSQL** (ADR-002/003 pending).
- **ACID transactions:** payment confirmation + entitlement grant happen in a single DB transaction; idempotency keys on webhooks.
- **Indexes:** add for real query paths (slug lookups, `enrollments(user_id, course_id)` unique, `orders(user_id, created_at)`); avoid speculative indexes that slow writes.
- **Availability:** rely on the managed host's redundancy; uptime goal set later as an SLO; health endpoint `/api/health`.
- **Rate limiting & auth:** rate-limit login/forms; OAuth/OIDC via a managed provider rather than rolling our own crypto.

### Explicitly deferred (not needed at this scale)
Sharding, consistent hashing, federation, read replicas, message brokers/queues, event sourcing, CQRS, API gateway, service discovery, GraphQL/gRPC, custom load balancers. Revisit only with measured need. Background work (emails, reconciliation) uses the host's cron/queue product or a simple jobs table first.

## Consequences
- + One deploy, one CI pipeline, shared types end-to-end, fast iteration.
- + Route groups let public/dashboard/admin have separate layouts and owners without URL prefixes.
- − Shared files need coordination → CODEOWNERS + small PRs.
- − `cacheComponents` (Next 16 default) requires uncached data to sit under `<Suspense>`; current pages use static data so this is fine, but future DB reads must follow the docs.

## Alternatives rejected
- **pnpm monorepo (apps/web, apps/admin, packages/ui):** premature; revisit if admin needs separate deploys.
- **Separate SPA + API:** duplicated auth/session logic and slower SEO.
