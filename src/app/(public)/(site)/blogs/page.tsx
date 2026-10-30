import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { ArticleList } from "@/features/editorial/components/article-list";
import { articleCategories, articles } from "@/features/editorial/data/articles";

export const metadata: Metadata = {
  title: "Blog",
  description: "Market notes, risk-management lessons and trading psychology from the editorial team.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-14 px-6 pt-36 pb-24">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h1 className="bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-[clamp(40px,6vw,60px)] leading-[1.05] font-bold tracking-[-0.03em] text-transparent">
          Market Insights &amp; Research
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-[1.6] text-foreground/55">
          Practical articles on risk, structure and psychology. Current posts are draft samples awaiting editorial approval.
        </p>
      </Reveal>
      <ArticleList articles={articles} categories={articleCategories} />
    </div>
  );
}
