"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { dashboardEntryHref, footerNav, isActivePath, primaryNav } from "@/config/navigation";
import { buttonClasses } from "@/components/ui/button";
import { easeOutExpo } from "@/design/motion";
import { cn } from "@/lib/cn";

const secondaryLinks = footerNav.find((g) => g.title === "Ecosystem")?.links ?? [];

/**
 * Full-screen mobile menu. Closes on link selection, Escape and route change; locks
 * page scroll while open; returns focus to the toggle when closed.
 */
export function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Close whenever the route changes (e.g. browser back while open).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>("a[href], button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => (open ? close() : setOpen(true))}
        className="relative z-[60] inline-flex size-11 items-center justify-center rounded-full border border-border-strong bg-white/[0.04] text-foreground backdrop-blur transition-colors hover:bg-white/10"
      >
        {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-background/95 px-6 pt-28 pb-10 backdrop-blur-2xl"
          >
            <nav aria-label="Mobile primary">
              <ul className="flex flex-col gap-1">
                {primaryNav.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.6, ease: easeOutExpo }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
                      className={cn(
                        "flex min-h-14 items-center text-[34px] font-bold tracking-[-0.03em]",
                        isActivePath(pathname, link.href) ? "text-foreground" : "text-foreground/60",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <ul className="mt-8 grid grid-cols-2 gap-x-4 border-t border-border pt-6">
                {secondaryLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 items-center text-[17px] text-foreground/70 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              href={dashboardEntryHref}
              onClick={() => setOpen(false)}
              className={buttonClasses("light", "lg", "mt-auto w-full font-semibold")}
            >
              Dashboard
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
