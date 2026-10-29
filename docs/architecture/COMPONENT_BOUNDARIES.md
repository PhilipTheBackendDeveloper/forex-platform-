# Component boundaries

| Layer | Path | May import | Must not import |
|---|---|---|---|
| Routes | `src/app/**` | features, components, config, content, types | other route files |
| Features | `src/features/<domain>/**` | components, config, content, types, lib, `src/server` (server files only) | another feature's internals (use its public exports) |
| UI primitives | `src/components/ui/**` | lib, design, config | features, server |
| Layout shell | `src/components/layout/**` | ui, config | features |
| Motion | `src/components/motion/**`, `src/design/motion.ts` | `motion/react` | features |
| Server | `src/server/**` (`import "server-only"`) | types, lib | any `"use client"` module |
| Content | `src/content/**` | types | components |
| Config | `src/config/**` | — | components |

## Client islands (all `"use client"`)
`SiteHeader`, `MobileNav`, `HelpLauncher`, `HomeHero`, `Reveal/Stagger`, `FaqAccordion`, `CourseCatalog`, `ArticleList`, `LeadForm`, `AuthForm`, `MotionProvider`. Everything else renders on the server.

## Data adapters
`features/*/data/*.ts` return typed data or `Loadable<T>`. Pages depend on the adapter signature, so replacing static arrays with `src/server/services/*` calls doesn't change UI code.
