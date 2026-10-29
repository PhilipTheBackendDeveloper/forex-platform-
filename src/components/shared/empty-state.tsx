import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

export function EmptyState({
  icon: Icon,
  title,
  children,
  action,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <Reveal className="flex flex-col items-center rounded-[var(--radius-panel)] border border-dashed border-border-strong bg-white/[0.01] px-6 py-20 text-center">
      <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-white/[0.05]">
        <Icon aria-hidden className="size-8 text-foreground/50" />
      </span>
      <p className="mt-6 text-[26px] font-bold tracking-tight">{title}</p>
      <div className="mt-2 max-w-md text-foreground/55">{children}</div>
      {action && <div className="mt-8">{action}</div>}
    </Reveal>
  );
}
