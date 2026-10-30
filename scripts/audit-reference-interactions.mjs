// Stage 2 of the reference audit: click every non-submit control and record what it does.
// Never submits forms, never signs in, never sends chat messages.
// Usage: node scripts/audit-reference-interactions.mjs [--only=/,/coaching] [--viewport=desktop|mobile]
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const ORIGIN = "https://www.kojoforex.com";
const OUT = "docs/research/audit/interactions";
const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];
const pages = arg("only")?.split(",") ?? [
  "/", "/gold-digger", "/coaching", "/academy", "/mastery-courses", "/blogs", "/events", "/shop", "/collaborations", "/signin",
];
const vpName = arg("viewport") ?? "desktop";
const vp = vpName === "mobile" ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const slug = (p) => (p === "/" ? "home" : p.slice(1).replace(/\//g, "__"));

const SKIP = /submit|send|sign in|sign up|log ?in|register|pay|checkout|buy|secure your seat|enroll|purchase|subscribe/i;

const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext({ viewport: vp, isMobile: vpName === "mobile", hasTouch: vpName === "mobile" });
const page = await context.newPage();
const results = {};

async function snapshotState() {
  return page.evaluate(() => ({
    url: location.href,
    dialogs: Array.from(document.querySelectorAll('[role=dialog],[aria-modal=true],dialog[open]')).filter((d) => d.getBoundingClientRect().height > 0).length,
    expanded: Array.from(document.querySelectorAll("[aria-expanded=true]")).length,
    fixedVisible: Array.from(document.querySelectorAll("body *")).filter((e) => getComputedStyle(e).position === "fixed" && e.getBoundingClientRect().height > 200).length,
    textLen: document.body.innerText.length,
    bodyOverflow: getComputedStyle(document.body).overflow,
  }));
}

async function load(path) {
  await page.goto(ORIGIN + path, { waitUntil: "domcontentloaded", timeout: 120_000 });
  await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => {});
  await page.waitForTimeout(2000);
}

for (const path of pages) {
  const dir = `${OUT}/${vpName}/${slug(path)}`;
  await mkdir(dir, { recursive: true });
  const log = [];
  try {
    await load(path);

    // Hover each header link (desktop) to reveal hover styles / dropdowns.
    if (vpName === "desktop") {
      const navLinks = page.locator("header a, nav a");
      const n = Math.min(await navLinks.count(), 8);
      for (let i = 0; i < n; i++) {
        const l = navLinks.nth(i);
        if (!(await l.isVisible())) continue;
        await l.hover();
        await page.waitForTimeout(450);
        await page.screenshot({ path: `${dir}/hover-nav-${i}.jpg`, type: "jpeg", quality: 60, clip: { x: 0, y: 0, width: vp.width, height: 260 } });
        log.push({ action: "hover-nav", index: i, text: (await l.innerText()).trim() });
      }
    }

    const buttons = page.locator("button, [role=button], summary");
    const count = Math.min(await buttons.count(), 40);
    for (let i = 0; i < count; i++) {
      const b = buttons.nth(i);
      let label = "";
      try {
        if (!(await b.isVisible())) continue;
        label = ((await b.innerText()) || (await b.getAttribute("aria-label")) || (await b.getAttribute("title")) || "").replace(/\s+/g, " ").trim().slice(0, 80);
        const type = await b.getAttribute("type");
        if (type === "submit" || SKIP.test(label)) {
          log.push({ index: i, label, skipped: "submit/commerce/auth" });
          continue;
        }
        await b.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        const before = await snapshotState();
        await page.screenshot({ path: `${dir}/btn-${String(i).padStart(2, "0")}-before.jpg`, type: "jpeg", quality: 55 });
        await b.click({ timeout: 4000 });
        await page.waitForTimeout(1000);
        const after = await snapshotState();
        await page.screenshot({ path: `${dir}/btn-${String(i).padStart(2, "0")}-after.jpg`, type: "jpeg", quality: 55 });
        const effect = {
          navigated: before.url !== after.url ? after.url.replace(ORIGIN, "") : null,
          dialogOpened: after.dialogs > before.dialogs,
          expandedDelta: after.expanded - before.expanded,
          overlayOpened: after.fixedVisible > before.fixedVisible,
          textDelta: after.textLen - before.textLen,
          scrollLocked: before.bodyOverflow !== after.bodyOverflow ? after.bodyOverflow : null,
        };
        log.push({ index: i, label, effect });
        if (effect.navigated) {
          await load(path);
        } else {
          await page.keyboard.press("Escape");
          await page.waitForTimeout(400);
          if (effect.dialogOpened || effect.overlayOpened) {
            const still = await snapshotState();
            log[log.length - 1].closesOnEscape = still.dialogs <= before.dialogs && still.fixedVisible <= before.fixedVisible;
            if (!log[log.length - 1].closesOnEscape) await load(path);
          }
        }
      } catch (err) {
        log.push({ index: i, label, error: String(err).split("\n")[0].slice(0, 160) });
      }
    }
    results[path] = log;
    console.log(vpName, path, "controls:", log.length);
  } catch (err) {
    results[path] = { error: String(err).split("\n")[0] };
    console.error("FAILED", path, String(err).split("\n")[0]);
  }
  await writeFile(`${OUT}/${vpName}-results.json`, JSON.stringify(results, null, 2));
}

await browser.close();
console.log("done");
