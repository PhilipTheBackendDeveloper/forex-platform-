import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { LandingShell } from "@/components/layout/landing-shell";
import { PageHeader } from "@/components/layout/page-header";
import { CourseCatalog } from "@/features/courses/components/course-catalog";
import { courses } from "@/features/courses/data/courses";

export const metadata: Metadata = {
  title: "Mastery Courses",
  description: "Self-paced forex mastery courses on market structure, liquidity, execution and risk.",
  alternates: { canonical: "/mastery-courses" },
};

export default function MasteryCoursesPage() {
  return (
    <LandingShell header={<PageHeader title="Mastery Courses" />}>
      <section className="relative isolate overflow-hidden px-4 pt-40 pb-32">
        <div aria-hidden className="absolute top-0 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-[150px]" />
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1 className="text-[clamp(44px,7.5vw,96px)] leading-[0.95] font-black tracking-[-0.045em]">
            <span className="block bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">Unlock true</span>
            <span className="block bg-linear-to-r from-primary to-accent bg-clip-text pb-2 text-transparent">market mastery.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-foreground/60 lg:text-[19px]">
            Explore focused courses designed to refine your process. Listings are demo structure until the catalogue is approved.
          </p>
        </Reveal>
        <div className="mx-auto mt-12 max-w-7xl">
          <CourseCatalog courses={courses} />
        </div>
      </section>
    </LandingShell>
  );
}
