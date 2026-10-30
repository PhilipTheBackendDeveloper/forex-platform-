"use client";

import Link from "next/link";
import { useState } from "react";
import { TextField } from "@/components/forms/field";
import { Notice } from "@/components/forms/lead-form";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site.config";
import { fieldErrorsFrom } from "@/features/leads/schemas";
import { cn } from "@/lib/cn";
import { loginSchema, registerSchema } from "../schemas";

const steps = ["Account Setup", "Verification", "Done"];

/** Sign-up progress indicator (reference: 3-step stepper). Only step 1 is reachable until auth exists. */
export function RegisterStepper({ current = 0 }: { current?: number }) {
  return (
    <ol aria-label="Sign-up progress" className="relative mb-10 hidden grid-cols-3 sm:grid">
      <span aria-hidden className="absolute top-4 right-[16%] left-[16%] h-px bg-white/10" />
      {steps.map((s, i) => (
        <li key={s} aria-current={i === current ? "step" : undefined} className="relative flex flex-col items-center gap-2">
          <span
            className={cn(
              "flex size-8 items-center justify-center rounded-full border text-[12px] font-semibold",
              i === current ? "border-primary bg-primary text-white shadow-[0_0_20px_-4px_var(--primary)]" : "border-white/10 bg-background text-foreground/40",
            )}
          >
            {i + 1}
          </span>
          <span className={cn("text-[12px]", i === current ? "text-foreground" : "text-foreground/40")}>{s}</span>
        </li>
      ))}
    </ol>
  );
}

/**
 * Sign-in / sign-up UI. The reference uses email one-time codes; ours validates the same fields
 * and then states plainly that no code was sent, no account created and no session started —
 * until the shared auth module lands (docs/architecture/SECURITY_AND_AUTH.md, ADR-002).
 */
export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = (mode === "login" ? loginSchema : registerSchema).safeParse(data);
    if (!parsed.success) {
      const fe = fieldErrorsFrom(parsed.error);
      setErrors(fe);
      setSubmitted(false);
      const first = Object.keys(fe)[0];
      if (first) e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {mode === "register" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="First name" name="firstName" autoComplete="given-name" error={errors.firstName} />
          <TextField label="Last name" name="lastName" autoComplete="family-name" error={errors.lastName} />
        </div>
      )}
      <TextField label="Email address" name="email" type="email" autoComplete="email" error={errors.email} />
      {mode === "register" && (
        <>
          <TextField
            label="WhatsApp number"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+233 54 123 4567"
            hint="Include country code, e.g. +233 54 123 4567"
            error={errors.phone}
          />
          <label className="flex items-start gap-3 text-[13px] text-foreground/55">
            <input type="checkbox" name="terms" className="mt-0.5 size-4 accent-[var(--primary)]" aria-invalid={errors.terms ? true : undefined} />
            <span>
              I agree to the{" "}
              <Link href={routes.terms} className="underline underline-offset-4">
                terms
              </Link>{" "}
              and{" "}
              <Link href={routes.privacy} className="underline underline-offset-4">
                privacy policy
              </Link>{" "}
              (drafts).
            </span>
          </label>
          {errors.terms && (
            <p role="alert" className="-mt-2 text-[13px] text-danger">
              {errors.terms}
            </p>
          )}
        </>
      )}
      <button type="submit" className="mt-2 inline-flex min-h-13 w-full items-center justify-center rounded-full bg-foreground text-[15px] font-semibold text-background transition-colors hover:bg-white">
        {mode === "login" ? "Sign in" : "Create account"}
      </button>
      <div aria-live="polite">
        {submitted && !siteConfig.features.authConnected && (
          <Notice tone="info" title="Accounts aren't live yet">
            {mode === "login"
              ? "Sign-in isn't connected on this preview — no code was sent and you have not been signed in. The student dashboard is in development."
              : "Your details are valid, but registration isn't connected yet — no account was created, no code was sent and nothing was stored."}
          </Notice>
        )}
      </div>
    </form>
  );
}
