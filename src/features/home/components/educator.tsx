"use client";

import Image from "next/image";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { RevealLines } from "@/components/motion/reveal-lines";
import { toLines } from "@/components/motion/lines";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { clientPhotos } from "@/config/assets";
import { homeContent } from "@/content/home";

const e = homeContent.educator;
const GUTTER = "max(24px, calc((100vw - 1200px) / 2 + 24px))";

/**
 * Educator — structure measured from the reference: diagonal top (`clip-path` 8vw, −8vw margin),
 * left 52% full-bleed photo slideshow (0.9s crossfade, 1.3s wipe reveal on entry, bottom fade,
 * 300px blend into the text column), right text column with line-mask heading and a principles row.
 * Uses the client's original photos. Auto-advances; pauses on hover/focus and via the pause control.
 */
export function EducatorSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { once: true, margin: "0px 0px -15% 0px" });
  const slide = e.slides[index] ?? e.slides[0];

  useEffect(() => {
    if (paused || userPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % e.slides.length), 5500);
    return () => window.clearInterval(id);
  }, [paused, userPaused]);

  return (
    <section
      id="educator"
      className="relative z-10 overflow-hidden bg-background"
      style={{ clipPath: "polygon(0 8vw, 100% 0, 100% 100%, 0 100%)", marginTop: "-8vw" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-y-0 z-20 hidden w-[300px] bg-linear-to-r from-transparent to-[#02091a] lg:block" style={{ right: "48%" }} />
      <div className="flex flex-col lg:flex-row" style={{ minHeight: "92vh" }}>
        <div
          ref={panelRef}
          className="relative min-h-[100vw] shrink-0 overflow-hidden sm:min-h-[70vw] lg:min-h-0 lg:w-[52%]"
          style={{ clipPath: inView ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)", transition: "clip-path 1.3s cubic-bezier(0.76, 0, 0.24, 1)" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {e.slides.map((s, i) => {
            const photo = clientPhotos[s.photo];
            return (
              <div key={s.title} className="absolute inset-0" style={{ opacity: i === index ? 1 : 0, transition: "opacity 0.9s ease", zIndex: i === index ? 1 : 0 }}>
                <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" style={{ objectPosition: photo.focus }} />
              </div>
            );
          })}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-linear-to-t from-background to-transparent" />
          <div className="absolute right-0 bottom-10 left-0 z-20 flex items-end justify-between" style={{ paddingLeft: GUTTER, paddingRight: 28 }}>
            <div aria-live="polite" key={slide.title} className="animate-[caption-in_0.4s_ease]">
              <p className="mb-[5px] text-[10px] font-medium tracking-[0.22em] text-white/35 uppercase">{slide.kicker}</p>
              <p className="text-[13px] font-semibold tracking-[0.06em] text-white/80 uppercase">{slide.title}</p>
              <p className="mt-1 text-[11px] tracking-[0.03em] text-white/30">{slide.meta}</p>
            </div>
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              className="sr-only rounded-full bg-black/60 px-3 py-1.5 text-[12px] focus:not-sr-only"
            >
              {userPaused ? "Play slideshow" : "Pause slideshow"}
            </button>
          </div>
        </div>

        <div
          className="relative z-10 flex flex-1 flex-col justify-center"
          style={{ paddingLeft: "clamp(36px, 5vw, 80px)", paddingRight: GUTTER, paddingTop: "clamp(60px, 8vh, 100px)", paddingBottom: "clamp(60px, 8vh, 100px)" }}
        >
          <Reveal delay={0.2} className="mb-10">
            <SectionEyebrow>{e.eyebrow}</SectionEyebrow>
          </Reveal>
          <RevealLines lines={toLines(e.title, e.dim)} fontSize="clamp(40px, 4.5vw, 64px)" delay={0.24} className="mb-9" />
          <Reveal delay={0.5}>
            <div aria-hidden className="mb-8 h-px max-w-[200px] bg-white/8" />
            <p className="mb-[52px] max-w-[360px] text-[16px] leading-[1.72] tracking-[-0.01em] text-white/70">{e.body}</p>
          </Reveal>
          <Reveal delay={0.62}>
            <dl className="flex items-start">
              {e.principles.map((p, i) => (
                <div key={p.value} className={i < e.principles.length - 1 ? "mr-7 flex flex-col-reverse border-r border-white/8 pr-7" : "flex flex-col-reverse"}>
                  <dt className="mt-1.5 text-[11px] tracking-[0.02em] text-white/45">{p.label}</dt>
                  <dd className="text-[20px] leading-none font-bold tracking-[-0.03em] text-foreground">{p.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
