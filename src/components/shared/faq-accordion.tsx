"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { FaqItem } from "@/content/faq";
import { cn } from "@/lib/cn";

/**
 * Single-open disclosure list. `layout="grid"` = reference homepage FAQ (2-col rounded-4xl cards,
 * gradient top bar on hover, grid-rows height animation); `layout="list"` = compact rows.
 */
export function FaqAccordion({ items, layout = "list", className }: { items: FaqItem[]; layout?: "list" | "grid"; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(layout === "list" ? 0 : null);
  const baseId = useId();
  const grid = layout === "grid";

  return (
    <ul className={cn("grid w-full", grid ? "grid-cols-1 items-start gap-6 md:grid-cols-2 lg:gap-8" : "gap-4", className)} aria-label="Frequently asked questions">
      {items.map((item, i) => {
        const open = openIndex === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <li
            key={item.question}
            className={cn(
              "group relative flex flex-col overflow-hidden border transition-all duration-300",
              grid ? "rounded-4xl" : "rounded-[1.6rem]",
              open ? "border-primary/30 bg-card shadow-lift" : "border-border bg-card shadow-card hover:border-primary/20 hover:shadow-lift",
            )}
          >
            <span aria-hidden className={cn("absolute top-0 left-0 h-0.5 w-full bg-linear-to-r from-primary to-accent transition-opacity duration-500", open ? "opacity-100" : "opacity-0 group-hover:opacity-100")} />
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className={cn("relative z-10 flex w-full items-start justify-between gap-6 text-left", grid ? "p-8" : "px-6 py-6 sm:px-7")}
              >
                <span className="flex flex-col gap-4">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">{item.category}</span>
                  <span className={cn("leading-snug font-semibold text-foreground transition-colors group-hover:text-primary", grid ? "text-xl sm:text-2xl" : "text-[18px]")}>{item.question}</span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    open ? "rotate-45 border-primary bg-primary text-white" : "border-border text-muted group-hover:border-primary/40 group-hover:text-primary",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn("grid w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
            >
              <div className="overflow-hidden" inert={!open}>
                <p className={cn("text-base leading-relaxed font-normal text-muted md:text-lg", grid ? "px-8 pb-8" : "px-6 pb-6 sm:px-7")}>{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
