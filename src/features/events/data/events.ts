import type { Loadable } from "@/types/domain";
import type { EventListing } from "../components/events-browser";

/**
 * Events adapter. No client events are confirmed, so this returns `empty` — the UI shows an honest
 * "No upcoming events" state. Replace the body with a server service call later.
 */
export async function listUpcomingEvents(): Promise<Loadable<EventListing[]>> {
  const events: EventListing[] = [];
  return events.length ? { state: "ready", data: events } : { state: "empty" };
}
