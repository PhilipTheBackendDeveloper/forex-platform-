import type { Article } from "@/types/domain";

/**
 * Draft sample articles written for this project (original text, not scraped). Replace with
 * CMS content once the editorial backend is chosen. `status: "draft-sample"` keeps them
 * clearly labelled in the UI.
 */
export const articles: Article[] = [
  {
    slug: "risk-first-position-sizing",
    title: "Risk First: A Simple Guide to Position Sizing",
    excerpt: "Why the size of a trade matters more than the entry — and a step-by-step way to size every position.",
    category: "Risk Management",
    author: "Editorial team",
    publishedAt: "2026-10-01",
    readingMinutes: 6,
    status: "draft-sample",
    body: [
      "Most beginners spend their time hunting for the perfect entry. Experienced traders spend it deciding how much they are willing to lose if they are wrong.",
      "Position sizing turns that decision into a number. Start with the share of your account you are prepared to risk on one idea, decide where your trade is invalidated, then size the position so that the distance to invalidation equals that risk.",
      "This keeps every loss small and comparable, which is what lets you review your process honestly. It does not make losses disappear — no method can.",
      "Write your risk rule down before the session opens and treat it as non-negotiable. Consistency here is a skill you can practise long before you are consistent anywhere else.",
    ],
  },
  {
    slug: "building-a-trading-routine",
    title: "Building a Trading Routine You Can Actually Follow",
    excerpt: "A practical pre-session, in-session and post-session routine that fits around a busy week.",
    category: "Psychology",
    author: "Editorial team",
    publishedAt: "2026-09-18",
    readingMinutes: 5,
    status: "draft-sample",
    body: [
      "A routine is not about trading more. It is about making the same good decisions on a tired Tuesday as on a fresh Monday.",
      "Before the session: mark higher-timeframe levels, note scheduled news, and write the one or two scenarios you are prepared to trade.",
      "During the session: only act on scenarios you wrote down. If nothing lines up, the routine has done its job by keeping you out.",
      "After the session: journal what happened, what you did, and what you would repeat. Over weeks, the journal becomes your best teacher.",
    ],
  },
  {
    slug: "reading-market-structure",
    title: "Reading Market Structure Without the Noise",
    excerpt: "Highs, lows and the story they tell — a calm framework for top-down analysis.",
    category: "Strategy",
    author: "Editorial team",
    publishedAt: "2026-09-02",
    readingMinutes: 7,
    status: "draft-sample",
    body: [
      "Market structure is simply the sequence of swing highs and swing lows. When highs and lows step upward, buyers are in control; when they step down, sellers are.",
      "Start on a higher timeframe to understand the bigger story, then move down only to refine where you would act.",
      "Structure shifts are information, not signals. Combine them with your risk plan and a clear invalidation point before acting.",
    ],
  },
  {
    slug: "your-first-90-days",
    title: "What to Focus on in Your First 90 Days",
    excerpt: "Skip the shortcuts: the learning milestones that matter most at the start.",
    category: "Beginners",
    author: "Editorial team",
    publishedAt: "2026-08-20",
    readingMinutes: 4,
    status: "draft-sample",
    body: [
      "Month one: learn the vocabulary, the platform and how orders work — on a demo account.",
      "Month two: pick one simple approach and journal every practice trade against written rules.",
      "Month three: review your journal for patterns in your behaviour, not just your results. That review habit is the real milestone.",
    ],
  },
];

export const articleCategories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
