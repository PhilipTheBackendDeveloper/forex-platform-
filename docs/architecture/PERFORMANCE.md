# Performance

**Goals (p75, field data — targets, not measured claims):** LCP ≤ 2.5 s · CLS ≤ 0.1 · INP ≤ 200 ms (https://web.dev/articles/vitals, consulted 2026-10-29).

## What's in place
- Static prerendering for all public routes (no request-time data yet); `generateStaticParams` for course/article details.
- `next/image` with **static imports** (intrinsic size → no CLS, blur placeholders), responsive `sizes`, AVIF/WebP negotiation. Only the hero portrait and auth/about LCP images use `priority`.
- Fonts via `next/font` (Geist, self-hosted at build, `font-display: swap`, no layout shift).
- Motion limited to `transform`/`opacity`; ambient orbs are CSS keyframes (compositor-only); marquee pauses under reduced motion.
- Client JS limited to interactive islands (see COMPONENT_BOUNDARIES.md).

## To measure
Run Lighthouse (mobile, throttled) on `/`, `/coaching`, `/mastery-courses` against a production build/preview deploy; add `web-vitals` reporting to analytics once consent is in place. Watch: hero `blur-[120px]` layers on low-end Android GPUs (drop blur radius if INP/scroll jank appears).
