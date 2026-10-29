# Page inventory

Legend: **OBS** observed · **INF** inferred · **N/A** not accessible · **CLIENT** needs client decision · **IMPL** implemented by us.

## Homepage `/` (OBS from S1; order is the server-rendered section order)
| # | Reference section (id) | Reference content (summary, not copied) | Ours | Status |
|---|---|---|---|---|
| 1 | Hero | 4-line display headline (gradient line 2, faded italic line 4), divider, intro, 2 CTAs, 4 numeric stats; right-side portrait; orbs + noise | Same composition, original copy, **non-numeric pillars instead of stats**, client portrait | IMPL / CLIENT (copy) |
| — | — | — | Topics marquee strip (industry/highlights strip requested in brief) | IMPL |
| 2 | `#testimonials` | 4 named student testimonials | 4 clearly-marked placeholder slots | IMPL / CLIENT |
| 3 | `#educator` | Expo appearance, authority stats | Mentor intro with client photo, 3 principles, placeholder bio | IMPL / CLIENT |
| 4 | `#telegram-community` | Telegram signal community, member count | Free community block; CTA disabled until URL supplied | IMPL / CLIENT |
| 5 | `#beginner-course` | Free course requiring partner-broker sign-up | Free beginner path → /register; broker requirement flagged | IMPL / CLIENT |
| 6 | Mastery collection | 3 feature cards with chart visuals | 3 cards with SVG chart visuals → /mastery-courses | IMPL |
| 7 | (Academy) | — not a separate homepage section in S1 order (academy promoted via nav) | Academy band with stained-glass photo (brief requires academy highlight) | IMPL |
| 8 | `#coaching` | Coaching bullets, fee | Coaching highlight, photo collage, "fee TBC" | IMPL / CLIENT |
| 9 | `#blogs` | 4 latest articles | 4 draft-sample articles | IMPL / CLIENT |
| 10 | `#collaborate` | Partnership pitch + inline form | Pitch card → /collaborations form | IMPL |
| 11 | `#faq` | AI assistant prompt + 6 FAQs | 6 original FAQs; assistant explicitly "not connected" | IMPL |
| 12 | `#socials` | Animated follower counter + 5 networks | 5 network tiles, disabled until handles supplied | IMPL / CLIENT |
| 13 | Footer | 4 link groups + risk text | Same groups + risk warning | IMPL |
| — | Floating chat bubble (S9) | — | Help launcher → FAQ | IMPL |

## Subpages
| Route | Reference (OBS) | Ours (IMPL) |
|---|---|---|
| /gold-digger | Title "Gold Digger Live"; content client-rendered (prior snapshot: "No Active Cohorts") | Hero, 3 features, `Loadable` cohorts → empty state, waitlist form |
| /coaching | Hero "Rebuild your trading edge" + priced CTA; `#philosophy` 3 pillars; `#roadmap` 5 sessions; intake/offer card | Same structure; original copy; price TBC; request form |
| /academy | Hero; `#venues` Physical/Online; 3 value props; `#curriculum` 2 priced tiers | Same structure; photos on venues; prices TBC; disabled enroll; FAQ |
| /mastery-courses | Hero "Unlock True Market Mastery"; search input; listing client-rendered | Hero, search + level filter, 3 demo courses, empty state |
| /mastery-courses/[id] | UUID detail (content N/A) | Slug detail: outcomes, curriculum, disabled checkout |
| /blogs, /blogs/[slug] | Client-rendered index; 48 posts | Category chips, 4 draft-sample posts, reading page, related |
| /events | "Events & Seminars"; client-rendered; "My Tickets" | Empty state via adapter, "My tickets" → /login, interest form |
| /shop | "Shop & Merchandise"; client-rendered; "My Orders" | Empty state, "My orders" → /login |
| /collaborations | Form: name, company, email, ?, message | 4 tracks + validated form (topic, name, email, company, message, consent) |
| Legal ×5 | Full policies (not copied) | Draft outlines with "not legally reviewed" banner |
| /signin | Sign-in | /login + /register, honest "not connected" state |
