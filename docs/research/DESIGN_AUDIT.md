# Design audit (reference)

Measured = read from public HTML/CSS (S1, S2). Estimated = from screenshot S9.

- **Typeface:** Geist via `next/font` (measured `--font-geist-sans`). Weights in use: 300–900; hero uses 900 (`font-black`).
- **Framework signature:** Tailwind CSS v4 (oklab `color-mix`, `@theme` vars like `--radius-lg:.5rem`) (measured).
- **Palette:** bg `#020818`, sections `#02091a`, `#020617`, `#051024`, `#000`; text `#f5f5f7` and white at 60/90/20 % alpha; muted `#86868b`; primary `#0071e3`; accent violet `#bf5af2`; gradient `#60a5fa ↔ #a78bfa`; telegram blue `#0088cc`; success `#30d158`, `#10b981`; danger `#ff3b30` (measured). Apple-system-like palette.
- **Hero:** `min-h-dvh`, text column `lg:w-[52%]`, left padding `max(24px, calc((100vw - 1200px) / 2 + 24px))`, right `clamp(28px,4vw,72px)`; headline `clamp(82px,18vw,120px)`, `leading-[0.88]`, `tracking-tighter`, `whitespace-nowrap`; glow `bg-[#0071e3]/20 blur-[100px]` behind h1; divider `h-px max-w-30 from-white/20`; paragraph 15→18 px, `leading-[1.6]`, `text-white/60`, emphasis `text-white/90` (measured).
- **Ambient:** orb 1 `#0071e3/15`, `blur-[120px]`, 20 s float; orb 2 `#bf5af2/10`, `blur-[100px]`, 25 s reverse; SVG fractal-noise overlay at 2.5 % `mix-blend-overlay` (measured).
- **Section rhythm:** `py-24`–`py-48`; headings `clamp(48px,6vw,80px)`; containers `max-w-7xl` / 1200–1400 px (measured).
- **Radii:** `1.4rem`, `2.5rem`, `3rem`, pills `rounded-full` (measured).
- **Header:** transparent over hero; wordmark left; 4 centred links ~15 px; white pill "Dashboard" (estimated ~44 px tall, ~135 px wide) (S9).
- **Floating chat:** ~64 px blue circle, bottom-right (estimated, S9).
- **Reduced motion:** reference ships a global `prefers-reduced-motion` override (measured) — we replicate it.

## Accessibility notes observed
- Hero h1 uses an `sr-only` text + `aria-hidden` visual lines (good pattern, reused).
- Server HTML for several pages is empty until JS runs (blogs/events/shop/gold-digger) → poor no-JS/SEO resilience; ours prerender.
