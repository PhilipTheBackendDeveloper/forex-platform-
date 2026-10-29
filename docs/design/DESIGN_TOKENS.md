# Design tokens

Single source of truth: `src/app/globals.css` (`:root` variables → Tailwind v4 `@theme inline`). To rebrand, change `:root` only.

| Token | Value | Evidence | Utility |
|---|---|---|---|
| `--background` | `#020818` | **Measured** — homepage hero `bg-[#020818]` (reference HTML, 2026-10-29) | `bg-background` |
| `--background-deep` | `#000000` | Measured — beginner section `bg-black` | `bg-background-deep` |
| `--surface` / `-2` / `-3` | `#051024` / `#0a0f1c` / `#0f111a` | Measured arbitrary bg values | `bg-surface*` |
| `--foreground` | `#f5f5f7` | Measured `text-[#f5f5f7]` | `text-foreground` |
| `--muted` | `#86868b` | Measured | `text-muted` |
| `--primary` / `-hover` | `#0071e3` / `#0077ed` | Measured (CTA, glow orb) | `bg-primary` |
| `--accent` | `#bf5af2` | Measured (violet orb) | `bg-accent` |
| `--gradient-from` / `-to` | `#60a5fa` / `#a78bfa` | Measured headline `shineFlow` gradient | `text-gradient-brand` |
| `--success` / `--danger` | `#30d158` / `#ff3b30` | Measured | `text-success` |
| `--ring` | `#409cff` | Measured | focus outlines |
| `--container-max` | `1200px` | Measured hero padding `calc((100vw - 1200px)/2 + 24px)` | `container-site` |
| `--radius-card/panel/hero` | `1.4rem / 2.5rem / 3rem` | Measured arbitrary radii | `rounded-[var(--radius-card)]` |
| Font | Geist (sans) / Geist Mono | **Measured** — CSS `--font-geist-sans` | `font-sans` |
| Hero display | `clamp(56px,18vw,120px)`, weight 900, leading 0.88, `tracking-tighter` | Measured `clamp(82px,18vw,120px)`; min lowered to 56px so 8-char words fit at 320–390px | — |
| Section heading | `clamp(40px,6vw,80px)`, 700, leading .95 | Measured `text-[clamp(48px,6vw,80px)]` (min adjusted) | `SectionHeading` |
| Body | 15px → 18px, leading 1.6, `text-white/60` | Measured hero paragraph | — |
| Easing | `cubic-bezier(0.16,1,0.3,1)` | Measured | `easeOutExpo` |
| Ambient motion | orb 20 s / 25 s, shine 8 s linear | Measured inline animation styles | `animate-orb`, `animate-shine` |

Screenshot-only estimates (from `HOMEPAGE_REFERENCE.png`): header height ≈ 88 px; Dashboard pill white, ~44 px tall.
