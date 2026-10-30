import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

/** Faded italic run — the reference's signature last line ("…Traders.", "Mastery Courses."). */
export function Dim({ children, block }: { children: ReactNode; block?: boolean }) {
  return <span className={cn("pr-[0.06em] text-foreground/25 italic", block && "block")}>{children}</span>;
}

/** Blue italic accent ("precision.", "On your terms."). */
export function Accent({ children, block }: { children: ReactNode; block?: boolean }) {
  return <span className={cn("pr-[0.06em] text-primary italic", block && "block")}>{children}</span>;
}

/** White → grey gradient text used for display titles on subpages. */
export function Fade({ children, italic, block }: { children: ReactNode; italic?: boolean; block?: boolean }) {
  return (
    <span
      className={cn(
        "bg-linear-to-r from-foreground via-foreground/85 to-foreground/45 bg-clip-text pr-[0.06em] text-transparent",
        italic && "italic",
        block && "block",
      )}
    >
      {children}
    </span>
  );
}

type EyebrowStyle = "line" | "dot" | "pill" | "plain";

export function SectionEyebrow({
  children,
  variant = "line",
  centered,
  tone = "muted",
}: {
  children: ReactNode;
  variant?: EyebrowStyle;
  centered?: boolean;
  tone?: "muted" | "primary";
}) {
  const color = tone === "primary" ? "text-primary" : "text-foreground/50";
  const text = "text-[11px] font-semibold tracking-[0.22em] uppercase";
  if (variant === "pill") {
    return (
      <p className={cn("inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur", text, "text-foreground/75")}>
        <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-primary" />
        {children}
      </p>
    );
  }
  if (variant === "dot") {
    return (
      <p className={cn("inline-flex items-center gap-2.5", text, color)}>
        <span aria-hidden className="size-1.5 rounded-full bg-current" />
        {children}
      </p>
    );
  }
  if (variant === "plain") return <p className={cn(text, color)}>{children}</p>;
  return (
    <p className={cn("inline-flex items-center gap-4", text, color)}>
      <span aria-hidden className="h-px w-8 bg-current opacity-50" />
      {children}
      {centered && <span aria-hidden className="h-px w-8 bg-current opacity-50" />}
    </p>
  );
}

/**
 * Section heading in the reference style: eyebrow, tight bold display title whose last line is
 * typically a faded italic (`dim`), optional divider and description.
 */
export function SectionHeading({
  eyebrow,
  eyebrowVariant = "line",
  eyebrowTone,
  title,
  dim,
  description,
  divider,
  align = "left",
  size = "lg",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  eyebrowVariant?: EyebrowStyle;
  eyebrowTone?: "muted" | "primary";
  title: ReactNode;
  dim?: ReactNode;
  description?: ReactNode;
  divider?: boolean;
  align?: "left" | "center";
  size?: "md" | "lg" | "xl";
  as?: "h1" | "h2";
  className?: string;
}) {
  const sizes = {
    md: "text-[clamp(34px,4.4vw,56px)]",
    lg: "text-[clamp(40px,5.6vw,76px)]",
    xl: "text-[clamp(48px,8vw,110px)]",
  };
  return (
    <Reveal className={cn("flex flex-col gap-6", align === "center" && "items-center text-center", className)}>
      {eyebrow && (
        <SectionEyebrow variant={eyebrowVariant} centered={align === "center"} tone={eyebrowTone}>
          {eyebrow}
        </SectionEyebrow>
      )}
      <Tag className={cn(sizes[size], "leading-[0.95] font-extrabold tracking-[-0.045em] text-balance text-foreground")}>
        {title}
        {dim && <Dim block>{dim}</Dim>}
      </Tag>
      {divider && <span aria-hidden className={cn("h-px w-32 bg-linear-to-r from-white/20 to-transparent", align === "center" && "via-white/20 from-transparent")} />}
      {description && (
        <p className={cn("max-w-2xl text-[16px] leading-[1.7] text-foreground/60 lg:text-[18px]", align === "center" && "mx-auto")}>{description}</p>
      )}
    </Reveal>
  );
}
