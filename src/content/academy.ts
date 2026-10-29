import type { FaqItem } from "./faq";

/** Academy copy — original placeholder text. Prices, venues and schedules are pending. */
export const academyContent = {
  heroDescription: "Structured trading education for every stage of your development — in a classroom or online, with one shared curriculum.",
  venuesIntro:
    "Prefer an in-person classroom or flexible online access? Both tracks follow the same curriculum and standards.",
  venues: [
    { title: "Physical.", lead: "Immersive, in-person training.", text: "Learn alongside motivated peers with hands-on guidance. Venue and dates to be confirmed." },
    { title: "Online.", lead: "Learn from anywhere.", text: "The same curriculum, live sessions and mentorship — on your schedule, from any device." },
  ],
  values: [
    { title: "Personal attention", text: "Direct feedback from experienced mentors. You never learn in isolation." },
    { title: "Live analysis", text: "Watch frameworks applied to real, moving charts — reasoning first, outcomes second." },
    { title: "Practical setups", text: "Theory turned into checklists you can practise and journal." },
  ],
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
      stage: "Advanced",
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
  faq: [
    { category: "Format", question: "What is the difference between physical and online?", answer: "Only the delivery. Both follow the same curriculum; physical adds in-person sessions at a venue to be confirmed." },
    { category: "Duration", question: "How long does the programme take?", answer: "Programme length and schedules are being finalised and will be published before enrollment opens." },
    { category: "Requirements", question: "Do I need prior experience?", answer: "No experience is needed for the Beginner track. The Advanced track assumes you can already place and manage trades." },
  ] satisfies FaqItem[],
} as const;
