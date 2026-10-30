import { getTickerSnapshot, type TickerQuote } from "@/server/services/market-ticker";
import { cn } from "@/lib/cn";

function Quote({ q, hidden }: { q: TickerQuote; hidden?: boolean }) {
  return (
    <span aria-hidden={hidden} className="inline-flex items-center gap-2 px-6 text-[10px] font-medium tracking-[0.04em] text-muted uppercase sm:text-[11px]">
      <span>{q.pair}</span>
      <span className="font-semibold text-foreground tabular-nums">{q.price}</span>
      <span className={cn("font-semibold tabular-nums", q.up ? "text-emerald-600" : "text-rose-600")}>{q.change}</span>
      <span aria-hidden className="mx-2 text-border">
        |
      </span>
    </span>
  );
}

/**
 * Indicative price strip (server component). Renders nothing when no source responded.
 * The list is duplicated so the CSS marquee loops seamlessly; the copy is aria-hidden.
 */
export async function MarketTicker() {
  const snapshot = await getTickerSnapshot();
  if (!snapshot) return null;
  const note = `Indicative prices — FX: ECB daily reference rates${snapshot.fxDate ? ` (${snapshot.fxDate})` : ""}; crypto: CoinGecko, 24h change. Not trading quotes.`;
  return (
    <div title={note} className="group relative h-9 overflow-hidden border-b border-border bg-surface/90 backdrop-blur-md">
      <p className="sr-only">{note}</p>
      <div className="flex h-full w-max animate-ticker items-center whitespace-nowrap group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {snapshot.quotes.map((q) => (
          <Quote key={q.pair} q={q} />
        ))}
        {snapshot.quotes.map((q) => (
          <Quote key={`dup-${q.pair}`} q={q} hidden />
        ))}
        {snapshot.quotes.map((q) => (
          <Quote key={`dup2-${q.pair}`} q={q} hidden />
        ))}
      </div>
    </div>
  );
}
