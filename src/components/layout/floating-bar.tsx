"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Fixed header shell shared by the global header and page sub-headers. Transparent and full
 * width at the top of the page; after a short scroll it condenses into a floating, centred,
 * bordered pill (reference: 80 px → 72 px floating bar, observed 2026-10-29).
 */
export function FloatingBar({ children, compactWidth = "max-w-[1000px]" }: { children: ReactNode; compactWidth?: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-center px-3 sm:px-4">
      <a
        href="#main"
        className="pointer-events-auto sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <div
        data-scrolled={scrolled}
        className={cn(
          "pointer-events-auto flex w-full items-center justify-between transition-[max-width,margin,padding,background-color,border-color,height,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? cn(compactWidth, "mt-3 h-14 rounded-full border border-white/10 bg-background/70 px-4 shadow-[0_10px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur-xl sm:px-5")
            : "mt-0 h-20 max-w-[calc(var(--container-max)+48px)] border border-transparent px-3 sm:px-6",
        )}
      >
        {children}
      </div>
    </header>
  );
}
