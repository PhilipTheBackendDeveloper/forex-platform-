import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { BeginnerSection } from "@/features/home/components/beginner";
import { CoachingFeature } from "@/features/home/components/coaching-feature";
import { CollaborateSection } from "@/features/home/components/collaborate";
import { CommunitySection } from "@/features/home/components/community";
import { EducatorSection } from "@/features/home/components/educator";
import { FaqSection } from "@/features/home/components/faq";
import { HomeHero } from "@/features/home/components/hero";
import { InsightsSection } from "@/features/home/components/insights";
import { MasterySection } from "@/features/home/components/mastery";
import { SocialsSection } from "@/features/home/components/socials";
import { TestimonialsSection } from "@/features/home/components/testimonials";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — Forex Education` },
  alternates: { canonical: "/" },
};

/** Section order matches the live reference homepage (docs/research/LIVE_AUDIT.md §2). */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TestimonialsSection />
      <EducatorSection />
      <CommunitySection />
      <BeginnerSection />
      <MasterySection />
      <CoachingFeature />
      <InsightsSection />
      <CollaborateSection />
      <FaqSection />
      <SocialsSection />
    </>
  );
}
