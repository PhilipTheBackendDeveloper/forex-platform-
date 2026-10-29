# Responsive audit

Reference mobile/tablet behaviour could only be inferred from class names (S1): hero stacks (`flex-col lg:flex-row`), text column full-width below `lg`, headline min 82 px, CTA rows stack. Captured reference screenshots (if the capture completed) are under `screenshots/reference/{desktop,tablet,mobile}`.

## Ours — breakpoints checked
| Width | Method | Result |
|---|---|---|
| 390 (mobile) | Playwright project `mobile` + screenshots | see docs/qa/PAGE_MATRIX.md |
| 768 (tablet) | screenshots | see PAGE_MATRIX |
| 1440 (desktop) | Playwright project `desktop` + screenshots | see PAGE_MATRIX |
| 320, 360, 1024, 1920 | not automated this session | **Not verified** — next QA pass |

Rules applied: fluid `clamp()` type, `container-site` 24 px gutters, grids collapse to one column, touch targets ≥ 44 px (`min-h-11`), menu below `lg` (1024 px), `overflow-x-clip` on `main`.
