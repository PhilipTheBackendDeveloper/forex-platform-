"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { isActivePath, primaryNav, routes } from "@/config/navigation";
import { buttonClasses } from "@/components/ui/button";
import { easeOutExpo } from "@/design/motion";
import { cn } from "@/lib/cn";
import { Wordmark } from "./wordmark";

/**
 * Full-screen mobile menu (reference: centred large links + Sign in / Sign up buttons).
 * Improvements over the reference: closes on Escape, traps focus, returns focus to the toggle.
 */
export function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

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
    panelRef.current?.querySelector<HTMLElement>("nav a[href]")?.focus();
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
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-surface-2"
      >
        <Menu className="size-5" aria-hidden />
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
            className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-background/98 px-6 pb-10 backdrop-blur-2xl"
          >
            <div className="flex h-20 shrink-0 items-center justify-between">
              <Wordmark />
              <button
                type="button"
                aria-label="Close menu"
                onClick={close}
                className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-surface-2 transition-colors"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <nav aria-label="Mobile primary" className="mt-24">
              <ul className="flex flex-col items-center gap-2">
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
                        "flex min-h-14 items-center text-[28px] font-semibold tracking-[-0.02em] transition-colors",
                        isActivePath(pathname, link.href) ? "text-foreground" : "text-foreground/65 hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mx-auto mt-14 flex w-full max-w-sm flex-col gap-3">
              <Link
                href={routes.login}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-border bg-card text-[16px] font-medium text-foreground hover:bg-surface-2"
              >
                Sign in
              </Link>
              <Link
                href={routes.register}
                onClick={() => setOpen(false)}
                className={buttonClasses("primary", "lg", "min-h-14 rounded-2xl font-semibold")}
              >
                Sign up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
