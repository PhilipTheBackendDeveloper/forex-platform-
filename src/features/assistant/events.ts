/**
 * Tiny browser event bus so any "Ask anything" input can open the assistant panel without a
 * global store. The assistant itself is not connected (siteConfig.features.assistantConnected).
 */
export const ASSISTANT_OPEN_EVENT = "assistant:open";

export type AssistantOpenDetail = { question?: string };

export function openAssistant(detail: AssistantOpenDetail = {}) {
  window.dispatchEvent(new CustomEvent<AssistantOpenDetail>(ASSISTANT_OPEN_EVENT, { detail }));
}
