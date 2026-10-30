import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CohortWaitlist } from "@/features/cohorts/components/cohort-waitlist";
import { listActiveCohorts } from "@/features/cohorts/data/cohorts";

export const metadata: Metadata = {
  title: "Gold Digger Live",
  description: "Live, cohort-based gold trading sessions. Join the waitlist for the next cohort.",
  alternates: { canonical: "/gold-digger" },
};

/**
 * Reference: a single full-screen state with no header or footer ("No Active Cohorts").
 * We add a back link (no dead end) and an optional waitlist.
 */
export default async function GoldDiggerPage() {
  const cohorts = await listActiveCohorts();
  return (
    <main id="main" className="relative flex min-h-dvh flex-col items-center justify-center bg-[#020c1e] px-6 py-24 text-center">
      <Link href="/" className="absolute top-6 left-6 inline-flex min-h-11 items-center gap-1.5 text-[13px] text-foreground/60 hover:text-foreground">
        <ArrowLeft aria-hidden className="size-4" /> Home
      </Link>
      {cohorts.state === "ready" ? (
        <>
          <h1 className="text-[clamp(36px,5vw,56px)] font-black tracking-[-0.04em]">Gold Digger Live</h1>
          <ul className="mt-10 grid w-full max-w-3xl gap-5 md:grid-cols-2">
            {cohorts.data.map((c) => (
              <li key={c.id} className="rounded-[1.4rem] border border-white/10 p-7 text-left">
                <Badge tone={c.status === "enrolling" ? "success" : "neutral"}>{c.status}</Badge>
                <p className="mt-4 text-[22px] font-semibold">{c.name}</p>
                <p className="mt-1 flex items-center gap-2 text-foreground/55">
                  <CalendarClock aria-hidden className="size-4" />
                  {new Date(c.startsAt).toLocaleDateString("en-GB", { dateStyle: "long" })}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <span className="flex size-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <AlertTriangle aria-hidden className="size-6 text-primary" />
          </span>
          <h1 className="mt-6 text-[clamp(30px,4vw,40px)] font-bold tracking-tight">No Active Cohorts</h1>
          <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-foreground/60">
            {cohorts.state === "error"
              ? "We couldn't load cohorts right now. Please try again shortly."
              : "There are currently no upcoming Gold Digger Live sessions open for enrollment. Please check back later."}
          </p>
          <CohortWaitlist />
        </>
      )}
    </main>
  );
}
