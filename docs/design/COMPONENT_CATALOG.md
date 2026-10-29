# Component catalog

| Component | Path | Notes |
|---|---|---|
| `Button`, `ButtonLink`, `buttonClasses` | `components/ui/button.tsx` | variants primary/secondary/light/ghost; sizes md/lg; arrow nudges on hover; `href={null}` → disabled + reason |
| `Badge`, `Eyebrow`, `PlaceholderBadge` | `components/ui/badge.tsx` | Placeholder pills hidden via `siteConfig.features.showPlaceholderBadges` |
| `SectionHeading` | `components/ui/section-heading.tsx` | eyebrow + bright/dim two-line title + description; reveal on scroll |
| `Reveal`, `Stagger`, `StaggerItem` | `components/motion/reveal.tsx` | once-only in-view transitions; reduced-motion aware |
| `MotionProvider` | `components/motion/motion-provider.tsx` | `reducedMotion="user"` |
| `SiteHeader`, `MobileNav`, `SiteFooter`, `Wordmark`, `HelpLauncher` | `components/layout/*` | sticky blur header, focus-trapped mobile dialog, 4-column footer + risk notice, help panel |
| `PageHero` | `components/shared/page-hero.tsx` | centered subpage hero with orbs/grid/noise |
| `PhotoPanel` | `components/shared/photo-panel.tsx` | rounded `next/image` + non-destructive overlay + hover zoom |
| `FaqAccordion` | `components/shared/faq-accordion.tsx` | `aria-expanded` disclosure with animated height |
| `EmptyState` | `components/shared/empty-state.tsx` | icon, title, body, action |
| `LegalPage` | `components/shared/legal-page.tsx` | draft banner + TOC + sections |
| `TextField`, `TextArea`, `SelectField` | `components/forms/field.tsx` | labelled, `aria-invalid`, error `role=alert` |
| `LeadForm`, `Notice` | `components/forms/lead-form.tsx` | `useActionState` + Server Action; honest result banners |
| Feature components | `features/*/components/*` | hero, home sections, catalog, articles, auth form |
