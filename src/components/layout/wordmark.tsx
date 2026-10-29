import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/cn";

/**
 * Placeholder brand mark: a neutral geometric glyph + configurable wordmark.
 * Replace with the client's logo file once supplied (docs/OPEN_CLIENT_ITEMS.md).
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn("inline-flex min-h-11 items-center gap-2.5", className)}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="size-6 text-foreground" fill="none">
        <path d="M4 18 L10 8 L14 13 L20 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="4" r="2" fill="var(--primary)" />
      </svg>
      <span className="text-[17px] font-bold tracking-tight text-foreground">{siteConfig.wordmark}</span>
    </Link>
  );
}
