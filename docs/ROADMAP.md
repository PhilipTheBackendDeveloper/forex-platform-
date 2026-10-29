# Roadmap (phased; estimates are not commitments)

| Phase | Scope | Owner | Depends on |
|---|---|---|---|
| **0 — Public site** (this milestone) | All public routes, design system, placeholders, docs, tests | Public-site owner | — |
| 0.5 — Client content pass | Brand, logo, copy, photos consent, prices, legal text, social links | Client + public-site owner | OPEN_CLIENT_ITEMS |
| 1 — Accounts & dashboard shell | ADR-002 decision, DB + migrations, auth, `(protected)` layouts, dashboard home | Roddy (dashboard) + backend owner TBD | ADR-002 |
| 2 — Catalogue & learning | Courses from DB, enrollments, lessons, private video, progress | Shared | Phase 1, video provider |
| 3 — Payments | Gateway integration, orders, webhooks, entitlements, receipts, refunds | Backend owner TBD | ADR-003, merchant account |
| 4 — Programmes | Coaching applications/scheduling, cohorts & seats, events & tickets, shop & orders | Split by domain | Phase 3 |
| 5 — Admin | Content CMS, students, orders, applications, reports, audit logs | TBD | Phases 1–4 |
| 6 — Integrations & launch | Email, analytics + consent, community/broker integrations, monitoring, performance & a11y audit, production deploy | Shared | Client approvals |
