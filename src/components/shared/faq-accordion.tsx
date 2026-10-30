"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { FaqItem } from "@/content/faq";
import { easeOutExpo } from "@/design/motion";
import { cn } from "@/lib/cn";

/**
 * Accessible single-open disclosure list. `layout="grid"` renders the reference's two-column card
 * grid; `layout="list"` stacks full-width rows.
 */
export function FaqAccordion({ items, layout = "list", className }: { items: FaqItem[]; layout?: "list" | "grid"; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(layout === "list" ? 0 : null);
  const baseId = useId();

  return (
    <ul className={cn("grid w-full gap-4", layout === "grid" && "items-start md:grid-cols-2 md:gap-5", className)}>
      {items.map((item, i) => {
        const open = openIndex === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <li
            key={item.question}
            className={cn(
              "rounded-[1.6rem] border backdrop-blur transition-colors duration-300",
              open ? "border-white/15 bg-white/[0.05]" : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.035]",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex min-h-16 w-full items-start justify-between gap-6 px-6 py-6 text-left sm:px-7"
              >
                <span>
                  <span className="block text-[10px] font-semibold tracking-[0.2em] text-[var(--ring)] uppercase">{item.category}</span>
                  <span className="mt-2.5 block text-[18px] leading-snug font-medium tracking-tight">{item.question}</span>
                </span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15">
                  <Plus aria-hidden className={cn("size-4 text-foreground/70 transition-transform duration-300", open && "rotate-45")} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: easeOutExpo }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-[15px] leading-relaxed text-foreground/60 sm:px-7">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
