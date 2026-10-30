import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { BrandGlyph } from "@/components/layout/wordmark";
import { siteConfig } from "@/config/site.config";

// Auth pages are never indexed.
export const metadata: Metadata = { robots: { index: false, follow: false } };

/** Standalone auth shell (reference: "‹ Cancel" left, wordmark right, centred narrow form). */
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden px-4">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/[0.08] blur-[150px]" />
      </div>
      <nav aria-label="Account" className="mx-auto flex w-full max-w-2xl items-center justify-between pt-8">
        <Link href="/" className="inline-flex min-h-11 items-center gap-1.5 text-[14px] text-foreground/60 hover:text-foreground">
          <ChevronLeft aria-hidden className="size-4" /> Cancel
        </Link>
        <Link href="/" aria-label={`${siteConfig.name} — home`} className="inline-flex min-h-11 items-center gap-2 text-[13px] font-bold tracking-[0.15em] uppercase">
          {siteConfig.wordmark}
          <BrandGlyph className="size-5" />
        </Link>
      </nav>
      <main id="main" className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-16">
        {children}
      </main>
    </div>
  );
}
