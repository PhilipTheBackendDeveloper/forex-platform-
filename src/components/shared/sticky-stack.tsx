"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type StackCard = {
  tag: string;
  title: readonly string[];
  text: string;
  visual: ReactNode;
  /** Highlight card (reference: last card is solid blue). */
  featured?: boolean;
  action?: ReactNode;
};

const TOPS = ["10vh", "14vh", "18vh", "22vh"];

/**
 * Sticky stacked cards — spec measured from the reference: `sticky top-[10vh|14vh|18vh]`,
 * max-w-5xl, 450px tall, rounded 2.5rem/3rem, card 1 #050505, card 2 #0a0a0c/90 with blue border
 * and blur, featured card blue gradient; each card rises 150px into place as it scrolls in.
 */
export function StickyStack({ cards, className }: { cards: StackCard[]; className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-5xl pb-20", className)}>
      {cards.map((card, i) => {
        const reversed = i % 2 === 1;
        const surface = card.featured
          ? "bg-linear-to-br from-[#0071e3] to-[#0052a3] shadow-[0_-20px_80px_rgba(0,113,227,0.2)]"
          : i === 0
            ? "border border-white/5 bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            : "border border-primary/10 bg-[#0a0a0c]/90 shadow-[0_-15px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl";
        const glow = card.featured
          ? "bg-[radial-gradient(circle_at_center,rgb(255_255_255/0.10),transparent_60%)] opacity-100"
          : i === 0
            ? "bg-[radial-gradient(ellipse_at_top_right,rgb(0_113_227/0.10),transparent_60%)] opacity-50 group-hover:opacity-100"
            : "bg-[radial-gradient(ellipse_at_bottom_left,rgb(255_255_255/0.05),transparent_60%)] opacity-50 group-hover:opacity-100";
        return (
          <div key={card.tag} className={cn("sticky w-full pt-0", i < cards.length - 1 && "mb-8 md:mb-12")} style={{ top: TOPS[i] }}>
            <motion.article
              initial={{ y: 150 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "group relative flex h-auto w-full flex-col items-center justify-between gap-10 overflow-hidden rounded-[2.5rem] p-8 sm:p-12 md:h-112.5 md:rounded-[3rem] md:p-14",
                reversed ? "md:flex-row-reverse" : "md:flex-row",
                surface,
              )}
            >
              <div aria-hidden className={cn("pointer-events-none absolute inset-0 transition-opacity duration-1000", glow)} />
              <div className={cn("relative z-10 w-full", card.featured ? "md:w-[55%]" : "md:w-1/2", reversed && "flex flex-col items-start text-left md:items-end md:text-right")}>
                <span
                  className={cn(
                    "mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase",
                    card.featured ? "border-white/20 bg-black/10 text-white" : "border-white/10 bg-white/5",
                    !card.featured && (i === 0 ? "text-[#3399FF] drop-shadow-[0_0_5px_rgba(51,153,255,0.5)]" : "text-white"),
                  )}
                >
                  <span className={cn("size-1.5 rounded-full", card.featured ? "animate-pulse bg-white" : i === 0 ? "animate-pulse bg-[#3399FF]" : "bg-white/70")} />
                  {card.tag}
                </span>
                <h3 className="mb-6 text-3xl leading-[1.05] font-black tracking-tighter text-white md:text-4xl lg:text-5xl">
                  {card.title.map((l, j) => (
                    <span key={l} className="block">
                      {l}
                      {j < card.title.length - 1 && <span className="sr-only"> </span>}
                    </span>
                  ))}
                </h3>
                <p className={cn("text-[17px] leading-relaxed", card.featured ? "mb-8 font-medium text-white/90" : "text-muted")}>{card.text}</p>
                {card.action}
              </div>
              <div className="pointer-events-none relative flex h-48 w-full items-center justify-center md:h-full md:w-[40%]">{card.visual}</div>
            </motion.article>
          </div>
        );
      })}
    </div>
  );
}
