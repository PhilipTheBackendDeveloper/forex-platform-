"use client";

import { useInView } from "motion/react";
import { useRef, type CSSProperties, type ElementType } from "react";
import { cn } from "@/lib/cn";

import type { LineTone, RevealLine } from "./lines";

const tones: Record<LineTone, CSSProperties> = {
  base: { color: "var(--foreground)" },
  /** Reference: rgba(255,255,255,0.15) italic last line. */
  dim: { color: "rgb(255 255 255 / 0.15)", fontStyle: "italic" },
  /** Reference coaching / collaborate: rgba(255,255,255,0.5) italic. */
  half: { color: "rgb(255 255 255 / 0.5)", fontStyle: "italic" },
  accent: { color: "var(--primary)", fontStyle: "italic" },
};

/**
 * Display heading whose lines slide up out of a clipping mask when scrolled into view
 * (reference: `overflow:hidden` rows, `translateY` 0.9s cubic-bezier(0.16,1,0.3,1), staggered).
 * Screen readers get one plain sentence; the animated lines are aria-hidden.
 */
export function RevealLines({
  lines,
  as: Tag = "h2",
  id,
  fontSize = "clamp(40px, 6vw, 72px)",
  delay = 0.1,
  step = 0.09,
  className,
  style,
}: {
  lines: readonly RevealLine[];
  as?: ElementType;
  id?: string;
  fontSize?: string;
  delay?: number;
  step?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  return (
    <div ref={ref} className={className}>
      <Tag id={id} className="sr-only">
        {lines.map((l) => l.text).join(" ")}
      </Tag>
      <div aria-hidden style={{ fontSize, fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.045em", ...style }}>
        {lines.map((line, i) => (
          <div key={`${line.text}-${i}`} className="overflow-hidden pb-[0.12em]">
            <span
              className={cn("block transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none", inView ? "translate-y-0" : "translate-y-[110%]")}
              style={{ ...tones[line.tone ?? "base"], transitionDelay: `${delay + i * step}s` }}
            >
              {line.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
