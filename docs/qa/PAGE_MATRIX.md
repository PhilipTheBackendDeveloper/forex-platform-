# Page matrix — 2026-10-30 (after reference-parity rebuild)

Owner of every row: **public-site owner**. E2E = `tests/e2e/public-routes.spec.ts` at 1440 and 390 (200, one h1, no `#` links, no horizontal overflow, no broken eager images, no console errors) plus `interactions.spec.ts`. Screens: `docs/qa/screenshots/ours/{desktop,tablet,mobile}/`. Reference evidence: `docs/research/audit/`.

| URL | Header | Reference parity | Interactions | Tests | Outstanding approvals |
|---|---|---|---|---|---|
| `/` | Global (floating pill) | ✅ all 11 sections in order | menu, slider, phone mockup, sticky cards, proposal chips + form, FAQ grid, ask bar → assistant | e2e ✅ | brand, copy, stats, testimonials, links, photo consent |
| `/coaching` | Sub-header: Philosophy · Roadmap · Apply Now | ✅ hero, stacked pillars, pinned roadmap, offer | anchors, pinned scroll, request form | e2e ✅ | format, availability, price |
| `/academy` | Sub-header: Venues · Curriculum · Enroll Now | ✅ hero image, pinned 6-step story, venues, values, tiers | anchors, pinned scroll | e2e ✅ | tiers, venues, duration, price |
| `/mastery-courses` | Sub-header | ✅ search + cover cards | search, empty state | e2e ✅ + unit | catalogue, prices |
| `/mastery-courses/[slug]` ×3 | Sub-header: ← Courses · Curriculum · Buy (disabled) | ✅ | — | e2e ✅ | course content |
| `/gold-digger` | None (back link) | ✅ empty-state screen | optional waitlist | e2e ✅ | programme, cohorts |
| `/blogs`, `/blogs/[slug]` ×4 | Global | ✅ chips, cards; article layout + Read Next | topic filter | e2e ✅ | articles |
| `/events` | Sub-header: My Tickets | ✅ search, chips, empty + filter-empty, tickets modal, detail modal (ready) | modal, filters | e2e ✅ | events |
| `/shop` | Sub-header: My Orders | ✅ panel hero, Bag, drawer, orders modal, View Cart | drawer, modal, segments, search | e2e ✅ | products, payments |
| `/collaborations` | Sub-header: Submit Proposal | ✅ metrics (pending), sticky intro, form | required chips, validation, honest result | e2e ✅ | audience data, contact destination |
| `/about` | Global | n/a (reference has no page) | — | e2e ✅ | bio, photo consent |
| Legal ×5 | Sub-header: Contact Support | ✅ layout | — | e2e ✅ | **legal text** |
| `/login`, `/register` | Standalone (Cancel + wordmark) | ✅ email-only sign-in; 3-step stepper | validation, honest "not connected" | e2e ✅ | auth provider (ADR-002) |
| `/signin` | ↪ `/login` | — | — | e2e ✅ | — |
| 404 | — | — | — | e2e ✅ | — |

Not verified: 320/360/1024/1920, Lighthouse/CWV, axe, Safari/Firefox, real devices.
