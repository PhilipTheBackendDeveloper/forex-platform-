import { expect, test } from "@playwright/test";

test.describe("mobile menu", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");

  test("opens, closes on Escape, and closes after navigating", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Sign up" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    await page.getByRole("button", { name: "Open menu" }).click();
    await dialog.getByRole("link", { name: "Academy" }).click();
    await expect(page).toHaveURL(/\/academy$/);
    await expect(page.getByRole("dialog", { name: "Site menu" })).toBeHidden();
  });
});

test("global header on home, page sub-header on landing pages", async ({ page, isMobile }) => {
  await page.goto("/");
  if (!isMobile) await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Academy" })).toBeVisible();
  await page.goto("/coaching");
  await expect(page.getByRole("banner").getByText("Private Coaching")).toBeVisible();
  await page.getByRole("banner").getByRole("link", { name: "Home" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("course search filters and shows an empty state", async ({ page }) => {
  await page.goto("/mastery-courses");
  const search = page.getByLabel("Search courses");
  await search.fill("liquidity");
  await expect(page.getByText("1 course found")).toBeAttached();
  await search.fill("zzz-nothing");
  await expect(page.getByText("No courses match your search")).toBeVisible();
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(page.getByText("3 courses found")).toBeAttached();
});

test("proposal form requires a category, validates, and never fakes a send", async ({ page }) => {
  await page.goto("/collaborations");
  const submit = page.getByRole("button", { name: "Submit Proposal" });
  await expect(submit).toBeDisabled();
  await page.getByRole("radio", { name: "Brand Sponsorship" }).click();
  await expect(submit).toBeEnabled();
  await submit.click();
  await expect(page.getByText("Please enter your full name.")).toBeVisible();

  await page.getByLabel("Representative name").fill("Ama Mensah");
  await page.getByLabel("Work email").fill("ama@example.com");
  await page.getByLabel("Proposal outline").fill("We would like to discuss a sponsorship.");
  await page.getByRole("checkbox").check();
  await submit.click();
  await expect(page.getByText("Not sent — preview mode")).toBeVisible();
  await expect(page.getByText("Request sent")).toHaveCount(0);
});

test("FAQ accordion toggles and the ask bar gets an honest reply", async ({ page }) => {
  await page.goto("/#faq");
  const q = page.getByRole("button", { name: /Is this suitable for complete beginners/ });
  await q.click();
  await expect(q).toHaveAttribute("aria-expanded", "true");

  await page.getByLabel("Ask anything").fill("How much is coaching?");
  await page.getByRole("button", { name: "Ask the assistant" }).click();
  const panel = page.getByRole("dialog", { name: /assistant/i });
  await expect(panel).toBeVisible();
  await expect(panel.getByText(/isn't connected/)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
});

test("events: My Tickets modal opens and closes with Escape", async ({ page }) => {
  await page.goto("/events");
  await page.getByRole("button", { name: "View your event tickets" }).click();
  const modal = page.getByRole("dialog", { name: "My Tickets" });
  await expect(modal.getByText("No tickets found")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(modal).toBeHidden();
});

test("shop: bag drawer and orders modal", async ({ page }) => {
  await page.goto("/shop");
  await page.getByRole("button", { name: /Bag \(0\)/ }).click();
  await expect(page.getByRole("dialog", { name: "Your Bag" }).getByText("Your bag is empty.")).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await page.getByRole("button", { name: "View your order history" }).click();
  await expect(page.getByRole("dialog", { name: "My Orders" })).toBeVisible();
});

test("login never pretends to sign in", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email address").fill("student@example.com");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("Accounts aren't live yet")).toBeVisible();
  await expect(page).toHaveURL(/\/login$/);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("hero content is visible without animation", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: /Beginner\? Start For Free/ })).toBeVisible();
  });
});
