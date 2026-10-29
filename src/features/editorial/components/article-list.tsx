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
      <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={active === cat}
            onClick={() => setActive(cat)}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
              active === cat ? "border-foreground bg-foreground text-background" : "border-border-strong text-foreground/70 hover:text-foreground",
            )}
          >
            {cat}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-[var(--radius-card)] border border-dashed border-border-strong py-20 text-center">
          <FileSearch aria-hidden className="size-10 text-foreground/35" />
          <p className="mt-4 text-lg font-semibold">No articles in this category yet</p>
        </div>
      ) : (
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((a) => (
            <li key={a.slug}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
