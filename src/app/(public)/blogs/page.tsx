import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { ArticleList } from "@/features/editorial/components/article-list";
import { articleCategories, articles } from "@/features/editorial/data/articles";

export const metadata: Metadata = {
  title: "Blog",
  description: "Market notes, risk-management lessons and trading psychology from the editorial team.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  return (
    <>
      <PageHero
        eyebrow="Editorial"
        title="Market insights."
        accent="Lessons & notes."
        description="Practical articles on risk, structure and psychology. Current posts are draft samples awaiting editorial approval."
      />
      <section className="container-site pb-32">
        <ArticleList articles={articles} categories={articleCategories} />
      </section>
    </>
  );
}
