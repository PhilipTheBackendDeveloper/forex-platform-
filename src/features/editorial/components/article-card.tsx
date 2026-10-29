import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PlaceholderBadge } from "@/components/ui/badge";
import type { Article } from "@/types/domain";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/blogs/${article.slug}`}
      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-white/[0.02] p-7 transition-[border-color,background-color,transform] duration-500 hover:-translate-y-1 hover:border-border-strong hover:bg-white/[0.04]"
    >
      <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold tracking-[0.14em] uppercase">
        <span className="text-[var(--ring)]">{article.category}</span>
        <span className="text-foreground/35">{article.readingMinutes} min read</span>
        {article.status !== "published" && <PlaceholderBadge label="Draft sample" />}
      </div>
      <h3 className="mt-5 text-[21px] leading-snug font-semibold tracking-tight text-balance">{article.title}</h3>
      <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-foreground/55">{article.excerpt}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-foreground/70 group-hover:text-foreground">
        Read article
        <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
