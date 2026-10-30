"use client";

import { Send } from "lucide-react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { RevealLines } from "@/components/motion/reveal-lines";
import { toLines } from "@/components/motion/lines";
import { ButtonLink } from "@/components/ui/button";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site.config";
import { homeContent } from "@/content/home";
import { PhoneSimulator } from "./phone-simulator";

const c = homeContent.community;
const GUTTER = "max(24px, calc((100vw - 1200px) / 2 + 24px))";

/**
 * Community — structure measured from the reference: text column (flex-1) + 52% visual panel with
 * a 1.3s wipe reveal, 300px blend gradient at 48%, bottom fade. The reference shows a photo of a
 * phone; we render a live phone simulator in a dark, lit scene instead.
 */
export function CommunitySection() {
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <section id="community" className="relative overflow-hidden bg-surface">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 z-20 hidden w-[300px] bg-linear-to-r from-surface to-transparent lg:block" style={{ left: "48%" }} />
      <div className="flex flex-col lg:flex-row" style={{ minHeight: "92vh" }}>
        <div
          className="relative z-10 flex flex-1 flex-col justify-center"
          style={{ paddingLeft: GUTTER, paddingRight: "clamp(36px, 5vw, 80px)", paddingTop: "clamp(60px, 8vh, 100px)", paddingBottom: "clamp(60px, 8vh, 100px)" }}
        >
          <Reveal delay={0.2} className="mb-10">
            <SectionEyebrow tone="community">{c.eyebrow}</SectionEyebrow>
          </Reveal>
          <RevealLines lines={toLines(c.title, c.dim, "accent")} fontSize="clamp(36px, 4.5vw, 60px)" delay={0.24} className="mb-9" />
          <Reveal delay={0.5}>
            <div aria-hidden className="mb-8 h-px max-w-[200px] bg-border" />
            <div className="mb-6">
              <p className="mb-4 flex items-center gap-3 text-[18px] font-semibold text-foreground">
                <span className="flex size-7 items-center justify-center rounded-full bg-accent text-white shadow-xs">
                  <Send aria-hidden className="size-3.5 text-white" />
                </span>
                {c.subtitle}
              </p>
              <p className="mb-5 text-[15px] leading-[1.6] text-muted">{c.body}</p>
            </div>
            <ul className="mb-[52px] grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
              {c.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 py-2 text-[14px] text-foreground/80">
                  <span aria-hidden className="text-[18px] text-accent font-bold">
                    •
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.6}>
            <ButtonLink
              href={siteConfig.social.telegram}
              external
              size="lg"
              className="bg-accent font-semibold text-white shadow-md hover:bg-accent-strong hover:scale-105"
              unavailableReason="Community link pending client confirmation"
            >
              {c.cta}
              <Send aria-hidden className="size-4" />
            </ButtonLink>
          </Reveal>
        </div>

        <div
          ref={panelRef}
          className="relative flex min-h-[640px] shrink-0 items-center justify-center overflow-hidden py-20 lg:min-h-0 lg:w-[52%]"
          style={{ clipPath: inView ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)", transition: "clip-path 1.3s cubic-bezier(0.76, 0, 0.24, 1)" }}
        >
          {/* Ambient scene: soft purple and mint glow */}
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_55%_at_55%_45%,rgb(16_185_129/0.10),transparent_70%)]" />
          <div aria-hidden className="absolute top-[12%] right-[14%] size-40 rounded-full bg-accent-soft blur-3xl" />
          <div aria-hidden className="absolute bottom-[18%] left-[20%] size-56 rounded-full bg-primary-soft blur-3xl" />
          <PhoneSimulator />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-linear-to-t from-surface to-transparent" />
        </div>
      </div>
    </section>
  );
}
