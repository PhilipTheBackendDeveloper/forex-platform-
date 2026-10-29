import type { CourseLevel, CourseSummary } from "@/types/domain";

export type CourseFilter = { query: string; level: CourseLevel | "all" };

/** Pure, case-insensitive catalogue filter (title, subtitle and tags). Unit tested. */
export function filterCourses<T extends CourseSummary>(list: readonly T[], { query, level }: CourseFilter): T[] {
  const q = query.trim().toLowerCase();
  return list.filter((c) => {
    if (level !== "all" && c.level !== level) return false;
    if (!q) return true;
    return [c.title, c.subtitle, ...c.tags].some((field) => field.toLowerCase().includes(q));
  });
}

export function formatPrice(price: CourseSummary["price"]): string {
  if (!price) return "Price to be confirmed";
  return new Intl.NumberFormat("en", { style: "currency", currency: price.currency }).format(price.amountMinor / 100);
}
