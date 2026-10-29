import { describe, expect, it } from "vitest";
import { courses } from "./data/courses";
import { filterCourses, formatPrice } from "./filter";

describe("filterCourses", () => {
  it("returns everything for an empty query and all levels", () => {
    expect(filterCourses(courses, { query: "", level: "all" })).toHaveLength(courses.length);
  });

  it("matches title, subtitle and tags case-insensitively", () => {
    expect(filterCourses(courses, { query: "LIQUIDITY", level: "all" }).map((c) => c.slug)).toEqual(["liquidity-and-execution"]);
    expect(filterCourses(courses, { query: "risk", level: "all" }).map((c) => c.slug)).toContain("forex-foundations");
  });

  it("filters by level", () => {
    const result = filterCourses(courses, { query: "", level: "beginner" });
    expect(result.every((c) => c.level === "beginner")).toBe(true);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterCourses(courses, { query: "zzz-not-a-course", level: "all" })).toEqual([]);
  });
});

describe("formatPrice", () => {
  it("never invents a price", () => {
    expect(formatPrice(null)).toBe("Price to be confirmed");
  });
  it("formats integer minor units", () => {
    expect(formatPrice({ amountMinor: 19900, currency: "USD" })).toBe("$199.00");
  });
});
