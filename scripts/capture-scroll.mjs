// Screen-by-screen captures of OUR pages for side-by-side comparison with the reference audit.
// Usage: node scripts/capture-scroll.mjs <path> [--base=http://localhost:3200] [--viewport=desktop|mobile] [--out=dir]
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const arg = (n, d) => process.argv.find((a) => a.startsWith(`--${n}=`))?.split("=").slice(1).join("=") ?? d;
const path = process.argv[2] ?? "/";
const base = arg("base", "http://localhost:3200");
const vpName = arg("viewport", "desktop");
const vp = vpName === "mobile" ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const out = arg("out", `docs/qa/screenshots/compare/ours/${vpName}/${path === "/" ? "home" : path.slice(1).replaceAll("/", "__")}`);

await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const page = await (await browser.newContext({ viewport: vp, isMobile: vpName === "mobile", hasTouch: vpName === "mobile" })).newPage();
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 200)));
await page.goto(base + path, { waitUntil: "networkidle", timeout: 120_000 });
await page.waitForTimeout(1500);
let i = 0;
let lastY = -1;
while (i < 40) {
  const y = await page.evaluate(() => window.scrollY);
  if (y === lastY) break;
  await page.screenshot({ path: `${out}/${String(i).padStart(2, "0")}.jpg`, type: "jpeg", quality: 60 });
  lastY = y;
  i += 1;
  await page.evaluate((s) => window.scrollBy(0, s), Math.round(vp.height * 0.85));
  await page.waitForTimeout(800);
}
console.log(`${path} ${vpName}: ${i} screens → ${out}${errors.length ? `\nconsole errors:\n${errors.join("\n")}` : ""}`);
await browser.close();
