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
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-background lg:flex-row"
    >
      {/* Ambient light: two drifting orbs + film grain (measured from reference). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
        <div className="absolute top-[10%] left-[10%] h-100 w-100 animate-orb rounded-full bg-primary/15 mix-blend-screen blur-[120px] lg:h-150 lg:w-150" />
        <div className="absolute right-[20%] bottom-[-10%] h-75 w-75 animate-orb-reverse rounded-full bg-accent/10 mix-blend-screen blur-[100px] lg:h-125 lg:w-125" />
        <div className="bg-noise absolute inset-0 z-10 opacity-[0.025] mix-blend-overlay" />
      </div>

      {/* Portrait: masked, not cut out — the photo itself is untouched. */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: easeOutExpo }}
        className="relative order-2 h-[78vw] max-h-[560px] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:order-none lg:h-auto lg:max-h-none lg:w-[56%]"
      >
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_22%,black_70%,transparent_100%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_38%),linear-gradient(to_top,transparent_0%,black_28%),linear-gradient(to_bottom,transparent_0%,black_20%)] lg:[mask-composite:intersect]">
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
          {/* Soft blue edge light to sit the bright studio backdrop into the dark page. */}
          <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_62%_45%,transparent_55%,color-mix(in_oklab,var(--background)_60%,transparent)_100%)]" />
        </div>
      </motion.div>

      <div
        className="relative z-20 order-1 flex w-full shrink-0 flex-col justify-center pt-32 pb-6 lg:w-[52%] lg:pt-36 lg:pb-16"
        style={{
          paddingLeft: "max(24px, calc((100vw - var(--container-max)) / 2 + 24px))",
          paddingRight: "clamp(24px, 4vw, 72px)",
        }}
      >
        <motion.h1 id="hero-title" {...fadeUp(0.1)} className="relative">
          <span
            aria-hidden
            className="absolute top-1/2 left-0 -z-10 h-3/4 w-full -translate-y-1/2 bg-primary/20 blur-[100px] lg:w-3/4"
          />
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

        <motion.p
          {...fadeUp(0.4)}
          className="max-w-lg text-[15px] leading-[1.6] tracking-[-0.01em] text-foreground/60 lg:text-[18px]"
        >
          {hero.intro} <span className="block font-medium text-foreground/90 md:inline">{hero.introEmphasis}</span>
        </motion.p>

        <motion.div {...fadeUp(0.55)} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-start lg:mt-12">
          <ButtonLink
            href={siteConfig.social.telegram}
            external
            variant="primary"
            size="lg"
            arrow
            unavailableReason="Community link pending client confirmation"
          >
            {hero.primaryCta}
          </ButtonLink>
          <ButtonLink href="#beginner-course" variant="secondary" size="lg">
            {hero.secondaryCta}
          </ButtonLink>
        </motion.div>

        <motion.dl
          {...fadeUp(0.7)}
          className="mt-14 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-8 sm:grid-cols-4"
        >
          {hero.pillars.map((p) => (
            <div key={p.title}>
              <dt className="text-[20px] font-bold tracking-tight lg:text-[24px]">{p.title}</dt>
              <dd className="text-[12px] tracking-[0.14em] text-foreground/45 uppercase">{p.text}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
