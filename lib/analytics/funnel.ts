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
let lastUpdateTime = 0;

function isValidStep(step: unknown): step is FunnelStep {
  return ORDER.includes(step as FunnelStep);
}

function safeGet(): FunnelStep | null {
  if (typeof window === "undefined") return null;

  if (currentCache) return currentCache;

  try {
    const value = localStorage.getItem(STORAGE_KEY);
    currentCache = isValidStep(value) ? value : null;
    return currentCache;
  } catch {
    return null;
  }
}

function safeSet(step: FunnelStep): void {
  if (typeof window === "undefined") return;

  currentCache = step;

  try {
    localStorage.setItem(STORAGE_KEY, step);
  } catch {
    // ignore
  }
}

function advance(next: FunnelStep): void {
  const now = Date.now();

  // debounce (avoid rapid writes)
  if (now - lastUpdateTime < 300) return;
  lastUpdateTime = now;

  const current = safeGet() ?? "VISIT";

  const currentIndex = ORDER.indexOf(current);
  const nextIndex = ORDER.indexOf(next);

  if (currentIndex === -1 || nextIndex === -1) return;

  // promote ENGAGEMENT → INTENT if repeated engagement
  if (
    current === "ENGAGEMENT" &&
    next === "ENGAGEMENT"
  ) {
    next = "INTENT";
  }

  if (nextIndex <= currentIndex) return;

  safeSet(next);

  try {
    window.dispatchEvent(
      new CustomEvent("funnel:change", {
        detail: next,
      })
    );
  } catch {
    // isolate failures
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[FUNNEL]", current, "→", next);
  }
}

/**
 * 🔥 SINGLETON EVENT LISTENER
 */
function initListener() {
  if (initialized || typeof window === "undefined") return;

  initialized = true;

  window.addEventListener(APP_EVENT, (e: Event) => {
    const event = (e as CustomEvent<StoredEvent>).detail;

    const step = EVENT_TO_STEP[event.type];

    if (!step) return;

    advance(step);
  });
}

initListener();

/**
 * SINGLE CONTROLLER
 */
export const funnel = {
  get(): FunnelStep {
    return safeGet() ?? "VISIT";
  },
};
