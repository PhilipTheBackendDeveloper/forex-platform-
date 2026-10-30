"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { MessageSquare, SendHorizontal, Sparkles, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site.config";
import { ASSISTANT_OPEN_EVENT, type AssistantOpenDetail } from "@/features/assistant/events";

type Message = { role: "user" | "system"; text: string };

const NOT_CONNECTED =
  "The assistant isn't connected on this preview yet, so I can't answer that. The FAQ covers the most common questions — or check back once the assistant launches.";

/**
 * Assistant panel (reference: floating button → chat panel). Until an approved knowledge base and
 * model are connected, every question receives an honest "not connected" reply plus a FAQ link.
 * The floating button is hidden below `md` like the reference; the panel can still be opened on
 * mobile from any "Ask anything" input.
 */
export function HelpLauncher() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const panelId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }, { role: "system", text: NOT_CONNECTED }]);
    setDraft("");
  };

  useEffect(() => {
    const onOpen = (e: Event) => {
      const { question } = (e as CustomEvent<AssistantOpenDetail>).detail ?? {};
      setOpen(true);
      if (question) ask(question);
      window.setTimeout(() => inputRef.current?.focus(), 50);
    };
    window.addEventListener(ASSISTANT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(ASSISTANT_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 md:right-8 md:bottom-8">
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label={`${siteConfig.name} assistant`}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto flex h-[min(480px,calc(100dvh-120px))] w-[min(380px,calc(100vw-32px))] origin-bottom-right flex-col overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#070d1a]/95 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary">
                  <Sparkles aria-hidden className="size-4 text-white" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold">{siteConfig.name} Assistant</p>
                  <p className="text-[11px] text-foreground/45">{siteConfig.features.assistantConnected ? "Online" : "Not connected yet"}</p>
                </div>
              </div>
              <button type="button" aria-label="Close assistant" onClick={() => setOpen(false)} className="flex size-9 items-center justify-center rounded-lg border border-white/10 hover:bg-white/5">
                <X aria-hidden className="size-4" />
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-5" aria-live="polite">
              {messages.length === 0 ? (
                <div className="m-auto flex max-w-[240px] flex-col items-center text-center">
                  <span className="flex size-11 items-center justify-center rounded-full bg-primary shadow-[0_0_30px_-4px_var(--primary)]">
                    <Sparkles aria-hidden className="size-5 text-white" />
                  </span>
                  <p className="mt-4 text-[15px] font-semibold">How can I help you?</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-foreground/50">Ask about programmes, coaching, the shop or the community.</p>
                </div>
              ) : (
                messages.map((m, i) => (
                  <div
                    key={i}
                    className={m.role === "user" ? "ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-[14px] text-white" : "max-w-[90%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3 text-[13px] leading-relaxed text-foreground/75"}
                  >
                    {m.text}
                    {m.role === "system" && (
                      <Link href={routes.faq} onClick={() => setOpen(false)} className="mt-2 block font-medium text-[var(--ring)] hover:underline">
                        Open the FAQ →
                      </Link>
                    )}
                  </div>
                ))
              )}
            </div>
            <form
              className="border-t border-white/[0.07] p-4"
              onSubmit={(e) => {
                e.preventDefault();
                ask(draft);
              }}
            >
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-1.5 pr-1.5 pl-4 focus-within:border-[var(--ring)]">
                <label htmlFor={`${panelId}-input`} className="sr-only">
                  Message
                </label>
                <input
                  id={`${panelId}-input`}
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={`Ask ${siteConfig.name}…`}
                  className="min-h-9 flex-1 bg-transparent text-[14px] placeholder:text-foreground/35 focus:outline-none"
                />
                <button type="submit" aria-label="Send message" className="flex size-9 items-center justify-center rounded-lg bg-white/[0.06] hover:bg-white/10">
                  <SendHorizontal aria-hidden className="size-4" />
                </button>
              </div>
              <p className="mt-2 text-center text-[11px] text-foreground/35">Press Enter to send</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close assistant" : "Open assistant"}
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto hidden size-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_40px_-8px_var(--primary)] transition-transform duration-300 hover:scale-105 active:scale-95 md:flex"
      >
        {open ? <X className="size-6" aria-hidden /> : <MessageSquare className="size-6" aria-hidden />}
      </button>
    </div>
  );
}
