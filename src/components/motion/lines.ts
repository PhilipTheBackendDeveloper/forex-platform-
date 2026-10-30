/** Shared (server + client) helpers for `RevealLines`. */
export type LineTone = "base" | "dim" | "half" | "accent";

export type RevealLine = { text: string; tone?: LineTone };

/** Plain lines + an optional faded italic last line. */
export function toLines(title: string | readonly string[], dim?: string, dimTone: LineTone = "dim"): RevealLine[] {
  const base = (typeof title === "string" ? [title] : title).map((text) => ({ text }));
  return dim ? [...base, { text: dim, tone: dimTone }] : base;
}
