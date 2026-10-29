# Reference tech-stack evidence (public signals only)

| Layer | Evidence (2026-10-29) | Confidence | Prior-research claim → audit |
|---|---|---|---|
| Next.js | `x-powered-by: Next.js`, `x-nextjs-prerender: 1`, `/_next/static/*`, `vary: rsc, next-router-*` headers (S3) | **High** | Confirmed |
| React | implied by Next.js | High | Confirmed |
| Vercel hosting | `server: Vercel`, `x-vercel-id`, `x-vercel-cache: HIT` (S3) | **High** | Prior "plausible but unverified" → now **verified** |
| Tailwind CSS v4 | oklab `color-mix`, v4 theme vars in CSS (S2) | High | New |
| Geist font | `--font-geist-sans` in CSS (S2) | High | New |
| Security headers | CSP (permissive `unsafe-inline/eval`), HSTS preload, `X-Frame-Options: SAMEORIGIN` (S3) | High | New |
| Supabase | Not observed this session (did not load JS/network) | Not re-verified | Prior "public storage URL" claim unverified here |
| Cloudflare DNS | Not checked | — | Unverified |
| Stripe / Flutterwave / GA / Hotjar | Not observed | — | Remain unverified (policy mentions only) |
| Auth | `/dashboard` → 307 `/signin` (S8) | High that a server-side redirect exists | Provider unknown |

**We do not claim** any database, auth provider, payment gateway or analytics stack for the reference beyond the above.
