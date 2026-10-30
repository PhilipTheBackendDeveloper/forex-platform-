// Interactive audit of the public reference site (research only — no login, no form submission).
// Crawls internal links, captures viewport-by-viewport screenshots (JPEG) at desktop and mobile,
// and dumps the rendered DOM outline, fixed/sticky elements and running animations per page.
//
// Usage: node scripts/audit-reference.mjs [--max=40] [--only=/coaching,/academy]
// Output: docs/research/audit/<viewport>/<page>/NN.jpg + docs/research/audit/<viewport>/<page>.json
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const ORIGIN = "https://www.kojoforex.com";
const OUT = "docs/research/audit";
const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];
const MAX_PAGES = Number(arg("max") ?? 40);
const ONLY = arg("only")?.split(",");

const seeds = ONLY ?? [
  "/", "/gold-digger", "/coaching", "/academy", "/mastery-courses", "/blogs", "/events", "/shop",
  "/collaborations", "/privacy-policy", "/terms-of-service", "/cookie-policy", "/refund-policy",
  "/data-deletion", "/signin",
];
// Only sample a few blog posts; the rest share one template.
const MAX_BLOG_POSTS = 2;

const viewports = {
  desktop: { width: 1440, height: 900, isMobile: false },
  mobile: { width: 390, height: 844, isMobile: true },
};

const slug = (path) => (path === "/" ? "home" : path.slice(1).replace(/[/?#=&]+/g, "__").slice(0, 80));

async function outline(page) {
  return page.evaluate(() => {
    const txt = (el) => (el?.innerText ?? "").replace(/\s+/g, " ").trim();
    const short = (s, n = 160) => (s.length > n ? s.slice(0, n) + "…" : s);
    const cls = (el) => (typeof el.className === "string" ? el.className.slice(0, 220) : "");
    const rect = (el) => {
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) };
    };
    const main = document.querySelector("main") ?? document.body;
    const blocks = Array.from(main.querySelectorAll(":scope > *, :scope > * > section, section")).filter(
      (el, i, all) => all.indexOf(el) === i && el.getBoundingClientRect().height > 40,
    );
    const sections = blocks.slice(0, 60).map((el) => ({
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      cls: cls(el),
      rect: rect(el),
      bg: getComputedStyle(el).backgroundColor,
      position: getComputedStyle(el).position,
      headings: Array.from(el.querySelectorAll("h1,h2,h3,h4")).slice(0, 12).map((h) => `${h.tagName}: ${short(txt(h), 100)}`),
      text: short(txt(el), 500),
    }));
    const fixed = Array.from(document.querySelectorAll("body *"))
      .filter((el) => ["fixed", "sticky"].includes(getComputedStyle(el).position) && el.getBoundingClientRect().height > 0)
      .slice(0, 30)
      .map((el) => ({ tag: el.tagName.toLowerCase(), position: getComputedStyle(el).position, cls: cls(el), rect: rect(el), text: short(txt(el), 120) }));
    const links = Array.from(document.querySelectorAll("a[href]")).map((a) => ({
      text: short(txt(a) || a.getAttribute("aria-label") || "", 80),
      href: a.getAttribute("href"),
      inHeader: !!a.closest("header,nav"),
      inFooter: !!a.closest("footer"),
    }));
    const buttons = Array.from(document.querySelectorAll("button,[role=button],summary")).map((b) => ({
      text: short(txt(b) || b.getAttribute("aria-label") || b.getAttribute("title") || "", 80),
      aria: b.getAttribute("aria-label"),
      expanded: b.getAttribute("aria-expanded"),
      visible: b.getBoundingClientRect().width > 0,
      y: Math.round(b.getBoundingClientRect().y + scrollY),
    }));
    const fields = Array.from(document.querySelectorAll("input,textarea,select")).map((f) => ({
      tag: f.tagName.toLowerCase(),
      type: f.getAttribute("type"),
      name: f.getAttribute("name"),
      placeholder: f.getAttribute("placeholder"),
      label: f.id ? txt(document.querySelector(`label[for="${f.id}"]`)) : txt(f.closest("label")),
      required: f.required,
    }));
    const media = Array.from(document.querySelectorAll("img,video,iframe,canvas,svg[width]"))
      .filter((m) => m.getBoundingClientRect().width > 60)
      .slice(0, 60)
      .map((m) => ({ tag: m.tagName.toLowerCase(), src: (m.currentSrc || m.src || "").slice(0, 160), alt: m.alt ?? null, rect: rect(m) }));
    const animations = document.getAnimations().slice(0, 60).map((a) => ({
      name: a.animationName ?? a.constructor.name,
      duration: a.effect?.getTiming?.().duration,
      iterations: a.effect?.getTiming?.().iterations,
      target: a.effect?.target ? `${a.effect.target.tagName?.toLowerCase()}.${cls(a.effect.target).slice(0, 60)}` : null,
    }));
    const h1 = document.querySelector("h1");
    const typography = h1
      ? (({ fontFamily, fontSize, fontWeight, lineHeight, letterSpacing }) => ({ fontFamily, fontSize, fontWeight, lineHeight, letterSpacing }))(getComputedStyle(h1))
      : null;
    return {
      title: document.title,
      scrollHeight: document.documentElement.scrollHeight,
      bodyBg: getComputedStyle(document.body).backgroundColor,
      typography,
      sections,
      fixed,
      links,
      buttons,
      fields,
      media,
      animations,
    };
  });
}

async function headerStates(page) {
  const read = () =>
    page.evaluate(() => {
      const h = document.querySelector("header") ?? document.querySelector("nav");
      if (!h) return null;
      const s = getComputedStyle(h);
      const r = h.getBoundingClientRect();
      return { top: Math.round(r.top), height: Math.round(r.height), bg: s.backgroundColor, backdrop: s.backdropFilter, position: s.position, border: s.borderBottom, transform: s.transform };
    });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  const atTop = await read();
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(700);
  const scrolledDown = await read();
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(700);
  const scrolledUp = await read();
  return { atTop, scrolledDown, scrolledUp };
}

async function captureScroll(page, dir, vh) {
  await mkdir(dir, { recursive: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  let i = 0;
  let lastY = -1;
  // Cap at 40 screens per page.
  while (i < 40) {
    const y = await page.evaluate(() => window.scrollY);
    if (y === lastY) break;
    await page.screenshot({ path: `${dir}/${String(i).padStart(2, "0")}.jpg`, type: "jpeg", quality: 62 });
    lastY = y;
    i += 1;
    await page.evaluate((step) => window.scrollBy(0, step), Math.round(vh * 0.85));
    await page.waitForTimeout(900);
  }
  return i;
}

const browser = await chromium.launch({ channel: "chrome" });
const report = { origin: ORIGIN, startedAt: new Date().toISOString(), pages: {} };

for (const [vpName, vp] of Object.entries(viewports)) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.isMobile,
    hasTouch: vp.isMobile,
    deviceScaleFactor: 1,
    userAgent: vp.isMobile
      ? "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"
      : undefined,
  });
  const page = await context.newPage();
  const queue = [...seeds];
  const seen = new Set();
  let blogPosts = 0;

  while (queue.length && seen.size < MAX_PAGES) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);
    const dir = `${OUT}/${vpName}/${slug(path)}`;
    const consoleErrors = [];
    page.removeAllListeners("console");
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text().slice(0, 200)));
    try {
      const res = await page.goto(ORIGIN + path, { waitUntil: "domcontentloaded", timeout: 120_000 });
      await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => {});
      await page.waitForTimeout(2500); // client-rendered lists
      // Pre-scroll so in-view animations settle before the outline.
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
      });
      const data = await outline(page);
      const header = await headerStates(page);
      const screens = await captureScroll(page, dir, vp.height);
      report.pages[`${vpName}:${path}`] = { status: res?.status(), finalUrl: page.url(), screens, header, consoleErrors, ...data };
      await writeFile(`${OUT}/${vpName}/${slug(path)}.json`, JSON.stringify(report.pages[`${vpName}:${path}`], null, 2));
      console.log(`${vpName} ${path} → ${res?.status()} ${page.url().replace(ORIGIN, "")} screens=${screens} h=${data.scrollHeight}`);

      if (vpName === "desktop") {
        for (const { href } of data.links) {
          if (!href || !href.startsWith("/") || href.startsWith("//")) continue;
          const clean = href.split("#")[0].split("?")[0] || "/";
          if (seen.has(clean) || queue.includes(clean)) continue;
          if (/^\/(api|_next|dashboard|admin|meeting|egress-bot)/.test(clean)) continue;
          if (/\.(png|ico|webmanifest|xml|txt)$/.test(clean)) continue;
          if (clean.startsWith("/blogs/")) {
            if (blogPosts >= MAX_BLOG_POSTS) continue;
            blogPosts += 1;
          }
          queue.push(clean);
        }
      }
    } catch (err) {
      console.error(`FAILED ${vpName} ${path}: ${String(err).split("\n")[0]}`);
      report.pages[`${vpName}:${path}`] = { error: String(err).split("\n")[0] };
    }
  }
  // Mobile crawls the same set that desktop discovered.
  if (vpName === "desktop") seeds.splice(0, seeds.length, ...seen);
  await context.close();
}

await writeFile(`${OUT}/crawl-summary.json`, JSON.stringify(report, null, 2));
await browser.close();
console.log("done", Object.keys(report.pages).length, "page captures");
