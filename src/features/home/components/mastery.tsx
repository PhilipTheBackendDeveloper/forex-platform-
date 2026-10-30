import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { StickyStack } from "@/components/shared/sticky-stack";
import { LiquidityVisual, RiskVisual, StructureVisual } from "@/components/shared/visuals";
import { routes } from "@/config/navigation";
import { homeContent } from "@/content/home";

const m = homeContent.mastery;
const visuals = [<LiquidityVisual key="l" />, <StructureVisual key="s" />, <RiskVisual key="r" />];

/** Mastery collection — reference spec: centred heading (mb-24) + sticky stacked cards, last one blue. */
export function MasterySection() {
  return (
    <section className="relative overflow-clip px-4 py-32">
      <div className="relative z-10 mx-auto max-w-350">
        <SectionHeading align="center" eyebrow={m.eyebrow} title={m.title} dim={m.dim} divider description={m.body} className="mb-24" />
        <StickyStack
          className="mt-12"
          cards={m.cards.map((card, i) => ({
            ...card,
            visual: visuals[i],
            featured: i === m.cards.length - 1,
            action:
              i === m.cards.length - 1 ? (
                <Link
                  href={routes.masteryCourses}
                  className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#002855] shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {m.cta}
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover/button:translate-x-1" />
                  </span>
                </Link>
              ) : undefined,
          }))}
        />
      </div>
    </section>
  );
}
