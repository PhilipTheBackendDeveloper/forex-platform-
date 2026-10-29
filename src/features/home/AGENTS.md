# Home feature — public-site owner

- Section order mirrors the reference homepage (observed 2026-10-29; see `docs/research/PAGE_INVENTORY.md`). Keep each section a small component in `components/`; do not grow a monolithic page.
- All copy lives in `src/content/home.ts`. Statistics, testimonials and partner logos stay absent/placeholder until the client supplies verifiable data.
- The hero LCP element is the `<h1>` and the portrait (`priority`). Don't add other `priority` images on the homepage.
- Hero portrait treatment is CSS masks only — never edit, recolour or cut out the photograph.
