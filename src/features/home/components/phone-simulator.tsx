"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { BrandGlyph } from "@/components/layout/wordmark";
import { siteConfig } from "@/config/site.config";

type Post = { id: number; kind: "text" | "chart"; title: string; body: string; time: string; reactions: string[] };

/** Illustrative channel posts — educational notes only; no trade calls, prices or results. */
const POOL: Omit<Post, "id">[] = [
  { kind: "text", title: "Morning note", body: "Weekly levels are marked. No entries until price reaches our zones — patience first.", time: "07:12", reactions: ["👍", "🔥"] },
  { kind: "chart", title: "Chart breakdown", body: "4H structure shift explained: why we wait for confirmation before acting.", time: "09:30", reactions: ["📈", "👍"] },
  { kind: "text", title: "Risk reminder", body: "Define your invalidation and position size before you click buy or sell.", time: "11:05", reactions: ["✅"] },
  { kind: "text", title: "Session recap", body: "Today's lesson: fewer, better decisions. Journal the reason for every trade.", time: "16:48", reactions: ["🔥", "🙏"] },
  { kind: "chart", title: "Study this", body: "Liquidity sweep then reversal — mark where the stops were resting.", time: "18:20", reactions: ["🧠", "👍"] },
  { kind: "text", title: "Live session", body: "Live walkthrough this week — schedule to be announced in this channel.", time: "20:02", reactions: ["🎥"] },
];

const candles = [
  [18, 30, 22, 26],
  [24, 34, 26, 32],
  [30, 38, 31, 35],
  [33, 36, 25, 27],
  [26, 29, 18, 20],
  [20, 26, 16, 24],
  [24, 40, 23, 38],
  [37, 46, 35, 44],
  [43, 49, 39, 41],
  [41, 52, 40, 50],
] as const;

function MiniChart() {
  return (
    <svg viewBox="0 0 120 60" className="mt-2 h-24 w-full rounded-lg bg-[#0b1624]" aria-hidden>
      {[12, 24, 36, 48].map((y) => (
        <line key={y} x1="0" x2="120" y1={y} y2={y} stroke="rgb(255 255 255 / 0.05)" strokeWidth="0.5" />
      ))}
      {candles.map(([o, h, l, c], i) => {
        const x = 8 + i * 11;
        const up = c >= o;
        const y = (v: number) => 58 - v;
        return (
          <g key={i} stroke={up ? "#34d399" : "#f87171"} fill={up ? "#34d399" : "#f87171"}>
            <line x1={x} x2={x} y1={y(h)} y2={y(l)} strokeWidth="0.8" />
            <rect x={x - 2.5} width="5" y={y(Math.max(o, c))} height={Math.max(1.5, Math.abs(c - o))} rx="0.6" />
          </g>
        );
      })}
      <line x1="0" x2="120" y1="40" y2="40" stroke="#60a5fa" strokeDasharray="2 2" strokeWidth="0.6" />
    </svg>
  );
}

function StatusIcons() {
  return (
    <span className="flex items-center gap-1.5" aria-hidden>
      <svg viewBox="0 0 18 12" className="h-2.5 w-4 fill-white">
        <rect x="0" y="8" width="3" height="4" rx="1" />
        <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
        <rect x="10" y="3" width="3" height="9" rx="1" />
        <rect x="15" y="0" width="3" height="12" rx="1" />
      </svg>
      <svg viewBox="0 0 16 12" className="h-2.5 w-3.5 fill-white">
        <path d="M8 2.5c2.3 0 4.4.9 6 2.4l1-1.1C13.1 2 10.7 1 8 1S2.9 2 1 3.8l1 1.1c1.6-1.5 3.7-2.4 6-2.4Zm0 3.2c1.4 0 2.7.5 3.7 1.4l1-1.1A7 7 0 0 0 8 4.2 7 7 0 0 0 3.3 6l1 1.1c1-.9 2.3-1.4 3.7-1.4Zm0 3.1c.6 0 1.1.2 1.5.6L8 11 6.5 9.4c.4-.4.9-.6 1.5-.6Z" />
      </svg>
      <span className="relative flex h-3 w-6 items-center rounded-[4px] border border-white/60 p-[1.5px]">
        <span className="h-full w-[78%] rounded-[2px] bg-white" />
        <span className="absolute -right-[3px] h-1 w-[2px] rounded-r bg-white/60" />
      </span>
    </span>
  );
}

function Bubble({ post }: { post: Post }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[92%] rounded-2xl rounded-bl-md bg-[#182533] px-3 py-2.5 shadow-[0_1px_2px_rgb(0_0_0/0.4)]"
    >
      <p className="text-[11px] font-semibold text-[#64b5ef]">{siteConfig.name}</p>
      <p className="mt-0.5 text-[11.5px] font-semibold text-white">{post.title}</p>
      <p className="mt-0.5 text-[11.5px] leading-snug text-white/85">{post.body}</p>
      {post.kind === "chart" && <MiniChart />}
      <div className="mt-1.5 flex items-center justify-between gap-2">
        <span className="flex gap-1">
          {post.reactions.map((r) => (
            <span key={r} className="rounded-full bg-[#2b5278]/60 px-1.5 py-0.5 text-[10px] leading-none">
              {r}
            </span>
          ))}
        </span>
        <span className="text-[9px] text-white/35">{post.time}</span>
      </div>
    </motion.li>
  );
}

/**
 * High-fidelity phone "simulator": titanium frame, side buttons, Dynamic Island, screen glare and a
 * live channel UI whose posts arrive on a loop. Pure DOM/SVG — crisp at any size, no image assets.
 * Decorative (aria-hidden); the section text carries the content.
 */
export function PhoneSimulator() {
  const [posts, setPosts] = useState<Post[]>(() => POOL.slice(0, 3).map((p, i) => ({ ...p, id: i })));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let next = 3;
    const id = window.setInterval(() => {
      const p = POOL[next % POOL.length];
      if (!p) return;
      const post = { ...p, id: next };
      next += 1;
      setPosts((cur) => [...cur.slice(-3), post]);
    }, 3600);
    return () => window.clearInterval(id);
  }, []);

  const titanium = "linear-gradient(145deg, #8a8f98 0%, #3b3f46 22%, #1c1f24 50%, #4a4f57 78%, #9aa0a8 100%)";

  return (
    <div aria-hidden className="relative [perspective:1800px]">
      {/* Floor shadow */}
      <div className="absolute -bottom-10 left-1/2 h-16 w-[70%] -translate-x-1/2 rounded-[50%] bg-slate-900/15 blur-2xl" />
      <div className="animate-[levitate_6s_ease-in-out_infinite] motion-reduce:animate-none">
        <div className="relative [transform:rotateY(-18deg)_rotateX(8deg)_rotateZ(5deg)] [transform-style:preserve-3d]">
          {/* Side buttons */}
          {[
            { side: "left", top: 110, h: 28 },
            { side: "left", top: 160, h: 52 },
            { side: "left", top: 222, h: 52 },
            { side: "right", top: 180, h: 80 },
          ].map((b, i) => (
            <span
              key={i}
              className="absolute w-[4px] rounded-sm"
              style={{ [b.side]: -3, top: b.top, height: b.h, background: titanium }}
            />
          ))}
          {/* Titanium frame */}
          <div className="rounded-[58px] p-[3px] shadow-[0_50px_100px_-20px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.06),inset_0_0_2px_rgb(255_255_255/0.4)]" style={{ background: titanium }}>
            <div className="rounded-[55px] bg-black p-[11px]">
              <div className="relative h-[620px] w-[296px] overflow-hidden rounded-[45px] bg-[#0e1621] sm:h-[660px] sm:w-[316px]">
                {/* Dynamic Island */}
                <div className="absolute top-[11px] left-1/2 z-30 h-[30px] w-[98px] -translate-x-1/2 rounded-full bg-black" />
                {/* Status bar */}
                <div className="relative z-20 flex items-center justify-between px-7 pt-[15px] text-[13px] font-semibold text-white">
                  <span>9:41</span>
                  <StatusIcons />
                </div>
                {/* Channel header */}
                <div className="relative z-20 mt-3 flex items-center gap-2 border-b border-black/30 bg-[#17212b] px-3 py-2">
                  <span className="text-[22px] leading-none text-[#64b5ef]">‹</span>
                  <div className="flex-1 text-center">
                    <p className="text-[13px] font-semibold text-white">{siteConfig.name}</p>
                    <p className="text-[10px] text-white/45">channel</p>
                  </div>
                  <span className="flex size-8 items-center justify-center rounded-full bg-linear-to-br from-[#0a1a3a] to-[#020818] ring-1 ring-white/10">
                    <BrandGlyph className="size-4" />
                  </span>
                </div>
                {/* Pinned message */}
                <div className="relative z-20 flex items-center gap-2 border-b border-black/30 bg-[#17212b]/95 px-3 py-1.5">
                  <span className="h-6 w-[2px] rounded bg-[#64b5ef]" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-[#64b5ef]">Pinned message</p>
                    <p className="truncate text-[10px] text-white/70">Read before your first trade: our risk rules</p>
                  </div>
                </div>
                {/* Chat area */}
                <div className="absolute inset-x-0 top-[122px] bottom-[58px] overflow-hidden bg-[linear-gradient(160deg,#17212b_0%,#0e1621_60%,#0b1420_100%)]">
                  <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]" />
                  <ul className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-2.5 pb-3">
                    <AnimatePresence initial={false} mode="popLayout">
                      {posts.map((p) => (
                        <Bubble key={p.id} post={p} />
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>
                {/* Join bar */}
                <div className="absolute inset-x-0 bottom-0 flex h-[58px] items-start justify-center border-t border-black/30 bg-[#17212b] pt-3">
                  <span className="text-[13px] font-semibold tracking-wide text-[#64b5ef] uppercase">Join</span>
                  <span className="absolute bottom-2 h-[4px] w-[110px] rounded-full bg-white/60" />
                </div>
                {/* Glass glare */}
                <div className="pointer-events-none absolute inset-0 z-40 bg-[linear-gradient(115deg,rgb(255_255_255/0.10)_0%,rgb(255_255_255/0.03)_28%,transparent_42%)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
