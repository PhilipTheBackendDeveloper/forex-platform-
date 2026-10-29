# Deployment

**Nothing has been deployed.** No remote repository or hosting project was created in this session.

## Recommended path (pending approval)
1. Create a **private** GitHub repo (e.g. `forex-platform`) and push `main` + `feat/public-site`.
2. Connect to **Vercel** (the reference itself is served by Vercel per its public `server: Vercel` header; first-party Next.js support) — or Netlify / a Node host (`pnpm build && pnpm start`).
3. Environments: **Preview** (every PR, `NEXT_PUBLIC_ALLOW_INDEXING=false`), **Production** (client domain, indexing on only after legal/content sign-off).
4. Set `NEXT_PUBLIC_SITE_URL` per environment. Secrets per environment, never shared between preview and production.
5. Protect `main` (PR + green CI). Enable Vercel deployment protection on previews if the client photos are not yet cleared for publication.

## Commands (once approved)
```bash
gh repo create <org>/forex-platform --private --source=. --remote=origin
git push -u origin main feat/public-site
# then import the repo in Vercel, framework preset: Next.js, install: pnpm install
```
