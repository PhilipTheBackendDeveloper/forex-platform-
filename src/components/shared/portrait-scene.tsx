import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type Fades = { left?: boolean; right?: boolean; bottom?: boolean; top?: boolean };

const SOLID = "linear-gradient(black, black)";

/** Builds an intersecting mask so the whole scene dissolves into whatever is behind it. */
function maskFor(f: Fades, includeSides: boolean) {
  return [
    f.top ? "linear-gradient(to bottom, transparent 0%, black 14%)" : SOLID,
    f.bottom ? "linear-gradient(to top, transparent 0%, black 42%)" : SOLID,
    includeSides && f.left ? "linear-gradient(to right, transparent 0%, black 42%)" : SOLID,
    includeSides && f.right ? "linear-gradient(to left, transparent 0%, black 38%)" : SOLID,
  ].join(", ");
}

/**
 * Places a subject cutout (transparent PNG produced by scripts/cutout.swift) into a dark, lit
 * scene so it blends into the page the way the reference's naturally dark photos do.
 *
 * Edges dissolve with CSS masks (not colour overlays), so there is never a seam against the
 * section's gradient background. The subject's pixels are never filtered or recoloured — only
 * scene light behind them and a faint rim light around the silhouette are added.
 */
export function PortraitScene({
  src,
  alt,
  priority,
  sizes,
  position = "50% 0%",
  inset = "top-[10%]",
  glowAt = "55% 38%",
  zoom = true,
  fit = "cover",
  fades = { left: true, bottom: true, top: true },
  className,
}: {
  /** `contain` never upscales small cutouts (keeps them sharp); `cover` fills the frame. */
  fit?: "cover" | "contain";
  src: StaticImageData;
  alt: string;
  priority?: boolean;
  sizes: string;
  /** object-position of the cutout inside its box. */
  position?: string;
  /** How far from the top the subject box starts (head room). */
  inset?: string;
  glowAt?: string;
  zoom?: boolean;
  fades?: Fades;
  className?: string;
}) {
  const style = { "--mask-base": maskFor(fades, false), "--mask-lg": maskFor(fades, true) } as CSSProperties;
  return (
    <div
      style={style}
      className={cn(
        "relative overflow-hidden [mask-composite:intersect] [mask-image:var(--mask-base)] [-webkit-mask-composite:source-in] [-webkit-mask-image:var(--mask-base)] lg:[mask-image:var(--mask-lg)] lg:[-webkit-mask-image:var(--mask-lg)]",
        className,
      )}
    >
      {/* Scene light: a soft key-light glow and a violet bounce behind the subject. */}
      <div aria-hidden className="absolute inset-0" style={{ background: `radial-gradient(55% 48% at ${glowAt}, rgb(0 113 227 / 0.26), transparent 70%)` }} />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(45%_35%_at_80%_95%,rgb(191_90_242/0.14),transparent_70%)]" />

      <div className={cn("absolute inset-x-0 bottom-0 origin-bottom", inset, zoom && "animate-hero-zoom motion-reduce:animate-none")}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(fit === "cover" ? "object-cover" : "object-contain", "[filter:drop-shadow(0_0_22px_rgb(0_113_227/0.16))]")}
          style={{ objectPosition: position }}
        />
      </div>
    </div>
  );
}
