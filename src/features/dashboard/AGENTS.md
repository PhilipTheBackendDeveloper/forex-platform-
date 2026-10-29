# Dashboard feature — owned by Roddy

- This folder and `src/app/(protected)/dashboard/**` belong to Roddy's `feat/dashboard` branch. **Public-site work must not create or modify files here.**
- Consume shared contracts from `src/types/domain.ts`, tokens from `src/app/globals.css`, primitives from `src/components/ui` and motion presets from `src/design/motion.ts`. Propose changes to those in a small separate PR reviewed by both developers.
- Every dashboard route must verify the session **on the server** (layout + each data call). Never rely on client-side redirects for protection.
- Lesson/video access requires a server-side entitlement check (`enrollments.status = 'active'`) and short-lived signed media URLs.
- See `docs/team/INTEGRATION_CONTRACT.md` for the routes, types and handoffs the public site expects.
