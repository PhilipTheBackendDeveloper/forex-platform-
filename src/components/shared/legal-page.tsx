import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { LandingShell } from "@/components/layout/landing-shell";
import { PageHeader, headerActionClasses } from "@/components/layout/page-header";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site.config";
import { legalDocs, type LegalDoc } from "@/content/legal";

export function legalMetadata(slug: LegalDoc["slug"]): Metadata {
  const doc = legalDocs[slug];
  return { title: doc.title, description: doc.summary, alternates: { canonical: `/${slug}` } };
}

/** Legal layout from the live audit: sub-header, dot eyebrow, H1, effective date, prose column. */
export function LegalPage({ slug }: { slug: LegalDoc["slug"] }) {
  const doc = legalDocs[slug];
  return (
    <LandingShell
      header={
        <PageHeader
          title={doc.title}
          action={
            <a href={routes.faq} className={headerActionClasses()}>
              Contact Support
            </a>
          }
        />
      }
    >
      <article className="relative z-10 mx-auto max-w-4xl px-6 pt-36 pb-32 sm:px-8">
        <SectionEyebrow variant="dot" tone="primary">
          Legal information
        </SectionEyebrow>
        <h1 className="mt-6 text-[clamp(40px,6vw,60px)] leading-[1] font-black tracking-[-0.04em]">{doc.title}</h1>
        <p className="mt-5 text-[16px] text-foreground/50">Effective date: {siteConfig.legal.lastReviewed ?? "pending legal review"}</p>
        <div role="note" className="mt-10 flex gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/[0.07] p-5 text-[14px] leading-relaxed text-amber-100">
          <AlertTriangle aria-hidden className="mt-0.5 size-5 shrink-0" />
          <p>
            <strong>Draft — not yet legally reviewed.</strong> This page is a structural outline for {siteConfig.name}. It is not a binding policy and must be
            replaced with adviser-approved text before launch.
          </p>
        </div>
        <p className="mt-10 text-[17px] leading-[1.8] text-foreground/75">{doc.summary}</p>
        <div className="mt-12 flex flex-col gap-12">
          {doc.sections.map((s, i) => (
            <section key={s.heading} id={`s${i + 1}`} aria-labelledby={`s${i + 1}-h`}>
              <h2 id={`s${i + 1}-h`} className="text-[clamp(24px,2.4vw,30px)] font-bold tracking-tight">
                {i + 1}. {s.heading}
              </h2>
              <p className="mt-4 text-[17px] leading-[1.8] text-foreground/65">{s.body}</p>
            </section>
          ))}
        </div>
      </article>
    </LandingShell>
  );
}
