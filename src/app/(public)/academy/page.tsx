import type { Metadata } from "next";
import { Building2, Check, Globe2, LineChart, Target, UserRound } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge, PlaceholderBadge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { PageHero } from "@/components/shared/page-hero";
import { PhotoPanel } from "@/components/shared/photo-panel";
import { clientPhotos } from "@/config/assets";
import { academyContent as a } from "@/content/academy";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Academy",
  description: "A structured forex academy with physical and online tracks sharing one curriculum.",
  alternates: { canonical: "/academy" },
};

const valueIcons = [UserRound, LineChart, Target];

export default function AcademyPage() {
  return (
    <>
      <PageHero tall eyebrow="Physical • Online" title="Master the market." accent="On your terms." description={a.heroDescription}>
        <ButtonLink href="#curriculum" variant="primary" size="lg" arrow className="mt-2">
          View curriculum
        </ButtonLink>
      </PageHero>

      <section id="venues" className="relative z-10 py-28">
        <div className="container-site">
          <SectionHeading eyebrow="The venues" title="Two formats." dim="One standard." description={a.venuesIntro} />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {a.venues.map((v, i) => {
              const Icon = i === 0 ? Building2 : Globe2;
              return (
                <Reveal key={v.title} delay={i * 0.1}>
                  <div className="group relative h-full overflow-hidden rounded-[var(--radius-panel)] border border-border">
                    <PhotoPanel
                      photo={i === 0 ? clientPhotos.london : clientPhotos.yacht}
                      sizes="(min-width:768px) 600px, 100vw"
                      className="absolute inset-0 rounded-none border-0"
                      overlayClassName="bg-gradient-to-t from-background via-background/80 to-background/10"
                    />
                    <div className="relative flex min-h-[420px] flex-col justify-end p-8 lg:p-10">
                      <Icon aria-hidden className="size-8 text-foreground/80" />
                      <h3 className="mt-5 text-[34px] font-bold tracking-tight">{v.title}</h3>
                      <p className="mt-1 text-[17px] font-medium text-foreground/80">{v.lead}</p>
                      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-foreground/60">{v.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden border-y border-border bg-background-deep py-24">
        <Stagger className="container-site grid gap-10 md:grid-cols-3">
          {a.values.map((v, i) => {
            const Icon = valueIcons[i] ?? Target;
            return (
              <StaggerItem key={v.title}>
                <Icon aria-hidden className="size-7 text-[var(--ring)]" />
                <h3 className="mt-5 text-[22px] font-semibold">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground/55">{v.text}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <section id="curriculum" className="relative z-10 w-full py-28">
        <div className="container-site">
          <SectionHeading align="center" eyebrow="The curriculum" title="Choose your level." description="Structured tracks for distinct stages of your trading journey." />
          <div className="mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-2">
            {a.tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-[var(--radius-panel)] border p-8 lg:p-10",
                    t.featured
                      ? "border-primary/50 bg-gradient-to-b from-primary/15 to-surface shadow-[0_0_80px_-20px_var(--primary)]"
                      : "border-border bg-white/[0.02]",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[12px] tracking-[0.16em] text-foreground/50 uppercase">{t.stage}</p>
                    {t.featured && <Badge tone="primary">Recommended path</Badge>}
                  </div>
                  <h3 className="mt-4 text-[32px] font-bold tracking-tight">{t.name}</h3>
                  <p className="mt-1 text-foreground/55">{t.tagline}</p>
                  <p className="mt-6 text-[26px] font-bold">
                    Price TBC <PlaceholderBadge className="ml-1 align-middle" label="Pricing pending" />
                  </p>
                  <ul className="mt-8 flex flex-col gap-3">
                    {t.topics.map((topic) => (
                      <li key={topic} className="flex gap-3 text-[15px] text-foreground/75">
                        <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-success" /> {topic}
                      </li>
                    ))}
                  </ul>
                  <Button variant={t.featured ? "primary" : "secondary"} size="lg" className="mt-10 w-full" disabled aria-describedby="enroll-note">
                    Enroll now
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
          <p id="enroll-note" className="mx-auto mt-6 max-w-xl text-center text-[13px] text-foreground/50">
            Enrollment opens once pricing, schedules and secure payments are confirmed. No payment can be taken on this preview.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading align="center" eyebrow="Academy FAQ" title="Good questions." />
          <Reveal className="mt-12">
            <FaqAccordion items={a.faq} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
