export type FaqItem = { category: string; question: string; answer: string };

/** Placeholder FAQ — generic platform answers; client must review before launch. */
export const faqItems: FaqItem[] = [
  {
    category: "Platform access",
    question: "How do I access courses after enrolling?",
    answer:
      "Once accounts are live, everything you enrol in will appear in your personal learning dashboard. Student accounts are being built now — sign-in is not yet connected on this preview.",
  },
  {
    category: "Education",
    question: "Is this suitable for complete beginners?",
    answer:
      "Yes. The free beginner path starts from first principles — what the forex market is, how orders work and how to manage risk — before any strategy is introduced.",
  },
  {
    category: "Community",
    question: "What is included in the free community?",
    answer:
      "Educational market discussion, chart breakdowns and announcements. It is not personalised financial advice, and no outcome is guaranteed.",
  },
  {
    category: "Coaching",
    question: "How does 1-on-1 coaching work?",
    answer:
      "Coaching is a short series of private sessions that audit your trading, refine your process and address psychology. Format, availability and pricing will be confirmed by the team.",
  },
  {
    category: "Devices",
    question: "Can I learn on my phone?",
    answer: "Yes. The website and the upcoming student dashboard are designed to work on phones, tablets and desktops.",
  },
  {
    category: "Risk",
    question: "Will I make money trading?",
    answer:
      "There are no guarantees. Trading leveraged products carries a high risk of loss. Our goal is to teach skills and risk discipline — never to promise returns.",
  },
];
