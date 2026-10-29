# Acceptance checklist (per public route)

- [ ] Returns 200; unknown paths return the 404 page
- [ ] Exactly one `h1`; logical heading order; landmarks (header/nav/main/footer)
- [ ] Title, description and canonical metadata; auth pages `noindex`
- [ ] No `href="#"`; every CTA navigates, opens a working local interaction, or is disabled with a reason
- [ ] 390 / 768 / 1440 px: no horizontal scroll, text fits, images framed, menu usable
- [ ] Keyboard: skip link, visible focus, menu/FAQ/forms operable, Escape closes overlays
- [ ] Reduced motion: content visible, no large movement
- [ ] Images: `next/image`, correct `sizes`, alt text, LCP image `priority` only
- [ ] Forms: labelled fields, inline errors, server validation, honest result
- [ ] Loading / empty / error states for async lists
- [ ] No console errors or hydration warnings
- [ ] No invented prices, testimonials, statistics or guarantees; placeholders badged
- [ ] Risk warning visible (footer; articles)
- [ ] lint, typecheck, unit, build, e2e green
