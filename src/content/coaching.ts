/** Coaching page copy — original placeholder wording; structure mirrors the live reference audit. */
export const coachingContent = {
  hero: {
    title: "Rebuild your",
    accent: "trading process.",
    description:
      "For committed traders who want focused, personal guidance: we audit how you trade today, refine your approach and strengthen the habits that protect your capital.",
    cta: "Request a Seat",
    note: "Availability confirmed on application",
  },
  philosophy: {
    eyebrow: "The mentorship philosophy",
    title: "Built around you.",
    dimWord: "Not a",
    accentWord: "template.",
    body: "Every trader's mind works differently. Private coaching adapts to your schedule, your strengths and the specific habits holding you back.",
  },
  pillars: [
    { tag: "Pillar 01", title: ["Direct", "Access."], text: "A clear channel to ask questions and share chart markups between sessions. Exact scope to be confirmed by the mentor." },
    { tag: "Pillar 02", title: ["Live", "Sessions."], text: "Screen-shared video calls to review your journal, backtest together and plan the week ahead." },
    { tag: "Pillar 03", title: ["Honest", "Feedback."], text: "Specific, actionable notes on your decisions — what to keep, what to change and why." },
  ],
  roadmap: { eyebrow: "The transformation", title: "A structured path." },
  sessions: [
    { title: "Chart & Journal Audit", text: "A trade-by-trade review of your journal to find exactly where decisions break down." },
    { title: "Strategy Refinement", text: "Take what you already know and tighten it into clear, testable rules." },
    { title: "Psychology", text: "Identify emotional leaks and design routines that counter them before they cost you." },
    { title: "Custom System Build", text: "Assemble a plan that fits your capital, schedule and risk tolerance." },
    { title: "Review & Roadmap", text: "Consolidate progress and agree the next 90 days of deliberate practice." },
  ],
  offer: {
    badge: "Intake open • limited slots",
    title: "Focused access.",
    dimWord: "Zero",
    accentWord: "shortcuts.",
    name: "1-on-1 Mentorship",
    subtitle: "Strategy • Execution • Psychology",
    included: [
      { title: "Five private sessions (proposed)", text: "One-to-one video sessions, with recordings for review." },
      { title: "Strategy refinement", text: "Your approach, tightened for consistency." },
      { title: "Chart & journal audit", text: "A trade-by-trade breakdown of your journal." },
      { title: "Psychology work", text: "Identify emotional leaks and build routines that neutralise them." },
      { title: "Community access", text: "Continue learning alongside other students." },
    ],
    priceLabel: "Investment",
  },
} as const;
