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
    <section id="coaching" className="relative overflow-hidden bg-surface py-24 lg:py-48">
      <div className="mx-auto max-w-350 px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="relative z-20 flex flex-col justify-center lg:col-span-5">
            <Reveal delay={0.1} className="mb-10">
              <SectionEyebrow>{k.eyebrow}</SectionEyebrow>
            </Reveal>
            <RevealLines lines={toLines(k.title, k.dim, "accent")} fontSize="clamp(44px, 5vw, 72px)" delay={0.2} step={0.08} className="mb-9" />
            <Reveal delay={0.5}>
              <div aria-hidden className="mb-10 h-px max-w-[200px] bg-border" />
              <p className="mb-12 max-w-[600px] text-[16px] leading-[1.6] text-muted">{k.body}</p>
              <ul className="mb-8 flex flex-col gap-4" aria-label="Coaching benefits">
                {k.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span aria-hidden className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent-soft text-[10px] font-bold text-accent-strong">
                      ✓
                    </span>
                    <span className="text-[15px] font-medium text-foreground/80">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="relative mt-12 flex h-187.5 w-full items-center justify-center lg:col-span-7 lg:mt-0 lg:h-225">
            <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.08)_0%,transparent_60%)]" />

            <Reveal y={40} className="group relative z-10 h-150 w-[90%] overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-lift lg:h-175 lg:w-115">
              <span aria-hidden className={`${corner} top-4 left-4 border-t border-l group-hover:-translate-x-2 group-hover:-translate-y-2`} />
              <span aria-hidden className={`${corner} top-4 right-4 border-t border-r group-hover:translate-x-2 group-hover:-translate-y-2`} />
              <span aria-hidden className={`${corner} bottom-4 left-4 border-b border-l group-hover:-translate-x-2 group-hover:translate-y-2`} />
              <span aria-hidden className={`${corner} right-4 bottom-4 border-r border-b group-hover:translate-x-2 group-hover:translate-y-2`} />
              <div className="absolute inset-2 isolate overflow-hidden rounded-4xl bg-surface lg:inset-3">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1024px) 90vw, 460px"
                  className="scale-105 object-cover opacity-90 transition-all duration-[2s] group-hover:scale-110 group-hover:opacity-100"
                  style={{ objectPosition: photo.focus }}
                />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-80" />
              </div>
            </Reveal>

            <Reveal delay={0.3} y={40} className="absolute -bottom-6 z-30 w-[95%] rounded-3xl border border-border bg-card p-1 shadow-lift lg:-bottom-12 lg:-left-16 lg:w-120">
              <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-card p-8 lg:p-10">
                <div aria-hidden className="absolute top-0 right-1/4 h-0.5 w-32 bg-linear-to-r from-transparent via-primary to-transparent" />
                <div className="relative flex flex-col gap-6">
                  <div className="flex items-start justify-between" aria-hidden>
                    <div className="flex items-center gap-3">
                      <span className="relative flex size-3 items-center justify-center">
                        <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-40" />
                        <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
                      </span>
                      <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-accent-strong uppercase">{k.card.status}</span>
                    </div>
                    <span className="relative flex size-8 animate-[spin_15s_linear_infinite] items-center justify-center rounded-full border border-primary/20">
                      <span className="absolute -top-0.5 size-1 rounded-full bg-primary" />
                      <span className="absolute inset-2 animate-[spin_10s_linear_infinite_reverse] rounded-full border border-primary/30" />
                    </span>
                  </div>
                  <ul className="grid grid-cols-1 gap-y-3" aria-label="Coaching inclusions">
                    {k.card.items.map((item) => (
                      <li key={item} className="group/item flex cursor-default items-center gap-4">
                        <span aria-hidden className="h-px w-6 bg-primary/20 transition-all duration-500 group-hover/item:w-10 group-hover/item:bg-primary" />
                        <span className="text-[13px] font-medium tracking-wide text-muted transition-colors duration-300 group-hover/item:text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div aria-hidden className="my-2 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
                  <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                    <div>
                      <h4 className="mb-1 block font-mono text-[10px] tracking-[0.2em] text-muted uppercase">{k.card.feeLabel}</h4>
                      <p className="text-5xl leading-none font-bold tracking-tighter text-foreground">TBC</p>
                      <p className="mt-2 text-[11px] text-muted/70">Pricing pending client approval</p>
                    </div>
                    <Link
                      href={routes.coaching}
                      className="group/btn relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-primary px-8 py-4 font-semibold text-white shadow-md transition-all hover:bg-primary-hover sm:w-auto"
                    >
                      <span className="relative z-10 flex items-center gap-3 text-sm tracking-wide whitespace-nowrap">
                        {k.card.cta}
                        <ArrowRight aria-hidden className="size-4 transition-transform group-hover/btn:translate-x-1" />
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
