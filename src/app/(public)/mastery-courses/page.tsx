import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { CourseCatalog } from "@/features/courses/components/course-catalog";
import { courses } from "@/features/courses/data/courses";

export const metadata: Metadata = {
  title: "Mastery Courses",
  description: "Self-paced forex mastery courses on market structure, liquidity, execution and risk.",
  alternates: { canonical: "/mastery-courses" },
};

export default function MasteryCoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="The mastery collection"
        title="Unlock true"
        accent="market mastery."
        description="Explore focused courses designed to refine your process. Listings below are demo structure until the client approves the catalogue."
      />
      <section className="container-site pb-32">
        <CourseCatalog courses={courses} />
      </section>
    </>
  );
}
