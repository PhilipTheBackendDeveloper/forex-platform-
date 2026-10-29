"use client";

import Link from "next/link";
import { useState } from "react";
import { TextField } from "@/components/forms/field";
import { Notice } from "@/components/forms/lead-form";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site.config";
import { fieldErrorsFrom } from "@/features/leads/schemas";
import { loginSchema, registerSchema } from "../schemas";

/**
 * Sign-in / sign-up UI. Authentication is owned by the shared auth module (see
 * docs/architecture/SECURITY_AND_AUTH.md). Until it is connected this form validates locally
 * and then states clearly that no account was created and no session was started.
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
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {mode === "register" && <TextField label="Full name" name="name" autoComplete="name" error={errors.name} />}
      <TextField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
      <TextField
        label="Password"
        name="password"
        type="password"
        autoComplete={mode === "login" ? "current-password" : "new-password"}
        error={errors.password}
        hint={mode === "register" ? "At least 10 characters, including a letter and a number." : undefined}
      />
      {mode === "register" && (
        <>
          <TextField label="Confirm password" name="confirm" type="password" autoComplete="new-password" error={errors.confirm} />
          <label className="flex items-start gap-3 text-[14px] text-foreground/60">
            <input type="checkbox" name="terms" className="mt-1 size-4 accent-[var(--primary)]" aria-invalid={errors.terms ? true : undefined} />
            <span>
              I agree to the{" "}
              <Link href={routes.terms} className="underline underline-offset-4">
                terms (draft)
              </Link>{" "}
              and{" "}
              <Link href={routes.privacy} className="underline underline-offset-4">
                privacy policy (draft)
              </Link>
              .
            </span>
          </label>
          {errors.terms && (
            <p role="alert" className="-mt-3 text-[13px] text-danger">
              {errors.terms}
            </p>
          )}
        </>
      )}
      <Button type="submit" variant="primary" size="lg" className="w-full">
        {mode === "login" ? "Sign in" : "Create account"}
      </Button>
      <div aria-live="polite">
        {submitted && !siteConfig.features.authConnected && (
          <Notice tone="info" title="Accounts aren't live yet">
            {mode === "login"
              ? "Sign-in isn't connected on this preview, so you have not been signed in. The student dashboard is in development."
              : "Your details are valid, but registration isn't connected yet — no account was created and nothing was stored."}
          </Notice>
        )}
      </div>
    </form>
  );
}
