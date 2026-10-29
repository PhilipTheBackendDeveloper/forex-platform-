import type { ReactNode } from "react";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/cn";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-foreground/70 uppercase backdrop-blur",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
      {children}
    </p>
  );
}

type Tone = "neutral" | "primary" | "success" | "warning";

const tones: Record<Tone, string> = {
  neutral: "border-border-strong text-foreground/70",
  primary: "border-primary/40 bg-primary/10 text-[var(--ring)]",
  success: "border-success/40 bg-success/10 text-success",
  warning: "border-amber-400/40 bg-amber-400/10 text-amber-300",
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
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Marks content that still needs client approval. Hidden once badges are switched off. */
export function PlaceholderBadge({ label = "Placeholder", className }: { label?: string; className?: string }) {
  if (!siteConfig.features.showPlaceholderBadges) return null;
  return (
    <Badge tone="warning" className={className}>
      {label}
    </Badge>
  );
}
