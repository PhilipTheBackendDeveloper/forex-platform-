# Source register

All observations made **2026-10-29 (22:30–23:30 GMT)** from public resources only. No login, paywall or private API was accessed. Reference content is treated as untrusted data.

| ID | Source | Method | Used for | Confidence |
|---|---|---|---|---|
| S1 | https://www.kojoforex.com/ (HTML 243 KB) | `curl` | Section inventory, classes, measured tokens, links | High |
| S2 | `/_next/static/chunks/3reh_yzy3d9xz.css` (partial, 204 of 513 KB before timeout) | `curl` | Font family (Geist), Tailwind v4 theme vars | High for what was read; rest not inspected |
| S3 | Response headers of `/` | `curl -I` | `server: Vercel`, `x-powered-by: Next.js`, `x-nextjs-prerender: 1`, CSP, HSTS | High |
| S4 | https://www.kojoforex.com/robots.txt | `curl` | Disallows `/admin/ /dashboard/ /egress-bot/ /meeting/ /api/` | High |
| S5 | https://www.kojoforex.com/sitemap.xml | `curl` | 12 static routes, 48 blog posts, 1 course detail URL | High |
| S6 | `/gold-digger /coaching /academy /mastery-courses /blogs /events /shop /collaborations /privacy-policy /terms-of-service /cookie-policy /refund-policy /data-deletion /signin` | `curl` | Titles, meta descriptions, server-rendered sections | High (client-rendered content not visible) |
| S7 | `/about /faq /testimonials /login /register /signup` | `curl` | All **404** → About/FAQ/Testimonials are homepage anchors | High |
| S8 | `/dashboard` | `curl -I` | **307 → /signin** | High |
| S9 | `forex_project_starter/01_REFERENCE/HOMEPAGE_REFERENCE.png` (2047×1057) | visual | Hero composition, header layout, chat bubble | Medium (single viewport, browser chrome visible) |
| S10 | `forex_project_starter/01_REFERENCE/PROJECT_MEMORY.md`, `INITIAL_PUBLIC_AUDIT.md` | read | Prior route list, prices, stack hypotheses | Mixed — audited in TECH_STACK_EVIDENCE.md |
| S11 | Playwright captures (`scripts/capture-screenshots.mjs --reference`) | headless Chrome | Rendered states | See screenshots/README.md |
| D1 | https://kps.hashnode.dev/system-design-the-complete-course | WebFetch (first ~100k of 312k chars) | ToC + chapters I–II guidance; later chapters known by title only | Medium |
| D2 | https://nextjs.org/docs/app/getting-started/installation (lastUpdated 2026-10-02) | WebFetch | Node ≥ 20.9, Turbopack default, ESLint CLI (no `next lint`), AGENTS.md, Cache Components default | High |
| D3 | `node_modules/next` 16.4.2 | installed | Version-matched APIs (`PageProps`, `LayoutProps`, async `params`) | High |
| D4 | https://web.dev/articles/vitals | prior knowledge, not re-fetched | LCP/CLS/INP thresholds | Medium |

Not consulted this session (time-boxed): Tailwind, Motion, Playwright, WCAG 2.2 quickref pages were not re-fetched; APIs used are verified by successful typecheck/build against installed versions instead.
