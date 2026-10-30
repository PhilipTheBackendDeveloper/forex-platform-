import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { StickyStack } from "@/components/shared/sticky-stack";
import { LiquidityVisual, RiskVisual, StructureVisual } from "@/components/shared/visuals";
import { routes } from "@/config/navigation";
import { homeContent } from "@/content/home";

const m = homeContent.mastery;
const visuals = [<LiquidityVisual key="l" />, <StructureVisual key="s" />, <RiskVisual key="r" />];

export function MasterySection() {
  return (
    <section className="relative overflow-clip bg-linear-to-b from-background via-[#051024] to-background px-4 py-32">
      <SectionHeading align="center" eyebrow={m.eyebrow} title={m.title} dim={m.dim} divider description={m.body} className="mx-auto max-w-3xl" />
      <StickyStack
        className="mt-20"
        cards={m.cards.map((card, i) => ({
          ...card,
          visual: visuals[i],
          featured: i === m.cards.length - 1,
          action:
            i === m.cards.length - 1 ? (
              <Link
                href={routes.masteryCourses}
                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-[#00224d] transition-transform hover:scale-[1.02]"
              >
                {m.cta}
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : undefined,
        }))}
      />
    </section>
  );
}
