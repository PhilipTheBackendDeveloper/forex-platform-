import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight whitespace-nowrap transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white shadow-[0_4px_14px_-2px_rgba(124,58,237,0.35)] hover:bg-primary-hover hover:shadow-[0_6px_20px_-2px_rgba(124,58,237,0.5)]",
  secondary: "border border-border bg-card text-foreground hover:border-primary/40 hover:bg-surface-2 shadow-xs",
  light: "bg-foreground text-background hover:bg-foreground/90 shadow-xs",
  ghost: "text-foreground/80 hover:text-foreground",
};

/** Measured on the reference hero: `px-8 py-4 text-[16px] font-medium` (≈56 px tall). */
const sizes: Record<Size, string> = {
  sm: "min-h-9 px-4 text-[13px]",
  md: "min-h-11 px-6 text-[14px]",
  lg: "min-h-14 px-8 text-[16px]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

/** Reference hover effect: a diagonal light sweep across the primary CTA. */
function Shine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-[150%] -skew-x-[30deg] bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-[150%] motion-reduce:hidden"
    />
  );
}

function Arrow() {
  return <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />;
}

type CommonProps = { variant?: Variant; size?: Size; arrow?: boolean; shine?: boolean; children: ReactNode };

export function Button({ variant, size, arrow, shine, className, children, type = "button", ...props }: CommonProps & ComponentProps<"button">) {
  return (
    <button type={type} className={buttonClasses(variant, size, cn(shine && "overflow-hidden", className))} {...props}>
      {shine && <Shine />}
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

/**
 * Link styled as a button. `href={null}` (destination not supplied yet) renders a muted,
 * focusable control whose reason appears as a tooltip on hover/focus and is announced to screen
 * readers — never `href="#"`, and no permanent caption cluttering the layout.
 */
export function ButtonLink({
  href,
  variant,
  size,
  arrow,
  shine,
  className,
  children,
  external,
  unavailableReason = "Link pending client confirmation",
}: CommonProps & { href: string | null; className?: string; external?: boolean; unavailableReason?: string }) {
  if (!href) {
    return (
      <span className="group/na relative inline-flex">
        <span role="link" aria-disabled="true" tabIndex={0} className={buttonClasses(variant, size, cn("cursor-not-allowed opacity-60", className))}>
          {children}
          {arrow && <Arrow />}
          <span className="sr-only"> — {unavailableReason}</span>
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute top-full left-1/2 z-20 mt-2 -translate-x-1/2 translate-y-1 rounded-lg border border-border bg-card px-3 py-1.5 text-[12px] whitespace-nowrap text-muted opacity-0 shadow-lg transition-[opacity,transform] duration-200 group-focus-within/na:translate-y-0 group-focus-within/na:opacity-100 group-hover/na:translate-y-0 group-hover/na:opacity-100"
        >
          {unavailableReason}
        </span>
      </span>
    );
  }
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link href={href} className={buttonClasses(variant, size, cn(shine && "overflow-hidden", className))} {...externalProps}>
      {shine && <Shine />}
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}
