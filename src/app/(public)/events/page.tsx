import type { Metadata } from "next";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHero } from "@/components/shared/page-hero";
import { routes } from "@/config/navigation";
import { listUpcomingEvents } from "@/features/events/data/events";

export const metadata: Metadata = {
  title: "Events & Seminars",
  description: "Bootcamps, seminars and meetups. See upcoming events or register your interest.",
  alternates: { canonical: "/events" },
};

export default async function EventsPage() {
  const events = await listUpcomingEvents();
  return (
    <>
      <PageHero eyebrow="Events & seminars" title="Learn in the room." accent="Meet the community." description="Bootcamps, physical seminars and online meetups.">
        <ButtonLink href={routes.login} variant="secondary" className="mt-2">
          <Ticket aria-hidden className="size-4" /> My tickets
        </ButtonLink>
      </PageHero>
      <section className="container-site pb-24">
        {events.state === "ready" ? (
          <ul className="grid gap-5 md:grid-cols-2">
            {events.data.map((e) => (
              <li key={e.id} className="rounded-[var(--radius-card)] border border-border p-7">
                <Badge>{e.format}</Badge>
                <h2 className="mt-4 text-[22px] font-semibold">{e.title}</h2>
                <p className="mt-2 flex items-center gap-2 text-foreground/55">
                  <CalendarDays aria-hidden className="size-4" />
                  {new Date(e.startsAt).toLocaleDateString("en-GB", { dateStyle: "long" })}
                </p>
                {e.location && (
                  <p className="mt-1 flex items-center gap-2 text-foreground/55">
                    <MapPin aria-hidden className="size-4" /> {e.location}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState icon={CalendarDays} title="No upcoming events">
            {events.state === "error"
              ? "We couldn't load events right now. Please try again shortly."
              : "There are no events scheduled right now. Register your interest and we'll let you know when the next one is announced."}
          </EmptyState>
        )}
      </section>
      <section className="pb-32">
        <div className="mx-auto max-w-2xl rounded-[var(--radius-panel)] border border-border bg-white/[0.02] p-6 sm:p-10">
          <h2 className="text-[26px] font-bold tracking-tight">Register your interest</h2>
          <p className="mt-2 mb-8 text-foreground/55">Tell us which city or format you&apos;d like to attend.</p>
          <LeadForm kind="event_interest" submitLabel="Register interest" messageLabel="Preferred city / format" messagePlaceholder="e.g. Accra, in person — or online" />
        </div>
      </section>
    </>
  );
}
