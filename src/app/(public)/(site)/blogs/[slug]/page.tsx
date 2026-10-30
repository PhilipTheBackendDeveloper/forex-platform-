import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronLeft, Clock, MessageSquare } from "lucide-react";
import { PlaceholderBadge } from "@/components/ui/badge";
import { ChartCover } from "@/components/shared/visuals";
import { siteConfig } from "@/config/site.config";
import { ArticleCard } from "@/features/editorial/components/article-card";
import { articles, getArticle } from "@/features/editorial/data/articles";
import { getArticleCover } from "@/features/editorial/data/covers";

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
  const cover = getArticleCover(article.slug);

  return (
    <>
      <article className="mx-auto max-w-4xl px-6 pt-32 pb-24">
        <Link href="/blogs" className="group inline-flex min-h-11 items-center gap-3 text-[14px] text-foreground/60 hover:text-foreground">
          <span className="flex size-8 items-center justify-center rounded-full border border-border bg-surface">
            <ChevronLeft aria-hidden className="size-4" />
          </span>
          Back to Articles
        </Link>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-[var(--ring)] uppercase">{article.category}</span>
          {article.status !== "published" && <PlaceholderBadge label="Draft sample" />}
        </div>
        <h1 className="mt-6 bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-[clamp(36px,5.5vw,60px)] leading-[1.08] font-bold tracking-[-0.03em] text-balance text-transparent">
          {article.title}
        </h1>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-border py-5 text-[14px] text-foreground/55">
          <span className="flex items-center gap-3">
            <span aria-hidden className="flex size-9 items-center justify-center rounded-full bg-primary text-[14px] font-bold text-white">
              {article.author.charAt(0)}
            </span>
            <span>
              <span className="block font-medium text-foreground">{article.author}</span>
              <span className="block text-[12px]">Author</span>
            </span>
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays aria-hidden className="size-4" />
            <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString("en-GB", { dateStyle: "long" })}</time>
          </span>
          <span className="flex items-center gap-2">
            <Clock aria-hidden className="size-4" /> {article.readingMinutes} min read
          </span>
        </div>
        {cover ? (
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[1.6rem] border border-border shadow-lift">
            <Image src={cover.src} alt={cover.alt} fill priority placeholder="blur" sizes="(min-width:1024px) 896px, 100vw" className="object-cover" style={{ objectPosition: cover.focus }} />
          </div>
        ) : (
          <ChartCover seed={articles.indexOf(article)} className="mt-10 aspect-[16/9] w-full rounded-[1.6rem] border border-border shadow-lift" />
        )}
        <div className="mt-12 flex flex-col gap-6 text-[18px] leading-[1.85] text-foreground/75">
          {article.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <aside className="mt-14 rounded-2xl border border-border bg-surface p-5 text-[13px] leading-relaxed text-foreground/50">{siteConfig.legal.riskDisclaimer}</aside>
      </article>

      <section aria-labelledby="comments-title" className="mx-auto max-w-4xl px-6 pb-16">
        <h2 id="comments-title" className="text-[24px] font-semibold">
          Comments (0)
        </h2>
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-dashed border-border bg-surface p-5 text-[14px] text-foreground/50">
          <MessageSquare aria-hidden className="size-5" />
          Comments open once accounts and moderation are connected.
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-[clamp(28px,3vw,36px)] font-bold tracking-tight">Read Next</h2>
          <p className="mt-2 text-[15px] text-foreground/50">Explore more articles and market insights.</p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} seed={articles.indexOf(a)} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
