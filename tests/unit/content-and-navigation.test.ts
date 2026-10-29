import { describe, expect, it } from "vitest";
import { footerNav, isActivePath, primaryNav, routes } from "@/config/navigation";
import { siteConfig } from "@/config/site.config";
import { courses } from "@/features/courses/data/courses";
import { articles } from "@/features/editorial/data/articles";
import { leadSchema } from "@/features/leads/schemas";
import { registerSchema } from "@/features/auth/schemas";

describe("navigation", () => {
  it("never uses placeholder hrefs", () => {
    const all = [...primaryNav, ...footerNav.flatMap((g) => g.links)];
    for (const link of all) {
      expect(link.href).not.toBe("#");
      expect(link.href.startsWith("/")).toBe(true);
    }
  });

  it("does not link the public site into the dashboard before it exists", () => {
    const all = [...primaryNav, ...footerNav.flatMap((g) => g.links)].map((l) => l.href);
    expect(all).not.toContain(routes.dashboard);
  });

  it("marks active paths, including nested routes", () => {
    expect(isActivePath("/mastery-courses/forex-foundations", "/mastery-courses")).toBe(true);
    expect(isActivePath("/", "/academy")).toBe(false);
    expect(isActivePath("/about", "/")).toBe(false);
    expect(isActivePath("/", "/#faq")).toBe(false);
  });
});

describe("content integrity", () => {
  it("has unique slugs", () => {
    expect(new Set(courses.map((c) => c.slug)).size).toBe(courses.length);
    expect(new Set(articles.map((a) => a.slug)).size).toBe(articles.length);
  });

  it("does not ship unapproved prices", () => {
    for (const c of courses) {
      if (c.status !== "published") expect(c.price).toBeNull();
    }
  });

  it("keeps unfinished integrations switched off", () => {
    expect(siteConfig.features.paymentsConnected).toBe(false);
    expect(siteConfig.features.formDeliveryConnected).toBe(false);
  });
});

describe("form schemas", () => {
  const valid = {
    kind: "collaboration",
    name: "Ama Mensah",
    email: "ama@example.com",
    message: "We would like to discuss a partnership.",
    consent: "on",
  };

  it("accepts a valid lead", () => {
    expect(leadSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects a bad email, missing consent and a filled honeypot", () => {
    expect(leadSchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...valid, consent: undefined }).success).toBe(false);
    expect(leadSchema.safeParse({ ...valid, website: "spam.example" }).success).toBe(false);
  });

  it("requires matching passwords on register", () => {
    const base = { name: "Ama", email: "ama@example.com", password: "abcdef1234", terms: "on" };
    expect(registerSchema.safeParse({ ...base, confirm: "abcdef1234" }).success).toBe(true);
    expect(registerSchema.safeParse({ ...base, confirm: "different1" }).success).toBe(false);
  });
});
