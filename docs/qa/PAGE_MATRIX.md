# Page matrix — 2026-10-29

Owner for all rows below: **public-site owner**. E2E = `tests/e2e/public-routes.spec.ts` at 1440 & 390 (200, one h1, no `#` links, no overflow, no broken eager images, no console errors). Screenshots: `docs/qa/screenshots/ours/{desktop,tablet,mobile}/`.

| URL | UI status | Mobile (390) | Interactions | Tests | Outstanding approvals |
|---|---|---|---|---|---|
| `/` | ✅ Complete: hero, topics strip, testimonials slots, educator, community, beginner, mastery, academy, coaching, blog, collaborate, FAQ, socials, footer | ✅ e2e + fold capture reviewed | menu, FAQ, help launcher, anchors, reveals | e2e ✅ | brand, copy, stats, testimonials, community/social links, photo consent |
| `/gold-digger` | ✅ hero, features, cohort empty state, waitlist | ✅ e2e | waitlist form (honest "not sent") | e2e ✅ | programme details, cohorts |
| `/coaching` | ✅ hero, philosophy, 5-session roadmap, offer, request form | ✅ e2e; desktop fold reviewed | form | e2e ✅ | format, availability, price |
| `/academy` | ✅ hero, venues, values, 2 tiers (disabled enroll), FAQ | ✅ e2e | FAQ | e2e ✅ | tiers, venues, schedule, price |
| `/mastery-courses` | ✅ hero, search, level filters, cards, empty state | ✅ e2e | search/filter/clear | e2e ✅ + unit | catalogue, prices |
| `/mastery-courses/[slug]` ×3 | ✅ detail, outcomes, curriculum, disabled checkout | ✅ e2e (1 slug) | — | e2e ✅ | course content |
| `/blogs` | ✅ hero, category chips, cards, empty state | ✅ e2e | category filter | e2e ✅ | articles |
| `/blogs/[slug]` ×4 | ✅ reading page, risk note, related | ✅ e2e (1 slug) | — | e2e ✅ | articles |
| `/events` | ✅ hero, "My tickets" → /login, empty state, interest form | ✅ e2e | form | e2e ✅ | events |
| `/shop` | ✅ hero, "My orders" → /login, empty state | ✅ e2e | — | e2e ✅ | products, payments |
| `/collaborations` | ✅ hero, 4 tracks, proposal form | ✅ e2e | form validation + honest result | e2e ✅ (+ interaction) | contact destination |
| `/about` | ✅ bio placeholder, portrait, 5-photo gallery | ✅ e2e | — | e2e ✅ | bio, photo consent |
| `/privacy-policy` `/terms-of-service` `/cookie-policy` `/refund-policy` `/data-deletion` | ✅ draft outlines + "not legally reviewed" banner + TOC | ✅ e2e | TOC anchors | e2e ✅ | **legal text** |
| `/login` `/register` | ✅ split layout, validation, honest "not connected" | ✅ e2e | form validation | e2e ✅ (+ interaction) | auth provider (ADR-002) |
| `/signin` | ↪ redirect to `/login` | — | — | e2e ✅ | — |
| 404 | ✅ | ✅ | — | e2e ✅ | — |

Not verified this session: 320/360/1024/1920 widths; Lighthouse/Web Vitals; axe scan; Safari/Firefox.
