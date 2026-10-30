"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { PlaceholderBadge } from "@/components/ui/badge";
import { Dim, SectionEyebrow } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { PortraitScene } from "@/components/shared/portrait-scene";
import { clientCutouts } from "@/config/assets";
import { homeContent } from "@/content/home";
import { cn } from "@/lib/cn";

const e = homeContent.educator;

/**
 * Educator section: diagonal top edge, auto-advancing photo slider (client photos only, captions
 * describe the photos — no invented events) and a principles row in place of statistics.
 */
export function EducatorSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = e.slides[index];
  const photo = clientCutouts[slide.cutout];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % e.slides.length), 6000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      id="educator"
      className="relative z-10 -mt-24 overflow-hidden bg-background pt-24 [clip-path:polygon(0_6rem,100%_0,100%_100%,0_100%)] lg:-mt-32 lg:pt-32 lg:[clip-path:polygon(0_9rem,100%_0,100%_100%,0_100%)]"
    >
      <div className="grid lg:min-h-[720px] lg:grid-cols-2">
        <div
          className="relative min-h-[460px] overflow-hidden lg:min-h-full"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <PortraitScene
                src={photo.src}
                alt={photo.alt}
                sizes="(min-width:1024px) 50vw, 100vw"
                fit="contain"
                position="50% 100%"
                inset="top-[10%]"
                glowAt="50% 42%"
                zoom={false}
                fades={{ right: true, bottom: true, top: true }}
                className="h-full w-full"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute right-6 bottom-8 left-6 flex items-end justify-between gap-4 lg:left-10">
            <div aria-live="polite">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-foreground/45 uppercase">{slide.kicker}</p>
              <p className="mt-1 text-[13px] font-semibold tracking-[0.12em] text-foreground uppercase">{slide.title}</p>
              <p className="mt-1 text-[12px] text-foreground/40">{slide.meta}</p>
            </div>
            <div className="flex items-center gap-1" role="group" aria-label="Choose photo">
              {e.slides.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  aria-label={`Slide ${i + 1}: ${s.title}`}
                  aria-pressed={i === index}
                  onClick={() => setIndex(i)}
                  className="flex size-8 items-center justify-center"
                >
                  <span className={cn("h-1.5 rounded-full transition-all duration-500", i === index ? "w-6 bg-foreground" : "w-1.5 bg-white/30")} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 py-20 lg:px-16 xl:px-24">
          <Reveal>
            <SectionEyebrow>{e.eyebrow}</SectionEyebrow>
            <h2 className="mt-6 text-[clamp(40px,4.6vw,64px)] leading-[0.98] font-extrabold tracking-[-0.045em]">
              {e.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <Dim block>{e.dim}</Dim>
            </h2>
            <span aria-hidden className="mt-10 block h-px w-32 bg-linear-to-r from-white/20 to-transparent" />
            <p className="mt-8 max-w-md text-[16px] leading-[1.7] text-foreground/60">
              {e.body} <PlaceholderBadge className="ml-1 align-middle" />
            </p>
            <dl className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-white/10">
              {e.principles.map((p) => (
                <div key={p.value} className="flex flex-col-reverse px-4 first:pl-0">
                  <dt className="mt-1 text-[12px] text-foreground/45">{p.label}</dt>
                  <dd className="text-[19px] font-bold tracking-tight">{p.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
