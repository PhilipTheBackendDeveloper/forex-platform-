"use client";

import { ArrowRight, Search } from "lucide-react";
import { useId, useState } from "react";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Dim, SectionEyebrow } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site.config";
import { faqItems } from "@/content/faq";
import { homeContent } from "@/content/home";
import { openAssistant } from "@/features/assistant/events";

const f = homeContent.faq;

export function FaqSection() {
  const [question, setQuestion] = useState("");
  const inputId = useId();

  return (
    <section id="faq" className="relative z-10 flex w-full flex-col items-center overflow-hidden px-4 py-32 sm:px-6 md:py-40">
      <div aria-hidden className="absolute top-0 left-1/2 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-primary/[0.12] blur-[150px]" />
      <Reveal className="relative flex max-w-4xl flex-col items-center text-center">
        <SectionEyebrow variant="pill">{f.eyebrow}</SectionEyebrow>
        <h2 className="mt-7 text-[clamp(40px,6vw,84px)] leading-[0.98] font-extrabold tracking-[-0.045em] text-balance">
          {f.title} <Dim>{f.dim}</Dim>
        </h2>
        <p className="mt-7 max-w-xl text-[17px] leading-[1.7] text-foreground/60">
          Ask the assistant about courses and coaching, or browse the most frequently asked questions below.
        </p>
      </Reveal>

      <form
        className="relative mt-12 flex w-full max-w-2xl items-center gap-3 rounded-[1.4rem] border border-white/10 bg-white/[0.04] py-2.5 pr-2.5 pl-5 backdrop-blur-xl focus-within:border-[var(--ring)]"
        onSubmit={(e) => {
          e.preventDefault();
          openAssistant({ question: question.trim() || undefined });
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          Ask anything
        </label>
        <Search aria-hidden className="size-5 shrink-0 text-foreground/40" />
        <input
          id={inputId}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={`Ask anything about ${siteConfig.name}…`}
          className="min-h-11 flex-1 bg-transparent text-[15px] placeholder:text-foreground/35 focus:outline-none"
        />
        <button type="submit" aria-label="Ask the assistant" className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors hover:bg-white/10">
          <ArrowRight aria-hidden className="size-4" />
        </button>
      </form>

      <Reveal delay={0.1} className="relative mt-14 w-full max-w-5xl">
        <FaqAccordion items={faqItems} layout="grid" />
      </Reveal>

      <div className="relative mt-16 flex flex-col items-center gap-5">
        <p className="text-[14px] text-foreground/55">Still have questions about our programmes?</p>
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
    </section>
  );
}
