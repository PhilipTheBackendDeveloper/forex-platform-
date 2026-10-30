"use server";

import { siteConfig } from "@/config/site.config";
import type { FormResult } from "@/types/domain";
import { fieldErrorsFrom, leadSchema } from "./schemas";

/**
 * Public lead/inquiry submission. Validates on the server regardless of client checks.
 *
 * Delivery (email/CRM/DB) is NOT configured yet, so this returns `not_configured` and the UI
 * says so explicitly. When a destination is approved, implement it in
 * src/server/services/leads.ts (rate limit by IP + email, persist to `form_submissions`, then
 * notify) and return `sent` only after the write succeeds. See docs/architecture/API_CONTRACTS.md.
 */
export async function submitLead(_prev: FormResult, formData: FormData): Promise<FormResult> {
  const parsed = leadSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "invalid", fieldErrors: fieldErrorsFrom(parsed.error) };
  }
  // A filled honeypot (`hp`) fails the schema above, so bots never reach this point.
  if (!siteConfig.features.formDeliveryConnected) {
    return {
      status: "not_configured",
      message:
        "Your details passed validation, but form delivery isn't connected on this preview yet — nothing was sent or stored. Please check back soon.",
    };
  }
  return { status: "error", message: "Form delivery is enabled but no delivery service is implemented." };
}
