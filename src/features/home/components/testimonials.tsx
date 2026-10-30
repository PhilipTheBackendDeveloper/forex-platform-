import Link from "next/link";
import { ChevronRight, Trophy } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { PlaceholderBadge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { routes } from "@/config/navigation";
import { homeContent } from "@/content/home";
import { cn } from "@/lib/cn";

const t = homeContent.testimonials;
// Reference bento: wide/narrow on row one, narrow/wide on row two.
const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

/**
 * Social proof in the reference's bento layout. Slots stay visibly empty until the client supplies
 * real, consented student stories — we never fabricate quotes, names or results.
 */
export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative overflow-hidden pt-32 pb-32 lg:pb-48">
      <div aria-hidden className="absolute top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[140px]" />
      <div className="container-site relative">
        <SectionHeading align="center" eyebrow={t.eyebrow} title={t.title.map((l) => <span key={l} className="block">{l}</span>)} dim={t.dim} />
        <Stagger className="mt-20 grid gap-5 md:grid-cols-12">
          {spans.map((span, i) => (
            <StaggerItem
              key={span + i}
              className={cn(
                "flex min-h-64 flex-col justify-between rounded-[var(--radius-panel)] border border-white/[0.07] bg-white/[0.025] p-7 shadow-[0_20px_60px_-30px_rgb(0_0_0/0.9)] backdrop-blur lg:p-8",
                span,
              )}
            >
              <div className="flex items-center gap-3">
                <span aria-hidden className="size-10 rounded-full border border-white/10 bg-white/[0.06]" />
                <div>
                  <p className="text-[15px] font-semibold text-foreground/70">Student name</p>
                  <p className="text-[13px] text-foreground/40">Programme · location</p>
                </div>
              </div>
              <div className={cn("mt-6 space-y-2.5", i % 3 === 0 && "lg:pr-10")} aria-hidden>
                <div className="h-3 w-11/12 rounded-full bg-white/[0.06]" />
                <div className="h-3 w-4/5 rounded-full bg-white/[0.06]" />
                <div className="h-3 w-2/3 rounded-full bg-white/[0.06]" />
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/[0.08] px-3 py-1.5 text-[12px] text-success/80">
                  <Trophy aria-hidden className="size-3.5" /> Outcome — verified only
                </span>
                <PlaceholderBadge label="Awaiting approved story" />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-14 flex justify-center">
          <Link
            href={routes.register}
            className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-foreground px-7 text-[15px] font-semibold text-background shadow-[0_0_40px_-10px_rgb(255_255_255/0.5)] transition-colors hover:bg-white"
          >
            {t.cta}
            <ChevronRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
