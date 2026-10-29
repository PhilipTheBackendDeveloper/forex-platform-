import type { Metadata } from "next";
import { Building2, Handshake, Mic, Newspaper } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = {
  title: "Collaborations",
  description: "Partner with us: brand sponsorships, speaking, media and education partnerships.",
  alternates: { canonical: "/collaborations" },
};

const tracks = [
  { icon: Building2, title: "Brand sponsorship", text: "Co-branded education, campaigns and official endorsements." },
  { icon: Handshake, title: "Industry partnerships", text: "Long-term partnerships with aligned, regulated businesses." },
  { icon: Mic, title: "Speaking", text: "Keynotes, panels, workshops and live sessions." },
  { icon: Newspaper, title: "Media & interviews", text: "Podcasts, press and editorial features." },
];

const topics = ["Brand sponsorship", "Industry partnership", "Speaking engagement", "Media / interview", "Other"] as const;

export default function CollaborationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Open for collaboration"
        title="Partner with us."
        accent="Build something credible."
        description="We work with brands, platforms and media that share a commitment to responsible, high-quality trading education."
      />
      <section className="container-site pb-24">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tracks.map((t) => (
            <StaggerItem key={t.title} className="rounded-[var(--radius-card)] border border-border bg-white/[0.02] p-7">
              <t.icon aria-hidden className="size-7 text-[var(--ring)]" />
              <h2 className="mt-5 text-[19px] font-semibold">{t.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground/55">{t.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <section id="proposal" className="pb-32">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading eyebrow="Submit a proposal" title="Let's talk." dim="Tell us the details." description="Select the nature of your inquiry so it reaches the right person. We reply to every serious proposal." />
          <Reveal className="rounded-[var(--radius-panel)] border border-border bg-white/[0.02] p-6 sm:p-10">
            <LeadForm kind="collaboration" topics={topics} showCompany submitLabel="Submit proposal" messageLabel="Proposal" messagePlaceholder="Briefly describe your partnership proposal…" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
