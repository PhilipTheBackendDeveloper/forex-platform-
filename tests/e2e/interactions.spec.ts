import { expect, test } from "@playwright/test";

test.describe("mobile menu", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");

  test("opens, closes on Escape, and closes after navigating", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    await page.getByRole("button", { name: "Open menu" }).click();
    await dialog.getByRole("link", { name: "Academy" }).click();
    await expect(page).toHaveURL(/\/academy$/);
    await expect(page.getByRole("dialog", { name: "Site menu" })).toBeHidden();
  });
});

test("course search filters and shows an empty state", async ({ page }) => {
  await page.goto("/mastery-courses");
  const search = page.getByLabel("Search courses");
  await search.fill("liquidity");
  await expect(page.getByText("1 course found")).toBeVisible();
  await search.fill("zzz-nothing");
  await expect(page.getByText("No courses match your search")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByText("3 courses found")).toBeVisible();
});

test("collaboration form validates and never fakes a successful send", async ({ page }) => {
  await page.goto("/collaborations");
  await page.getByRole("button", { name: "Submit proposal" }).click();
  await expect(page.getByText("Please enter your full name.")).toBeVisible();

  await page.getByLabel("Full name").fill("Ama Mensah");
  await page.getByLabel("Email").fill("ama@example.com");
  await page.getByLabel("Proposal").fill("We would like to discuss a sponsorship.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Submit proposal" }).click();
  await expect(page.getByText("Not sent — preview mode")).toBeVisible();
  await expect(page.getByText("Request sent")).toHaveCount(0);
});

test("FAQ accordion toggles", async ({ page }) => {
  await page.goto("/#faq");
  const q = page.getByRole("button", { name: /Is this suitable for complete beginners/ });
  await q.click();
  await expect(q).toHaveAttribute("aria-expanded", "true");
});

test("login never pretends to sign in", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("student@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("Accounts aren't live yet")).toBeVisible();
  await expect(page).toHaveURL(/\/login$/);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("hero content is visible without animation", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: /Beginner\? Start Free/ })).toBeVisible();
  });
});
