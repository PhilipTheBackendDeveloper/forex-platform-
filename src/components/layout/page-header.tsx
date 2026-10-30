import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { BrandGlyph } from "./wordmark";
import { FloatingBar } from "./floating-bar";

export type PageHeaderLink = { label: string; href: string };

/**
 * Page sub-header used by the standalone landing pages (coaching, academy, courses, events,
 * shop, collaborations, legal). Mirrors the reference pattern:
 * "← Home | glyph · Page title ……… in-page links · action".
 */
export function PageHeader({
  title,
  backHref = "/",
  backLabel = "Home",
  links = [],
  action,
}: {
  title: string;
  backHref?: string;
  backLabel?: string;
  links?: PageHeaderLink[];
  action?: ReactNode;
}) {
  return (
    <FloatingBar compactWidth="max-w-[860px]">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <Link
          href={backHref}
          className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-[13px] text-foreground/65 transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="size-4" />
          <span className="hidden sm:inline">{backLabel}</span>
          <span className="sr-only sm:hidden">{backLabel}</span>
        </Link>
        <span aria-hidden className="hidden h-4 w-px bg-white/15 sm:block" />
        <span className="flex min-w-0 items-center gap-2.5">
          <BrandGlyph className="hidden size-5 sm:block" />
          <span className="truncate text-[16px] font-medium tracking-tight sm:text-[17px]">{title}</span>
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        {links.length > 0 && (
          <nav aria-label={`${title} sections`} className="hidden md:block">
            <ul className="flex items-center">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-11 items-center px-3 text-[13px] text-foreground/70 transition-colors hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {action}
      </div>
    </FloatingBar>
  );
}

/** Small pill used as the sub-header action (blue by default, white for "light"). */
export const headerActionClasses = (tone: "primary" | "light" = "primary") =>
  [
    "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full px-4 text-[13px] font-semibold transition-colors duration-300",
    tone === "primary" ? "bg-primary text-white hover:bg-primary-hover shadow-[0_0_24px_-6px_var(--primary)]" : "bg-foreground text-background hover:bg-white",
  ].join(" ");
