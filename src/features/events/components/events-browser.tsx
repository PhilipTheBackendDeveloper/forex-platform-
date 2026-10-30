"use client";

import { CalendarDays, ChevronRight, Clock, MapPin, Search, Share2, Ticket } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { Dialog, DialogEmpty } from "@/components/ui/dialog";
import { headerActionClasses } from "@/components/layout/page-header";
import { cn } from "@/lib/cn";
import type { EventSummary } from "@/types/domain";

const filters = [
  { value: "all", label: "All" },
  { value: "expo", label: "Expos" },
  { value: "seminar", label: "Seminars" },
  { value: "meet", label: "Meet & Greet" },
] as const;
type Filter = (typeof filters)[number]["value"];

export type EventListing = EventSummary & { category: Exclude<Filter, "all">; description: string };

const ticketsEmpty = (onExplore: () => void) => (
  <DialogEmpty
    icon={<Ticket aria-hidden className="size-6" />}
    title="No tickets found"
    action={
      <button type="button" onClick={onExplore} className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-[14px] font-semibold text-white hover:bg-primary-hover">
        Explore Events
      </button>
    }
  >
    When you book an event, your digital pass will appear here. Sign-in isn&apos;t connected on this preview yet.
  </DialogEmpty>
);

/** "My Tickets" trigger for the page sub-header (opens the same modal as the inline link). */
export function MyTicketsButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={headerActionClasses()}>
        My Tickets
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} title="My Tickets" description="Your upcoming and past event passes." footer={<p className="text-center text-[12px] text-foreground/45">Please present your digital pass at the venue entrance.</p>}>
        {ticketsEmpty(() => setOpen(false))}
      </Dialog>
    </>
  );
}

/**
 * Events listing with search, category chips, empty states, ticket modal and event-detail modal
 * (reference parity). Data comes from `listUpcomingEvents()`; nothing is faked when it's empty.
 */
export function EventsBrowser({ events }: { events: EventListing[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [ticketsOpen, setTicketsOpen] = useState(false);
  const [selected, setSelected] = useState<EventListing | null>(null);
  const searchId = useId();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter(
      (e) => (filter === "all" || e.category === filter) && (!q || [e.title, e.location ?? ""].some((f) => f.toLowerCase().includes(q))),
    );
  }, [events, filter, query]);

  return (
    <>
      <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-end">
        <div>
          <h1 className="text-[clamp(52px,7vw,80px)] leading-none font-black tracking-[-0.05em]">Events.</h1>
          <p className="mt-4 text-[18px] text-foreground/60">Expos, seminars and meet &amp; greets.</p>
          <button type="button" onClick={() => setTicketsOpen(true)} className="mt-4 inline-flex min-h-11 items-center gap-1 text-[14px] font-medium text-[var(--ring)] hover:underline">
            View your event tickets <ChevronRight aria-hidden className="size-4" />
          </button>
        </div>
        <div className="relative w-full md:max-w-xs">
          <label htmlFor={searchId} className="sr-only">
            Search events
          </label>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-5 size-4 -translate-y-1/2 text-foreground/40" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, cities…"
            className="min-h-13 w-full rounded-full border border-white/10 bg-white/[0.04] py-3 pr-5 pl-12 text-[14px] placeholder:text-foreground/35 focus:border-[var(--ring)] focus:outline-none"
          />
        </div>
      </div>

      <div role="group" aria-label="Filter events" className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "min-h-11 rounded-full border px-5 text-[14px] font-medium transition-colors",
              filter === f.value ? "border-foreground bg-foreground text-background" : "border-white/10 bg-white/[0.04] text-foreground/75 hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center py-24 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-white/[0.06]">
            <CalendarDays aria-hidden className="size-7 text-foreground/50" />
          </span>
          <p className="mt-6 text-[22px] font-semibold">{events.length === 0 ? "No upcoming events" : "No events found"}</p>
          <p className="mt-2 max-w-sm text-[15px] text-foreground/55">
            {events.length === 0
              ? "No events are scheduled right now. Check back soon — new dates will be announced here."
              : "We couldn't find events matching your filters. Try adjusting your search."}
          </p>
          {events.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setFilter("all");
                setQuery("");
              }}
              className="mt-6 inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-[14px] font-semibold text-white hover:bg-primary-hover"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((e) => {
            const d = new Date(e.startsAt);
            return (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => setSelected(e)}
                  className="group relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-[1.4rem] border border-white/10 bg-linear-to-br from-primary/25 via-surface-2 to-background p-5 text-left transition-transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between">
                    <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-bold tracking-[0.15em] uppercase">{e.category}</span>
                    <span className="flex flex-col items-center rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-center">
                      <span className="text-[10px] tracking-wider text-foreground/60 uppercase">{d.toLocaleDateString("en-GB", { month: "short" })}</span>
                      <span className="text-[20px] leading-none font-bold">{d.getDate()}</span>
                    </span>
                  </div>
                  <span className="text-[24px] leading-[1.05] font-black tracking-tight uppercase">{e.title}</span>
                  <span className="flex items-center justify-between border-t border-white/10 pt-4 text-[13px] text-foreground/60">
                    {d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                    <span className="rounded-full border border-white/15 px-3 py-1 text-foreground">{e.price ? "Paid" : "Free"}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <Dialog open={ticketsOpen} onClose={() => setTicketsOpen(false)} title="My Tickets" description="Your upcoming and past event passes." footer={<p className="text-center text-[12px] text-foreground/45">Please present your digital pass at the venue entrance.</p>}>
        {ticketsEmpty(() => setTicketsOpen(false))}
      </Dialog>

      <Dialog
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.title ?? "Event"}
        size="lg"
        footer={
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2 text-[13px] text-foreground/50">
              <Share2 aria-hidden className="size-4" /> Sharing available after launch
            </span>
            <button type="button" disabled className="inline-flex min-h-11 items-center rounded-full bg-foreground px-6 text-[14px] font-semibold text-background opacity-60">
              Registration not open
            </button>
          </div>
        }
      >
        {selected && (
          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-linear-to-br from-primary/25 to-background p-6">
              <p className="text-[11px] font-bold tracking-[0.2em] text-[var(--ring)] uppercase">{selected.format}</p>
              <dl className="mt-6 flex flex-col gap-4 text-[14px]">
                <div className="flex gap-3">
                  <CalendarDays aria-hidden className="size-4 text-foreground/50" />
                  <dd>{new Date(selected.startsAt).toLocaleDateString("en-GB", { dateStyle: "full" })}</dd>
                </div>
                <div className="flex gap-3">
                  <Clock aria-hidden className="size-4 text-foreground/50" />
                  <dd>{new Date(selected.startsAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</dd>
                </div>
                {selected.location && (
                  <div className="flex gap-3">
                    <MapPin aria-hidden className="size-4 text-foreground/50" />
                    <dd>{selected.location}</dd>
                  </div>
                )}
              </dl>
            </div>
            <p className="text-[15px] leading-[1.7] text-foreground/70">{selected.description}</p>
          </div>
        )}
      </Dialog>
    </>
  );
}
