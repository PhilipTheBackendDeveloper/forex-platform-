import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/gold-digger",
  "/coaching",
  "/academy",
  "/mastery-courses",
  "/mastery-courses/forex-foundations",
  "/blogs",
  "/blogs/risk-first-position-sizing",
  "/events",
  "/shop",
  "/collaborations",
  "/about",
  "/privacy-policy",
  "/terms-of-service",
  "/cookie-policy",
  "/refund-policy",
  "/data-deletion",
  "/login",
  "/register",
];

for (const path of routes) {
  test(`${path} renders with one h1, no console errors and no horizontal overflow`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
    page.on("pageerror", (err) => errors.push(err.message));

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('a[href="#"]')).toHaveCount(0);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    const brokenImages = await page.evaluate(() =>
      Array.from(document.images).filter((img) => img.complete && img.loading !== "lazy" && img.naturalWidth === 0).length,
    );
    expect(brokenImages).toBe(0);
    expect(errors).toEqual([]);
  });
}

test("unknown routes return the 404 page", async ({ page }) => {
  const response = await page.goto("/definitely-not-a-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: /doesn.t exist/i })).toBeVisible();
});

test("/signin redirects to /login", async ({ page }) => {
  await page.goto("/signin");
  await expect(page).toHaveURL(/\/login$/);
});
