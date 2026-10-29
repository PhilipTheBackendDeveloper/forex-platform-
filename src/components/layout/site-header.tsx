"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { dashboardEntryHref, isActivePath, primaryNav } from "@/config/navigation";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { MobileNav } from "./mobile-nav";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <div
        className={cn(
          "container-site flex items-center justify-between transition-[height] duration-500",
          scrolled ? "h-16 lg:h-[72px]" : "h-[72px] lg:h-[var(--header-height)]",
        )}
      >
        <Wordmark />
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {primaryNav.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-[15px] transition-colors duration-300",
                      active ? "text-foreground" : "text-foreground/75 hover:text-foreground",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-foreground/60 after:transition-transform after:duration-300",
                      active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Link href={dashboardEntryHref} className={buttonClasses("light", "md", "hidden px-7 font-semibold sm:inline-flex")}>
            Dashboard
          </Link>
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
