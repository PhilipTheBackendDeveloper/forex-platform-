import Link from "next/link";
import { GraduationCap, Send, Video } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { routes } from "@/config/navigation";
import { homeContent } from "@/content/home";

const b = homeContent.beginner;
const icons = { send: Send, cap: GraduationCap, video: Video };

/** Beginner path — reference spec: black section, centred heading, white glowing CTA, 3 columns. */
export function BeginnerSection() {
  return (
    <section id="beginner-course" className="relative overflow-hidden bg-black px-4 py-32">
      <div className="relative z-10 mx-auto max-w-350">
        <div className="mb-24 flex flex-col items-center text-center">
          <SectionHeading align="center" eyebrow={b.eyebrow} title={b.title} dim={b.dim} divider description={b.body} />
          {/* Unlike the reference (whose logged-out button does nothing), this always leads somewhere. */}
          <Reveal delay={0.45} className="mt-8 shrink-0">
            <Link
              href={routes.register}
              className="inline-flex items-center justify-center rounded-full bg-white px-10 py-5 text-lg font-semibold text-black shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-transform duration-300 hover:scale-105"
            >
              {b.cta}
            </Link>
          </Reveal>
        </div>
        <div className="relative flex flex-col gap-12">
          <Reveal delay={0.2} className="mt-12 text-center md:mt-0">
            <h3 className="text-base font-medium tracking-tight text-white/80">What&apos;s Included</h3>
          </Reveal>
          <Stagger className="grid grid-cols-1 gap-12 px-4 md:grid-cols-3 lg:gap-20 lg:px-8" stagger={0.1}>
            {b.included.map((item) => {
              const Icon = icons[item.icon];
              return (
                <StaggerItem key={item.title} className="flex flex-col">
                  <span aria-hidden className="mb-6 flex size-12 items-center justify-center rounded-2xl border border-white/8 bg-white/3">
                    <Icon className="size-5 text-white/85" />
                  </span>
                  <h3 className="mb-3 text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
                  <p className="leading-relaxed font-medium text-muted">{item.text}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
