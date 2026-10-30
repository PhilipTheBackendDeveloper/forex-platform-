/**
 * Decorative, original illustrations for feature cards (aria-hidden; no data claims).
 * Pure SVG/CSS so they stay crisp, theme from tokens and cost no image bytes.
 */
import { cn } from "@/lib/cn";

const grid =
  "bg-[linear-gradient(to_right,rgb(15_23_42/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(15_23_42/0.05)_1px,transparent_1px)] bg-[size:28px_28px]";

export function LiquidityVisual({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative h-56 w-full max-w-sm", grid, "[mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)]", className)}>
      <div className="absolute top-[22%] left-[30%] rounded border border-danger/40 bg-danger/10 px-6 py-2 font-mono text-[10px] tracking-[0.2em] text-danger/80">SELL-SIDE LIQ</div>
      <div className="absolute bottom-[18%] left-[30%] rounded border border-accent/40 bg-accent/10 px-6 py-2 font-mono text-[10px] tracking-[0.2em] text-accent-strong">BUY-SIDE LIQ</div>
      <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M0 120 C60 110 100 70 160 60 C200 52 220 70 240 105" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" className="[stroke-dasharray:400] [stroke-dashoffset:400] animate-[draw_2.4s_ease-out_forwards]" />
      </svg>
    </div>
  );
}

export function StructureVisual({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative h-56 w-64 [perspective:800px]", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "absolute left-1/2 h-36 w-36 -translate-x-1/2 rounded-2xl border [transform:rotateX(58deg)_rotateZ(45deg)]",
            i === 0 ? "border-primary/60 bg-primary/10 shadow-[0_0_40px_-6px_var(--primary)]" : "border-border bg-foreground/[0.02]",
          )}
          style={{ top: `${20 + i * 22}px`, zIndex: 3 - i }}
        />
      ))}
      <svg viewBox="0 0 100 100" className="absolute top-6 left-1/2 z-10 h-28 w-28 -translate-x-1/2" fill="none">
        <path d="M30 70 L48 52 L42 44 L66 22" stroke="var(--primary)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function RiskVisual({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative h-56 w-72", className)}>
      <div className="absolute top-1/2 left-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border" />
      <div className="absolute top-[18%] left-1/2 h-[64%] w-16 -translate-x-1/2 overflow-hidden rounded-md border border-border">
        <div className="h-1/4 bg-danger/20" />
        <div className="h-3/4 bg-accent/20" />
      </div>
      <div className="absolute top-[34%] left-0 flex w-full items-center">
        <span className="rounded bg-foreground px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-background">ENTRY</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <span className="absolute bottom-[24%] left-1/2 -translate-x-1/2 font-mono text-[11px] font-bold text-foreground">1 : 3 R</span>
    </div>
  );
}

export function RadarVisual({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative size-48", className)}>
      {[100, 76, 46].map((s) => (
        <span key={s} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border" style={{ width: `${s}%`, height: `${s}%` }} />
      ))}
      <span className="absolute top-1/2 left-1/2 size-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 shadow-[0_0_30px_rgba(124,58,237,0.25)]" />
      <span className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-primary/30" />
      <span className="absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
    </div>
  );
}

export function SessionsVisual({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex w-44 flex-col gap-3", className)}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "h-9 rounded-lg border",
            i === 1 ? "animate-pulse border-primary/60 bg-primary/10 shadow-[0_0_24px_-4px_rgba(124,58,237,0.25)]" : "border-border bg-foreground/[0.02]",
          )}
        />
      ))}
    </div>
  );
}

export function OrbitVisual({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative size-48", className)}>
      <span className="absolute inset-0 animate-[spin_15s_linear_infinite] rounded-full border border-dashed border-border" />
      <span className="absolute inset-6 animate-[spin_10s_linear_infinite_reverse] rounded-full border border-primary/40" />
      <span className="absolute top-1/2 left-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-linear-to-br from-primary to-accent shadow-[0_0_40px_-6px_rgba(124,58,237,0.3)]" />
    </div>
  );
}

export function ClassroomVisual({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative flex h-48 items-end justify-center gap-3", className)}>
      <div className="flex h-24 w-14 flex-col justify-end gap-1.5 rounded-md border border-border bg-foreground/[0.02] p-2">
        <span className="h-1 rounded bg-foreground/10" />
        <span className="h-1 w-2/3 rounded bg-foreground/10" />
      </div>
      <div className="flex h-36 w-28 items-end justify-center gap-2 rounded-md border border-primary/30 bg-primary/5 p-3 shadow-[0_0_30px_-10px_rgba(124,58,237,0.2)]">
        {[40, 70, 55].map((h) => (
          <span key={h} className="w-2 rounded-sm bg-primary/70" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="grid h-24 w-14 grid-cols-2 gap-1 rounded-md border border-border bg-foreground/[0.02] p-2">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="rounded-sm bg-foreground/10" />
        ))}
      </div>
    </div>
  );
}

export function LaptopVisual({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative flex h-48 flex-col items-center justify-end", className)}>
      <span className="absolute top-2 size-3 animate-pulse rounded-full bg-primary shadow-[0_0_20px_var(--primary)]" />
      <span className="absolute top-0 size-10 rounded-full border border-border" />
      <div className="h-24 w-36 rounded-t-lg border border-border bg-surface-2 p-2">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1.5 rounded-full bg-foreground/20" />
          ))}
        </div>
        <div className="mt-3 h-12 rounded bg-linear-to-br from-primary/20 to-transparent" />
      </div>
      <div className="h-2 w-44 rounded-b-xl bg-foreground/10" />
    </div>
  );
}

const coverPaths = [
  "M0 70 L30 55 L55 62 L85 30 L110 42 L140 18 L170 26 L200 8",
  "M0 40 L25 60 L50 35 L80 70 L110 30 L140 55 L170 20 L200 45",
  "M0 60 L40 60 L40 30 L90 30 L90 50 L140 50 L140 15 L200 15",
  "M0 20 L35 30 L60 25 L95 55 L120 45 L150 70 L175 60 L200 72",
];
const coverTints = ["from-primary/25 to-accent/20", "from-accent/25 to-primary/15", "from-primary/20 to-accent/15", "from-purple-500/20 to-emerald-500/15"];

/** Generated cover art for articles/courses until real, licensed imagery is supplied. */
export function ChartCover({ seed = 0, label, className }: { seed?: number; label?: string; className?: string }) {
  const i = Math.abs(seed) % coverPaths.length;
  return (
    <div aria-hidden className={cn("relative overflow-hidden bg-surface-2", className)}>
      <div className={cn("absolute inset-0 bg-linear-to-br", coverTints[i])} />
      <div className={cn("absolute inset-0 opacity-40", grid)} />
      <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-3/5 w-full text-foreground/70" fill="none">
        <defs>
          <linearGradient id={`cov${i}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${coverPaths[i]} L200 80 L0 80 Z`} fill={`url(#cov${i})`} />
        <path d={coverPaths[i]} stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      {label && <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.25em] text-foreground/60 uppercase">{label}</span>}
    </div>
  );
}
