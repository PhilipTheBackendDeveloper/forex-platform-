import Link from "next/link";
import { ArrowUpRight, Check, Lock, MessageCircle, Quote, Sparkles, Users, Video } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge, Eyebrow, PlaceholderBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { PhotoPanel } from "@/components/shared/photo-panel";
import { clientPhotos } from "@/config/assets";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site.config";
import { homeContent } from "@/content/home";
import { cn } from "@/lib/cn";

const c = homeContent;

export function HighlightsStrip() {
  const items = [...c.highlights, ...c.highlights];
  return (
    <div className="relative border-y border-border bg-background-deep py-6">
      <p className="sr-only">Topics covered: {c.highlights.join(", ")}.</p>
      <div aria-hidden className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12 motion-reduce:animate-none">
          {items.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-12 text-[15px] font-medium tracking-wide whitespace-nowrap text-foreground/45">
              {item}
              <span className="size-1 rounded-full bg-foreground/25" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative overflow-hidden pt-32 pb-32 lg:pb-44">
      <div className="container-site">
        <SectionHeading
          eyebrow={c.testimonials.eyebrow}
          title={c.testimonials.title}
          dim={c.testimonials.dim}
          description={c.testimonials.description}
        />
        <Stagger className="mt-16 grid gap-5 md:grid-cols-2">
          {Array.from({ length: c.testimonials.slots }, (_, i) => (
            <StaggerItem
              key={i}
              className="relative flex min-h-[260px] flex-col justify-between rounded-[var(--radius-card)] border border-dashed border-border-strong bg-white/[0.02] p-8 transition-colors duration-500 hover:bg-white/[0.04]"
            >
              <Quote aria-hidden className="size-8 text-primary/60" />
              <div className="mt-8 space-y-3" aria-hidden>
                <div className="h-3 w-11/12 rounded-full bg-white/[0.06]" />
                <div className="h-3 w-4/5 rounded-full bg-white/[0.06]" />
                <div className="h-3 w-2/3 rounded-full bg-white/[0.06]" />
              </div>
              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="size-10 rounded-full bg-white/[0.08]" />
                  <span className="text-sm text-foreground/50">Testimonial slot {i + 1}</span>
                </div>
                <PlaceholderBadge label="Awaiting approved story" />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function EducatorSection() {
  const e = c.educator;
  return (
    <section id="educator" className="relative z-10 overflow-hidden bg-background py-28 lg:py-40">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <PhotoPanel photo={clientPhotos.blackOutfitWindow} sizes="(min-width:1024px) 600px, 100vw" className="aspect-[4/5] lg:aspect-[5/6]">
          <div className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/50 px-4 py-2 text-[12px] font-medium backdrop-blur-md">
            {siteConfig.mentorName} <PlaceholderBadge className="ml-2" />
          </div>
        </PhotoPanel>
        <div>
          <SectionHeading eyebrow={e.eyebrow} title={e.title} dim={e.dim} />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-[17px] leading-[1.7] text-foreground/60">
              {e.body} <PlaceholderBadge />
            </p>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-3">
            {e.principles.map((p) => (
              <StaggerItem key={p.title} className="rounded-2xl border border-border bg-white/[0.02] p-5">
                <p className="text-[17px] font-semibold">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/55">{p.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mt-10">
            <ButtonLink href={routes.about} variant="secondary" arrow>
              Read the full story
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function CommunitySection() {
  const m = c.community;
  return (
    <section id="community" className="relative overflow-hidden bg-surface py-28 lg:py-36">
      <div aria-hidden className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[140px]" />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SectionHeading eyebrow={m.eyebrow} title={m.title} dim={m.dim} description={m.body} />
          <Reveal delay={0.15} className="mt-10">
            <ButtonLink href={siteConfig.social.telegram} external variant="primary" size="lg" arrow unavailableReason="Community link pending client confirmation">
              {m.cta}
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="relative rounded-[var(--radius-panel)] border border-border-strong bg-background/60 p-8 shadow-[0_0_80px_-20px_var(--primary)] backdrop-blur lg:p-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-[var(--ring)]">
              <MessageCircle aria-hidden className="size-6" />
            </span>
            <div>
              <p className="font-semibold">Community channel</p>
              <p className="text-sm text-foreground/50">Educational updates · Free</p>
            </div>
          </div>
          <ul className="mt-8 flex flex-col gap-4">
            {m.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] text-foreground/75">
                <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-success" />
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

const includedIcons = [Sparkles, Users, Video];

export function BeginnerSection() {
  const b = c.beginner;
  return (
    <section id="beginner-course" className="relative overflow-hidden bg-background-deep px-0 py-32">
      <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading eyebrow={b.eyebrow} title={b.title} dim={b.dim} description={b.body} />
          <Reveal delay={0.15} className="mt-10">
            <ButtonLink href={routes.register} variant="primary" size="lg" arrow>
              {b.cta}
            </ButtonLink>
          </Reveal>
        </div>
        <div>
          <h3 className="text-[12px] font-semibold tracking-[0.18em] text-foreground/45 uppercase">What&apos;s included</h3>
          <Stagger className="mt-6 flex flex-col gap-4">
            {b.included.map((item, i) => {
              const Icon = includedIcons[i] ?? Sparkles;
              return (
                <StaggerItem
                  key={item.title}
                  className="group flex gap-5 rounded-[var(--radius-card)] border border-border bg-white/[0.02] p-6 transition-[background-color,border-color] duration-500 hover:border-border-strong hover:bg-white/[0.04]"
                >
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.05] text-foreground/80 transition-colors group-hover:text-[var(--ring)]">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <div>
                    <h4 className="text-[18px] font-semibold tracking-tight">{item.title}</h4>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/55">{item.text}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/** Small decorative chart drawn per card; pure SVG, no data claims. */
function CardVisual({ variant }: { variant: number }) {
  const paths = [
    "M0 70 L30 55 L55 62 L85 30 L110 42 L140 18 L170 26 L200 8",
    "M0 40 L25 60 L50 35 L80 70 L110 30 L140 55 L170 20 L200 45",
    "M0 60 L40 60 L40 30 L90 30 L90 50 L140 50 L140 15 L200 15",
  ];
  return (
    <svg aria-hidden viewBox="0 0 200 80" className="h-24 w-full text-[var(--ring)]" fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`g${variant}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${paths[variant]} L200 80 L0 80 Z`} fill={`url(#g${variant})`} />
      <path d={paths[variant]} stroke="currentColor" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function MasterySection() {
  const m = c.mastery;
  return (
    <section className="relative overflow-clip py-32">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={m.eyebrow} title={m.title} dim={m.dim} description={m.body} />
          <Reveal delay={0.1} className="shrink-0">
            <ButtonLink href={routes.masteryCourses} variant="secondary" arrow>
              Explore courses
            </ButtonLink>
          </Reveal>
        </div>
        <Stagger className="mt-16 grid gap-5 md:grid-cols-3">
          {m.cards.map((card, i) => (
            <StaggerItem key={card.title}>
              <Link
                href={routes.masteryCourses}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-gradient-to-b from-white/[0.05] to-white/[0.01] transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-border-strong"
              >
                <div className="border-b border-border bg-surface-2/60 px-6 pt-8">
                  <CardVisual variant={i} />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <Badge tone="primary" className="self-start">
                    {card.tag}
                  </Badge>
                  <h3 className="mt-5 text-[22px] font-bold tracking-tight">{card.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground/55">{card.text}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-foreground/70 group-hover:text-foreground">
                    View catalogue
                    <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function AcademySection() {
  const a = c.academy;
  return (
    <section className="relative py-28 lg:py-36">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[var(--radius-hero)] border border-border">
          <PhotoPanel
            photo={clientPhotos.stainedGlass}
            sizes="(min-width:1280px) 1200px, 100vw"
            className="absolute inset-0 rounded-none border-0"
            overlayClassName="bg-gradient-to-r from-background via-background/85 to-background/20"
          />
          <div className="relative grid gap-10 p-8 py-16 sm:p-14 lg:grid-cols-2 lg:p-20">
            <div>
              <SectionHeading eyebrow={a.eyebrow} title={a.title} dim={a.dim} description={a.body} />
              <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-4">
                <ButtonLink href={routes.academy} variant="light" arrow>
                  Explore the academy
                </ButtonLink>
              </Reveal>
            </div>
            <Stagger className="grid content-end gap-4 sm:grid-cols-2">
              {["Physical", "Online"].map((v) => (
                <StaggerItem key={v} className="rounded-[var(--radius-card)] border border-white/10 bg-black/40 p-6 backdrop-blur-md">
                  <p className="text-[24px] font-bold">{v}.</p>
                  <p className="mt-2 text-sm text-foreground/60">
                    {v === "Physical" ? "In-person classes · venue TBC" : "Live & recorded · learn anywhere"}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CoachingSection() {
  const k = c.coaching;
  return (
    <section id="coaching" className="relative overflow-hidden py-24 lg:py-40">
      <div aria-hidden className="absolute top-1/3 left-[-10%] h-[480px] w-[480px] rounded-full bg-accent/10 blur-[140px]" />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div className="order-2 lg:order-1">
          <SectionHeading eyebrow={k.eyebrow} title={k.title} dim={k.dim} description={k.body} />
          <Stagger className="mt-10 flex flex-col gap-3">
            {k.bullets.map((b) => (
              <StaggerItem key={b} className="flex items-center gap-3 text-[16px] text-foreground/75">
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/15">
                  <Check aria-hidden className="size-3.5 text-[var(--ring)]" />
                </span>
                {b}
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.1} className="mt-10 flex flex-col gap-6 rounded-[var(--radius-card)] border border-border bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[12px] tracking-[0.16em] text-foreground/45 uppercase">Mentorship fee</p>
              <p className="mt-1 text-[22px] font-bold">
                To be confirmed <PlaceholderBadge className="ml-1 align-middle" label="Pricing pending" />
              </p>
            </div>
            <ButtonLink href={routes.coaching} variant="primary" arrow>
              Learn more
            </ButtonLink>
          </Reveal>
        </div>
        <div className="order-1 grid grid-cols-5 gap-4 lg:order-2">
          <PhotoPanel photo={clientPhotos.london} sizes="(min-width:1024px) 340px, 60vw" className="col-span-3 aspect-[3/4]" />
          <div className="col-span-2 flex flex-col gap-4 pt-16">
            <PhotoPanel photo={clientPhotos.redOutfit} sizes="(min-width:1024px) 220px, 40vw" className="aspect-square" />
            <PhotoPanel photo={clientPhotos.yacht} sizes="(min-width:1024px) 220px, 40vw" className="aspect-[4/5]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function CollaborateSection() {
  const k = c.collaborate;
  return (
    <section id="collaborate" className="relative w-full overflow-hidden py-24 sm:py-32">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[var(--radius-hero)] border border-border-strong bg-gradient-to-br from-surface via-background to-background p-8 sm:p-14 lg:p-20">
          <div aria-hidden className="absolute -right-20 -bottom-40 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="relative grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <SectionHeading eyebrow={k.eyebrow} title={k.title} dim={k.dim} description={k.body} />
            <div className="flex flex-col gap-4">
              {k.tracks.map((t) => (
                <div key={t.title} className="rounded-2xl border border-border bg-white/[0.03] p-5">
                  <p className="font-semibold">{t.title}</p>
                  <p className="mt-1 text-sm text-foreground/55">{t.text}</p>
                </div>
              ))}
              <ButtonLink href={routes.collaborations} variant="light" size="lg" arrow className="mt-2">
                Submit a proposal
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SocialsSection() {
  const channels = [
    { label: "Telegram", href: siteConfig.social.telegram },
    { label: "Instagram", href: siteConfig.social.instagram },
    { label: "YouTube", href: siteConfig.social.youtube },
    { label: "X", href: siteConfig.social.x },
    { label: "Facebook", href: siteConfig.social.facebook },
  ];
  return (
    <section id="socials" aria-labelledby="socials-title" className="relative border-t border-border py-24">
      <div className="container-site flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <Reveal>
          <Eyebrow>Social media</Eyebrow>
          <h2 id="socials-title" className="mt-5 text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.03em]">
            {c.socials.title}
          </h2>
          <p className="mt-3 max-w-md text-foreground/55">{c.socials.body}</p>
        </Reveal>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {channels.map((ch) => (
            <li key={ch.label}>
              {ch.href ? (
                <a
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 items-center justify-center rounded-2xl border border-border bg-white/[0.03] px-5 text-sm font-medium transition-colors hover:border-border-strong hover:bg-white/[0.07]"
                >
                  {ch.label}
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  title="Handle pending client confirmation"
                  className={cn(
                    "flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-dashed border-border px-5 text-sm text-foreground/40",
                  )}
                >
                  <Lock aria-hidden className="size-3.5" />
                  {ch.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
