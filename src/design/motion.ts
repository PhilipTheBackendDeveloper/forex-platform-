/**
 * Motion presets shared by marketing and dashboard UI.
 * easeOutExpo matches the reference's measured `cubic-bezier(0.16,1,0.3,1)` transitions.
 */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const durations = {
  fast: 0.2,
  base: 0.5,
  slow: 0.9,
  hero: 1,
} as const;
