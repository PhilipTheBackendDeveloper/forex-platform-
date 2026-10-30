"use client";

import { useActionState, useId, useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Info } from "lucide-react";
import { submitLead } from "@/features/leads/actions";
import { fieldErrorsFrom, leadSchema, type leadKinds } from "@/features/leads/schemas";
import type { FormResult } from "@/types/domain";
import { cn } from "@/lib/cn";
import { TextArea, TextField } from "./field";

type LeadKind = (typeof leadKinds)[number];

/**
 * Generic inquiry form (collaborations, coaching, cohort waitlist, events).
 * - Optional single-select category chips (reference: required; submit disabled until chosen).
 * - Validates in the browser, then the Server Action validates again.
 * - The result banner reflects exactly what the server reported — never a fake "sent".
 */
export function LeadForm({
  kind,
  topics,
  topicsLabel = "Partnership type",
  topicsLayout = "grid",
  submitLabel = "Send request",
  messageLabel = "Message",
  messagePlaceholder = "Tell us a little about your request…",
  showCompany = false,
  showWebsite = false,
  className,
}: {
  kind: LeadKind;
  topics?: readonly string[];
  topicsLabel?: string;
  /** `pills` = homepage proposal form; `grid` = /collaborations (reference has both). */
  topicsLayout?: "pills" | "grid";
  submitLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  showCompany?: boolean;
  showWebsite?: boolean;
  className?: string;
}) {
  const [result, formAction, pending] = useActionState<FormResult, FormData>(submitLead, { status: "idle" });
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [topic, setTopic] = useState("");
  const uid = useId();
  const errors = { ...(result.status === "invalid" ? result.fieldErrors : {}), ...clientErrors };
  const needsTopic = Boolean(topics?.length) && !topic;

  function pickTopic(t: string) {
    setTopic(t);
    setClientErrors((prev) => Object.fromEntries(Object.entries(prev).filter(([key]) => key !== "topic")));
  }

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
    <form action={formAction} onSubmit={validateBeforeSubmit} noValidate className={cn("relative flex flex-col gap-5", className)}>
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="topic" value={topic} />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-hp`}>Leave this field empty</label>
        <input id={`${uid}-hp`} name="hp" tabIndex={-1} autoComplete="off" />
      </div>

      {topics && topicsLayout === "pills" && (
        <div role="radiogroup" aria-label={topicsLabel} aria-required="true" className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={topic === t}
              onClick={() => pickTopic(t)}
              className={cn(
                "rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300",
                topic === t ? "border-white bg-white text-black" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {topics && topicsLayout === "grid" && (
        <fieldset className="rounded-[1.4rem] border border-white/10 bg-white/[0.02] p-4 sm:p-5">
          <legend className="sr-only">{topicsLabel}</legend>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p aria-hidden className="text-[11px] font-semibold tracking-[0.18em] text-white/60 uppercase">
              {topicsLabel} <span className="text-danger">*</span>
            </p>
            <span className="rounded-full border border-danger/30 bg-danger/10 px-2 py-0.5 text-[9px] font-bold tracking-[0.15em] text-danger uppercase">Required</span>
          </div>
          <div role="radiogroup" aria-label={topicsLabel} aria-required="true" className="grid gap-2 sm:grid-cols-2">
            {topics.map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={topic === t}
                onClick={() => pickTopic(t)}
                className={cn(
                  "min-h-11 rounded-xl border px-4 text-left text-[13px] font-medium transition-colors",
                  topic === t ? "border-primary bg-primary/15 text-foreground" : "border-white/10 bg-white/[0.03] text-white/65 hover:border-white/25 hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Representative name" name="name" autoComplete="name" placeholder="Your full name" required error={errors.name} />
        {showCompany ? (
          <TextField label="Company / brand" name="company" autoComplete="organization" placeholder="Company name" error={errors.company} />
        ) : (
          <TextField label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required error={errors.email} />
        )}
      </div>
      {showCompany && (
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Work email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required error={errors.email} />
          {showWebsite && <TextField label="Company website" name="website" type="url" inputMode="url" placeholder="https://example.com" error={errors.website} />}
        </div>
      )}
      <TextArea label={messageLabel} name="message" placeholder={messagePlaceholder} required error={errors.message} />
      <label className="flex items-start gap-3 text-[13px] leading-relaxed text-foreground/55">
        <input type="checkbox" name="consent" aria-invalid={errors.consent ? true : undefined} className="mt-0.5 size-4 shrink-0 accent-[var(--primary)]" />
        <span>
          I agree to be contacted about this request (see the{" "}
          <a href="/privacy-policy" className="underline underline-offset-4 hover:text-foreground">
            privacy policy draft
          </a>
          ).
        </span>
      </label>
      {errors.consent && (
        <p role="alert" className="-mt-3 text-[13px] text-danger">
          {errors.consent}
        </p>
      )}
      <button
        type="submit"
        disabled={pending || needsTopic}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-4 text-[15px] font-bold tracking-tight text-black transition-all duration-300 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Checking…" : submitLabel}
        <ArrowRight aria-hidden className="size-4" />
      </button>
      {needsTopic && <p className="-mt-2 animate-pulse text-center text-[12px] text-rose-400/80">* Please select a category to continue</p>}
      {errors.topic && !needsTopic && (
        <p role="alert" className="-mt-2 text-center text-[12px] text-danger">
          {errors.topic}
        </p>
      )}
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

export function Notice({ tone, title, children }: { tone: "info" | "success" | "error"; title: string; children: React.ReactNode }) {
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
