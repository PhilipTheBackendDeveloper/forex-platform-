# Reference site map (observed 2026-10-29, sources S1–S8)

```
/                        home (long landing page; anchors #testimonials #educator #telegram-community
                         #beginner-course #coaching #blogs #collaborate #faq #socials)
├── /gold-digger         cohort programme (client-rendered)
├── /coaching            1-on-1 mentorship (#philosophy #roadmap)
├── /academy             physical/online academy (#venues #curriculum)
├── /mastery-courses     searchable catalogue
│   └── /mastery-courses/cf451512-2d80-407d-a8e4-76c1aeced91c   (UUID detail URL)
├── /blogs               editorial index (client-rendered)
│   └── /blogs/<slug>    48 articles in sitemap
├── /events              events + "My Tickets" (client-rendered)
├── /shop                merchandise + "My Orders" (client-rendered)
├── /collaborations      partnership inquiry form
├── /privacy-policy /terms-of-service /cookie-policy /refund-policy /data-deletion
├── /signin              sign-in (public)
└── /dashboard           307 → /signin   (robots: disallow /admin/ /dashboard/ /api/ /meeting/ /egress-bot/)
404: /about /faq /testimonials /login /register /signup
External: t.me, instagram, youtube, x, facebook, mailto; contest/golddigger subdomains noted in prior research (out of scope).
```

**Primary nav:** Gold Digger · One on One (→ /coaching) · Academy · Mastery Courses · white "Dashboard" pill.
**Footer groups:** Education · Ecosystem · Company · Legal.

## Our route map (implemented)
Same public paths, plus `/about` (deliberate addition for the client story/gallery), `/login` + `/register` (brief-mandated; `/signin` redirects to `/login`), slug-based course URLs instead of UUIDs (readable, SEO-friendly). Testimonials/FAQ stay homepage anchors, matching the reference.
