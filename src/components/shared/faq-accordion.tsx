"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { FaqItem } from "@/content/faq";
import { easeOutExpo } from "@/design/motion";
import { cn } from "@/lib/cn";

/** Accessible disclosure list: buttons with aria-expanded controlling labelled regions. */
export function FaqAccordion({ items, className }: { items: FaqItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className={cn("flex w-full flex-col gap-3", className)}>
      {items.map((item, i) => {
        const open = openIndex === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <li
            key={item.question}
            className={cn(
              "rounded-[var(--radius-card)] border transition-colors duration-300",
              open ? "border-border-strong bg-white/[0.04]" : "border-border bg-white/[0.015] hover:bg-white/[0.03]",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex min-h-16 w-full items-center justify-between gap-6 px-6 py-5 text-left"
              >
                <span>
                  <span className="block text-[11px] font-semibold tracking-[0.16em] text-[var(--ring)] uppercase">
                    {item.category}
                  </span>
                  <span className="mt-1.5 block text-[17px] font-medium tracking-tight">{item.question}</span>
                </span>
                <Plus
                  aria-hidden
                  className={cn("size-5 shrink-0 text-foreground/60 transition-transform duration-300", open && "rotate-45")}
                />
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
                  <p className="px-6 pb-6 text-[15px] leading-relaxed text-foreground/60">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
