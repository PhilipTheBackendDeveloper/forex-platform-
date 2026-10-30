import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { RevealLines } from "@/components/motion/reveal-lines";
import { toLines } from "@/components/motion/lines";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { clientPhotos } from "@/config/assets";
import { routes } from "@/config/navigation";
import { homeContent } from "@/content/home";

const k = homeContent.coaching;
const photo = clientPhotos.blackOutfitWindow;

const corner = "absolute z-20 size-6 border-primary/50 transition-all duration-700 group-hover:border-blue-400";

/**
 * Private coaching — spec measured from the reference: 12-col grid (5 / 7), #0a0f1c section,
 * 460×700 glass frame with moving corner brackets; the photo is black & white
 * (`mix-blend-luminosity`, 80%) and turns to full colour with a slow zoom on hover;
 * gradient-bordered fee card overlapping the frame.
 */
export function CoachingFeature() {
  return (
    <section id="coaching" className="relative overflow-hidden py-24 lg:py-48">
      <div className="mx-auto max-w-350 px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-8">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[#0a0f1c]" />
          <div className="relative z-20 flex flex-col justify-center lg:col-span-5">
            <Reveal delay={0.1} className="mb-10">
              <SectionEyebrow>{k.eyebrow}</SectionEyebrow>
            </Reveal>
            <RevealLines lines={toLines(k.title, k.dim, "half")} fontSize="clamp(44px, 5vw, 72px)" delay={0.2} step={0.08} className="mb-9" />
            <Reveal delay={0.5}>
              <div aria-hidden className="mb-10 h-px max-w-[200px] bg-white/8" />
              <p className="mb-12 max-w-[600px] text-[16px] leading-[1.6] text-white/70">{k.body}</p>
              <ul className="mb-8 flex flex-col gap-4" aria-label="Coaching benefits">
                {k.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span aria-hidden className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border border-success/30 bg-success/10 text-[10px] text-success">
                      ✓
                    </span>
                    <span className="text-[15px] font-medium text-white/70">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="relative mt-12 flex h-187.5 w-full items-center justify-center lg:col-span-7 lg:mt-0 lg:h-225">
            <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12)_0%,transparent_60%)] mix-blend-screen" />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_80%)] bg-size-[3rem_3rem] opacity-20" />

            <Reveal y={40} className="group relative z-10 h-150 w-[90%] overflow-hidden rounded-[2.5rem] border border-blue-500/20 bg-[#051024]/40 shadow-[0_0_80px_rgba(59,130,246,0.1)] backdrop-blur-md lg:h-175 lg:w-115">
              <span aria-hidden className={`${corner} top-4 left-4 border-t border-l group-hover:-translate-x-2 group-hover:-translate-y-2`} />
              <span aria-hidden className={`${corner} top-4 right-4 border-t border-r group-hover:translate-x-2 group-hover:-translate-y-2`} />
              <span aria-hidden className={`${corner} bottom-4 left-4 border-b border-l group-hover:-translate-x-2 group-hover:translate-y-2`} />
              <span aria-hidden className={`${corner} right-4 bottom-4 border-r border-b group-hover:translate-x-2 group-hover:translate-y-2`} />
              <div className="absolute inset-2 isolate overflow-hidden rounded-4xl bg-background lg:inset-3">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1024px) 90vw, 460px"
                  className="scale-105 object-cover opacity-80 mix-blend-luminosity transition-all duration-[2s] group-hover:scale-110 group-hover:opacity-100 group-hover:mix-blend-normal"
                  style={{ objectPosition: photo.focus }}
                />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(59,130,246,0.05)_51%,transparent_51%)] bg-size-[100%_4px] opacity-50 mix-blend-overlay" />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-[#051024] via-[#051024]/20 to-transparent opacity-90" />
              </div>
            </Reveal>

            <Reveal delay={0.3} y={40} className="absolute -bottom-6 z-30 w-[95%] rounded-3xl bg-linear-to-br from-blue-500/20 via-transparent to-[#10b981]/20 p-1 lg:-bottom-12 lg:-left-16 lg:w-120">
              <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-background/90 p-8 shadow-[0_40px_100px_rgba(5,16,36,0.9)] backdrop-blur-3xl lg:p-10">
                <div aria-hidden className="absolute top-0 right-1/4 h-px w-32 bg-linear-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_rgba(59,130,246,1)]" />
                <div className="relative flex flex-col gap-6">
                  <div className="flex items-start justify-between" aria-hidden>
                    <div className="flex items-center gap-3">
                      <span className="relative flex size-3 items-center justify-center">
                        <span className="absolute inset-0 animate-ping rounded-full bg-[#10b981] opacity-40" />
                        <span className="size-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[#10b981] uppercase">{k.card.status}</span>
                    </div>
                    <span className="relative flex size-8 animate-[spin_15s_linear_infinite] items-center justify-center rounded-full border border-blue-500/20">
                      <span className="absolute -top-0.5 size-1 rounded-full bg-blue-400/80" />
                      <span className="absolute inset-2 animate-[spin_10s_linear_infinite_reverse] rounded-full border border-blue-400/30" />
                    </span>
                  </div>
                  <ul className="grid grid-cols-1 gap-y-3" aria-label="Coaching inclusions">
                    {k.card.items.map((item) => (
                      <li key={item} className="group/item flex cursor-default items-center gap-4">
                        <span aria-hidden className="h-px w-6 bg-blue-500/20 transition-all duration-500 group-hover/item:w-10 group-hover/item:bg-blue-400/60" />
                        <span className="text-[13px] font-light tracking-wide text-white/50 transition-colors duration-300 group-hover/item:text-blue-100">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div aria-hidden className="my-2 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
                  <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                    <div>
                      <h4 className="mb-1 block font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">{k.card.feeLabel}</h4>
                      <p className="text-5xl leading-none font-bold tracking-tighter text-white">TBC</p>
                      <p className="mt-2 text-[11px] text-white/35">Pricing pending client approval</p>
                    </div>
                    <Link
                      href={routes.coaching}
                      className="group/btn relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-blue-500/40 px-8 py-4 font-medium text-blue-50 transition-colors hover:border-blue-400 sm:w-auto"
                    >
                      <span aria-hidden className="absolute inset-0 translate-y-full bg-blue-500/10 transition-transform duration-500 ease-out group-hover/btn:translate-y-0" />
                      <span className="relative z-10 flex items-center gap-3 text-sm tracking-wide whitespace-nowrap">
                        {k.card.cta}
                        <ArrowRight aria-hidden className="size-4 text-blue-400" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
