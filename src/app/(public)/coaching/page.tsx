import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { PlaceholderBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/shared/page-hero";
import { PhotoPanel } from "@/components/shared/photo-panel";
import { clientPhotos } from "@/config/assets";
import { coachingContent as c } from "@/content/coaching";

export const metadata: Metadata = {
  title: "1-on-1 Coaching",
  description: "Private, personalised forex coaching: chart audits, strategy refinement and trading psychology.",
  alternates: { canonical: "/coaching" },
};

export default function CoachingPage() {
  return (
    <>
      <PageHero tall eyebrow="1-on-1 mentorship" title={c.hero.title} accent={c.hero.accent} description={c.hero.description}>
        <div className="mt-2 flex flex-col items-center gap-3">
          <ButtonLink href="#apply" variant="primary" size="lg" arrow>
            Request a seat
          </ButtonLink>
          <p className="text-[13px] tracking-[0.14em] text-foreground/45 uppercase">Availability confirmed on application</p>
        </div>
      </PageHero>

      <section id="philosophy" className="relative z-10 px-0 py-28">
        <div className="container-site grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <PhotoPanel photo={clientPhotos.blackOutfitWindow} sizes="(min-width:1024px) 560px, 100vw" className="aspect-[4/3] lg:aspect-[4/5]" />
          <div>
            <SectionHeading eyebrow="The mentorship philosophy" title="Built around you." dim="Not a template." description={c.philosophy} />
            <Stagger className="mt-10 grid gap-4">
              {c.pillars.map((p, i) => (
                <StaggerItem key={p.title} className="rounded-[var(--radius-card)] border border-border bg-white/[0.02] p-6">
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--ring)] uppercase">Pillar 0{i + 1}</p>
                  <h3 className="mt-2 text-[20px] font-semibold">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground/55">{p.text}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section id="roadmap" className="relative border-y border-border bg-background-deep py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="The transformation"
            title="A structured"
            dim="five-session path."
            description="Proposed session structure — final format to be confirmed by the mentor."
          />
          <ol className="relative mt-16 grid gap-5 md:grid-cols-5">
            {c.sessions.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="h-full">
                <li className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-white/[0.02] p-6">
                  <span className="text-[44px] leading-none font-black text-foreground/15">0{i + 1}</span>
                  <h3 className="mt-6 text-[18px] font-semibold">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-foreground/55">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="apply" className="relative py-28 lg:py-36">
        <div aria-hidden className="absolute top-1/4 right-0 h-[480px] w-[480px] rounded-full bg-primary/15 blur-[140px]" />
        <div className="container-site relative grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Intake" title="Elite access." dim="Zero compromise." />
            <Reveal className="mt-10 rounded-[var(--radius-panel)] border border-border-strong bg-surface/70 p-8">
              <p className="text-[12px] tracking-[0.16em] text-foreground/45 uppercase">What&apos;s included</p>
              <ul className="mt-5 flex flex-col gap-3">
                {c.included.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] text-foreground/75">
                    <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-success" /> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-[12px] tracking-[0.16em] text-foreground/45 uppercase">Investment</p>
                <p className="mt-1 text-[28px] font-bold">
                  To be confirmed <PlaceholderBadge className="ml-1 align-middle" label="Pricing pending" />
                </p>
                <p className="mt-2 text-[13px] text-foreground/50">No payment is taken on this site yet. Applying does not commit you to anything.</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="rounded-[var(--radius-panel)] border border-border bg-white/[0.02] p-6 sm:p-10">
            <h2 className="text-[24px] font-bold tracking-tight">Request a coaching seat</h2>
            <p className="mt-2 mb-8 text-[15px] text-foreground/55">Tell us where you are in your trading and what you want to fix.</p>
            <LeadForm
              kind="coaching"
              submitLabel="Submit request"
              messageLabel="Your trading background & goals"
              messagePlaceholder="How long have you been trading? What is holding you back?"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
