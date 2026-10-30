"use client";

import { ScrollSteps } from "@/components/motion/scroll-steps";
import { coachingContent as c } from "@/content/coaching";

/** Pinned "Session 01 → 05" roadmap (reference: sticky h-screen section, numbers swap on scroll). */
export function CoachingRoadmap() {
  return (
    <ScrollSteps
      steps={c.sessions}
      getKey={(s) => s.title}
      srContent={
        <>
          <h2>{c.roadmap.title}</h2>
          <ol>
            {c.sessions.map((s, i) => (
              <li key={s.title}>
                Session {i + 1}: {s.title}. {s.text}
              </li>
            ))}
          </ol>
        </>
      }
      render={(s, i) => (
        <div>
          <p className="text-[12px] font-semibold tracking-[0.22em] text-foreground/45 uppercase">{c.roadmap.eyebrow}</p>
          <p className="mt-2 text-[clamp(26px,2.6vw,36px)] font-extrabold tracking-[-0.03em]">{c.roadmap.title}</p>
          <p className="mt-10 inline-flex rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-bold tracking-[0.15em] text-[var(--ring)] uppercase">
            Session {i + 1}
          </p>
          <p className="mt-6 text-[clamp(40px,5.4vw,72px)] leading-[0.98] font-black tracking-[-0.045em]">{s.title}</p>
          <p className="mt-6 max-w-md text-[18px] leading-[1.6] text-foreground/60">{s.text}</p>
        </div>
      )}
      aside={(s, i) => (
        <div className="relative flex aspect-[4/5] w-[min(360px,80%)] flex-col items-center justify-center rounded-[2rem] border border-border bg-white shadow-lift">
          <p className="text-[12px] font-semibold tracking-[0.4em] text-foreground/40 uppercase">Session</p>
          <p className="bg-linear-to-b from-foreground to-foreground/30 bg-clip-text text-[clamp(110px,12vw,170px)] leading-none font-black tracking-[-0.06em] text-transparent">
            {String(i + 1).padStart(2, "0")}
          </p>
          <p className="mt-6 rounded-full border border-border bg-surface px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-foreground/70 uppercase">{s.title}</p>
        </div>
      )}
      footer={(index) => (
        <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3">
          <p className="text-[10px] font-semibold tracking-[0.3em] text-foreground/40 uppercase">{index < c.sessions.length - 1 ? "Keep scrolling" : "Final session"}</p>
          <div className="flex gap-1.5">
            {c.sessions.map((s, i) => (
              <span key={s.title} className={`h-1 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-primary" : "w-3 bg-border"}`} />
            ))}
          </div>
        </div>
      )}
    />
  );
}
