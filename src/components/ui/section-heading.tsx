import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { RevealLines } from "@/components/motion/reveal-lines";
import { toLines, type LineTone } from "@/components/motion/lines";
import { cn } from "@/lib/cn";

/** Faded italic run — the reference's signature last line ("…Traders.", "Mastery Courses."). */
export function Dim({ children, block }: { children: ReactNode; block?: boolean }) {
  return <span className={cn("pr-[0.06em] text-foreground/30 italic", block && "block")}>{children}</span>;
}

/** Blue italic accent ("precision.", "On your terms."). */
export function Accent({ children, block }: { children: ReactNode; block?: boolean }) {
  return <span className={cn("pr-[0.06em] text-primary italic", block && "block")}>{children}</span>;
}

/** White → grey gradient text used for display titles on subpages. */
export function Fade({ children, italic, block }: { children: ReactNode; italic?: boolean; block?: boolean }) {
  return (
    <span className={cn("bg-linear-to-r from-foreground via-foreground/85 to-foreground/45 bg-clip-text pr-[0.06em] text-transparent", italic && "italic", block && "block")}>
      {children}
    </span>
  );
}

type EyebrowStyle = "line" | "dot" | "pill" | "plain";

/**
 * Eyebrow variants measured on the reference: `line` (24px rule + 11px/0.18em caps, white/50),
 * `dot` (pinging dot, primary caps), `pill` (glass pill + pulsing dot), `plain`.
 */
export function SectionEyebrow({
  children,
  variant = "line",
  centered,
  tone = "muted",
}: {
  children: ReactNode;
  variant?: EyebrowStyle;
  centered?: boolean;
  tone?: "muted" | "primary" | "community";
}) {
  const color = tone === "primary" ? "text-primary" : tone === "community" ? "text-accent-strong" : "text-muted";
  const text = "text-[11px] font-semibold tracking-[0.18em] uppercase";
  if (variant === "pill") {
    return (
      <p className="inline-flex w-fit items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-xs">
        <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-accent" />
        <span className="text-[11px] font-bold tracking-[0.2em] text-foreground/80 uppercase">{children}</span>
      </p>
    );
  }
  if (variant === "dot") {
    return (
      <p className={cn("inline-flex items-center gap-3 font-bold", text, "tracking-[0.2em]", color)}>
        <span aria-hidden className="relative flex size-2 shrink-0 items-center justify-center">
          <span className="absolute size-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative size-1.5 rounded-full bg-accent" />
        </span>
        {children}
      </p>
    );
  }
  if (variant === "plain") return <p className={cn(text, color)}>{children}</p>;
  return (
    <p className={cn("inline-flex items-center gap-3", text, color)}>
      <span aria-hidden className="h-px w-6 bg-current opacity-40" />
      {children}
      {centered && <span aria-hidden className="h-px w-6 bg-current opacity-40" />}
    </p>
  );
}

const sizes = {
  md: "clamp(36px, 4.5vw, 60px)",
  lg: "clamp(40px, 6vw, 72px)",
  xl: "clamp(48px, 6vw, 80px)",
};

/**
 * Section heading in the reference style: eyebrow (mb-8), line-mask display title whose last line
 * is typically a faded italic, optional 200px divider and description.
 */
export function SectionHeading({
  eyebrow,
  eyebrowVariant = "line",
  eyebrowTone,
  title,
  dim,
  dimTone = "dim",
  description,
  divider,
  align = "left",
  size = "lg",
  as = "h2",
  className,
}: {
  eyebrow?: string;
  eyebrowVariant?: EyebrowStyle;
  eyebrowTone?: "muted" | "primary" | "community";
  title: string | readonly string[];
  dim?: string;
  dimTone?: LineTone;
  description?: ReactNode;
  divider?: boolean;
  align?: "left" | "center";
  size?: keyof typeof sizes;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", align === "center" && "items-center text-center", className)}>
      {eyebrow && (
        <Reveal className="mb-8">
          <SectionEyebrow variant={eyebrowVariant} centered={align === "center"} tone={eyebrowTone}>
            {eyebrow}
          </SectionEyebrow>
        </Reveal>
      )}
      <RevealLines as={as} lines={toLines(title, dim, dimTone)} fontSize={sizes[size]} />
      {divider && <span aria-hidden className="mt-9 mb-8 block h-px w-[200px] bg-border" />}
      {description && (
        <Reveal delay={0.35}>
          <p className={cn("max-w-[600px] text-xl leading-[1.4] font-medium tracking-[-0.015em] text-muted lg:text-2xl", !divider && "mt-6", align === "center" && "mx-auto")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
