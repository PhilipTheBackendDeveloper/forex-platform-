import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PlaceholderBadge } from "@/components/ui/badge";
import { ArticleCard } from "@/features/editorial/components/article-card";
import { articles, getArticle } from "@/features/editorial/data/articles";
import { siteConfig } from "@/config/site.config";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blogs/${article.slug}` },
    openGraph: { type: "article", publishedTime: article.publishedAt, title: article.title, description: article.excerpt },
  };
}

export default async function ArticlePage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article className="relative px-6 pt-36 pb-24">
        <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-primary/12 blur-[140px]" />
        <div className="relative mx-auto max-w-[720px]">
          <Link href="/blogs" className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground/60 hover:text-foreground">
            <ArrowLeft aria-hidden className="size-4" /> All articles
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-[12px] font-semibold tracking-[0.14em] uppercase">
            <span className="text-[var(--ring)]">{article.category}</span>
            <span className="text-foreground/40">{article.readingMinutes} min read</span>
            {article.status !== "published" && <PlaceholderBadge label="Draft sample" />}
          </div>
          <h1 className="mt-5 text-[clamp(36px,5.5vw,60px)] leading-[1.02] font-bold tracking-[-0.035em] text-balance">{article.title}</h1>
          <p className="mt-6 text-[19px] leading-relaxed text-foreground/60">{article.excerpt}</p>
          <p className="mt-8 border-b border-border pb-8 text-sm text-foreground/45">
            By {article.author} ·{" "}
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString("en-GB", { dateStyle: "long" })}
            </time>
          </p>
          <div className="mt-10 flex flex-col gap-6 text-[18px] leading-[1.8] text-foreground/80">
            {article.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <aside className="mt-14 rounded-2xl border border-border bg-white/[0.02] p-5 text-[13px] leading-relaxed text-foreground/50">
            {siteConfig.legal.riskDisclaimer}
          </aside>
        </div>
      </article>
      <section className="container-site border-t border-border py-20">
        <h2 className="text-[28px] font-bold tracking-tight">Keep reading</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {related.map((a) => (
            <li key={a.slug}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
