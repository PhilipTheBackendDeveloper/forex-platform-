import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/cn";

/**
 * Albert Tech mark: an "A" whose crossbar is a rising price line ending in a blue tick.
 * Same geometry as src/app/icon.svg (favicon).
 */
export function BrandGlyph({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={cn("size-6 text-foreground", className)} fill="none">
      <path d="M3.5 20.5 L12 3.5 L20.5 20.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.2 15.2 L10.2 12.6 L12.8 14.4 L16.6 10.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16.8" cy="10.4" r="1.7" fill="var(--primary)" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label={`${siteConfig.name} — home`} className={cn("inline-flex min-h-11 items-center gap-2.5", className)}>
      <BrandGlyph />
      <span className="text-[15px] font-bold tracking-tight whitespace-nowrap text-foreground uppercase">{siteConfig.wordmark}</span>
    </Link>
  );
}
