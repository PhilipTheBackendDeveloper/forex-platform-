/**
 * Homepage copy. Original placeholder wording — NOT reference-site copy and NOT client-approved.
 * Section order mirrors the reference homepage (observed 2026-10-29). Statistics, testimonials
 * and partner names are intentionally absent until the client supplies verifiable data.
 */
export const homeContent = {
  hero: {
    /** Four display lines; index 1 gets the animated gradient, index 3 is the faded italic line. */
    lines: ["Trade", "Clearly.", "Think", "Longer."] as const,
    srTitle: "Trade clearly. Think longer.",
    intro:
      "A focused home for retail traders who want to build real skill — structure, risk discipline and patience — one step at a time.",
    introEmphasis: "Education first. No hype.",
    primaryCta: "Join the Community",
    secondaryCta: "Beginner? Start Free",
    pillars: [
      { title: "Structured", text: "Curriculum" },
      { title: "Risk-first", text: "Method" },
      { title: "Live", text: "Sessions" },
      { title: "Mentor", text: "Access" },
    ],
  },
  highlights: [
    "Market structure",
    "Risk management",
    "Trading psychology",
    "Live chart reviews",
    "Session planning",
    "Journaling discipline",
    "Liquidity concepts",
    "Position sizing",
  ],
  testimonials: {
    eyebrow: "Student stories",
    title: "Real progress,",
    dim: "told by real students.",
    description:
      "This space is reserved for verified, client-approved student stories. We never publish invented testimonials or performance claims.",
    slots: 4,
  },
  educator: {
    eyebrow: "Meet your mentor",
    title: "Taught by a trader,",
    dim: "not a hype machine.",
    body: "Placeholder biography: replace with the mentor's approved story — background, years of experience, teaching approach and verifiable credentials. Keep claims factual and evidenced.",
    principles: [
      { title: "Clarity", text: "A repeatable framework you can explain, review and refine." },
      { title: "Discipline", text: "Rules before entries. Risk is defined before every trade." },
      { title: "Patience", text: "Fewer, better decisions — and the journal to prove it." },
    ],
  },
  community: {
    eyebrow: "Free community",
    title: "Learn alongside",
    dim: "traders like you.",
    body: "Daily market discussion, educational chart breakdowns and announcements from the mentor — in one free community channel.",
    bullets: [
      "Daily market context & breakdowns",
      "Educational chart setups explained",
      "Session recaps & live announcements",
      "Free to join — no payment required",
    ],
    cta: "Join the Community",
  },
  beginner: {
    eyebrow: "Free beginner path",
    title: "Start your journey.",
    dim: "Zero cost attached.",
    body: "A self-paced beginner course that takes you from your first chart to a written trading plan. Access requirements (for example, any partner-broker sign-up) are pending client confirmation.",
    cta: "Enroll for Free",
    included: [
      { title: "Foundations Course.", text: "Self-paced lessons on markets, platforms, orders and risk." },
      { title: "Community Access.", text: "Ask questions and learn with other beginners." },
      { title: "Live Sessions.", text: "Periodic live walkthroughs — schedule to be confirmed." },
    ],
  },
  mastery: {
    eyebrow: "The mastery collection",
    title: "Forex Trading.",
    dim: "Mastery Courses.",
    body: "Go beyond the basics with focused, self-paced courses on market structure, liquidity and execution.",
    cards: [
      { tag: "Foundations", title: "Liquidity Concepts.", text: "Understand where orders rest, why price seeks them, and how to plan around liquidity." },
      { tag: "Advanced", title: "Market Structure.", text: "Read multi-timeframe structure and build a top-down plan before the session opens." },
      { tag: "Execution", title: "Define risk. Execute calmly.", text: "Position sizing, invalidation and trade management that protect capital first." },
    ],
  },
  academy: {
    eyebrow: "The academy",
    title: "Learn in person",
    dim: "or anywhere online.",
    body: "A structured academy programme with physical and online tracks sharing one curriculum. Venues, dates and pricing are pending client confirmation.",
  },
  coaching: {
    eyebrow: "1-on-1 coaching",
    title: "Private coaching",
    dim: "built around you.",
    body: "Work directly with the mentor in personalised sessions that audit your trading, refine your process and strengthen your psychology.",
    bullets: [
      "Private, personalised sessions",
      "Trading journal & chart audit",
      "Strategy refinement for your schedule",
      "Psychology and risk-discipline work",
      "Clear action plan after every session",
    ],
  },
  blogs: { eyebrow: "Editorial", title: "Market Insights.", dim: "Lessons & notes." },
  collaborate: {
    eyebrow: "Open for collaboration",
    title: "Partner with us.",
    dim: "Build something credible.",
    body: "Brand sponsorships, speaking engagements, media interviews and education partnerships. Tell us what you have in mind.",
    tracks: [
      { title: "Brand partnerships", text: "Sponsorships and co-branded education." },
      { title: "Media & speaking", text: "Podcasts, panels, stages and interviews." },
    ],
  },
  faq: {
    eyebrow: "Knowledge base",
    title: "Everything you",
    dim: "need to know.",
  },
  socials: {
    title: "Follow along",
    body: "Social channels will be linked here once the client confirms official handles.",
  },
} as const;
