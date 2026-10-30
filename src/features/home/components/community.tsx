import { BookOpen, Send } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { BrandGlyph } from "@/components/layout/wordmark";
import { Dim, SectionEyebrow } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site.config";
import { homeContent } from "@/content/home";

const c = homeContent.community;

/** Illustrative messages only — educational notes, never trade calls or profit claims. */
const messages = [
  { title: "Morning note", body: "Weekly levels marked. No trade until price reaches our zones — patience first." },
  { title: "Chart breakdown", body: "Structure shift on the 4H. Here is why we wait for confirmation before acting." },
  { title: "Session recap", body: "Today's lesson: risk is defined before entry, not after. Journal your reasons." },
];

function PhoneMockup() {
  return (
    <div aria-hidden className="relative mx-auto w-[300px] rotate-[-4deg] rounded-[48px] border border-white/15 bg-black p-3 shadow-[0_40px_120px_-30px_var(--primary)] sm:w-[320px]">
      <div className="overflow-hidden rounded-[38px] bg-[#0e1621]">
        <div className="flex items-center justify-between px-6 pt-4 text-[11px] font-semibold text-white/80">
          <span>9:41</span>
          <span className="h-5 w-20 rounded-full bg-black" />
          <span>100%</span>
        </div>
        <div className="mt-3 flex items-center gap-3 border-b border-white/5 px-4 pb-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary/20">
            <BrandGlyph className="size-5" />
          </span>
          <div>
            <p className="text-[13px] font-semibold text-white">{siteConfig.name} Community</p>
            <p className="text-[11px] text-white/45">channel · members TBC</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 bg-[linear-gradient(160deg,#17212b,#0e1621)] px-3 py-4">
          {messages.map((m) => (
            <div key={m.title} className="max-w-[88%] rounded-2xl rounded-bl-md bg-[#182533] px-3.5 py-2.5 shadow">
              <p className="text-[11px] font-semibold text-[#64b5ef]">{m.title}</p>
              <p className="mt-1 text-[12px] leading-snug text-white/85">{m.body}</p>
              <p className="mt-1 text-right text-[9px] text-white/35">educational · not advice</p>
            </div>
          ))}
          <div className="mt-1 h-9 rounded-full bg-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}

export function CommunitySection() {
  return (
    <section id="community" className="relative overflow-hidden bg-[#02091a] py-28 lg:py-32">
      <div aria-hidden className="absolute top-1/4 right-[-10%] h-[600px] w-[600px] rounded-full bg-community/15 blur-[160px]" />
      <div className="container-site relative grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <SectionEyebrow tone="primary">{c.eyebrow}</SectionEyebrow>
          <h2 className="mt-6 text-[clamp(40px,4.6vw,64px)] leading-[0.98] font-extrabold tracking-[-0.045em]">
            {c.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
            <Dim block>{c.dim}</Dim>
          </h2>
          <span aria-hidden className="mt-10 block h-px w-32 bg-linear-to-r from-white/20 to-transparent" />
          <p className="mt-8 flex items-center gap-3 text-[17px] font-semibold">
            <span className="flex size-8 items-center justify-center rounded-full bg-community text-white">
              <BookOpen aria-hidden className="size-4" />
            </span>
            {c.subtitle}
          </p>
          <p className="mt-4 max-w-md text-[15px] leading-[1.7] text-foreground/60">{c.body}</p>
          <ul className="mt-8 grid max-w-lg gap-x-8 gap-y-4 sm:grid-cols-2">
            {c.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[14px] text-foreground/75">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-community" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink
              href={siteConfig.social.telegram}
              external
              size="lg"
              className="bg-community text-white shadow-[0_0_40px_-8px_var(--community)] hover:bg-community/90"
              unavailableReason="Community link pending client confirmation"
            >
              {c.cta}
              <Send aria-hidden className="size-4" />
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="py-6">
          <PhoneMockup />
        </Reveal>
      </div>
    </section>
  );
}
