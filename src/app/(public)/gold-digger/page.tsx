import type { Metadata } from "next";
import { CalendarClock, CalendarX2, Radio, ShieldCheck, Users } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/shared/page-hero";
import { PhotoPanel } from "@/components/shared/photo-panel";
import { clientPhotos } from "@/config/assets";
import { listActiveCohorts } from "@/features/cohorts/data/cohorts";

export const metadata: Metadata = {
  title: "Gold Digger Live",
  description: "Live, cohort-based gold trading sessions. Join the waitlist for the next cohort.",
  alternates: { canonical: "/gold-digger" },
};

const features = [
  { icon: Radio, title: "Live sessions", text: "Trade-planning sessions run live with the mentor (schedule TBC)." },
  { icon: Users, title: "Small cohorts", text: "A focused group so every question gets answered." },
  { icon: ShieldCheck, title: "Risk-first rules", text: "Every scenario starts with invalidation and position size." },
];

export default async function GoldDiggerPage() {
  const cohorts = await listActiveCohorts();

  return (
    <>
      <PageHero
        eyebrow="Live cohort programme"
        title="Gold Digger"
        accent="Live."
        description="A cohort-based live programme focused on planning and executing gold (XAU/USD) sessions with discipline. Programme details are placeholders pending client confirmation."
      />

      <section className="container-site pb-24">
        <Stagger className="grid gap-5 md:grid-cols-3">
          {features.map((f) => (
            <StaggerItem key={f.title} className="rounded-[var(--radius-card)] border border-border bg-white/[0.02] p-7">
              <f.icon aria-hidden className="size-7 text-[var(--ring)]" />
              <h2 className="mt-5 text-[20px] font-semibold">{f.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground/55">{f.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section aria-label="Cohort availability" className="relative border-y border-border bg-background-deep py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Cohorts" title="Upcoming cohorts" />
          <div className="mt-12">
            {cohorts.state === "ready" ? (
              <ul className="grid gap-5 md:grid-cols-2">
                {cohorts.data.map((c) => (
                  <li key={c.id} className="rounded-[var(--radius-card)] border border-border p-7">
                    <Badge tone={c.status === "enrolling" ? "success" : "neutral"}>{c.status}</Badge>
                    <p className="mt-4 text-[22px] font-semibold">{c.name}</p>
                    <p className="mt-1 flex items-center gap-2 text-foreground/55">
                      <CalendarClock aria-hidden className="size-4" />
                      {new Date(c.startsAt).toLocaleDateString("en-GB", { dateStyle: "long" })}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <Reveal className="flex flex-col items-center rounded-[var(--radius-panel)] border border-dashed border-border-strong px-6 py-20 text-center">
                <CalendarX2 aria-hidden className="size-11 text-foreground/40" />
                <p className="mt-6 text-[26px] font-bold tracking-tight">No active cohorts</p>
                <p className="mt-2 max-w-md text-foreground/55">
                  {cohorts.state === "error"
                    ? "We couldn't load cohorts right now. Please try again shortly."
                    : "There are no cohorts open for enrollment right now. Join the waitlist below to hear first when the next one opens."}
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="container-site grid items-start gap-14 lg:grid-cols-2">
          <PhotoPanel photo={clientPhotos.redOutfit} sizes="(min-width:1024px) 560px, 100vw" className="aspect-[4/3] lg:aspect-square" />
          <Reveal className="rounded-[var(--radius-panel)] border border-border bg-white/[0.02] p-6 sm:p-10">
            <h2 className="text-[26px] font-bold tracking-tight">Join the waitlist</h2>
            <p className="mt-2 mb-8 text-[15px] text-foreground/55">Be first to know when the next cohort opens.</p>
            <LeadForm
              kind="cohort_waitlist"
              submitLabel="Join waitlist"
              messageLabel="Your experience with gold"
              messagePlaceholder="e.g. Beginner, trading gold for 6 months…"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
