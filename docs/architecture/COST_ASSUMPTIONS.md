# Cost assumptions (drivers only — no vendor prices invented)

Check each vendor's official pricing page at decision time; prices and free tiers change.

| Driver | Grows with | Notes |
|---|---|---|
| Hosting / functions / bandwidth | page views, image optimisations, Server Action calls | Static pages + CDN keep this low; image optimisation counts can matter |
| Database | storage, compute hours, connections | Small at launch; choose a plan with PITR backups |
| Auth | monthly active users (some vendors bill per MAU) | Compare per-MAU vs bundled |
| **Video hosting** | minutes stored × minutes streamed | Likely the largest variable cost for an LMS |
| Payments | % + fixed fee per transaction, FX, payouts | Gateway-specific; mobile money vs card fees differ |
| Email | messages/month | Transactional only at first |
| Monitoring / analytics | events, seats | Free tiers often enough initially |
| Domain & DNS | annual | Client-owned account recommended |
