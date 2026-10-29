# ADR-003 — Payments (PROPOSED, blocked on client)

- **Status:** Proposed · **Blocked by:** client merchant entity, country, currencies.

## Context
Client appears Ghana-focused (to confirm). Candidate gateways: **Paystack** and **Flutterwave** (both operate in Ghana, support cards + mobile money); **Stripe** only if the client's legal entity is eligible. Verify current eligibility, currencies (GHS/USD) and fees on official provider docs at decision time — no pricing is assumed here.

## Required flow (any provider)
1. Server creates `orders` row (`pending`) with server-computed amount/currency → creates provider session with our order reference.
2. Browser redirect back is **informational only**.
3. Webhook handler (`/api/webhooks/payments/[provider]`) verifies signature, checks amount/currency/reference, stores `webhook_events(provider, event_id)` UNIQUE for idempotency.
4. In one DB transaction: mark payment succeeded → order `paid` → upsert entitlement (`enrollments` UNIQUE(user_id, course_id)).
5. Return 2xx for duplicates; retry transient failures; nightly reconciliation of stale `pending` orders.

## Until decided
All "Enroll / Buy" buttons are disabled with an explanation; `siteConfig.features.paymentsConnected = false` (unit-tested).
