import type { EventSummary, Loadable } from "@/types/domain";

/**
 * Events adapter. The reference showed "Loading events…" with no public listings when observed.
 * No client events are confirmed, so this returns `empty`. Replace with a server service later.
 */
export async function listUpcomingEvents(): Promise<Loadable<EventSummary[]>> {
  const events: EventSummary[] = [];
  return events.length ? { state: "ready", data: events } : { state: "empty" };
}
