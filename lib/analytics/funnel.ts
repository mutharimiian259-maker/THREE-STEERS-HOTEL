// /lib/core/funnel.ts

import { FunnelStep } from "./types";
import { APP_EVENT, StoredEvent } from "./analytics";

const STORAGE_KEY = "hotel_funnel";

const ORDER: FunnelStep[] = [
  "VISIT",
  "ENGAGEMENT",
  "INTENT",
  "CONTACT",
];

/**
 * 🔥 SINGLE SOURCE OF TRUTH:
 * Event → Funnel mapping
 */
const EVENT_TO_STEP: Partial<Record<StoredEvent["type"], FunnelStep>> = {
  page_view: "VISIT",
  room_view: "ENGAGEMENT",
  whatsapp_click: "CONTACT",
  call_click: "CONTACT",
};

function isValidStep(step: unknown): step is FunnelStep {
  return ORDER.includes(step as FunnelStep);
}

function safeGet(): FunnelStep | null {
  if (typeof window === "undefined") return null;

  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return isValidStep(value) ? value : null;
  } catch {
    return null;
  }
}

function safeSet(step: FunnelStep): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, step);
  } catch {
    // ignore
  }
}

function advance(next: FunnelStep): void {
  const current = funnel.get();

  const currentIndex = ORDER.indexOf(current);
  const nextIndex = ORDER.indexOf(next);

  if (nextIndex <= currentIndex) return;

  safeSet(next);

  /**
   * 🔥 Emit funnel change (optional subscribers)
   */
  window.dispatchEvent(
    new CustomEvent("funnel:change", {
      detail: next,
    })
  );
}

/**
 * 🔥 EVENT LISTENER (AUTO-WIRED)
 */
if (typeof window !== "undefined") {
  window.addEventListener(APP_EVENT, (e: Event) => {
    const event = (e as CustomEvent<StoredEvent>).detail;

    const step = EVENT_TO_STEP[event.type];

    if (!step) return;

    advance(step);
  });
}

/**
 * SINGLE CONTROLLER
 */
export const funnel = {
  get(): FunnelStep {
    return safeGet() ?? "VISIT";
  },
};
