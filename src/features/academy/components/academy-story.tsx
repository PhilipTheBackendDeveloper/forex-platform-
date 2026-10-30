"use client";

import { ScrollSteps } from "@/components/motion/scroll-steps";
import { academyContent as a } from "@/content/academy";

/** Pinned "01 / 06" feature story (reference: 600vh sticky section with a progress bar). */
export function AcademyStory() {
  const total = a.story.length;
  return (
    <ScrollSteps
      steps={a.story}
      getKey={(s) => s.title}
      className="relative mt-10"
      srContent={
        <ul>
          {a.story.map((s) => (
            <li key={s.title}>
              {s.title}: {s.text}
            </li>
          ))}
        </ul>
      }
      render={(s, i) => (
        <div>
          <p className="flex items-center gap-4 font-mono text-[13px] tracking-[0.2em] text-primary">
            <span aria-hidden className="h-px w-10 bg-primary" />
            {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <p className="mt-6 bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-[clamp(44px,6vw,84px)] leading-[0.98] font-black tracking-[-0.045em] text-transparent">
            {s.title}
          </p>
          <p className="mt-8 max-w-lg text-[clamp(18px,1.6vw,24px)] leading-[1.6] text-foreground/55">{s.text}</p>
        </div>
      )}
      aside={(_, i) => (
        <div className="relative flex size-[min(340px,70vw)] items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-border" />
          <span className="absolute inset-10 animate-[spin_15s_linear_infinite] rounded-full border border-dashed border-primary/30" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
            <circle cx="50" cy="50" r="48" fill="none" stroke="var(--primary)" strokeWidth="0.8" strokeDasharray={`${((i + 1) / total) * 301} 301`} className="transition-[stroke-dasharray] duration-700" />
          </svg>
          <span className="text-[64px] font-black tracking-[-0.05em] text-foreground/80">{String(i + 1).padStart(2, "0")}</span>
        </div>
      )}
      footer={(_, progress) => (
        <div className="container-site absolute inset-x-0 bottom-10">
          <div className="h-1 w-56 overflow-hidden rounded-full bg-border">
            <div className="h-full rounded-full bg-primary transition-[width] duration-150" style={{ width: `${Math.max(4, progress * 100)}%` }} />
          </div>
        </div>
      )}
    />
  );
}
