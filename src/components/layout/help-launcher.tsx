"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { MessageSquare, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site.config";

/**
 * Floating help control (the reference shows a chat bubble). The AI assistant is not
 * connected, so the panel says so plainly and routes people to the FAQ instead.
 */
export function HelpLauncher() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col items-end gap-3 lg:right-8 lg:bottom-8">
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="Help"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="w-[min(320px,calc(100vw-40px))] origin-bottom-right rounded-[var(--radius-card)] border border-border-strong bg-surface/95 p-5 shadow-2xl backdrop-blur-xl"
          >
            <p className="text-[15px] font-semibold">Need help?</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/60">
              {siteConfig.features.assistantConnected
                ? "Ask our assistant anything about courses and coaching."
                : "Live assistant isn't connected yet. Browse the most common questions instead."}
            </p>
            <Link
              href={routes.faq}
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-white hover:bg-primary-hover"
            >
              Read the FAQ
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close help" : "Open help"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_40px_-8px_var(--primary)] transition-transform duration-300 hover:scale-105 active:scale-95 lg:size-16"
      >
        {open ? <X className="size-6" aria-hidden /> : <MessageSquare className="size-6" aria-hidden />}
      </button>
    </div>
  );
}
