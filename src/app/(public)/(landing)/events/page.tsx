import type { Metadata } from "next";
import { LandingShell } from "@/components/layout/landing-shell";
import { PageHeader } from "@/components/layout/page-header";
import { EventsBrowser, MyTicketsButton } from "@/features/events/components/events-browser";
import { listUpcomingEvents } from "@/features/events/data/events";

export const metadata: Metadata = {
  title: "Events & Seminars",
  description: "Expos, seminars and meet & greets. See upcoming events and your tickets.",
  alternates: { canonical: "/events" },
};

export default async function EventsPage() {
  const events = await listUpcomingEvents();
  return (
    <LandingShell header={<PageHeader title="Global Events" action={<MyTicketsButton />} />}>
      <section className="mx-auto min-h-[85vh] w-full max-w-7xl px-4 pt-32 pb-24 lg:px-6 lg:pt-36">
        {events.state === "error" ? (
          <p role="alert" className="text-foreground/60">
            We couldn&apos;t load events right now. Please try again shortly.
          </p>
        ) : (
          <EventsBrowser events={events.state === "ready" ? events.data : []} />
        )}
      </section>
    </LandingShell>
  );
}
