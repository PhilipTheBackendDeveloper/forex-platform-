"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isActivePath, primaryNav, routes } from "@/config/navigation";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { FloatingBar } from "./floating-bar";
import { MobileNav } from "./mobile-nav";
import { Wordmark } from "./wordmark";

/** Global header — used on the homepage, blog and about pages (reference parity). */
export function SiteHeader({ ticker }: { ticker?: ReactNode }) {
  const pathname = usePathname();

  return (
    <FloatingBar top={ticker}>
      <Wordmark />
      <nav aria-label="Primary" className="hidden lg:block">
        <ul className="flex items-center gap-8">
          {primaryNav.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-2 text-[14px] transition-colors duration-300",
                    active ? "text-foreground" : "text-foreground/70 hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex items-center gap-2">
        <Link href={routes.login} className="hidden min-h-11 items-center px-4 text-[14px] text-foreground/75 transition-colors hover:text-foreground sm:inline-flex">
          Sign in
        </Link>
        <Link href={routes.register} className={buttonClasses("light", "md", "hidden min-h-10 px-5 text-[14px] font-semibold sm:inline-flex")}>
          Sign up
        </Link>
        <MobileNav pathname={pathname} />
      </div>
    </FloatingBar>
  );
}
