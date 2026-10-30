import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PlaceholderBadge } from "@/components/ui/badge";
import { ChartCover } from "@/components/shared/visuals";
import type { Article } from "@/types/domain";

/** Reference blog card: cover, category pill, title, excerpt, date + "Read ↗". */
export function ArticleCard({ article, seed = 0 }: { article: Article; seed?: number }) {
  return (
    <Link
      href={`/blogs/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#111827]/60 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-white/20"
    >
      <div className="relative">
        <ChartCover seed={seed} className="aspect-[16/9] w-full transition-transform duration-700 group-hover:scale-[1.03]" />
        <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[11px] font-medium backdrop-blur">{article.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        {article.status !== "published" && <PlaceholderBadge className="mb-3 w-fit" label="Draft sample" />}
        <h3 className="line-clamp-2 text-[19px] leading-snug font-semibold tracking-tight">{article.title}</h3>
        <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-foreground/50">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between border-t border-white/[0.07] pt-5 text-[13px]">
          <time dateTime={article.publishedAt} className="text-foreground/45">
            {new Date(article.publishedAt).toLocaleDateString("en-GB", { dateStyle: "long" })}
          </time>
          <span className="inline-flex items-center gap-1 font-medium text-[var(--ring)]">
            Read <ArrowUpRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
