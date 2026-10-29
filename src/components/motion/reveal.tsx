"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { easeOutExpo } from "@/design/motion";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/**
 * Fades and lifts content in once when it scrolls into view. Uses transform/opacity only
 * (no layout shift). MotionProvider sets reducedMotion="user", so users who prefer reduced
 * motion get the final state without movement.
 */
export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: easeOutExpo, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers `StaggerItem` children as they enter the viewport. */
export function Stagger({ children, stagger = 0.08, ...props }: HTMLMotionProps<"div"> & { stagger?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
