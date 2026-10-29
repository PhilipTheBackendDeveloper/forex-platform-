import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

/**
 * Centered subpage hero (reference subpages use `pt-40 pb-20 min-h-[95vh]` centered heroes;
 * we use a shorter default so content is visible above the fold on laptops).
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  children,
  tall,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  accent?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  tall?: boolean;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden px-6 pt-40 pb-20 text-center",
        tall && "min-h-[88vh]",
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-[5%] left-1/2 h-[520px] w-[820px] -translate-x-1/2 animate-orb rounded-full bg-primary/15 blur-[140px]" />
        <div className="absolute right-[10%] bottom-0 h-[320px] w-[420px] animate-orb-reverse rounded-full bg-accent/10 blur-[120px]" />
        <div className="bg-noise absolute inset-0 opacity-[0.025] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.03)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] bg-[size:64px_64px]" />
      </div>
      <Reveal className="relative flex max-w-4xl flex-col items-center gap-7">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="text-[clamp(44px,8vw,104px)] leading-[0.92] font-black tracking-[-0.045em] text-balance">
          {title}
          {accent && <span className="animate-shine text-gradient-brand block pb-2">{accent}</span>}
        </h1>
        {description && <p className="max-w-2xl text-[17px] leading-[1.65] text-foreground/60 lg:text-[19px]">{description}</p>}
        {children}
      </Reveal>
    </section>
  );
}
