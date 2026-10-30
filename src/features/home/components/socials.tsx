import { ArrowRight, AtSign, Camera, CirclePlay, Send, Users } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site.config";
import { homeContent } from "@/content/home";

const channels = [
  { label: "Instagram", icon: Camera, href: siteConfig.social.instagram },
  { label: "YouTube", icon: CirclePlay, href: siteConfig.social.youtube },
  { label: "X", icon: AtSign, href: siteConfig.social.x },
  { label: "Telegram", icon: Send, href: siteConfig.social.telegram },
  { label: "Facebook", icon: Users, href: siteConfig.social.facebook },
];

/**
 * Reference: huge animated follower counter + list of networks. We have no verified follower
 * number, so the display word replaces the counter until the client supplies one.
 */
export function SocialsSection() {
  const s = homeContent.socials;
  return (
    <section id="socials" aria-labelledby="socials-title" className="relative py-24 lg:py-32">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <h2 id="socials-title" className="text-[clamp(72px,11vw,150px)] leading-[0.85] font-black tracking-[-0.06em]">
            {s.headline}
            <span className="text-foreground/30">+</span>
          </h2>
          <span aria-hidden className="mt-10 block h-px w-32 bg-linear-to-r from-white/20 to-transparent" />
          <p className="mt-8 max-w-xs text-[14px] leading-relaxed text-foreground/55">{s.body}</p>
        </Reveal>
        <ul className="flex flex-col">
          {channels.map((ch) => {
            const inner = (
              <>
                <ch.icon aria-hidden className="size-5 text-foreground/70" />
                <span className="flex-1 text-[16px] font-semibold">{ch.label}</span>
                <span className="text-[13px] text-foreground/40">{ch.href ? "Follow" : "Handle pending"}</span>
                <ArrowRight aria-hidden className="size-4 text-foreground/40 transition-transform group-hover:translate-x-1" />
              </>
            );
            return (
              <li key={ch.label} className="border-b border-white/[0.06] last:border-0">
                {ch.href ? (
                  <a href={ch.href} target="_blank" rel="noopener noreferrer" className="group flex min-h-16 items-center gap-5 px-2 transition-colors hover:bg-white/[0.03]">
                    {inner}
                  </a>
                ) : (
                  <span aria-disabled="true" title="Handle pending client confirmation" className="flex min-h-16 items-center gap-5 px-2 opacity-60">
                    {inner}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
