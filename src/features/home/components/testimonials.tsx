import Link from "next/link";
import { ArrowRight, UserRound } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { routes } from "@/config/navigation";
import { homeContent } from "@/content/home";
import { cn } from "@/lib/cn";

const t = homeContent.testimonials;

/**
 * Social proof — card spec measured from the reference (12-col bento 8/4/4/8, rounded-3xl,
 * #0071e3/10 border → /30 on hover, #020510→#020818 gradient, grain, hover top glow, avatar
 * scale). Slots stay placeholders until the client supplies consented student stories.
 */
export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative overflow-hidden pt-32 pb-56 lg:pb-72">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 right-[10%] h-200 w-200 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)]" />
        <div className="absolute bottom-[20%] left-[-10%] h-150 w-150 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(48,209,88,0.02)_0%,transparent_60%)]" />
      </div>
      <div className="relative z-10 mx-auto max-w-310 px-6">
        <SectionHeading align="center" size="xl" eyebrow={t.eyebrow} title={t.title} dim={t.dim} className="mb-24" />
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-12" stagger={0.1}>
          {t.slots.map((slot, i) => {
            const wide = slot.span === 8;
            return (
              <StaggerItem key={i} className={cn(wide ? "md:col-span-8" : "md:col-span-4", "flex")}>
                <figure className="group relative m-0 flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-primary/10 bg-linear-to-br from-[#020510] to-[#020818] p-6 shadow-[0_4px_32px_rgba(0,113,227,0.03)] transition-colors duration-500 hover:border-primary/30 md:p-7 xl:p-8">
                  <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-screen" />
                  <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <figcaption className="mb-4 flex items-center gap-3">
                      <span aria-hidden className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                        <UserRound className="size-4 text-white/40" />
                      </span>
                      <span>
                        <span className="block text-[15px] font-semibold tracking-tight text-white">{slot.name}</span>
                        <span className="block text-[12px] text-white/50">{slot.role}</span>
                      </span>
                    </figcaption>
                    <blockquote className={cn("mb-6", wide && "max-w-2xl")}>
                      <p className={cn("leading-[1.6] text-white/60", wide ? "text-[17px] font-medium tracking-tight md:text-[20px]" : "text-[14px] md:text-[15px]")}>“{slot.quote}”</p>
                    </blockquote>
                  </div>
                  <div className="relative z-10">
                    <span className="inline-flex items-center gap-2.5 rounded-full border border-success/20 bg-success/5 px-4 py-2 text-[13px] font-medium tracking-tight text-success">
                      <span aria-hidden className="size-1.5 rounded-full bg-success" />
                      {slot.outcome}
                    </span>
                  </div>
                </figure>
              </StaggerItem>
            );
          })}
        </Stagger>
        <Reveal delay={0.3} className="mt-20 flex justify-center">
          <Link
            href={routes.register}
            className="group relative inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-[15px] font-semibold tracking-tight text-background transition-transform duration-300 ease-out hover:scale-105"
          >
            {t.cta}
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
