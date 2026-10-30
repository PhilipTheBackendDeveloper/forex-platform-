"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { easeOutExpo } from "@/design/motion";

/**
 * Pinned, scroll-driven step section (reference: coaching roadmap and academy "01 / 06" story).
 * The outer element is `steps × 100vh` tall; an inner `sticky top-0 h-screen` panel stays pinned
 * while scroll progress selects the active step. Every step is also rendered (visually hidden) in
 * the DOM, so screen readers and no-JS users get the full content. Reduced motion: steps swap
 * without movement.
 */
export function ScrollSteps<T>({
  steps,
  getKey,
  render,
  aside,
  footer,
  srContent,
  className,
}: {
  steps: readonly T[];
  getKey: (step: T, index: number) => string;
  render: (step: T, index: number) => ReactNode;
  aside?: (step: T, index: number) => ReactNode;
  footer?: (index: number, progress: number) => ReactNode;
  srContent: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
    setIndex(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
  });

  const step = steps[index];
  if (step === undefined) return null;

  return (
    <div ref={ref} className={className} style={{ height: `${steps.length * 100}vh` }}>
      <div className="sr-only">{srContent}</div>
      <div aria-hidden className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={getKey(step, index)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            >
              {render(step, index)}
            </motion.div>
          </AnimatePresence>
          {aside && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`aside-${getKey(step, index)}`}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
                className="hidden justify-center lg:flex"
              >
                {aside(step, index)}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        {footer?.(index, progress)}
      </div>
    </div>
  );
}
