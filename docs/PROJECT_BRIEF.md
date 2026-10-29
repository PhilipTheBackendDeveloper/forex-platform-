# Project brief

_Source: `forex_project_starter/03_PROJECT_BRIEF/CONFIRMED_DECISIONS.md` (2026-10-29) and the master build prompt. Only confirmed decisions appear here; unknowns live in [OPEN_CLIENT_ITEMS.md](OPEN_CLIENT_ITEMS.md)._

## Goal
A complete forex-education platform for our client, delivered in phases: public marketing site → student accounts & dashboard → courses/learning & enrollments → coaching, cohorts, events, shop → payments → admin → integrations.

## Reference
https://www.kojoforex.com/ is the **visual and interaction benchmark** (layout, hierarchy, typography, spacing, motion). We do not copy its code, copy, logos, photos, testimonials, statistics or policies.

## Confirmed decisions
- **Stack:** Next.js App Router, strict TypeScript, Tailwind CSS, Motion for React; pnpm. Single modular monolith, one GitHub repo, feature branches.
- **Team:** public site (every route visible before sign-in) + shared design system → project initiator. Authenticated student dashboard → **Roddy**. Admin and shared-backend ownership → **to be agreed** ([ROLES_AND_OWNERSHIP](team/ROLES_AND_OWNERSHIP.md)).
- **Immediate milestone:** all public routes by midnight Ghana time (GMT), 29 Oct 2026.
- **Assets:** seven client photographs supplied; publication consent still to be confirmed.
- **Figma:** optional; must not block implementation.
- **Branding:** palette must be tokenised for later replacement.

## Not supplied (must not be fabricated)
Business name, logo, contact details, domain, prices, curricula, testimonials/statistics, legal policies, payment credentials, email provider, community URLs, other integrations, admin/backend owner.

## Phases (summary — see [ROADMAP.md](ROADMAP.md))
0. Foundation & public site (this milestone) · 1. Auth + dashboard shell · 2. Catalog, enrollments, learning · 3. Payments · 4. Coaching/cohorts/events/shop · 5. Admin · 6. Integrations & launch hardening.
