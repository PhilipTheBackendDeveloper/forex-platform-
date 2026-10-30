import { Building2, Mic } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { Dim, SectionEyebrow } from "@/components/ui/section-heading";
import { homeContent } from "@/content/home";
import { partnershipTypes } from "@/features/leads/schemas";

const k = homeContent.collaborate;
const icons = [Building2, Mic];

export function CollaborateSection() {
  return (
    <section id="collaborate" className="relative w-full overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute bottom-0 left-[-10%] h-[520px] w-[520px] rounded-full bg-primary/[0.1] blur-[140px]" />
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <SectionEyebrow variant="dot" tone="primary">
            {k.eyebrow}
          </SectionEyebrow>
          <h2 className="mt-6 text-[clamp(40px,4.8vw,66px)] leading-[0.98] font-extrabold tracking-[-0.045em]">
            {k.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
            <Dim block>{k.dim}</Dim>
          </h2>
          <p className="mt-8 max-w-md text-[16px] leading-[1.7] text-foreground/60">{k.body}</p>
          <ul className="mt-10 flex max-w-lg flex-col gap-5 border-t border-white/10 pt-8">
            {k.tracks.map((t, i) => {
              const Icon = icons[i] ?? Building2;
              return (
                <li key={t.title} className="flex items-center gap-4">
                  <span className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                    <Icon aria-hidden className="size-4 text-foreground/70" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold">{t.title}</span>
                    <span className="block text-[13px] text-foreground/50">{t.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="rounded-[var(--radius-panel)] border border-white/10 bg-white/[0.025] p-5 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)] backdrop-blur sm:p-8">
          <h3 className="text-[20px] font-semibold">Submit a Proposal</h3>
          <p className="mt-1.5 mb-6 text-[14px] text-foreground/50">Select the nature of your inquiry so it reaches the right person.</p>
          <LeadForm
            kind="collaboration"
            topics={partnershipTypes}
            showCompany
            showWebsite
            submitLabel="Initiate Contact"
            messageLabel="Proposal outline"
            messagePlaceholder="Briefly describe your partnership proposal…"
          />
        </Reveal>
      </div>
    </section>
  );
}
