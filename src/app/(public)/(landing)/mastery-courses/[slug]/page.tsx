import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { LandingShell } from "@/components/layout/landing-shell";
import { PageHeader } from "@/components/layout/page-header";
import { PlaceholderBadge } from "@/components/ui/badge";
import { ChartCover } from "@/components/shared/visuals";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site.config";
import { courses, getCourse } from "@/features/courses/data/courses";
import { formatPrice } from "@/features/courses/filter";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/mastery-courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return { title: "Course not found" };
  return { title: course.title, description: course.subtitle, alternates: { canonical: `/mastery-courses/${course.slug}` } };
}

const checkoutNote = siteConfig.features.paymentsConnected
  ? "Secure checkout."
  : "Enrollment opens once pricing and secure payments are confirmed — no payment can be taken on this preview.";

function EnrollButton({ label, large }: { label: string; large?: boolean }) {
  return (
    <button
      type="button"
      disabled
      aria-describedby="checkout-note"
      className={
        large
          ? "inline-flex min-h-16 items-center rounded-full bg-foreground px-10 text-[18px] font-bold text-background opacity-80 shadow-[0_0_60px_-10px_rgb(255_255_255/0.5)] disabled:cursor-not-allowed"
          : "inline-flex min-h-13 items-center rounded-full bg-foreground px-7 text-[16px] font-semibold text-background opacity-80 shadow-[0_0_50px_-10px_rgb(255_255_255/0.5)] disabled:cursor-not-allowed"
      }
    >
      {label}
    </button>
  );
}

export default async function CourseDetailPage({ params }: PageProps<"/mastery-courses/[slug]">) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  const price = course.price ? formatPrice(course.price) : "price TBC";
  const lessons = course.modules.flatMap((m) => m.lessons.map((l) => ({ ...l, module: m.title })));

  return (
    <LandingShell
      header={
        <PageHeader
          title="Mastery Courses"
          backHref={routes.masteryCourses}
          backLabel="Courses"
          links={[{ label: "Curriculum", href: "#curriculum" }]}
          action={
            <span aria-disabled="true" title="Payments not connected yet" className="inline-flex min-h-9 cursor-not-allowed items-center rounded-full bg-primary/50 px-4 text-[13px] font-semibold text-white/80">
              Buy
            </span>
          }
        />
      }
    >
      <article>
        <section className="relative px-4 pt-36 pb-24">
          <div aria-hidden className="absolute top-0 left-1/2 -z-10 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-[150px]" />
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
            {course.status === "demo" && <PlaceholderBadge label="Demo listing" />}
            <h1 className="mt-4 bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-[clamp(40px,6vw,72px)] leading-[1] font-black tracking-[-0.045em] text-transparent">
              {course.title}
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-foreground/60 lg:text-[19px]">{course.subtitle}</p>
            <div className="mt-9">
              <EnrollButton label={`Enroll — ${price}`} />
            </div>
            <p id="checkout-note" className="mt-4 max-w-md text-[13px] text-foreground/45">
              {checkoutNote}
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mx-auto mt-16 max-w-4xl">
            <ChartCover seed={courses.indexOf(course)} label={course.level} className="aspect-[16/9] w-full rounded-[var(--radius-hero)] border border-border shadow-lift" />
          </Reveal>
        </section>

        <section className="border-y border-border bg-surface px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-[clamp(32px,4vw,48px)] font-black tracking-[-0.04em]">What you&apos;ll learn.</h2>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2">
              {course.outcomes.map((o) => (
                <li key={o} className="rounded-[1.4rem] border border-border bg-white p-6 text-[15px] leading-relaxed text-foreground/75 shadow-card">
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="curriculum" className="bg-background px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-[clamp(32px,4vw,48px)] font-black tracking-[-0.04em]">The Curriculum.</h2>
            <ol className="mt-12 flex flex-col gap-4">
              {lessons.map((l, i) => (
                <li key={l.title} className="flex gap-5 rounded-[1.4rem] border border-border bg-white p-6 shadow-card sm:p-7">
                  <span className="text-[22px] font-black tracking-tight text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="flex items-center gap-2 text-[16px] font-semibold tracking-wide uppercase">
                      {l.title} <Lock aria-label="Locked until enrolled" className="size-3.5 text-foreground/35" />
                    </span>
                    <span className="mt-2 block text-[14px] text-foreground/50">Module: {l.module}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center">
          <h2 className="text-[clamp(32px,4.4vw,56px)] leading-[1.02] font-black tracking-[-0.045em]">Ready to sharpen your process?</h2>
          <div className="mt-10">
            <EnrollButton large label={`Enroll — ${price}`} />
          </div>
          <p className="mt-6 text-[11px] font-semibold tracking-[0.2em] text-foreground/40 uppercase">Checkout opens once payments are configured</p>
        </section>
      </article>
    </LandingShell>
  );
}
