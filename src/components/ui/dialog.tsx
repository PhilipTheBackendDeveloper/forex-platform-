"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { easeOutExpo } from "@/design/motion";
import { cn } from "@/lib/cn";

/**
 * Accessible modal / side drawer (reference: My Tickets / My Orders modals, bag drawer, event
 * detail). Improvements over the reference: closes on Escape and backdrop click, traps focus,
 * locks page scroll and returns focus to the trigger.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  variant = "modal",
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  variant?: "modal" | "drawer";
  size?: "md" | "lg";
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();
  // Keep the latest onClose without re-running the open/close effect (callers pass inline arrows).
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input, textarea, select");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("button")?.focus(), 30);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className={cn("fixed inset-0 z-[80] flex", variant === "drawer" ? "justify-end" : "items-center justify-center p-4")}>
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descId : undefined}
            initial={variant === "drawer" ? { x: "100%" } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={variant === "drawer" ? { x: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={variant === "drawer" ? { x: "100%" } : { opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.45, ease: easeOutExpo }}
            className={cn(
              "relative flex flex-col overflow-hidden border border-white/10 bg-[#070d1a] shadow-[0_40px_120px_-30px_rgb(0_0_0/0.95)]",
              variant === "drawer" ? "h-full w-[min(420px,100vw)] border-y-0 border-r-0" : "max-h-[90dvh] w-full rounded-[1.8rem]",
              variant === "modal" && (size === "lg" ? "max-w-5xl" : "max-w-lg"),
            )}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.07] px-6 py-5">
              <div>
                <h2 id={titleId} className="text-[20px] font-semibold tracking-tight">
                  {title}
                </h2>
                {description && (
                  <p id={descId} className="mt-1 text-[13px] text-foreground/50">
                    {description}
                  </p>
                )}
              </div>
              <button type="button" aria-label="Close" onClick={onClose} className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/10">
                <X aria-hidden className="size-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
            {footer && <div className="border-t border-white/[0.07] px-6 py-4">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/** Centred empty state used inside dialogs. */
export function DialogEmpty({ icon, title, children, action }: { icon: ReactNode; title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <span className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-foreground/60">{icon}</span>
      <p className="mt-5 text-[17px] font-semibold">{title}</p>
      <div className="mt-2 max-w-xs text-[13px] leading-relaxed text-foreground/50">{children}</div>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
