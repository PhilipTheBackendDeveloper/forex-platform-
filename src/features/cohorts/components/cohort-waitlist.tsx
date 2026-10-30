"use client";

import { useState } from "react";
import { LeadForm } from "@/components/forms/lead-form";

/** Optional waitlist under the empty state — collapsed by default to keep the reference's minimal screen. */
export function CohortWaitlist() {
  const [open, setOpen] = useState(false);
  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="mt-8 inline-flex min-h-11 items-center rounded-full border border-white/15 px-6 text-[14px] font-medium text-foreground/80 hover:bg-white/5">
        Notify me when a cohort opens
      </button>
    );
  }
  return (
    <div className="mt-10 w-full max-w-lg rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-6 text-left">
      <LeadForm kind="cohort_waitlist" submitLabel="Join waitlist" messageLabel="Your experience with gold" messagePlaceholder="e.g. Beginner, trading gold for 6 months…" />
    </div>
  );
}
