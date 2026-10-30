import { ArrowUpRight, AtSign, Camera, CirclePlay, Send, Users } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site.config";
import { homeContent } from "@/content/home";

const channels = [
  { label: "Instagram", icon: Camera, href: siteConfig.social.instagram },
  { label: "YouTube", icon: CirclePlay, href: siteConfig.social.youtube },
  { label: "X", icon: AtSign, href: siteConfig.social.x },
  { label: "Telegram", icon: Send, href: siteConfig.social.telegram },
  { label: "Facebook", icon: Users, href: siteConfig.social.facebook },
];

const GUTTER = "max(24px, calc((100vw - 1200px) / 2 + 24px))";

/**
 * Socials — reference layout: 52% left column with a huge display line, rule and caption; borderless
 * rows on the right. The reference shows an animated follower count; we show a word until the client
 * supplies a verified figure.
 */
export function SocialsSection() {
  const s = homeContent.socials;
  return (
    <section id="socials" aria-labelledby="socials-title" className="relative">
      <h2 id="socials-title" className="sr-only">
        Social media
      </h2>
      <div className="flex flex-col pt-16 pb-28 lg:flex-row">
        <Reveal className="mb-16 shrink-0 lg:mb-0 lg:w-[52%]" style={{ paddingLeft: GUTTER, paddingRight: "clamp(28px, 4vw, 72px)" }}>
          <p className="leading-none font-black tracking-[-0.055em] text-foreground" style={{ fontSize: "clamp(80px, 10vw, 128px)" }}>
            {s.headline}
            <span className="text-white/40">+</span>
          </p>
          <div aria-hidden className="mt-7 mb-6 h-px max-w-48 bg-white/20" />
          <p className="max-w-[220px] text-[14px] leading-[1.65] tracking-[-0.015em] text-white/70">{s.body}</p>
        </Reveal>
        <Stagger className="m-0 flex flex-1 flex-col overflow-hidden px-6 md:px-12 lg:px-0" style={{ paddingRight: GUTTER }} stagger={0.055}>
          {channels.map((ch) => {
            const inner = (
              <>
                <ch.icon aria-hidden className="size-5 shrink-0 text-white/60 transition-colors group-hover:text-white" />
                <span className="flex-1 text-[15px] font-bold tracking-[-0.02em] text-white/90">{ch.label}</span>
                <span className="text-[12px] tracking-[0.02em] text-white/50">{ch.href ? "Follow" : "Handle pending"}</span>
                <ArrowUpRight aria-hidden className="size-4 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            );
            return (
              <StaggerItem key={ch.label} className="list-none">
                {ch.href ? (
                  <a href={ch.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 py-5">
                    {inner}
                  </a>
                ) : (
                  <span aria-disabled="true" title="Handle pending client confirmation" className="group flex items-center gap-5 py-5">
                    {inner}
                  </span>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
