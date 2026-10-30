import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { PlaceholderBadge } from "@/components/ui/badge";
import { Dim, SectionEyebrow } from "@/components/ui/section-heading";
import { ChartCover } from "@/components/shared/visuals";
import { routes } from "@/config/navigation";
import { homeContent } from "@/content/home";
import { articles } from "@/features/editorial/data/articles";
import { cn } from "@/lib/cn";

const b = homeContent.blogs;
// Reference bento: wide + narrow, then two equal.
const spans = ["lg:col-span-8", "lg:col-span-4", "lg:col-span-6", "lg:col-span-6"];

export function InsightsSection() {
  return (
    <section id="blogs" className="relative w-full overflow-hidden bg-[#020617] px-0 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionEyebrow>{b.eyebrow}</SectionEyebrow>
            <h2 className="mt-5 text-[clamp(44px,6vw,80px)] leading-none font-extrabold tracking-[-0.045em]">
              {b.title} <Dim>{b.dim}</Dim>
            </h2>
          </div>
          <Link href={routes.blogs} className="inline-flex min-h-11 items-center border-b border-white/30 text-[12px] font-semibold tracking-[0.18em] uppercase hover:border-white">
            {b.cta}
          </Link>
        </div>
        <Stagger className="mt-14 grid gap-5 lg:grid-cols-12">
          {articles.slice(0, 4).map((a, i) => (
            <StaggerItem key={a.slug} className={spans[i]}>
              <Link
                href={`/blogs/${a.slug}`}
                className="group relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] border border-white/10 p-6 sm:p-8 lg:min-h-[360px]"
              >
                <ChartCover seed={i} className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-transparent" />
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold tracking-[0.18em] uppercase">
                    <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 backdrop-blur">{a.category}</span>
                    <span className="text-foreground/60">{a.readingMinutes} min read</span>
                    {a.status !== "published" && <PlaceholderBadge label="Draft sample" />}
                  </div>
                  <h3 className={cn("mt-4 font-bold tracking-tight text-balance", i === 0 ? "text-[clamp(26px,2.6vw,38px)] leading-[1.1]" : "text-[22px] leading-snug")}>
                    {a.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 max-w-xl text-[14px] leading-relaxed text-foreground/60">{a.excerpt}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
