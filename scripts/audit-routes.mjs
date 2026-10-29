// Lists every App Router page file and the URL it serves, flagging route-group collisions.
// Usage: node scripts/audit-routes.mjs
import { readdir } from "node:fs/promises";
import { join } from "node:path";

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name === "page.tsx" || entry.name === "route.ts") out.push(full);
  }
  return out;
}

const files = await walk("src/app");
const seen = new Map();
for (const file of files.sort()) {
  const url =
    "/" +
    file
      .replace(/^src\/app\/?/, "")
      .replace(/\/?(page\.tsx|route\.ts)$/, "")
      .split("/")
      .filter((seg) => seg && !/^\(.*\)$/.test(seg))
      .join("/");
  if (seen.has(url)) console.error(`DUPLICATE ${url}: ${seen.get(url)} and ${file}`);
  seen.set(url, file);
  console.log(url.padEnd(40), file);
}
console.log(`\n${seen.size} routes`);
