import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { PlaceholderBadge } from "@/components/ui/badge";
import { Dim, SectionEyebrow } from "@/components/ui/section-heading";
import { PortraitScene } from "@/components/shared/portrait-scene";
import { clientCutouts } from "@/config/assets";
import { routes } from "@/config/navigation";
import { homeContent } from "@/content/home";

const k = homeContent.coaching;
const photo = clientCutouts.blackOutfitWindow;

/** Corner brackets drawn around the framed photo (reference "viewfinder" frame). */
function Corners() {
  const base = "absolute size-5 border-white/40";
  return (
    <>
      <span aria-hidden className={`${base} -top-px -left-px rounded-tl-xl border-t border-l`} />
      <span aria-hidden className={`${base} -top-px -right-px rounded-tr-xl border-t border-r`} />
      <span aria-hidden className={`${base} -bottom-px -left-px rounded-bl-xl border-b border-l`} />
      <span aria-hidden className={`${base} -right-px -bottom-px rounded-br-xl border-r border-b`} />
    </>
  );
}

export function CoachingFeature() {
  return (
    <section id="coaching" className="relative overflow-hidden py-24 lg:py-44">
      <div aria-hidden className="absolute top-1/3 right-[10%] h-[560px] w-[560px] rounded-full bg-primary/[0.12] blur-[150px]" />
      <div className="container-site relative grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionEyebrow>{k.eyebrow}</SectionEyebrow>
            <h2 className="mt-6 text-[clamp(40px,4.8vw,66px)] leading-[0.98] font-extrabold tracking-[-0.045em]">
              {k.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <Dim block>{k.dim}</Dim>
            </h2>
            <span aria-hidden className="mt-10 block h-px w-32 bg-linear-to-r from-white/20 to-transparent" />
            <p className="mt-8 max-w-md text-[16px] leading-[1.7] text-foreground/60">{k.body}</p>
          </Reveal>
          <Stagger className="mt-10 flex flex-col gap-3.5">
            {k.bullets.map((b) => (
              <StaggerItem key={b} className="flex items-center gap-3 text-[15px] text-foreground/75">
                <span className="inline-flex size-5 items-center justify-center rounded-full border border-success/40 bg-success/10">
                  <Check aria-hidden className="size-3 text-success" />
                </span>
                {b}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1} className="relative pb-40 sm:pb-24 lg:pb-0">
          <div className="relative ml-auto aspect-[4/5] w-full max-w-[420px] rounded-[1.6rem] border border-primary/30 p-2 shadow-[0_0_80px_-20px_var(--primary)]">
            <Corners />
            <div className="relative h-full overflow-hidden rounded-[1.2rem] bg-[#030a1a]">
              <PortraitScene
                src={photo.src}
                alt={photo.alt}
                sizes="(min-width:1024px) 420px, 90vw"
                position="50% 0%"
                inset="top-[8%]"
                glowAt="60% 35%"
                zoom={false}
                fades={{ bottom: true }}
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-[min(100%,380px)] rounded-[1.4rem] border border-white/10 bg-[#0b1220]/95 p-6 shadow-2xl backdrop-blur-xl lg:-left-10 lg:bottom-[-60px]">
            <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-success uppercase">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/60" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {k.card.status}
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {k.card.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[13px] text-foreground/55">
                  <span aria-hidden className="h-px w-4 bg-white/20" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-end justify-between gap-4 border-t border-white/10 pt-5">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/40 uppercase">{k.card.feeLabel}</p>
                <p className="mt-1 text-[24px] font-bold">TBC</p>
                <PlaceholderBadge label="Pricing pending" />
              </div>
              <Link
                href={routes.coaching}
                className="group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-white/20 px-4 text-[13px] font-medium whitespace-nowrap transition-colors hover:border-white/40 hover:bg-white/5"
              >
                {k.card.cta}
                <ArrowRight aria-hidden className="size-4 text-[var(--ring)] transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
