"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Search, SearchX } from "lucide-react";
import { useDeferredValue, useId, useState } from "react";
import { Badge, PlaceholderBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { easeOutExpo } from "@/design/motion";
import { cn } from "@/lib/cn";
import type { CourseLevel, CourseSummary } from "@/types/domain";
import { filterCourses, formatPrice } from "../filter";

const levels: { value: CourseLevel | "all"; label: string }[] = [
  { value: "all", label: "All levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export function CourseCatalog({ courses }: { courses: CourseSummary[] }) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<CourseLevel | "all">("all");
  const deferredQuery = useDeferredValue(query);
  const results = filterCourses(courses, { query: deferredQuery, level });
  const searchId = useId();

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <label htmlFor={searchId} className="sr-only">
            Search courses
          </label>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-foreground/40" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, topics…"
            className="min-h-13 w-full rounded-full border border-border-strong bg-white/[0.03] py-3.5 pr-5 pl-12 text-[15px] placeholder:text-foreground/35 focus:border-[var(--ring)] focus:outline-none"
          />
        </div>
        <div role="group" aria-label="Filter by level" className="flex flex-wrap gap-2">
          {levels.map((l) => (
            <button
              key={l.value}
              type="button"
              aria-pressed={level === l.value}
              onClick={() => setLevel(l.value)}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
                level === l.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border-strong text-foreground/70 hover:text-foreground",
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-foreground/45">
        {results.length} {results.length === 1 ? "course" : "courses"} found
      </p>

      {results.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-[var(--radius-card)] border border-dashed border-border-strong px-6 py-20 text-center">
          <SearchX aria-hidden className="size-10 text-foreground/35" />
          <p className="mt-5 text-[19px] font-semibold">No courses match your search</p>
          <p className="mt-2 max-w-sm text-foreground/55">Try a different keyword or clear the filters.</p>
          <Button
            variant="secondary"
            className="mt-6"
            onClick={() => {
              setQuery("");
              setLevel("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((course) => (
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
                  className="group flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-border-strong"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="primary">{course.level}</Badge>
                    {course.status === "demo" && <PlaceholderBadge label="Demo listing" />}
                  </div>
                  <h2 className="mt-6 text-[24px] font-bold tracking-tight">{course.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground/55">{course.subtitle}</p>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                    <div className="text-sm text-foreground/50">
                      {course.lessonsCount ? `${course.lessonsCount} lessons · ` : ""}
                      {formatPrice(course.price)}
                    </div>
                    <ArrowUpRight aria-hidden className="size-5 text-foreground/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
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
