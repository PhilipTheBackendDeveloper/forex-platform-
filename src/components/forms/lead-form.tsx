"use client";

import { useActionState, useState } from "react";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitLead } from "@/features/leads/actions";
import { fieldErrorsFrom, leadSchema, type leadKinds } from "@/features/leads/schemas";
import type { FormResult } from "@/types/domain";
import { cn } from "@/lib/cn";
import { SelectField, TextArea, TextField } from "./field";

type LeadKind = (typeof leadKinds)[number];

/**
 * Generic inquiry form (collaborations, coaching interest, cohort waitlist, events).
 * Validates in the browser first, then the Server Action validates again. The result banner
 * reflects exactly what the server reported — it never claims delivery that didn't happen.
 */
export function LeadForm({
  kind,
  topics,
  submitLabel = "Send request",
  messageLabel = "Message",
  messagePlaceholder = "Tell us a little about your request…",
  showCompany = false,
  className,
}: {
  kind: LeadKind;
  topics?: readonly string[];
  submitLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  showCompany?: boolean;
  className?: string;
}) {
  const [result, formAction, pending] = useActionState<FormResult, FormData>(submitLead, { status: "idle" });
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const errors = { ...(result.status === "invalid" ? result.fieldErrors : {}), ...clientErrors };

  function validateBeforeSubmit(e: React.FormEvent<HTMLFormElement>) {
    const parsed = leadSchema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) {
      e.preventDefault();
      const fieldErrors = fieldErrorsFrom(parsed.error);
      setClientErrors(fieldErrors);
      const first = Object.keys(fieldErrors)[0];
      if (first) e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    } else {
      setClientErrors({});
    }
  }

  return (
    <form action={formAction} onSubmit={validateBeforeSubmit} noValidate className={cn("flex flex-col gap-5", className)}>
      <input type="hidden" name="kind" value={kind} />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`website-${kind}`}>Leave this field empty</label>
        <input id={`website-${kind}`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {topics && <SelectField label="Nature of inquiry" name="topic" options={topics} error={errors.topic} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full name" name="name" autoComplete="name" required error={errors.name} />
        <TextField label="Email" name="email" type="email" autoComplete="email" required error={errors.email} />
      </div>
      {showCompany && <TextField label="Company / organisation (optional)" name="company" autoComplete="organization" error={errors.company} />}
      <TextArea label={messageLabel} name="message" placeholder={messagePlaceholder} required error={errors.message} />
      <label className="flex items-start gap-3 text-[14px] leading-relaxed text-foreground/60">
        <input
          type="checkbox"
          name="consent"
          aria-invalid={errors.consent ? true : undefined}
          className="mt-1 size-4 shrink-0 accent-[var(--primary)]"
        />
        <span>
          I agree to be contacted about this request. See the{" "}
          <a href="/privacy-policy" className="underline underline-offset-4 hover:text-foreground">
            privacy policy (draft)
          </a>
          .
        </span>
      </label>
      {errors.consent && (
        <p role="alert" className="-mt-3 text-[13px] text-danger">
          {errors.consent}
        </p>
      )}
      <Button type="submit" variant="primary" size="lg" arrow disabled={pending} className="self-start">
        {pending ? "Checking…" : submitLabel}
      </Button>
      <div aria-live="polite">
        {result.status === "not_configured" && (
          <Notice tone="info" title="Not sent — preview mode">
            {result.message}
          </Notice>
        )}
        {result.status === "sent" && (
          <Notice tone="success" title="Request sent">
            {result.message}
          </Notice>
        )}
        {result.status === "error" && (
          <Notice tone="error" title="Something went wrong">
            {result.message}
          </Notice>
        )}
      </div>
    </form>
  );
}

export function Notice({
  tone,
  title,
  children,
}: {
  tone: "info" | "success" | "error";
  title: string;
  children: React.ReactNode;
}) {
  const Icon = tone === "success" ? CheckCircle2 : tone === "error" ? AlertTriangle : Info;
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex gap-3 rounded-2xl border p-4 text-[14px] leading-relaxed",
        tone === "info" && "border-amber-400/30 bg-amber-400/[0.07] text-amber-100",
        tone === "success" && "border-success/30 bg-success/10 text-foreground",
        tone === "error" && "border-danger/40 bg-danger/10 text-foreground",
      )}
    >
      <Icon aria-hidden className="mt-0.5 size-5 shrink-0" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 opacity-80">{children}</p>
      </div>
    </div>
  );
}
