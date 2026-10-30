import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ChartCover } from "@/components/shared/visuals";
import { routes } from "@/config/navigation";
import { homeContent } from "@/content/home";
import { getArticleCover } from "@/features/editorial/data/covers";
import { articles } from "@/features/editorial/data/articles";
import { cn } from "@/lib/cn";

const b = homeContent.blogs;
// Reference bento on a 6-col grid: 4 + 2, then 3 + 3.
const spans = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-3", "lg:col-span-3"];

/** Editorial — spec measured from the reference (#020617 section, 400px image cards, hover lift). */
export function InsightsSection() {
  return (
    <section id="blogs" className="relative w-full overflow-hidden bg-[#020617] px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 h-100 w-[80%] max-w-250 -translate-x-1/2 rounded-[100%] bg-white/2 blur-[120px]" />
      <div className="relative z-10 mx-auto w-full max-w-350">
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end lg:mb-16">
          <Reveal>
            <div aria-hidden className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-white/30" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase">{b.eyebrow}</span>
            </div>
            <h2 className="text-[clamp(40px,5vw,72px)] leading-[0.9] font-black tracking-[-0.048em] text-foreground">
              {b.title} <span className="text-white/50 italic">{b.dim}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href={routes.blogs} className="group flex items-center gap-3 border-b border-white/20 pb-2 transition-colors hover:border-white/60">
              <span className="text-[13px] font-semibold tracking-wide text-white uppercase">{b.cta}</span>
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <Stagger className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-6" stagger={0.15}>
          {articles.slice(0, 4).map((a, i) => {
            const cover = getArticleCover(a.slug);
            const big = i === 0;
            return (
              <StaggerItem key={a.slug} className={cn("flex", spans[i])}>
                <Link
                  href={`/blogs/${a.slug}`}
                  className="group relative flex h-80 w-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-[#0f111a] transition-all duration-700 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] sm:h-100"
                >
                  <div aria-hidden className="absolute inset-0 overflow-hidden bg-linear-to-br from-[#0a0f1c] to-[#0d1527]">
                    <div className="absolute inset-0 z-10 bg-black/20 transition-colors duration-500 group-hover:bg-transparent" />
                    {cover ? (
                      <Image
                        src={cover.src}
                        alt=""
                        fill
                        placeholder="blur"
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        style={{ objectPosition: cover.focus }}
                      />
                    ) : (
                      <ChartCover seed={i} className="absolute inset-0" />
                    )}
                  </div>
                  <div aria-hidden className="absolute inset-0 z-20 bg-linear-to-t from-[#020617] via-[#020617]/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-75" />
                  <div className="relative z-30 flex h-full flex-col justify-end p-6 sm:p-8">
                    <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md">{a.category}</span>
                        <span className="text-[11px] font-semibold tracking-widest text-white/70 uppercase">{a.readingMinutes} min read</span>
                      </div>
                      <h3
                        className={cn(
                          "mb-3 max-w-2xl leading-[1.1] font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-blue-400",
                          big ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl sm:text-3xl",
                        )}
                      >
                        {a.title}
                      </h3>
                      <p className="line-clamp-2 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">{a.excerpt}</p>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
