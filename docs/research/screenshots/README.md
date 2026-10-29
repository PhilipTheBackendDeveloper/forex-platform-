# Screenshots

## Reference (kojoforex.com, captured 2026-10-29 ~23:10 GMT)
`reference/{desktop 1440×900, tablet 768×1024, mobile 390×844}/` — 10 public routes × 3 widths = 30 full-page PNGs via `node scripts/capture-screenshots.mjs --reference` (Playwright + installed Chrome, `reducedMotion: "reduce"`, scrolled to trigger reveals).

**Caveats:** the home capture at 1440 renders mid-page content at the top of the image (the reference appears to use sticky/stacked scroll sections that confuse full-page capture), so the supplied `HOMEPAGE_REFERENCE.png` (also at `../../../private/reference-assets/reference-site/`, git-ignored; original in the starter kit `01_REFERENCE/`) is the above-the-fold benchmark. Client-rendered pages were captured after `networkidle`. No authenticated pages were captured.

Reference screenshots are internal research evidence of a third-party site — do not publish them.

## Ours
`../../qa/screenshots/ours/{desktop,tablet,mobile}/` — 15 routes × 3 widths (`pnpm screenshots` against `pnpm start -p 3100`).
`../../qa/screenshots/compare/` — above-the-fold captures used in the hero parity pass (`ours-home-fold-1440.png`, `ours-home-fold-390.png`, coaching).

## Missing evidence
Reference interactive states (menu open, hover, FAQ open), reference mobile menu, tablet comparison notes, pixel diffs (no diff tooling run).
