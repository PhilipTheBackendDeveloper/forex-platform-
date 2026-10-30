import "server-only";
import { cacheLife } from "next/cache";

export type TickerQuote = { pair: string; price: string; change: string; up: boolean };
export type TickerSnapshot = { quotes: TickerQuote[]; fxDate: string | null };

const FX_PAIRS = [
  { pair: "EUR/USD", symbol: "EUR", invert: true, digits: 4 },
  { pair: "GBP/USD", symbol: "GBP", invert: true, digits: 4 },
  { pair: "USD/JPY", symbol: "JPY", invert: false, digits: 3 },
  { pair: "USD/CHF", symbol: "CHF", invert: false, digits: 4 },
  { pair: "USD/CAD", symbol: "CAD", invert: false, digits: 4 },
] as const;

const CRYPTO = [
  { pair: "BTC/USD", id: "bitcoin" },
  { pair: "ETH/USD", id: "ethereum" },
] as const;

const pct = (v: number) => `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
const isoDaysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString().slice(0, 10);

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000), headers: { accept: "application/json" } });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

type FxSeries = { rates: Record<string, Record<string, number>> };
type Coins = Record<string, { usd: number; usd_24h_change: number }>;

/**
 * Indicative market ticker (reference parity: price strip above the header).
 * Sources are free and keyless: ECB daily reference rates via Frankfurter (FX, change vs the
 * previous ECB fixing) and CoinGecko (crypto, 24h change). Returns `null` when nothing is
 * available — the UI then hides the strip instead of showing invented numbers.
 */
export async function getTickerSnapshot(): Promise<TickerSnapshot | null> {
  "use cache";
  cacheLife("minutes");

  const [fx, coins] = await Promise.all([
    getJson<FxSeries>(`https://api.frankfurter.dev/v1/${isoDaysAgo(10)}..?base=USD&symbols=${FX_PAIRS.map((p) => p.symbol).join(",")}`),
    getJson<Coins>(`https://api.coingecko.com/api/v3/simple/price?ids=${CRYPTO.map((c) => c.id).join(",")}&vs_currencies=usd&include_24hr_change=true`),
  ]);

  const quotes: TickerQuote[] = [];
  let fxDate: string | null = null;

  const days = fx ? Object.keys(fx.rates).sort() : [];
  if (fx && days.length >= 2) {
    const [prevDay, lastDay] = days.slice(-2) as [string, string];
    fxDate = lastDay;
    for (const p of FX_PAIRS) {
      const last = fx.rates[lastDay]?.[p.symbol];
      const prev = fx.rates[prevDay]?.[p.symbol];
      if (!last || !prev) continue;
      const now = p.invert ? 1 / last : last;
      const before = p.invert ? 1 / prev : prev;
      const change = ((now - before) / before) * 100;
      quotes.push({ pair: p.pair, price: now.toFixed(p.digits), change: pct(change), up: change >= 0 });
    }
  }

  for (const c of CRYPTO) {
    const q = coins?.[c.id];
    if (!q) continue;
    quotes.push({
      pair: c.pair,
      price: q.usd.toLocaleString("en-US", { maximumFractionDigits: 2 }),
      change: pct(q.usd_24h_change),
      up: q.usd_24h_change >= 0,
    });
  }

  return quotes.length ? { quotes, fxDate } : null;
}
