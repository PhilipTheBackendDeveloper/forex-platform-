# Public site ↔ dashboard integration contract

Version 0.1 · 2026-10-29 · Proposed by public-site owner, **pending Roddy's review**.

## 1. Routes
| Path | Owner | Contract |
|---|---|---|
| `/login`, `/register` | Public site (UI) | UI exists. On success the auth module must redirect to `/dashboard` (or a validated `?next=` same-origin path). |
| `/signin` | Public site | Redirects to `/login` (reference parity). |
| `/dashboard/**` | Roddy | Lives in `src/app/(protected)/dashboard/`. Must check the session server-side and redirect unauthenticated users to `/login?next=…`. |
| `/admin/**` | TBD | Same protection + `admin` role. |

`src/config/navigation.ts` exports `routes.dashboard` and `dashboardEntryHref`. While `siteConfig.features.dashboardAvailable === false`, every "Dashboard" CTA points at `/login`. **Roddy flips the flag in the PR that merges the dashboard.**

## 2. Shared types (`src/types/domain.ts`)
`UserSummary`, `Role`, `CourseSummary`, `CourseDetail`, `Enrollment`, `LessonProgress`, `Cohort`, `EventSummary`, `Product`, `OrderSummary`, `Money` (integer minor units), `Loadable<T>`, `FormResult`. Additive changes are fine in a small PR; renames/removals need both reviewers.

## 3. Shared UI
- Tokens: `src/app/globals.css` (`@theme inline`). Use semantic classes only.
- Primitives: `Button`, `ButtonLink`, `Badge`, `PlaceholderBadge`, `Eyebrow`, `SectionHeading`, form `TextField/TextArea/SelectField`, `Notice`.
- Motion: `Reveal`, `Stagger`, `StaggerItem`, `easeOutExpo`; `MotionProvider` is already in the root layout.
- The dashboard should define its **own layout** (`(protected)/dashboard/layout.tsx`) — it does not inherit the public header/footer.

## 4. Auth (to be decided together — ADR-002)
- Session: HTTP-only, `Secure`, `SameSite=Lax` cookie; server-verified on every protected request.
- Expose a server helper `getCurrentUser(): Promise<UserSummary | null>` from `src/server/auth/` (`import "server-only"`). Public pages may call it to swap "Dashboard" for the user's name later.
- Roles come from the database, never from client claims.

## 5. Course access
- Public detail pages link to `/mastery-courses/[slug]`. After purchase/enrollment, the dashboard owns `/dashboard/courses/[slug]` and lessons.
- Entitlement check: active `enrollments` row for (user, course) — done in the server data layer before returning lesson/media URLs.

## 6. Open questions for Roddy
1. Auth provider preference (Auth.js vs Supabase Auth vs Clerk)?
2. Dashboard URL scheme for courses/lessons/orders/tickets?
3. Who owns `src/server/db` schema migrations?
4. Should "My Tickets" (`/events`) and "My Orders" (`/shop`) deep-link into dashboard tabs?
