import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-contrast shadow-[0_0_40px_-8px_var(--primary)] hover:bg-primary-hover hover:shadow-[0_0_60px_-6px_var(--primary)]",
  secondary:
    "border border-border-strong bg-white/[0.03] text-foreground backdrop-blur hover:border-white/30 hover:bg-white/[0.07]",
  light: "bg-foreground text-background hover:bg-white",
  ghost: "text-foreground/80 hover:text-foreground",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[15px]",
  lg: "px-8 py-4 text-[16px] lg:px-10 lg:py-5 lg:text-[17px]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden
      className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
    />
  );
}

type CommonProps = { variant?: Variant; size?: Size; arrow?: boolean; children: ReactNode };

export function Button({
  variant,
  size,
  arrow,
  className,
  children,
  type = "button",
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

/**
 * Link styled as a button. Pass `href={null}` for destinations the client has not
 * supplied yet: it renders a disabled control plus a visible reason, never `href="#"`.
 */
export function ButtonLink({
  href,
  variant,
  size,
  arrow,
  className,
  children,
  external,
  unavailableReason = "Link pending client confirmation",
}: CommonProps & {
  href: string | null;
  className?: string;
  external?: boolean;
  unavailableReason?: string;
}) {
  if (!href) {
    return (
      <span className="inline-flex flex-col items-start gap-1.5">
        <span
          role="link"
          aria-disabled="true"
          title={unavailableReason}
          className={buttonClasses(variant, size, className)}
        >
          {children}
          {arrow && <Arrow />}
        </span>
        <span className="pl-2 text-xs text-muted">{unavailableReason}</span>
      </span>
    );
  }
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...externalProps}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}
