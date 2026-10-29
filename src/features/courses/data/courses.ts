import type { CourseDetail } from "@/types/domain";

/**
 * DEMO catalogue — structure-only listings so the catalogue, search and detail routes can be
 * built and tested. Titles/outlines are placeholders; prices are `null` (not approved) and
 * purchase is disabled until payments are integrated. Replace via the catalog service later.
 */
export const courses: CourseDetail[] = [
  {
    id: "demo-course-foundations",
    slug: "forex-foundations",
    title: "Forex Foundations",
    subtitle: "From your first chart to a written trading plan.",
    level: "beginner",
    tags: ["Beginner", "Risk"],
    lessonsCount: 12,
    durationHours: null,
    price: null,
    status: "demo",
    description: [
      "A calm, structured introduction to the currency market: how prices move, how orders work and how to protect your capital from day one.",
      "Every lesson ends with a short exercise so you leave with a practical, written plan rather than a pile of notes.",
    ],
    outcomes: [
      "Explain how currency pairs, pips and lots work",
      "Place, manage and close orders on a demo platform",
      "Size positions from a fixed risk rule",
      "Write and follow a simple trading plan",
    ],
    modules: [
      { title: "Market basics", lessons: [{ title: "What moves currencies", durationMinutes: null }, { title: "Pairs, pips and lots", durationMinutes: null }] },
      { title: "Platform & orders", lessons: [{ title: "Setting up a demo account", durationMinutes: null }, { title: "Order types explained", durationMinutes: null }] },
      { title: "Risk first", lessons: [{ title: "Position sizing", durationMinutes: null }, { title: "Your first trading plan", durationMinutes: null }] },
    ],
  },
  {
    id: "demo-course-structure",
    slug: "market-structure-mastery",
    title: "Market Structure Mastery",
    subtitle: "Multi-timeframe structure and top-down planning.",
    level: "intermediate",
    tags: ["Structure", "Analysis"],
    lessonsCount: 16,
    durationHours: null,
    price: null,
    status: "demo",
    description: [
      "Learn to read swing structure across timeframes and turn it into a clear, pre-session plan.",
      "Focus is on repeatable reasoning you can journal and review, not on prediction.",
    ],
    outcomes: [
      "Map higher-timeframe structure in minutes",
      "Identify structure shifts and what they do (and don't) mean",
      "Build scenario-based plans before the session",
    ],
    modules: [
      { title: "Swing structure", lessons: [{ title: "Highs, lows and trend", durationMinutes: null }, { title: "Shifts and ranges", durationMinutes: null }] },
      { title: "Top-down planning", lessons: [{ title: "From weekly to entry timeframe", durationMinutes: null }, { title: "Scenario planning", durationMinutes: null }] },
    ],
  },
  {
    id: "demo-course-liquidity",
    slug: "liquidity-and-execution",
    title: "Liquidity & Execution",
    subtitle: "Where orders rest — and how to execute around them.",
    level: "advanced",
    tags: ["Liquidity", "Execution"],
    lessonsCount: 14,
    durationHours: null,
    price: null,
    status: "demo",
    description: [
      "An advanced module on liquidity concepts, entry refinement and trade management.",
      "Designed for traders who already journal consistently and want to sharpen execution.",
    ],
    outcomes: [
      "Locate likely liquidity pools on any timeframe",
      "Refine entries without widening risk",
      "Manage open trades with predefined rules",
    ],
    modules: [
      { title: "Liquidity concepts", lessons: [{ title: "Resting orders", durationMinutes: null }, { title: "Sweeps and failures", durationMinutes: null }] },
      { title: "Execution", lessons: [{ title: "Entry refinement", durationMinutes: null }, { title: "Trade management", durationMinutes: null }] },
    ],
  },
];

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}
