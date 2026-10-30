# Live interactive audit of the reference site — 2026-10-29 (≈23:35–00:30 GMT)

**Method.** Real Google Chrome driven by Playwright (`scripts/audit-reference.mjs`, `scripts/audit-reference-interactions.mjs`). Every internal link was crawled at 1440×900 and 390×844; each page was scrolled one screen at a time (screens saved as JPEG under `docs/research/audit/{desktop,mobile}/<page>/NN.jpg`) and its rendered DOM outline, fixed/sticky elements, running animations and header states were saved as `<page>.json`. Every visible non-submit control was then clicked and before/after captures saved in `docs/research/audit/interactions/`. **No forms were submitted, no account created, no chat message sent.**

## 1. Site architecture (the key finding)
The reference is **not one long page with a global nav**. It is a set of standalone landing pages with **two header systems**:

| Header | Used on | Contents |
|---|---|---|
| **Global header** | `/`, `/blogs`, `/blogs/[slug]` | Logo · Gold Digger · One on One · Academy · Mastery Courses · "Sign in" (text) · "Sign up" (white pill → `/get-access`). Transparent at top (80 px); after scroll becomes a **floating centred rounded pill** with border/blur (72 px). |
| **Page sub-header** | `/coaching`, `/academy`, `/mastery-courses`, course detail, `/events`, `/shop`, `/collaborations`, legal pages | "← Home" · divider · logo glyph · **page title** · in-page anchor links · one action pill. Same floating-pill behaviour on scroll. |
| **None** | `/gold-digger` (single-screen empty state, no footer), `/signin`, `/get-access` (Cancel + wordmark only) | — |

| Sub-header page | Title | Anchors | Action |
|---|---|---|---|
| /coaching | Private Coaching | Philosophy · Roadmap | Apply Now ($2000) → `/signin?redirect=/coaching?checkout=true` |
| /academy | Academy | Venues · Curriculum | Enroll Now (white) |
| /mastery-courses | Mastery Courses | — | — |
| /mastery-courses/[id] | Mastery Courses (← Courses) | Curriculum | Buy |
| /events | Global Events | — | My Tickets → modal |
| /shop | Premium Shop | — | My Orders → modal |
| /collaborations | Collaborations | — | Submit Proposal |
| legal | page name | — | Contact Support → `/#contact` |

Mobile: global header = logo + round menu button → full-screen menu with centred large links + "Sign in" (outline) + "Sign up" (white) full-width buttons; body scroll locked; **Escape does not close it** (we keep Escape support). Sub-header on mobile = "← · title · action pill". Floating chat button is hidden below `md`.

## 2. Page-by-page
**/** (14,093 px desktop / 19,516 px mobile) — hero (portrait right; on mobile the portrait becomes a full-bleed background behind the text) → stats row → **#testimonials** centred "— SUCCESS STORIES —" eyebrow, 3-line heading (last line italic faded), 2×2 **bento** (wide/narrow, narrow/wide) cards with avatar, name, role, quote, green outcome pill, "Start Your Success Story" white pill → /signin → **#educator** with **diagonal top edge**, left half = **4-slide event photo carousel** with dot buttons + caption ("LIVE AT / event / city · year"), right = eyebrow, heading, divider, copy, stats with dividers → **#telegram-community** two columns: blue eyebrow, 4-line heading, icon sub-title, copy, 2-col blue-dot bullet grid, Telegram-blue pill; right = large phone mockup → **#beginner-course** black: centred heading, divider, copy, **white glowing "Enroll for Free"** (does nothing visible when logged out), "What's Included" + 3 icon-tile columns → **mastery** centred heading + **3 sticky stacked cards** (`sticky top-[10vh|14vh|18vh]`, ~450 px, alternating text side, third card solid blue with white "Explore Courses") → **#coaching** left copy + green-check list, right framed photo with corner brackets + overlapping "SPOTS AVAILABLE" fee card ("Secure Your Spot" → signin) → **#blogs** "Market *Insights.*" + "VIEW ALL ARTICLES" link, bento of 4 image-cover cards → **#collaborate** left copy + 2 icon rows, right "Submit a Proposal" card with **single-select category chips (required — submit disabled until chosen)**, name/company/email/website/outline → **#faq** "Everything You Need to *Know.*", "Ask anything" AI bar, **2-column card accordion** (single open), "Still have questions?" + "Contact Support" → **#socials** huge animated follower counter + list rows (icon · network · handle · →) → **footer** 4 columns (white titles), brand row (logo, tagline | "Get in touch", email, 3 icons), centred copyright + 4-paragraph disclaimer.

**/coaching** — centred hero (2nd line italic, white→grey gradient), CTA + "EXTREMELY LIMITED AVAILABILITY", ↓ cue → **#philosophy** centred heading with blue italic word + **3 sticky stacked pillar cards** with small animated visuals (radar rings, stacked bars) → **#roadmap** **pinned full-screen section** (`sticky top-0 h-screen`): scrolling swaps Session 01→05 (left: pill + title + copy; right: card with giant "01"…"05" numeral + label), "KEEP SCROLLING" mouse cue → offer: pill "INTAKE OPEN • LIMITED SLOTS", heading with blue italic word, **two-pane card** (left: title, blue subtitle, 5 check rows; right: "ONE-TIME CAPITAL ALLOCATION", giant price, white "Secure Enrollment", lock note) → footer.

**/academy** — centred hero with **blue italic** 2nd line, blue "View Curriculum ↓", "PHYSICAL • ONLINE", large rounded photo → **600vh pinned scroll story**: "01 / 06" counter, large heading, copy, progress bar bottom-left, ambient visual ("90 DAYS" ring) → **#venues** "Two platforms. *One standard.*" + 2 cards (Physical/Online) with illustrated device visuals → black band of 3 icon-circle value props → **#curriculum** "Choose your level." two tiers (dark + **blue "MOST POPULAR"**), white Enroll buttons → footer.

**/mastery-courses** — centred hero (2nd line blue gradient), wide search input ("Search available courses…"), cards: cover image, title, copy, divider, "TUITION $199", blue square arrow → detail.
**/mastery-courses/[id]** — centred title (white→grey), copy, white "Enroll for $199", large rounded cover; black "The Curriculum." list of numbered cards (blue "01", uppercase title, copy); closing CTA "Ready to master your trading edge?" + "Access the Masterclass" + trust line.

**/gold-digger** — no header/footer; centred icon circle, "No Active Cohorts", one sentence.

**/blogs** — global header; centred title (white→grey), subtitle, topic chips (active = blue pill), 3-col cards (cover, category pill, title, excerpt, date, "Read ↗").
**/blogs/[slug]** — "‹ Back to Articles", blue category pill, large gradient title, author avatar · date · read time, cover, body with large H-headings, Comments (0) with guest name, "Read Next" 3 cards.

**/events** — "Events." left + search pill right, "View your event tickets ›", chips All/Expos/Seminars/Meet & Greet (white active), poster cards; empty filter → "No events found" + "Reset Filters"; **card opens a detail modal** (flyer left, title/description right, footer Support · Share · "Secure Spot"); **My Tickets → modal** "No tickets found" + "Explore Events".
**/shop** — panel hero (pill eyebrow, "The Protocol *Shop.*", "View your order history ›", **BAG (0)** white button), segmented category control + search; "Coming soon" empty card; floating **"View Cart"** pill; bag → **right drawer** "Your bag is empty"; My Orders → modal.
**/collaborations** — pill eyebrow, "Reach over *20 Million traders.*", 3 stat cards; sticky left "Align with Africa's Finest." + 2 feature rows; right form card: PARTNERSHIP TYPE (REQUIRED) chip grid, 4 inputs, outline textarea, submit.
**Legal** — sub-header, blue-dot "LEGAL INFORMATION" eyebrow, H1, effective date, prose (max-w-4xl), numbered H2s.
**/signin** — Cancel + wordmark; Cloudflare Turnstile; "Welcome back." **email-only** → 6-digit code ("Verify it's you."). **/get-access** — 3-step stepper (Account Setup · Verification · Done), First/Last name, Email, WhatsApp number (with country-code hint).

**AI assistant** (all pages) — floating button → panel: header (icon, name, "Global Intelligence", ×), empty state "How can I help you?", input "Ask …", "Press ↵ Enter to send"; does not close on Escape.

## 3. Measured motion
`orbFloat 20s`, `orbFloatReverse 25s`, `shineFlow 8s`, `pulse 2s` ×6 (status dots), `ping 1s` (live dots), `spin 10s/15s` (rings), 40 s marquee-like transition; sticky stacked cards; pinned scroll-driven step sections (coaching roadmap, academy story).

## 4. What we deliberately do NOT copy
Brand, logo, portrait/event photos, phone-screenshot content, testimonials, statistics (20M/150K/14+/170+), prices ($50/$250/$199/$2000), course names, article text/images, policy text, Telegram/social URLs, broker requirement. Their dead/hostile patterns are not copied either: logged-out "Enroll for Free" doing nothing, modals that ignore Escape.

## 5. Gaps found in our first build (all addressed in the 2026-10-30 pass)
1. One global header everywhere → **two header systems** + standalone pages.
2. Header CTA "Dashboard" → logged-out **Sign in / Sign up**; header becomes a **floating pill** on scroll.
3. Homepage missing: bento testimonials, educator slider + diagonal edge, phone mockup, sticky stacked mastery cards, framed coaching photo + fee card, image bento blog, inline proposal form, FAQ ask bar + 2-column grid, socials list, richer footer.
4. Coaching/Academy lacked the **pinned scroll-driven step sections** and stacked pillars.
5. Events/Shop lacked **modals/drawer** (My Tickets, My Orders, Bag, event detail) and filter-empty states.
6. Auth pages had a split photo layout and passwords; the reference uses standalone, email-code flows with a stepper.
7. Gold Digger had extra sections; the reference is a single empty-state screen.

Evidence: reference `docs/research/audit/**`; ours `docs/qa/screenshots/ours/**` (refreshed after the rebuild).
