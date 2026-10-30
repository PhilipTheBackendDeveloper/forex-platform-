# Security and auth

## Current state (public site)
- No auth, no database, no secrets in the codebase. `.env*` git-ignored; `.env.example` documents names only.
- Forms: Zod validation in browser **and** in the Server Action; honeypot field; results never fake delivery. Server Actions get Next.js's built-in Origin/Host check (CSRF mitigation).
- Headers (`next.config.ts`): `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy`; `x-powered-by` disabled. **TODO:** CSP with nonces once third-party scripts are known.
- `robots.ts` disallows everything unless `NEXT_PUBLIC_ALLOW_INDEXING=true`; auth layout is `noindex`.

## Third-party requests
- `src/server/services/market-ticker.ts` (server-only) fetches public, keyless endpoints (api.frankfurter.dev, api.coingecko.com) with an 8 s timeout; results are cached (`cacheLife("minutes")`). No user data is sent, nothing runs in the browser, and failures hide the ticker. Data is labelled indicative (ECB daily fixings; CoinGecko 24 h) — never present it as tradeable quotes. Check provider terms/rate limits before production traffic.

## Required before accounts go live
1. Session in HTTP-only, Secure, SameSite=Lax cookie; rotate on login; short idle timeout for admin.
2. Authorisation in the data layer for every read/write (`src/server/services`), plus RLS if using Supabase.
3. Protected layouts verify the session server-side; middleware/proxy is only an optimistic redirect, not the security boundary.
4. Rate limits: login, register, password reset, lead forms, AI assistant.
5. Paid media via signed, expiring URLs from a private bucket/video host.
6. Payments per ADR-003; never grant access from client redirects.
7. Admin actions → `audit_logs`; least-privilege roles.
8. Dependency updates (Dependabot/Renovate) and `pnpm audit` in CI.

## Compliance notes (client to confirm with advisers)
Financial-promotion/advertising rules in target markets; Ghana Data Protection Act registration if applicable; cookie consent before analytics; no profit guarantees; broker-referral disclosures if a broker partnership is used.
