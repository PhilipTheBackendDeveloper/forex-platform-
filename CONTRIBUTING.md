# Contributing

1. Read `AGENTS.md` and `docs/team/ROLES_AND_OWNERSHIP.md`.
2. Branch from `main`: `feat/<area>-<topic>`, `fix/…`, `chore/shared-…` (shared contracts).
3. Keep PRs small. Shared files (`src/types`, `globals.css`, `components/ui`, `config/navigation.ts`) → separate PR, both developers review.
4. Before pushing: `pnpm lint && pnpm typecheck && pnpm test && pnpm build` (+ `pnpm test:e2e` for UI changes).
5. Fill in the PR template (area, definition of done, screenshots at 390/1440).
6. Commit messages: imperative, scoped — e.g. `feat(public): add academy curriculum tiers`.
7. Never commit secrets, `.env.local`, or the `private/` folder. Never force-push shared branches.
8. Update `docs/PROJECT_STATUS.md` and `CHANGELOG.md` when you finish a chunk of work.
