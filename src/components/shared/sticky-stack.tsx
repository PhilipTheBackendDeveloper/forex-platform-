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

/**
 * Sticky stacked cards (reference: `sticky top-[10vh|14vh|18vh]`). Each card pins a little lower
 * than the previous one so they pile up as you scroll — pure CSS, no scroll listeners, works
 * with reduced motion.
 */
export function StickyStack({ cards, className }: { cards: StackCard[]; className?: string }) {
  return (
    <div className={cn("mx-auto max-w-[1024px]", className)}>
      {cards.map((card, i) => {
        const textRight = i % 2 === 1;
        return (
          <article
            key={card.tag}
            className="sticky mb-8 w-full last:mb-0 md:mb-12"
            style={{ top: `calc(${10 + i * 4}vh + 40px)` }}
          >
            <div
              className={cn(
                "grid min-h-[420px] items-center gap-10 overflow-hidden rounded-[var(--radius-panel)] border p-8 shadow-[0_-20px_60px_-20px_rgb(0_0_0/0.9)] sm:p-12 md:grid-cols-2 lg:p-14",
                card.featured
                  ? "border-primary/60 bg-linear-to-br from-primary to-[#0052a3] shadow-[0_0_80px_-20px_var(--primary)]"
                  : "border-white/[0.07] bg-card",
              )}
            >
              <div className={cn(textRight && "md:order-2 md:text-right")}>
                <p
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase",
                    card.featured ? "border-white/30 text-white" : "border-white/10 bg-white/[0.04] text-[var(--ring)]",
                  )}
                >
                  <span aria-hidden className="size-1.5 rounded-full bg-current" />
                  {card.tag}
                </p>
                <h3 className="mt-6 text-[clamp(32px,3.6vw,46px)] leading-[1.02] font-extrabold tracking-[-0.04em]">
                  {card.title.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </h3>
                <p className={cn("mt-5 max-w-md text-[16px] leading-[1.7]", card.featured ? "text-white/85" : "text-foreground/55", textRight && "md:ml-auto")}>
                  {card.text}
                </p>
                {card.action && <div className="mt-8">{card.action}</div>}
              </div>
              <div className={cn("flex justify-center", textRight && "md:order-1")}>{card.visual}</div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
