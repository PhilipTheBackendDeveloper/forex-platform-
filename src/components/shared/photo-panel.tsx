import Image from "next/image";
import type { ReactNode } from "react";
import type { ClientPhoto } from "@/config/assets";
import { cn } from "@/lib/cn";

/**
 * Rounded, lazily loaded client photo with an optional tint overlay. The overlay sits on top
 * of the untouched photograph (non-destructive); it never recolours the subject.
 */
export function PhotoPanel({
  photo,
  sizes,
  className,
  overlayClassName = "bg-gradient-to-t from-background/70 via-transparent to-transparent",
  priority,
  children,
}: {
  photo: ClientPhoto;
  sizes: string;
  className?: string;
  overlayClassName?: string;
  priority?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={cn("group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface", className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        style={{ objectPosition: photo.focus }}
      />
      <div aria-hidden className={cn("absolute inset-0", overlayClassName)} />
      {children}
    </div>
  );
}
