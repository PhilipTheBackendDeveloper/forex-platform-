import { z } from "zod";

/** Reference flow: email → one-time code (passwordless). */
export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
});

/** Reference sign-up fields: first/last name, email, WhatsApp number with country code. */
export const registerSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name.").max(60),
  lastName: z.string().trim().min(1, "Please enter your last name.").max(60),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^\+[1-9][0-9 ]{7,17}$/, "Include your country code, e.g. +233 54 123 4567."),
  terms: z.literal("on", { message: "Please accept the terms to continue." }),
});
