import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, BarChart3, Check, PlayCircle, Users } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { LandingShell } from "@/components/layout/landing-shell";
import { PageHeader, headerActionClasses } from "@/components/layout/page-header";
import { PlaceholderBadge } from "@/components/ui/badge";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { ClassroomVisual, LaptopVisual } from "@/components/shared/visuals";
import { clientPhotos } from "@/config/assets";
import { academyContent as a } from "@/content/academy";
import { AcademyStory } from "@/features/academy/components/academy-story";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Academy",
  description: "A structured forex academy with physical and online tracks sharing one curriculum.",
  alternates: { canonical: "/academy" },
};

const valueIcons = [Users, BarChart3, PlayCircle];
const photo = clientPhotos.blackOutfitWindow;

export default function AcademyPage() {
  return (
    <LandingShell
      header={
        <PageHeader
          title="Academy"
          links={[
            { label: "Venues", href: "#venues" },
            { label: "Curriculum", href: "#curriculum" },
          ]}
          action={
            <a href="#curriculum" className={headerActionClasses("light")}>
              Enroll Now
            </a>
          }
        />
      }
    >
      <section className="relative z-10 flex flex-col items-center px-4 pt-40 pb-10 text-center">
        <Reveal className="flex flex-col items-center">
          <h1 className="text-[clamp(48px,8.5vw,110px)] leading-[0.92] font-black tracking-[-0.05em]">
            <span className="block">{a.hero.title}</span>
            <Accent block>{a.hero.accent}</Accent>
          </h1>
          <p className="mt-8 max-w-2xl text-[17px] leading-[1.7] text-foreground/60 lg:text-[20px]">{a.hero.description}</p>
          <a
            href="#curriculum"
            className="group mt-10 inline-flex min-h-14 items-center gap-2 rounded-full bg-primary px-8 text-[17px] font-semibold text-white shadow-[0_0_50px_-8px_var(--primary)] hover:bg-primary-hover"
          >
            {a.hero.cta}
            <ArrowDown aria-hidden className="size-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <p className="mt-5 text-[11px] font-semibold tracking-[0.22em] text-foreground/40 uppercase">{a.hero.note}</p>
        </Reveal>
        <Reveal delay={0.2} className="relative mt-16 aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-[var(--radius-hero)] border border-border shadow-lift">
          <Image src={photo.src} alt={photo.alt} fill priority placeholder="blur" sizes="(min-width:1024px) 1024px, 100vw" className="object-cover" style={{ objectPosition: photo.focus }} />
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent" />
        </Reveal>
      </section>

      <AcademyStory />

      <section id="venues" className="relative z-10 px-4 py-32">
        <SectionHeading align="center" eyebrow={a.venues.eyebrow} eyebrowVariant="plain" title={a.venues.title} dim={a.venues.dim} description={a.venues.intro} className="mx-auto max-w-3xl" />
        <div className="mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-2">
          {a.venues.items.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <div className="h-full rounded-[var(--radius-panel)] border border-border bg-surface p-8 shadow-card lg:p-10">
                <h3 className="text-[clamp(32px,3vw,42px)] font-black tracking-[-0.04em]">{v.title}</h3>
                <p className="mt-4 text-[16px] leading-[1.7] text-foreground/60">{v.text}</p>
                <div className="mt-10 flex items-center justify-center rounded-[1.6rem] border border-border bg-surface-2 py-10">
                  {i === 0 ? <ClassroomVisual /> : <LaptopVisual />}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative w-full overflow-hidden border-y border-border bg-surface py-28">
        <Stagger className="container-site grid gap-12 text-center md:grid-cols-3">
          {a.values.map((v, i) => {
            const Icon = valueIcons[i] ?? Users;
            return (
              <StaggerItem key={v.title} className="flex flex-col items-center">
                <span className="flex size-14 items-center justify-center rounded-full border border-border bg-white shadow-card">
                  <Icon aria-hidden className="size-5 text-primary" />
                </span>
                <h3 className="mt-6 text-[19px] font-semibold">{v.title}</h3>
                <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-foreground/55">{v.text}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <section id="curriculum" className="relative z-10 w-full px-4 py-32">
        <SectionHeading align="center" eyebrow={a.curriculum.eyebrow} eyebrowVariant="plain" title={a.curriculum.title} description={a.curriculum.intro} />
        <div className="mx-auto mt-16 grid max-w-4xl items-center gap-6 md:grid-cols-2">
          {a.tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-[var(--radius-panel)] border p-8 lg:p-10",
                  t.featured ? "border-primary/60 bg-linear-to-b from-primary to-primary-hover py-10 text-white shadow-[0_20px_60px_-15px_rgba(124,58,237,0.35)] md:-my-4" : "border-border bg-white shadow-card",
                )}
              >
                <p className={cn("w-fit rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.15em] uppercase", t.featured ? "bg-white/20 text-white" : "border border-border bg-surface text-foreground/60")}>
                  {t.stage}
                </p>
                <h3 className="mt-5 text-[28px] font-bold tracking-tight">{t.name}</h3>
                <p className={cn("mt-1 text-[14px]", t.featured ? "text-white/80" : "text-foreground/50")}>{t.tagline}</p>
                <p className="mt-6 text-[40px] leading-none font-black tracking-[-0.04em]">TBC</p>
                <PlaceholderBadge className="mt-2 w-fit" label="Pricing pending" />
                <ul className="mt-8 flex flex-col gap-3">
                  {t.topics.map((topic) => (
                    <li key={topic} className={cn("flex gap-3 text-[14px] font-medium", t.featured ? "text-white" : "text-foreground/80")}>
                      <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", t.featured ? "text-accent" : "text-primary")} /> {topic}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  disabled
                  aria-describedby="enroll-note"
                  className={cn(
                    "mt-10 min-h-13 w-full rounded-full text-[15px] font-semibold disabled:cursor-not-allowed",
                    t.featured ? "bg-white text-primary hover:bg-white/95 disabled:opacity-80" : "border border-border bg-surface text-foreground hover:bg-surface-2 disabled:opacity-60",
                  )}
                >
                  Enroll Now
                </button>
              </div>
            </Reveal>
          ))}
        </div>
        <p id="enroll-note" className="mx-auto mt-10 max-w-xl text-center text-[13px] text-foreground/50">
          Enrollment opens once pricing, schedules and secure payments are confirmed. No payment can be taken on this preview.
        </p>
      </section>
    </LandingShell>
  );
}
