import { z } from "zod";

export const leadKinds = ["collaboration", "coaching", "cohort_waitlist", "event_interest", "academy"] as const;

/** Shared by the browser (instant feedback) and the Server Action (authoritative check). */
export const leadSchema = z.object({
  kind: z.enum(leadKinds),
  name: z.string().trim().min(2, "Please enter your full name.").max(120, "Name is too long."),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  company: z.string().trim().max(160, "Too long.").optional().or(z.literal("")),
  topic: z.string().trim().max(80).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail (10+ characters).")
    .max(4000, "Please keep it under 4,000 characters."),
  consent: z.literal("on", { message: "Please confirm we may contact you about this request." }),
  /** Honeypot: humans never fill this hidden field. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

export function fieldErrorsFrom(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
