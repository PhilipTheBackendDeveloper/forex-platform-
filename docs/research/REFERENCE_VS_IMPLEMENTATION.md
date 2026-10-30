# Reference vs implementation

Source of truth for the reference: [LIVE_AUDIT.md](LIVE_AUDIT.md) (interactive audit, 2026-10-29). Status as of 2026-10-30.

## Structure — now matched
| Reference pattern | Ours |
|---|---|
| Global header only on `/`, blogs; floating pill on scroll; Sign in / Sign up | `(site)` route group + `SiteHeader` on `FloatingBar` ✅ |
| Page sub-header (← Home · title · anchors · action) on landing pages | `(landing)` group + `PageHeader` per page ✅ |
| `/gold-digger` full-screen empty state, no header/footer | Same, plus a back link and optional waitlist ✅ |
| Standalone sign-in / sign-up (Cancel + wordmark, stepper, WhatsApp field) | `(auth)` layout ✅ (email-only sign-in like the reference; honest "not connected") |
| Mobile menu: centred large links + Sign in / Sign up | ✅ (plus Escape, focus trap) |
| Floating assistant (hidden < md) with chat panel | ✅ panel UI; replies "not connected" + FAQ link |

## Homepage sections — now matched
Hero (mobile full-bleed portrait) · bento testimonials + CTA · diagonal educator + 4-slide photo slider · community + phone mockup · beginner (white glowing CTA + 3 icon columns) · **sticky stacked mastery cards** (blue last card) · coaching (framed photo + floating fee card) · bento "Market *Insights.*" · inline proposal form with **required category chips** · FAQ "ask anything" bar + **2-column card accordion** + Contact Support · socials list · 4-column footer + brand row + disclaimer.

## Subpages — now matched
Coaching (sticky pillars, **pinned scroll-driven 5-session roadmap**, two-pane offer) · Academy (rounded hero image, **pinned 6-step story with progress bar**, illustrated venues, values band, featured blue tier) · Mastery courses (search + cover cards) · course detail (sub-header with ← Courses / Buy, curriculum list, closing CTA) · Events (search, chips, empty and filter-empty states, **My Tickets modal**, event-detail modal ready for data) · Shop (panel hero, Bag button, **bag drawer**, **orders modal**, segmented categories, floating View Cart) · Collaborations (metric cards, sticky intro, proposal form) · Blogs (chips, cover cards) · article (back link, author row, cover, comments placeholder, Read Next) · legal (sub-header + Contact Support).

## Deliberate differences (kept)
| Area | Reference | Ours | Why |
|---|---|---|---|
| Stats (20M+, 150K+, 18%…) | Numbers | Non-numeric pillars / "— pending verification" | No verified client data |
| Testimonials | Named quotes | Placeholder slots | No fabricated social proof |
| Prices | $50/$250/$199/$2000 | "TBC" + badge, disabled buy/enrol | Not approved; no payments |
| Photos / covers / phone screenshot | Their imagery | Client photos (CSS masks only), generated chart covers, original phone mockup | Rights |
| Brand marks | Logo, social logos | Placeholder glyph; neutral icons (lucide v1 has no brand logos) | No impersonation |
| Logged-out "Enroll for Free" | Does nothing | Goes to `/register` | No dead controls |
| Modals / menu | Ignore Escape | Escape, focus trap, focus return | Accessibility |
| Course URLs | UUIDs | Slugs | Readability, SEO |
| `/about` | 404 | Page with bio placeholder + gallery | Client story |
| Academy pinned visual | "90 DAYS" ring | Step-number ring | Duration not confirmed |
| Event-card data | One real seminar | None (empty state) | No confirmed events |
| Blog comments | Live comments | Placeholder | Needs accounts + moderation |

## Not yet matched / not verified
- Animated follower counter (no verified figure).
- Hover micro-states were compared visually only at desktop; no pixel diff tooling was run.
- Widths 320/360/1024/1920 and Safari/Firefox not checked.
