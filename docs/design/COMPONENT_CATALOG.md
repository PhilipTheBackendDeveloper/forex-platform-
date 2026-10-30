# Component catalog

| Component | Path | Notes |
|---|---|---|
| `FloatingBar` | `components/layout/floating-bar.tsx` | Fixed header shell: transparent at top → centred floating pill after 40 px scroll |
| `SiteHeader`, `MobileNav`, `Wordmark`, `BrandGlyph` | `components/layout/*` | Global header (home, blogs, about); full-screen mobile menu with Sign in / Sign up |
| `PageHeader`, `headerActionClasses` | `components/layout/page-header.tsx` | Landing-page sub-header: ← back · title · anchors · action |
| `LandingShell` | `components/layout/landing-shell.tsx` | Header + `<main>` for `(landing)` pages |
| `SiteFooter` | `components/layout/site-footer.tsx` | 4 columns · brand row · copyright + disclaimer |
| `HelpLauncher` | `components/layout/help-launcher.tsx` | Assistant panel; opened by button or `openAssistant()` |
| `Button`, `ButtonLink`, `buttonClasses` | `components/ui/button.tsx` | `href={null}` → disabled + visible reason |
| `Badge`, `Eyebrow`, `PlaceholderBadge` | `components/ui/badge.tsx` | Placeholder pills hidden via `showPlaceholderBadges` |
| `SectionHeading`, `SectionEyebrow`, `Dim`, `Accent`, `Fade` | `components/ui/section-heading.tsx` | Reference typography: line/dot/pill eyebrows, faded italic last line, blue italic accent, white→grey gradient |
| `Dialog`, `DialogEmpty` | `components/ui/dialog.tsx` | Modal or right drawer; Escape, backdrop, focus trap, scroll lock, focus return |
| `Reveal`, `Stagger`, `StaggerItem`, `MotionProvider` | `components/motion/*` | In-view reveals; reduced-motion aware |
| `ScrollSteps` | `components/motion/scroll-steps.tsx` | Pinned scroll-driven steps (`n × 100vh`), sr-only full content |
| `StickyStack` | `components/shared/sticky-stack.tsx` | CSS sticky stacked cards, alternating sides, featured blue card |
| Visuals: `LiquidityVisual`, `StructureVisual`, `RiskVisual`, `RadarVisual`, `SessionsVisual`, `OrbitVisual`, `ClassroomVisual`, `LaptopVisual`, `ChartCover` | `components/shared/visuals.tsx` | Original decorative SVG/CSS; `ChartCover` = generated cover art |
| `PhotoPanel` | `components/shared/photo-panel.tsx` | Client photo with non-destructive overlay |
| `FaqAccordion` | `components/shared/faq-accordion.tsx` | Single-open; `layout="grid"` for the 2-column cards |
| `LegalPage` | `components/shared/legal-page.tsx` | Sub-header + draft banner + numbered sections |
| `TextField`, `TextArea`, `SelectField` | `components/forms/field.tsx` | Uppercase labels, `aria-invalid`, `role=alert` errors |
| `LeadForm`, `Notice` | `components/forms/lead-form.tsx` | Optional required category chips; Server Action; honest results |
| Feature components | `features/{home,coaching,academy,courses,editorial,events,commerce,cohorts,auth}/components` | Page sections and interactive browsers |
