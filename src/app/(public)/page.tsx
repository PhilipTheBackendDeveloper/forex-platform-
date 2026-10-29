import type { Metadata } from "next";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site.config";
import { faqItems } from "@/content/faq";
import { homeContent } from "@/content/home";
import { ArticleCard } from "@/features/editorial/components/article-card";
import { articles } from "@/features/editorial/data/articles";
import { HomeHero } from "@/features/home/components/hero";
import {
  AcademySection,
  BeginnerSection,
  CoachingSection,
  CollaborateSection,
  CommunitySection,
  EducatorSection,
  HighlightsStrip,
  MasterySection,
  SocialsSection,
  TestimonialsSection,
} from "@/features/home/components/sections";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — Forex Education` },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HighlightsStrip />
      <TestimonialsSection />
      <EducatorSection />
      <CommunitySection />
      <BeginnerSection />
      <MasterySection />
      <AcademySection />
      <CoachingSection />

      <section id="blogs" className="relative w-full overflow-hidden bg-surface-3/60 py-24 sm:py-32">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow={homeContent.blogs.eyebrow} title={homeContent.blogs.title} dim={homeContent.blogs.dim} />
            <Reveal className="shrink-0">
              <ButtonLink href={routes.blogs} variant="secondary" arrow>
                View all articles
              </ButtonLink>
            </Reveal>
          </div>
          <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {articles.slice(0, 4).map((a) => (
              <StaggerItem key={a.slug}>
                <ArticleCard article={a} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CollaborateSection />

      <section id="faq" className="relative z-10 w-full overflow-hidden py-32 md:py-40">
        <div aria-hidden className="absolute top-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6">
          <SectionHeading
            align="center"
            eyebrow={homeContent.faq.eyebrow}
            title={homeContent.faq.title}
            dim={homeContent.faq.dim}
            description="Browse the most frequently asked questions below. A live assistant will be added once an approved knowledge base is connected."
          />
          <Reveal delay={0.1} className="mt-14 w-full">
            <FaqAccordion items={faqItems} />
          </Reveal>
        </div>
      </section>

      <SocialsSection />
    </>
  );
}
