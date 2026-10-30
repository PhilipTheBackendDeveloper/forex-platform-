import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { PlaceholderBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { PhotoPanel } from "@/components/shared/photo-panel";
import { clientPhotos } from "@/config/assets";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "About",
  description: `The story and teaching approach behind ${siteConfig.name}.`,
  alternates: { canonical: "/about" },
};

const gallery = [
  { photo: clientPhotos.yacht, className: "row-span-2 aspect-[3/4] md:aspect-auto" },
  { photo: clientPhotos.london, className: "aspect-[3/4]" },
  { photo: clientPhotos.stainedGlass, className: "aspect-[3/4]" },
  { photo: clientPhotos.redOutfit, className: "aspect-square" },
  { photo: clientPhotos.footballStadium, className: "aspect-square" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-24">
        <div aria-hidden className="absolute top-10 right-0 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[140px]" />
        <div className="container-site relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeading as="h1" eyebrow="About" title={`Meet ${siteConfig.mentorName}.`} dim="Educator. Trader. Mentor." />
            <Reveal delay={0.1} className="mt-8 flex flex-col gap-5 text-[17px] leading-[1.75] text-foreground/65">
              <p>
                Placeholder biography <PlaceholderBadge className="ml-1 align-middle" /> — this page will tell the mentor&apos;s story: how they started,
                what they learned the hard way, and why they teach a risk-first, process-driven approach.
              </p>
              <p>
                Only verifiable facts belong here. Audience sizes, student numbers, awards and media appearances will be added once the client
                provides evidence and approves the wording.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href={routes.coaching} variant="primary" arrow>
                Work with the mentor
              </ButtonLink>
              <ButtonLink href={routes.masteryCourses} variant="secondary">
                Browse courses
              </ButtonLink>
            </Reveal>
          </div>
          <PhotoPanel priority photo={clientPhotos.purplePortrait} sizes="(min-width:1024px) 520px, 100vw" className="aspect-[4/5]" />
        </div>
      </section>
      <section aria-labelledby="gallery-title" className="container-site pb-32">
        <h2 id="gallery-title" className="text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.03em]">
          Beyond the charts.
        </h2>
        <p className="mt-3 max-w-lg text-foreground/55">Moments from travel, events and everyday life.</p>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:grid-rows-2">
          {gallery.map((g) => (
            <Reveal key={g.photo.alt} className={g.className}>
              <PhotoPanel photo={g.photo} sizes="(min-width:768px) 400px, 50vw" className="h-full min-h-[220px]" overlayClassName="" />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
