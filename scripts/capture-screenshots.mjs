// Captures full-page screenshots of our pages (and optionally the reference site) at
// 390 / 768 / 1440 px. Usage:
//   node scripts/capture-screenshots.mjs                 # ours, http://localhost:3100
//   node scripts/capture-screenshots.mjs --reference     # https://www.kojoforex.com (public pages only)
// Uses the locally installed Google Chrome via Playwright's `channel: "chrome"`.
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const reference = process.argv.includes("--reference");
const base = reference ? "https://www.kojoforex.com" : (process.env.BASE_URL ?? "http://localhost:3100");
const outRoot = reference ? "docs/research/screenshots/reference" : "docs/qa/screenshots/ours";
const fullPage = !process.argv.includes("--fold");

const paths = reference
  ? ["/", "/gold-digger", "/coaching", "/academy", "/mastery-courses", "/blogs", "/events", "/shop", "/collaborations", "/privacy-policy"]
  : ["/", "/gold-digger", "/coaching", "/academy", "/mastery-courses", "/mastery-courses/forex-foundations", "/blogs",
     "/blogs/risk-first-position-sizing", "/events", "/shop", "/collaborations", "/about", "/privacy-policy", "/login", "/register"];

const viewports = { desktop: { width: 1440, height: 900 }, tablet: { width: 768, height: 1024 }, mobile: { width: 390, height: 844 } };

const browser = await chromium.launch({ channel: "chrome" });
for (const [name, viewport] of Object.entries(viewports)) {
  await mkdir(`${outRoot}/${name}`, { recursive: true });
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await context.newPage();
  for (const path of paths) {
    const file = `${outRoot}/${name}/${path === "/" ? "home" : path.slice(1).replaceAll("/", "__")}.png`;
    try {
      await page.goto(base + path, { waitUntil: "networkidle", timeout: 90_000 });
      // Trigger in-view reveals, then return to top.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(800);
      await page.screenshot({ path: file, fullPage });
      console.log("saved", file);
    } catch (err) {
      console.error("FAILED", base + path, name, String(err).split("\n")[0]);
    }
  }
  await context.close();
}
await browser.close();
