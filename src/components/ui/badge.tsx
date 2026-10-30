import type { ReactNode } from "react";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/cn";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-primary uppercase",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      {children}
    </p>
  );
}

type Tone = "neutral" | "primary" | "success" | "warning";

const tones: Record<Tone, string> = {
  neutral: "border-border bg-surface-2 text-foreground/80",
  primary: "border-primary/20 bg-primary-soft text-primary",
  success: "border-accent/30 bg-accent-soft text-accent-strong",
  warning: "border-amber-400/40 bg-amber-50 text-amber-700",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide whitespace-nowrap uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Marks content that still needs client approval. Deliberately quiet (small, low-contrast, amber
 * dot) so a preview still feels finished, but reviewers can always spot unapproved content.
 * Hidden once `siteConfig.features.showPlaceholderBadges` is switched off after sign-off.
 */
export function PlaceholderBadge({ label = "Placeholder", className }: { label?: string; className?: string }) {
  if (!siteConfig.features.showPlaceholderBadges) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2 py-0.5 align-middle text-[10px] font-medium tracking-[0.08em] whitespace-nowrap text-muted uppercase",
        className,
      )}
    >
      <span aria-hidden className="size-1 rounded-full bg-amber-500" />
      {label}
    </span>
  );
}
