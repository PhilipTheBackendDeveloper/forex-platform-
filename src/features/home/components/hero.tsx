"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ButtonLink } from "@/components/ui/button";
import { clientPhotos } from "@/config/assets";
import { siteConfig } from "@/config/site.config";
import { homeContent } from "@/content/home";
import { easeOutExpo } from "@/design/motion";
import { cn } from "@/lib/cn";

const { hero } = homeContent;
const portrait = clientPhotos.purplePortrait;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: easeOutExpo, delay },
});

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-background lg:flex-row">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
        <div className="absolute top-[10%] left-[10%] h-100 w-100 animate-orb rounded-full bg-primary/15 mix-blend-screen blur-[120px] lg:h-150 lg:w-150" />
        <div className="absolute right-[20%] bottom-[-10%] h-75 w-75 animate-orb-reverse rounded-full bg-accent/10 mix-blend-screen blur-[100px] lg:h-125 lg:w-125" />
        <div className="bg-noise absolute inset-0 z-10 opacity-[0.025] mix-blend-overlay" />
      </div>

      {/*
        Portrait: CSS masks only — the photograph itself is never edited.
        Mobile: full-bleed background behind the text (reference behaviour) with a dark scrim
        for legibility. Desktop: right-hand 56% panel faded into the page.
      */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: easeOutExpo }}
        className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[56%]"
      >
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_95%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_38%),linear-gradient(to_top,transparent_0%,black_28%),linear-gradient(to_bottom,transparent_0%,black_20%)] lg:[mask-composite:intersect]">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover"
            style={{ objectPosition: portrait.focus }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_62%_45%,transparent_55%,color-mix(in_oklab,var(--background)_60%,transparent)_100%)]" />
        </div>
        {/* Mobile-only scrim keeps white text readable over the bright studio backdrop. */}
        <div className="absolute inset-0 bg-linear-to-b from-background/70 via-background/60 to-background lg:hidden" />
      </motion.div>

      <div
        className="relative z-20 flex w-full shrink-0 grow flex-col justify-center pt-32 pb-16 lg:w-[52%] lg:grow-0 lg:pt-36 lg:pb-16"
        style={{ paddingLeft: "max(24px, calc((100vw - var(--container-max)) / 2 + 24px))", paddingRight: "clamp(24px, 4vw, 72px)" }}
      >
        <motion.h1 id="hero-title" {...fadeUp(0.1)} className="relative">
          <span aria-hidden className="absolute top-1/2 left-0 -z-10 h-3/4 w-full -translate-y-1/2 bg-primary/20 blur-[100px] lg:w-3/4" />
          <span className="sr-only">{hero.srTitle}</span>
          {hero.lines.map((line, i) => (
            <span
              key={line}
              aria-hidden
              className={cn(
                "block text-[clamp(56px,18vw,120px)] leading-[0.88] font-black tracking-tighter whitespace-nowrap",
                i === 1 && "animate-shine text-gradient-brand",
                i === 3 && "text-foreground/20 italic",
                (i === 0 || i === 2) && "text-foreground drop-shadow-sm",
              )}
            >
              {line}
            </span>
          ))}
        </motion.h1>

        <motion.div
          aria-hidden
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease: easeOutExpo, delay: 0.3 }}
          className="my-8 h-px w-full max-w-30 origin-left bg-linear-to-r from-white/20 to-transparent lg:my-10"
        />

        <motion.p {...fadeUp(0.4)} className="max-w-lg text-[15px] leading-[1.6] tracking-[-0.01em] text-foreground/65 lg:text-[18px]">
          {hero.intro} <span className="block font-medium text-foreground/90 md:inline">{hero.introEmphasis}</span>
        </motion.p>

        <motion.div {...fadeUp(0.55)} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-start lg:mt-12">
          <ButtonLink href={siteConfig.social.telegram} external variant="primary" size="lg" arrow className="w-full sm:w-auto" unavailableReason="Community link pending client confirmation">
            {hero.primaryCta}
          </ButtonLink>
          <ButtonLink href="#beginner-course" variant="secondary" size="lg" className="w-full sm:w-auto">
            {hero.secondaryCta}
          </ButtonLink>
        </motion.div>

        <motion.dl {...fadeUp(0.7)} className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/10 pt-8 lg:mt-14">
          {hero.pillars.map((p) => (
            <div key={p.value} className="flex flex-col-reverse">
              <dt className="text-[11px] tracking-[0.16em] text-foreground/45 uppercase">{p.label}</dt>
              <dd className="text-[19px] font-bold tracking-tight lg:text-[22px]">{p.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
