# Open client items

Everything below is a **placeholder in the codebase** until the client supplies and approves it. Each item names where to change it.

| # | Item | Current placeholder | Where to change | Blocks |
|---|---|---|---|---|
| 1 | Business name & wordmark | ✅ **Albert Tech** (owner, 2026-10-30) | `src/config/site.config.ts` | — |
| 2 | Official logo files | Interim "A + rising line" mark + favicon/app icon generated in-house (`src/app/icon.svg`, `apple-icon.png`) — replace if the client has a logo | `src/components/layout/wordmark.tsx`, `src/app/icon.svg` | Optional |
| 3 | Mentor display name & approved biography | "Your Mentor"; placeholder bio | `site.config.ts`, `src/content/home.ts`, `/about` | Launch |
| 4 | **Photo publication consent** for all 7 photos | Used with "pending" status | `docs/assets/ASSET_MANIFEST.md` | **Public deploy** |
| 5 | Brand colour palette | Reference-measured navy/blue/violet | `src/app/globals.css` `:root` | Rebrand |
| 6 | Hero headline & intro copy | Original placeholder "Trade Clearly. Think Longer." | `src/content/home.ts` | Launch |
| 7 | Verified statistics (students, audience, years, countries) | Not shown; non-numeric pillars instead | `src/content/home.ts` | Optional |
| 8 | Real, consented testimonials | 4 dashed placeholder slots | `TestimonialsSection` + content | Optional |
| 9 | Community URL (Telegram or other) | Disabled CTA "Link pending" | `siteConfig.social.telegram` | Launch |
| 10 | Social handles | Disabled tiles | `siteConfig.social.*` | Launch |
| 11 | Contact email / address | "Contact details pending" | `siteConfig.contact` | Launch |
| 12 | Domain | `NEXT_PUBLIC_SITE_URL` | env | Deploy |
| 13 | Course catalogue, outlines, prices | 3 demo courses, price `null` | `src/features/courses/data/courses.ts` | Commerce |
| 14 | Academy tiers, venues, schedule, prices | "Price TBC", venue TBC | `src/content/academy.ts` | Commerce |
| 15 | Coaching format, availability, price | "To be confirmed", proposed 5 sessions | `src/content/coaching.ts` | Commerce |
| 16 | Gold Digger programme details & cohorts | Placeholder copy, empty cohorts | `gold-digger/page.tsx`, `features/cohorts` | Commerce |
| 17 | Beginner path access rules (e.g. partner-broker requirement) | Generic copy | `src/content/home.ts` | Compliance |
| 18 | Blog articles | 4 original draft samples | `src/features/editorial/data/articles.ts` | Content |
| 19 | Events & merchandise | Empty states | `features/events`, `features/commerce` | Commerce |
| 20 | Legal policies (privacy, terms, cookies, refunds, data deletion) & risk disclaimer | Draft outlines with banner | `src/content/legal.ts`, `site.config.ts` | **Launch** |
| 21 | Payment provider & merchant account (Ghana) | Disabled "Enroll" buttons | ADR-003 | Payments |
| 22 | Email / CRM destination for forms | Server Action returns `not_configured` | `src/features/leads/actions.ts` | Lead capture |
| 23 | Auth provider choice | Forms validate locally only | ADR-002, with Roddy | Dashboard |
| 24 | Admin & shared-backend owner | TBD | `docs/team/ROLES_AND_OWNERSHIP.md` | Phase 1 |
| 25 | AI assistant scope & knowledge base | Help panel → FAQ | `HelpLauncher` | Optional |
| 26 | Analytics & cookie consent choice | None installed | ADR (future) | Launch |
| 27 | Contest / gold-digger subdomains (seen on reference) | Out of scope | — | Scope |
