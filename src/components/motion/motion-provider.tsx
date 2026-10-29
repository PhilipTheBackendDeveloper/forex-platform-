"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Respects the OS "reduce motion" preference for every Motion animation in the tree. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
