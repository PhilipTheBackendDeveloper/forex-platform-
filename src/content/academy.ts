/** Academy copy — original placeholder text. Prices, venues, schedule and duration are pending. */
export const academyContent = {
  hero: {
    title: "Master the market.",
    accent: "On your terms.",
    description: "Structured trading education for every stage of your development — in a classroom or online, with one shared curriculum.",
    cta: "View Curriculum",
    note: "Physical • Online",
  },
  story: [
    { title: "Physical & Online", text: "Learn in person at a venue to be confirmed, or follow the exact same curriculum online from anywhere." },
    { title: "Live Market Sessions", text: "Watch frameworks applied to real, moving charts — reasoning first, outcomes second." },
    { title: "Small Cohorts", text: "Limited class sizes so every student gets individual feedback on their plan and risk." },
    { title: "Structured Timeline", text: "A paced programme that moves from fundamentals to advanced analysis. Exact duration to be confirmed." },
    { title: "A Clear Framework", text: "One repeatable way to read structure, plan scenarios and manage risk — written down, not improvised." },
    { title: "Completion Recognition", text: "A record of completion for students who finish the programme (format to be confirmed)." },
  ],
  venues: {
    eyebrow: "The venues",
    title: "Two formats.",
    dim: "One standard.",
    intro: "Whether you prefer the immersion of a classroom or the flexibility of online access, the curriculum stays the same.",
    items: [
      { title: "Physical.", text: "Immersive, in-person training alongside motivated peers, with hands-on guidance. Venue and dates to be confirmed." },
      { title: "Online.", text: "The same curriculum, live sessions and mentorship — on your schedule, from any device." },
    ],
  },
  values: [
    { title: "Personal Attention", text: "Direct feedback from experienced mentors. You never learn in isolation." },
    { title: "Live Analysis", text: "Real-time market breakdowns that show how a framework is applied, step by step." },
    { title: "Practical Setups", text: "Theory turned into checklists you can practise and journal." },
  ],
  curriculum: {
    eyebrow: "The curriculum",
    title: "Choose your level.",
    intro: "Structured tracks for distinct stages of your trading journey.",
  },
  tiers: [
    {
      name: "Beginner",
      stage: "Foundation",
      tagline: "The architecture of the markets.",
      featured: false,
      topics: [
        "Introduction to financial markets",
        "Using trading platforms (e.g. MT4/MT5)",
        "Placing your first demo trade step by step",
        "Core risk-management principles",
        "A simple, rules-based starter approach",
      ],
    },
    {
      name: "Advanced Strategy",
      stage: "Recommended",
      tagline: "For the analytical trader.",
      featured: true,
      topics: [
        "Market structure and multi-timeframe analysis",
        "Technical tools: levels, trend lines, Fibonacci",
        "Fundamental context and news risk",
        "Advanced risk and trade management",
        "Journaling and performance review",
      ],
    },
  ],
} as const;
