import type { Metadata } from "next";
import { ArrowDown, Check, Lock } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { LandingShell } from "@/components/layout/landing-shell";
import { PageHeader, headerActionClasses } from "@/components/layout/page-header";
import { PlaceholderBadge } from "@/components/ui/badge";
import { Accent, Dim, Fade, SectionEyebrow } from "@/components/ui/section-heading";
import { StickyStack } from "@/components/shared/sticky-stack";
import { OrbitVisual, RadarVisual, SessionsVisual } from "@/components/shared/visuals";
import { coachingContent as c } from "@/content/coaching";
import { CoachingRoadmap } from "@/features/coaching/components/roadmap";

export const metadata: Metadata = {
  title: "1-on-1 Coaching",
  description: "Private, personalised forex coaching: chart audits, strategy refinement and trading psychology.",
  alternates: { canonical: "/coaching" },
};

const pillarVisuals = [<RadarVisual key="r" />, <SessionsVisual key="s" />, <OrbitVisual key="o" />];

export default function CoachingPage() {
  return (
    <LandingShell
      header={
        <PageHeader
          title="Private Coaching"
          links={[
            { label: "Philosophy", href: "#philosophy" },
            { label: "Roadmap", href: "#roadmap" },
          ]}
          action={
            <a href="#apply" className={headerActionClasses()}>
              Apply Now
            </a>
          }
        />
      }
    >
      <section className="relative z-10 flex min-h-[95vh] flex-col items-center justify-center px-4 pt-40 pb-20 text-center">
        <Reveal className="flex flex-col items-center">
          <h1 className="text-[clamp(52px,9vw,110px)] leading-[0.92] font-black tracking-[-0.05em]">
            <span className="block">{c.hero.title}</span>
            <Fade italic block>
              {c.hero.accent}
            </Fade>
          </h1>
          <p className="mt-8 max-w-2xl text-[17px] leading-[1.7] text-foreground/60 lg:text-[20px]">{c.hero.description}</p>
          <a
            href="#apply"
            className="group mt-10 inline-flex min-h-14 items-center gap-2 rounded-full bg-primary px-8 text-[17px] font-semibold text-white shadow-[0_0_50px_-8px_var(--primary)] transition-colors hover:bg-primary-hover"
          >
            {c.hero.cta}
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <p className="mt-5 text-[11px] font-semibold tracking-[0.22em] text-foreground/40 uppercase">{c.hero.note}</p>
          <a href="#philosophy" aria-label="Scroll to the philosophy section" className="mt-16 flex size-11 animate-bounce items-center justify-center text-foreground/40">
            <ArrowDown aria-hidden className="size-5" />
          </a>
        </Reveal>
      </section>

      <section id="philosophy" className="relative z-10 px-4 py-32">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <SectionEyebrow variant="plain">{c.philosophy.eyebrow}</SectionEyebrow>
          <h2 className="mt-6 text-[clamp(40px,6vw,80px)] leading-[0.98] font-black tracking-[-0.045em]">
            <span className="block">{c.philosophy.title}</span>
            <Fade italic>{c.philosophy.dimWord}</Fade> <Accent>{c.philosophy.accentWord}</Accent>
          </h2>
          <p className="mt-8 max-w-2xl text-[17px] leading-[1.7] text-foreground/60 lg:text-[19px]">{c.philosophy.body}</p>
        </Reveal>
        <StickyStack className="mt-20" cards={c.pillars.map((p, i) => ({ ...p, visual: pillarVisuals[i] }))} />
      </section>

      <section id="roadmap" className="relative z-20 bg-background-deep">
        <CoachingRoadmap />
      </section>

      <section className="relative z-10 flex flex-col items-center overflow-hidden px-4 py-32 md:py-44">
        <div aria-hidden className="absolute top-1/4 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-[160px]" />
        <Reveal className="relative flex flex-col items-center text-center">
          <SectionEyebrow variant="pill">{c.offer.badge}</SectionEyebrow>
          <h2 className="mt-7 text-[clamp(44px,7vw,92px)] leading-[0.95] font-black tracking-[-0.05em]">
            <span className="block">{c.offer.title}</span>
            <Fade>{c.offer.dimWord}</Fade> <Accent>{c.offer.accentWord}</Accent>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="relative mt-16 grid w-full max-w-5xl overflow-hidden rounded-[var(--radius-hero)] border border-border bg-white shadow-lift md:grid-cols-[1.2fr_1fr]">
          <div className="p-8 sm:p-12">
            <h3 className="text-[clamp(28px,3vw,40px)] font-extrabold tracking-[-0.03em]">{c.offer.name}</h3>
            <p className="mt-2 text-[16px] font-semibold text-primary">{c.offer.subtitle}</p>
            <ul className="mt-10 flex flex-col gap-6">
              {c.offer.included.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-surface">
                    <Check aria-hidden className="size-3.5 text-primary" />
                  </span>
                  <span>
                    <span className="block text-[16px] font-semibold">{item.title}</span>
                    <span className="mt-1 block text-[14px] text-foreground/50">{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center border-t border-border bg-surface-2 p-8 text-center sm:p-12 md:border-t-0 md:border-l">
            <p className="font-mono text-[11px] tracking-[0.25em] text-foreground/45 uppercase">{c.offer.priceLabel}</p>
            <p className="mt-3 text-[clamp(48px,6vw,80px)] leading-none font-black tracking-[-0.05em]">TBC</p>
            <PlaceholderBadge className="mt-3" label="Pricing pending" />
            <a
              href="#apply"
              className="group mt-8 inline-flex min-h-14 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-primary px-8 text-[17px] font-bold text-white shadow-lift transition-colors hover:bg-primary-hover"
            >
              Request Enrollment
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <p className="mt-5 flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-foreground/40 uppercase">
              <Lock aria-hidden className="size-3.5" /> No payment is taken on this site yet
            </p>
          </div>
        </Reveal>
      </section>

      <section id="apply" className="relative px-4 pb-32">
        <Reveal className="mx-auto max-w-2xl rounded-[var(--radius-panel)] border border-border bg-white p-6 shadow-card sm:p-10">
          <h2 className="text-[26px] font-bold tracking-tight">Request a coaching seat</h2>
          <p className="mt-2 mb-8 text-[15px] text-foreground/55">
            Tell us where you are in your trading and what you want to fix. <Dim>Applying commits you to nothing.</Dim>
          </p>
          <LeadForm kind="coaching" submitLabel="Submit request" messageLabel="Your trading background & goals" messagePlaceholder="How long have you been trading? What is holding you back?" />
        </Reveal>
      </section>
    </LandingShell>
  );
}
