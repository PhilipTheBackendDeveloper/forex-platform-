import Link from "next/link";
import { GraduationCap, Send, Video } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { routes } from "@/config/navigation";
import { homeContent } from "@/content/home";

const b = homeContent.beginner;
const icons = { send: Send, cap: GraduationCap, video: Video };

export function BeginnerSection() {
  return (
    <section id="beginner-course" className="relative overflow-hidden bg-background-deep px-0 py-32">
      <div className="container-site flex flex-col items-center">
        <SectionHeading align="center" eyebrow={b.eyebrow} title={b.title} dim={b.dim} divider description={b.body} />
        {/* Unlike the reference (whose logged-out button does nothing), this always leads somewhere. */}
        <Link
          href={routes.register}
          className="mt-10 inline-flex min-h-14 items-center rounded-full bg-foreground px-9 text-[17px] font-semibold text-background shadow-[0_0_60px_-8px_rgb(255_255_255/0.45)] transition-[background-color,transform] duration-300 hover:scale-[1.02] hover:bg-white active:scale-[0.98]"
        >
          {b.cta}
        </Link>
        <p className="mt-16 text-[15px] text-foreground/70">What&apos;s included</p>
        <Stagger className="mt-10 grid w-full gap-12 md:grid-cols-3">
          {b.included.map((item) => {
            const Icon = icons[item.icon];
            return (
              <StaggerItem key={item.title}>
                <span className="inline-flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <Icon aria-hidden className="size-5 text-foreground/85" />
                </span>
                <h3 className="mt-6 text-[19px] font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-foreground/55">{item.text}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
