import { Building2, Mic } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { RevealLines } from "@/components/motion/reveal-lines";
import { toLines } from "@/components/motion/lines";
import { LeadForm } from "@/components/forms/lead-form";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { homeContent } from "@/content/home";
import { partnershipTypes } from "@/features/leads/schemas";

const k = homeContent.collaborate;
const icons = [Building2, Mic];

/** Collaborate — spec measured from the reference: 2-col grid, glass form card with pill categories. */
export function CollaborateSection() {
  return (
    <section id="collaborate" className="relative w-full overflow-hidden bg-transparent px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/4 h-150 w-1/2 max-w-4xl -translate-y-1/2 rounded-full bg-primary/5 blur-[200px]" />
      <div aria-hidden className="pointer-events-none absolute right-[10%] bottom-0 h-125 w-125 rounded-full bg-accent/5 blur-[150px]" />
      <div className="relative z-10 mx-auto grid w-full max-w-350 grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <Reveal>
              <SectionEyebrow variant="dot" tone="primary">
                {k.eyebrow}
              </SectionEyebrow>
            </Reveal>
            <RevealLines lines={toLines(k.title, k.dim, "half")} fontSize="clamp(40px, 5.5vw, 64px)" className="max-w-xl" style={{ letterSpacing: "-0.048em" }} />
            <Reveal delay={0.3}>
              <p className="max-w-md text-[15px] leading-[1.6] tracking-[-0.01em] text-white/70 sm:text-[17px]">{k.body}</p>
            </Reveal>
          </div>
          <Reveal delay={0.4}>
            <ul className="flex flex-col gap-5 border-t border-white/10 pt-6" aria-label="Opportunities">
              {k.tracks.map((t, i) => {
                const Icon = icons[i] ?? Building2;
                return (
                  <li key={t.title} className="flex items-center gap-4">
                    <span aria-hidden className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                      <Icon className="size-5 text-white/70" />
                    </span>
                    <div>
                      <h3 className="text-[14px] font-bold tracking-tight text-white">{t.title}</h3>
                      <p className="text-[13px] text-white/60">{t.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0f1c]/80 p-6 shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-10">
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
            <h3 className="mb-2 text-[20px] font-bold tracking-tight text-white">Submit a Proposal</h3>
            <p className="mb-8 text-[14px] text-white/50">Select the nature of your inquiry to route it to the correct team.</p>
            <LeadForm
              kind="collaboration"
              topics={partnershipTypes}
              topicsLayout="pills"
              showCompany
              showWebsite
              submitLabel="Initiate Contact"
              messageLabel="Proposal outline"
              messagePlaceholder="Briefly describe your partnership proposal…"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
