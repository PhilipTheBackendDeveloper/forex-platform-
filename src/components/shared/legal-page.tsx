import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { legalDocs, type LegalDoc } from "@/content/legal";
import { siteConfig } from "@/config/site.config";

export function legalMetadata(slug: LegalDoc["slug"]): Metadata {
  const doc = legalDocs[slug];
  return { title: doc.title, description: doc.summary, alternates: { canonical: `/${slug}` } };
}

/** Shared layout for all legal drafts with a prominent "not legally reviewed" banner. */
export function LegalPage({ slug }: { slug: LegalDoc["slug"] }) {
  const doc = legalDocs[slug];
  return (
    <article className="px-6 pt-36 pb-32">
      <div className="mx-auto max-w-3xl">
        <p className="text-[12px] font-semibold tracking-[0.18em] text-foreground/45 uppercase">Legal</p>
        <h1 className="mt-4 text-[clamp(40px,6vw,64px)] leading-[1] font-bold tracking-[-0.04em]">{doc.title}</h1>
        <p className="mt-5 text-[18px] text-foreground/60">{doc.summary}</p>
        <div role="note" className="mt-10 flex gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/[0.07] p-5 text-[14px] leading-relaxed text-amber-100">
          <AlertTriangle aria-hidden className="mt-0.5 size-5 shrink-0" />
          <p>
            <strong>Draft — not yet legally reviewed.</strong> This page is a structural outline for {siteConfig.name}. It is not a binding policy
            and must be replaced with adviser-approved text before launch.
          </p>
        </div>
        <nav aria-label="On this page" className="mt-12 rounded-2xl border border-border p-6">
          <p className="text-[12px] font-semibold tracking-[0.16em] text-foreground/45 uppercase">On this page</p>
          <ol className="mt-4 grid gap-1 sm:grid-cols-2">
            {doc.sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#s${i + 1}`} className="inline-flex min-h-9 items-center text-[15px] text-foreground/70 hover:text-foreground">
                  {i + 1}. {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-14 flex flex-col gap-12">
          {doc.sections.map((s, i) => (
            <section key={s.heading} id={`s${i + 1}`} aria-labelledby={`s${i + 1}-h`}>
              <h2 id={`s${i + 1}-h`} className="text-[24px] font-semibold tracking-tight">
                {i + 1}. {s.heading}
              </h2>
              <p className="mt-3 text-[16px] leading-[1.8] text-foreground/65">{s.body}</p>
            </section>
          ))}
        </div>
        <p className="mt-16 border-t border-border pt-6 text-sm text-foreground/45">
          Last reviewed: {siteConfig.legal.lastReviewed ?? "not yet reviewed"}
        </p>
      </div>
    </article>
  );
}
