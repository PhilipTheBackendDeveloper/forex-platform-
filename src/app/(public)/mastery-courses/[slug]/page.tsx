import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Lock, PlayCircle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Badge, PlaceholderBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  return {
    title: course.title,
    description: course.subtitle,
    alternates: { canonical: `/mastery-courses/${course.slug}` },
  };
}

export default async function CourseDetailPage({ params }: PageProps<"/mastery-courses/[slug]">) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <article className="relative pt-36 pb-32">
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
      <div className="container-site relative">
        <Link href={routes.masteryCourses} className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground/60 hover:text-foreground">
          <ArrowLeft aria-hidden className="size-4" /> All courses
        </Link>
        <div className="mt-8 grid gap-14 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              <Badge tone="primary">{course.level}</Badge>
              {course.status === "demo" && <PlaceholderBadge label="Demo listing" />}
            </div>
            <h1 className="mt-6 text-[clamp(40px,6vw,72px)] leading-[0.95] font-black tracking-[-0.04em]">{course.title}</h1>
            <p className="mt-5 text-[19px] text-foreground/60">{course.subtitle}</p>
            <div className="mt-10 space-y-5 text-[17px] leading-[1.75] text-foreground/70">
              {course.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <h2 className="mt-16 text-[26px] font-bold tracking-tight">What you&apos;ll learn</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {course.outcomes.map((o) => (
                <li key={o} className="flex gap-3 rounded-2xl border border-border bg-white/[0.02] p-4 text-[15px] text-foreground/75">
                  <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-success" /> {o}
                </li>
              ))}
            </ul>

            <h2 className="mt-16 text-[26px] font-bold tracking-tight">Curriculum</h2>
            <ol className="mt-6 flex flex-col gap-4">
              {course.modules.map((m, i) => (
                <li key={m.title} className="rounded-[var(--radius-card)] border border-border bg-white/[0.02] p-6">
                  <p className="text-[12px] tracking-[0.16em] text-foreground/45 uppercase">Module {i + 1}</p>
                  <h3 className="mt-1 text-[19px] font-semibold">{m.title}</h3>
                  <ul className="mt-4 flex flex-col gap-2">
                    {m.lessons.map((l) => (
                      <li key={l.title} className="flex items-center gap-3 text-[15px] text-foreground/60">
                        <Lock aria-hidden className="size-4 text-foreground/35" />
                        {l.title}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Reveal>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[var(--radius-panel)] border border-border-strong bg-surface/80 p-8 backdrop-blur">
              <div className="flex aspect-video items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-primary/25 via-surface-2 to-accent/20">
                <PlayCircle aria-hidden className="size-12 text-foreground/70" />
                <span className="sr-only">Course preview video not yet available</span>
              </div>
              <p className="mt-6 text-[28px] font-bold">{formatPrice(course.price)}</p>
              <p className="mt-1 text-sm text-foreground/50">
                {course.lessonsCount ? `${course.lessonsCount} lessons · ` : ""}self-paced
              </p>
              <Button variant="primary" size="lg" className="mt-6 w-full" disabled aria-describedby="checkout-note">
                Enroll now
              </Button>
              <p id="checkout-note" className="mt-3 text-[13px] leading-relaxed text-foreground/50">
                {siteConfig.features.paymentsConnected
                  ? "Secure checkout."
                  : "Enrollment opens once pricing and secure payments are confirmed. No payment can be taken on this preview."}
              </p>
              <Link href={routes.register} className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-[var(--ring)] hover:underline">
                Create an account to get notified →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
