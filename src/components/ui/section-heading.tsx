import type { ReactNode } from "react";
import { Eyebrow } from "./badge";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

/**
 * Two-tone section heading used across the site: a bright first line and a dimmed
 * second line, mirroring the reference hierarchy ("Forex Trading. / Mastery Courses.").
 */
export function SectionHeading({
  eyebrow,
  title,
  dim,
  description,
  align = "left",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  dim?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className="text-[clamp(40px,6vw,80px)] leading-[0.95] font-bold tracking-[-0.04em] text-balance">
        <span className="block text-foreground">{title}</span>
        {dim && <span className="block text-foreground/35">{dim}</span>}
      </Tag>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-[16px] leading-[1.65] text-foreground/60 lg:text-[18px]",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
