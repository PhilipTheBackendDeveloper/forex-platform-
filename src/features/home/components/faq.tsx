"use client";

import { ArrowRight, Search } from "lucide-react";
import { useId, useState } from "react";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site.config";
import { faqItems } from "@/content/faq";
import { homeContent } from "@/content/home";
import { openAssistant } from "@/features/assistant/events";

const f = homeContent.faq;

/** FAQ — spec measured from the reference (pill eyebrow, one-line heading, glass ask bar, 2-col cards). */
export function FaqSection() {
  const [question, setQuestion] = useState("");
  const inputId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-32 sm:px-6 md:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-40 mix-blend-screen">
        <div className="absolute top-[10%] left-[10%] h-125 w-125 animate-pulse rounded-full bg-blue-600/20 blur-[130px] [animation-duration:10s]" />
        <div className="absolute right-[10%] bottom-[10%] h-150 w-150 animate-pulse rounded-full bg-blue-500/10 blur-[150px] [animation-delay:2s] [animation-duration:10s]" />
      </div>
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center">
        <Reveal className="mb-16 flex w-full flex-col items-center text-center">
          <div className="mb-8">
            <SectionEyebrow variant="pill">{f.eyebrow}</SectionEyebrow>
          </div>
          <h2 id="faq-title" className="mb-6 text-[clamp(40px,5vw,72px)] leading-[0.9] font-black tracking-[-0.048em] text-balance text-foreground">
            {f.title} <span className="text-white/15 italic">{f.dim}</span>
          </h2>
          <p className="max-w-2xl text-xl leading-relaxed font-medium text-white/70 md:text-2xl">
            Ask our assistant about courses and mentorship, or browse the most frequently asked questions below.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mb-20 w-full max-w-4xl drop-shadow-2xl">
          <div className="relative flex w-full flex-col overflow-hidden rounded-4xl border border-white/10 bg-white/3 shadow-2xl backdrop-blur-2xl transition-all duration-500 focus-within:border-blue-500/50 focus-within:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-white/20">
            <div aria-hidden className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />
            <form
              aria-label="Ask the assistant"
              className="relative flex items-center overflow-hidden p-1 md:p-2"
              onSubmit={(e) => {
                e.preventDefault();
                openAssistant({ question: question.trim() || undefined });
              }}
            >
              <span aria-hidden className="shrink-0 pr-2 pl-3 opacity-50 md:pr-4 md:pl-6">
                <Search className="size-5" />
              </span>
              <label htmlFor={inputId} className="sr-only">
                Ask anything
              </label>
              <input
                id={inputId}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={`Ask anything about ${siteConfig.name}…`}
                className="min-w-0 flex-1 border-none bg-transparent py-3 text-base font-medium text-white outline-none placeholder:text-white/50 md:py-5 md:text-xl"
              />
              <button
                type="submit"
                aria-label="Ask the assistant"
                disabled={!question.trim()}
                className="my-2 mr-2 flex shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/5 p-3 text-white transition-all hover:bg-white/10 disabled:opacity-40 md:rounded-2xl md:p-4"
              >
                <ArrowRight aria-hidden className="size-5" />
              </button>
            </form>
          </div>
        </Reveal>

        <Reveal delay={0.3} className="w-full">
          <FaqAccordion items={faqItems} layout="grid" />
        </Reveal>

        <div className="relative mt-16 flex flex-col items-center gap-5">
          <p className="text-[14px] text-white/55">Still have questions about our programs?</p>
          <ButtonLink
            href={siteConfig.contact.email ? `mailto:${siteConfig.contact.email}` : null}
            variant="light"
            arrow
            className="font-semibold"
            unavailableReason="Support contact pending client confirmation"
          >
            Contact Support
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
