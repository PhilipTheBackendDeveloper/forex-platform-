import type { Metadata } from "next";
import { BarChart3, Building2, Globe2, Mic, Users } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { LandingShell } from "@/components/layout/landing-shell";
import { PageHeader, headerActionClasses } from "@/components/layout/page-header";
import { PlaceholderBadge } from "@/components/ui/badge";
import { Fade, SectionEyebrow } from "@/components/ui/section-heading";
import { partnershipTypes } from "@/features/leads/schemas";

export const metadata: Metadata = {
  title: "Collaborations",
  description: "Partner with us: brand sponsorships, broker partnerships, speaking and media.",
  alternates: { canonical: "/collaborations" },
};

/** Reference shows audience statistics here; ours stay pending until the client verifies them. */
const metrics = [
  { icon: Users, label: "Global audience", note: "Combined following across social channels." },
  { icon: BarChart3, label: "Avg. engagement", note: "Engagement rate across recent content." },
  { icon: Globe2, label: "Demographics", note: "Where the audience is based." },
];

const tracks = [
  { icon: Building2, title: "Corporate Branding", text: "Sponsorships & official endorsements." },
  { icon: Mic, title: "Media Engagements", text: "Podcasts, stages and keynote talks." },
];

export default function CollaborationsPage() {
  return (
    <LandingShell
      header={
        <PageHeader
          title="Collaborations"
          action={
            <a href="#proposal" className={headerActionClasses()}>
              Submit Proposal
            </a>
          }
        />
      }
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-40 pb-32 sm:px-6">
        <Reveal className="max-w-3xl">
          <SectionEyebrow variant="pill">Partnerships &amp; media</SectionEyebrow>
          <h1 className="mt-7 text-[clamp(46px,7vw,92px)] leading-[0.95] font-black tracking-[-0.05em]">
            <span className="block">Partner with a</span>
            <Fade italic block>
              focused audience.
            </Fade>
          </h1>
          <p className="mt-7 max-w-xl text-[17px] leading-[1.7] text-foreground/60 lg:text-[19px]">
            We collaborate with brands, platforms and media that share a commitment to responsible, high-quality trading education.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-5 md:grid-cols-3">
          {metrics.map((m) => (
            <StaggerItem key={m.label} className="rounded-[var(--radius-panel)] border border-border bg-white p-7 shadow-card">
              <span className="flex size-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                <m.icon aria-hidden className="size-5 text-[var(--ring)]" />
              </span>
              <p className="mt-6 text-[11px] font-semibold tracking-[0.18em] text-foreground/50 uppercase">{m.label}</p>
              <p className="mt-2 text-[40px] leading-none font-black tracking-[-0.04em]">—</p>
              <PlaceholderBadge className="mt-3" label="Pending verification" />
              <p className="mt-4 text-[14px] text-foreground/50">{m.note}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <section id="proposal" className="mt-28 grid items-start gap-14 lg:grid-cols-[1fr_1.15fr]">
          <div className="lg:sticky lg:top-32">
            <h2 className="text-[clamp(38px,4.4vw,56px)] leading-[1] font-black tracking-[-0.045em]">Let&apos;s build something credible.</h2>
            <p className="mt-6 max-w-md text-[16px] leading-[1.7] text-foreground/60">
              Select the nature of your inquiry so it reaches the right person. We reply to every serious proposal once form delivery is connected.
            </p>
            <ul className="mt-10 flex max-w-md flex-col gap-3">
              {tracks.map((t) => (
                <li key={t.title} className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                    <t.icon aria-hidden className="size-4 text-[var(--ring)]" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold">{t.title}</span>
                    <span className="block text-[13px] text-foreground/50">{t.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="rounded-[var(--radius-panel)] border border-border bg-white p-5 shadow-card sm:p-8">
            <LeadForm
              kind="collaboration"
              topics={partnershipTypes}
              showCompany
              showWebsite
              submitLabel="Submit Proposal"
              messageLabel="Proposal outline"
              messagePlaceholder="Briefly describe the proposed collaboration, deliverables and budget…"
            />
          </Reveal>
        </section>
      </div>
    </LandingShell>
  );
}
