"use client";

import { FileSearch } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import type { Article } from "@/types/domain";
import { ArticleCard } from "./article-card";

export function ArticleList({ articles, categories }: { articles: Article[]; categories: string[] }) {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? articles : articles.filter((a) => a.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={active === cat}
            onClick={() => setActive(cat)}
            className={cn(
              "min-h-11 rounded-full border px-5 text-[14px] font-medium transition-colors",
              active === cat ? "border-primary bg-primary text-white shadow-[0_0_24px_-6px_var(--primary)]" : "border-white/10 bg-white/[0.04] text-foreground/75 hover:text-foreground",
            )}
          >
            {cat === "All" ? "All Topics" : cat}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <div className="mt-12 flex flex-col items-center rounded-[1.6rem] border border-dashed border-white/15 py-20 text-center">
          <FileSearch aria-hidden className="size-10 text-foreground/35" />
          <p className="mt-4 text-lg font-semibold">No articles in this topic yet</p>
        </div>
      ) : (
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((a) => (
            <li key={a.slug}>
              <ArticleCard article={a} seed={articles.indexOf(a)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
