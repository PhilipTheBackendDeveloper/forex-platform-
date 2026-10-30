"use client";

import { motion } from "motion/react";
import { ButtonLink } from "@/components/ui/button";
import { PortraitScene } from "@/components/shared/portrait-scene";
import { clientCutouts } from "@/config/assets";
import { homeContent } from "@/content/home";
import { easeOutExpo } from "@/design/motion";
import { cn } from "@/lib/cn";

const { hero } = homeContent;
const portrait = clientCutouts.purplePortrait;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease: easeOutExpo, delay },
});

/**
 * Hero — structure measured from the reference: text column `lg:w-[52%]`, image panel
 * `lg:flex-1` (absolute behind the text below `lg`), ambient orbs + grain, stats row.
 */
export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-dvh w-full flex-col overflow-hidden lg:flex-row"
      style={{ background: "linear-gradient(160deg, #020c1e 0%, #030d20 40%, #020818 100%)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
        <div className="absolute top-[10%] left-[10%] h-100 w-100 animate-orb rounded-full bg-primary/15 mix-blend-screen blur-[120px] lg:h-150 lg:w-150" />
        <div className="absolute right-[20%] bottom-[-10%] h-75 w-75 animate-orb-reverse rounded-full bg-accent/10 mix-blend-screen blur-[100px] lg:h-125 lg:w-125" />
        <div className="bg-noise absolute inset-0 z-10 opacity-[0.025] mix-blend-overlay" />
      </div>

      <div
        className="relative z-20 flex grow flex-col justify-center pt-32 pb-16 lg:w-[52%] lg:shrink-0 lg:grow-0 lg:pt-44 lg:pb-10"
        style={{ paddingLeft: "max(24px, calc((100vw - var(--container-max)) / 2 + 24px))", paddingRight: "clamp(28px, 4vw, 72px)" }}
      >
        <motion.h1 id="hero-title" {...rise(0.1)} className="relative">
          <span aria-hidden className="absolute top-1/2 left-0 -z-10 h-3/4 w-full -translate-y-1/2 bg-primary/20 blur-[100px] lg:w-3/4" />
          <span className="sr-only">{hero.srTitle}</span>
          {hero.lines.map((line, i) => (
            <span
              key={line}
              aria-hidden
              className={cn(
                "block text-[clamp(64px,18vw,120px)] leading-[0.88] font-black tracking-tighter whitespace-nowrap",
                i === 1 && "animate-shine text-gradient-brand",
                i === 3 && "text-white/20 italic",
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
          transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.3 }}
          className="my-8 h-px w-full max-w-30 origin-left bg-linear-to-r from-white/20 to-transparent lg:my-10"
        />

        <motion.p {...rise(0.4)} className="max-w-lg text-[15px] leading-[1.6] tracking-[-0.01em] text-white/60 lg:text-[18px]">
          {hero.intro} <span className="block font-medium text-white/90 md:inline">{hero.introEmphasis}</span>
        </motion.p>

        <motion.div {...rise(0.5)} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center lg:mt-12">
          {/* Leads to the community section, which holds the (pending) community link. */}
          <ButtonLink href="#community" variant="primary" size="lg" arrow className="w-full sm:w-auto">
            {hero.primaryCta}
          </ButtonLink>
          <ButtonLink href="#beginner-course" variant="secondary" size="lg" className="w-full sm:w-auto">
            {hero.secondaryCta}
          </ButtonLink>
        </motion.div>

        <motion.dl {...rise(0.6)} className="relative mt-12 mb-4 flex flex-wrap items-center gap-x-5 gap-y-4 border-white/10 sm:gap-6 lg:mt-20 lg:mb-10 lg:gap-12 lg:border-t lg:pt-8">
          {hero.pillars.map((p) => (
            <div key={p.value} className="group relative flex cursor-default flex-col-reverse">
              <span aria-hidden className="absolute -inset-4 rounded-xl bg-white/5 opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
              <dt className="relative text-[10px] font-semibold tracking-wider text-white/40 uppercase lg:text-[12px]">{p.label}</dt>
              <dd className="relative mb-1 text-[18px] leading-none sm:text-[20px] font-black tracking-[-0.04em] text-foreground transition-colors group-hover:text-[var(--gradient-from)] lg:text-[24px]">
                {p.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: easeOutExpo, delay: 0.2 }}
        className="absolute inset-0 z-0 lg:relative lg:z-auto lg:min-h-150 lg:flex-1"
      >
        <PortraitScene
          src={portrait.src}
          alt={portrait.alt}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          position="50% 0%"
          inset="top-[14%] lg:top-[16%]"
          className="h-full w-full"
        />
        {/* Below lg the scene sits behind the text: darken for legibility (reference: brightness-50 + gradient). */}
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent lg:hidden" />
        <div aria-hidden className="absolute inset-0 bg-background/40 lg:hidden" />
      </motion.div>
    </section>
  );
}
