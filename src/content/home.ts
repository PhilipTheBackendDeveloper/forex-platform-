/**
 * Homepage copy. Original placeholder wording — NOT reference-site copy and NOT client-approved.
 * Section order and layout mirror the live reference audit (docs/research/LIVE_AUDIT.md).
 * Statistics, testimonials, event names and partner names are deliberately absent until the
 * client supplies verifiable data.
 */
export const homeContent = {
  hero: {
    /** Four display lines; index 1 gets the animated gradient, index 3 is the faded italic line. */
    lines: ["Trade", "Clearly.", "Think", "Longer."] as const,
    srTitle: "Trade clearly. Think longer.",
    intro: "A focused home for retail traders who want to build real skill — structure, risk discipline and patience.",
    introEmphasis: "Education first. No hype.",
    primaryCta: "Join the Community",
    secondaryCta: "Beginner? Start For Free",
    /** Non-numeric stand-ins for the reference's stats row (no verified numbers yet). */
    pillars: [
      { value: "Structured", label: "Curriculum" },
      { value: "Risk-first", label: "Method" },
      { value: "Live", label: "Sessions" },
      { value: "Mentor", label: "Access" },
    ],
  },
  testimonials: {
    eyebrow: "Success stories",
    title: ["Real progress", "from real"],
    dim: "Traders.",
    cta: "Start Your Success Story",
  },
  educator: {
    eyebrow: "Meet your mentor",
    title: ["The educator", "behind the"],
    dim: "method.",
    body: "Placeholder biography — replace with the mentor's approved story: background, teaching approach and verifiable credentials.",
    principles: [
      { value: "Clarity", label: "Repeatable framework" },
      { value: "Discipline", label: "Rules before entries" },
      { value: "Patience", label: "Fewer, better trades" },
    ],
    /** Captions describe the client's own photos — no invented events. */
    slides: [
      { photo: "blackOutfitWindow", kicker: "In the studio", title: "Mentor portrait", meta: "Photo · client supplied" },
      { photo: "london", kicker: "On location", title: "London, United Kingdom", meta: "Photo · client supplied" },
      { photo: "stainedGlass", kicker: "On location", title: "Behind the scenes", meta: "Photo · client supplied" },
      { photo: "yacht", kicker: "Off the charts", title: "Time away from the screens", meta: "Photo · client supplied" },
    ] as const,
  },
  community: {
    eyebrow: "Free community",
    title: ["Join our free", "trading", "education"],
    dim: "Community",
    subtitle: "Daily notes & breakdowns",
    body: "Market context, educational chart breakdowns and session recaps from the mentor — shared in one free community channel.",
    bullets: [
      "Daily market context",
      "Educational chart breakdowns",
      "Session recaps",
      "Announcements from the mentor",
      "Beginner-friendly discussion",
      "100% free to join",
    ],
    cta: "Join the Community Free",
  },
  beginner: {
    eyebrow: "Free beginner path",
    title: "Start your journey.",
    dim: "Zero cost attached.",
    body: "A free, self-paced beginner course that takes you from your first chart to a written trading plan. Any access requirements will be confirmed before launch.",
    cta: "Enroll for Free",
    included: [
      { icon: "send", title: "Community Channel.", text: "Free access to the community channel for daily educational market notes." },
      { icon: "cap", title: "Forex Foundations Course.", text: "Free access to the fundamentals course, from market basics to your first plan." },
      { icon: "video", title: "Live Sessions.", text: "Periodic live walkthroughs with the mentor — schedule to be confirmed." },
    ] as const,
  },
  mastery: {
    eyebrow: "The mastery collection",
    title: "Forex Trading.",
    dim: "Mastery Courses.",
    body: "Go beyond the basics. A growing library of focused courses on market structure, liquidity and execution.",
    cards: [
      { tag: "Foundations", title: ["Liquidity", "Concepts."], text: "Understand where orders rest, why price seeks them and how to plan around liquidity instead of becoming it." },
      { tag: "Advanced", title: ["Market", "Structure."], text: "Read multi-timeframe structure, pullbacks and ranges — and build a top-down plan before the session opens." },
      { tag: "Execution", title: ["Define risk.", "Execute calmly."], text: "Entry models, position sizing and invalidation that protect capital first and remove emotion from execution." },
    ],
    cta: "Explore Courses",
  },
  coaching: {
    eyebrow: "1-on-1 coaching",
    title: ["Private", "coaching with"],
    dim: "your mentor.",
    body: "Personalised trading education: work directly with the mentor in private sessions built around your goals and learning style.",
    bullets: [
      "Private, personalised sessions",
      "Strategies tailored to your goals",
      "One-on-one mentorship and guidance",
      "Feedback on your trading decisions",
      "Market analysis techniques",
      "Long-term development plan",
      "Scheduling that fits your week",
    ],
    card: {
      status: "Availability on request",
      items: ["Initial strategy assessment", "Recurring 1-to-1 video calls", "Direct support channel (scope TBC)", "Custom trading plan"],
      feeLabel: "Mentorship fee",
      cta: "Secure Your Spot",
    },
  },
  blogs: { eyebrow: "Editorial", title: "Market", dim: "Insights.", cta: "View all articles" },
  collaborate: {
    eyebrow: "Open for collaboration",
    title: ["Partner with", "a focused"],
    dim: "trading brand.",
    body: "We work with brands, regulated partners and media platforms that share our commitment to responsible, high-quality trading education.",
    tracks: [
      { title: "Corporate Branding", text: "Sponsorships & official endorsements." },
      { title: "Media Engagements", text: "Podcasts, stages and keynote talks." },
    ],
  },
  faq: { eyebrow: "Knowledge base", title: "Everything You Need to", dim: "Know." },
  socials: {
    headline: "Follow",
    body: "Daily education across our social channels. Official handles will appear here once confirmed.",
  },
} as const;
