"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Search, SearchX } from "lucide-react";
import { useDeferredValue, useId, useState } from "react";
import { PlaceholderBadge } from "@/components/ui/badge";
import { ChartCover } from "@/components/shared/visuals";
import { easeOutExpo } from "@/design/motion";
import type { CourseSummary } from "@/types/domain";
import { filterCourses, formatPrice } from "../filter";

/** Reference catalogue: one centred search field above a grid of cover cards. */
export function CourseCatalog({ courses }: { courses: CourseSummary[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const results = filterCourses(courses, { query: deferredQuery, level: "all" });
  const searchId = useId();

  return (
    <div>
      <div className="relative mx-auto w-full max-w-xl">
        <label htmlFor={searchId} className="sr-only">
          Search courses
        </label>
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-foreground/40" />
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search available courses…"
          className="min-h-13 w-full rounded-xl border border-border bg-white py-3.5 pr-5 pl-11 text-[14px] shadow-card placeholder:text-foreground/35 focus:border-primary focus:outline-none"
        />
      </div>

      <p aria-live="polite" className="sr-only">
        {results.length} {results.length === 1 ? "course" : "courses"} found
      </p>

      {results.length === 0 ? (
        <div className="mt-16 flex flex-col items-center rounded-[var(--radius-panel)] border border-dashed border-border bg-surface px-6 py-20 text-center">
          <SearchX aria-hidden className="size-10 text-foreground/35" />
          <p className="mt-5 text-[19px] font-semibold">No courses match your search</p>
          <p className="mt-2 max-w-sm text-foreground/55">Try a different keyword.</p>
          <button type="button" onClick={() => setQuery("")} className="mt-6 inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-[14px] font-semibold text-white hover:bg-primary-hover">
            Clear search
          </button>
        </div>
      ) : (
        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((course, i) => (
              <motion.li
                key={course.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
              >
                <Link
                  href={`/mastery-courses/${course.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-border bg-white shadow-card transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
                >
                  <ChartCover seed={i} label={course.level} className="aspect-[16/10] w-full" />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-[21px] font-bold tracking-tight">{course.title}</h2>
                      {course.status === "demo" && <PlaceholderBadge label="Demo" />}
                    </div>
                    <p className="mt-3 text-[14px] leading-relaxed text-foreground/55">{course.subtitle}</p>
                    <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-5">
                      <div>
                        <p className="text-[11px] font-semibold tracking-[0.15em] text-foreground/45 uppercase">Tuition</p>
                        <p className="mt-1 text-[17px] font-bold">{course.price ? formatPrice(course.price) : "TBC"}</p>
                      </div>
                      <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-white shadow-[0_0_24px_-6px_var(--primary)] transition-transform group-hover:translate-x-0.5">
                        <ChevronRight aria-hidden className="size-5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
