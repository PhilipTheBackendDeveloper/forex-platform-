# API contracts

## Implemented
| Kind | Name | Input | Output |
|---|---|---|---|
| Server Action | `submitLead` (`src/features/leads/actions.ts`) | `FormData` matching `leadSchema` (kind, name, email, company?, topic?, message, consent, website honeypot) | `FormResult`: `invalid` (fieldErrors) · `not_configured` (today) · `sent` (only after durable write) · `error` |
| Route Handler | `GET /api/health` | — | `200 {"status":"ok"}`, `no-store` |

## Planned (Phase 1+)
| Endpoint / action | Auth | Notes |
|---|---|---|
| `getCurrentUser()` server helper | session | returns `UserSummary \| null` |
| `listCourses`, `getCourse(slug)` | public | cacheable (tagged revalidation on publish) |
| `startCheckout(courseId)` Server Action | student | creates pending order, returns provider URL; amount computed server-side |
| `POST /api/webhooks/payments/[provider]` | provider signature | idempotent via `webhook_events`; never cached |
| `getLesson(courseSlug, lessonId)` | student + entitlement | returns signed media URL (TTL ≤ 1 h) |
| `saveProgress(lessonId, position)` | student | upsert, rate-limited |
| Admin CRUD actions | admin role | every call writes `audit_logs` |

Rules: validate with Zod on the server; return typed discriminated results (no thrown errors for expected states); rate-limit unauthenticated writes (per IP + per email); same-origin `next` redirects only.
