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

const EVENT_TO_STEP: Partial<Record<StoredEvent["type"], FunnelStep>> = {
  page_view: "VISIT",
  room_view: "ENGAGEMENT",
  whatsapp_click: "CONTACT",
  call_click: "CONTACT",
};

let currentCache: FunnelStep | null = null;
let initialized = false;
let lastTransitionMap = new Map<string, number>();

function isValidStep(step: unknown): step is FunnelStep {
  return ORDER.includes(step as FunnelStep);
}

function safeGet(): FunnelStep | null {
  if (typeof window === "undefined") return null;

  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return isValidStep(value) ? value : null;
  } catch {
    return currentCache;
  }
}

function safeSet(step: FunnelStep): void {
  if (typeof window === "undefined") return;

  currentCache = step;

  try {
    localStorage.setItem(STORAGE_KEY, step);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[FUNNEL] storage write failed", err);
    }
  }
}

function advance(next: FunnelStep, eventType?: string): void {
  const now = Date.now();
  const current = safeGet() ?? "VISIT";

  const currentIndex = ORDER.indexOf(current);
  const nextIndex = ORDER.indexOf(next);

  if (currentIndex === -1 || nextIndex === -1) return;

  // STRICT PROGRESSION ONLY (no skipping backwards or sideways)
  if (nextIndex <= currentIndex) return;

  // per-event-type debounce (stronger than previous version)
  const key = `${current}-${next}-${eventType ?? "unknown"}`;
  const last = lastTransitionMap.get(key) ?? 0;

  if (now - last < 500) return;

  lastTransitionMap.set(key, now);

  safeSet(next);

  try {
    window.dispatchEvent(
      new CustomEvent<FunnelStep>("funnel:change", {
        detail: next,
      })
    );
  } catch {}

  if (process.env.NODE_ENV === "development") {
    console.log("[FUNNEL]", current, "→", next);
  }
}

/**
 * SINGLETON EVENT LISTENER
 */
function initListener() {
  if (initialized || typeof window === "undefined") return;

  initialized = true;

  window.addEventListener(APP_EVENT, (e: Event) => {
    const detail = (e as CustomEvent).detail as StoredEvent;

    if (!detail?.type) return;

    const step = EVENT_TO_STEP[detail.type];

    if (!step) return;

    // enforce VISIT-first rule
    const current = safeGet();
    if (!current && step !== "VISIT") return;

    advance(step, detail.type);
  });
}

initListener();

export const funnel = {
  get(): FunnelStep {
    return safeGet() ?? "VISIT";
  },
};
