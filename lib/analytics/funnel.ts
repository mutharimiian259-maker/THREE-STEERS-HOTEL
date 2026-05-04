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
let lastStep: FunnelStep | null = null;
let lastUpdateTime = 0;

function isValidStep(step: unknown): step is FunnelStep {
  return ORDER.includes(step as FunnelStep);
}

function safeGet(): FunnelStep | null {
  if (typeof window === "undefined") return null;

  try {
    const value = localStorage.getItem(STORAGE_KEY);
    const parsed = isValidStep(value) ? value : null;

    currentCache = parsed;
    return parsed;
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

function isValidEvent(e: any): e is StoredEvent {
  return (
    e &&
    typeof e.type === "string" &&
    typeof e.time === "string"
  );
}

function advance(next: FunnelStep): void {
  const now = Date.now();
  const current = safeGet() ?? "VISIT";

  const currentIndex = ORDER.indexOf(current);
  const nextIndexRaw = ORDER.indexOf(next);

  if (currentIndex === -1 || nextIndexRaw === -1) return;

  let nextStep = next;

  // promotion rule
  if (current === "ENGAGEMENT" && next === "ENGAGEMENT") {
    nextStep = "INTENT";
  }

  const nextIndex = ORDER.indexOf(nextStep);

  if (nextIndex <= currentIndex) return;

  // prevent rapid duplicate transitions of SAME step only
  if (
    lastStep === nextStep &&
    now - lastUpdateTime < 300
  ) {
    return;
  }

  lastStep = nextStep;
  lastUpdateTime = now;

  safeSet(nextStep);

  try {
    window.dispatchEvent(
      new CustomEvent<FunnelStep>("funnel:change", {
        detail: nextStep,
      })
    );
  } catch {
    // isolate failures
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[FUNNEL]", current, "→", nextStep);
  }
}

/**
 * 🔥 SINGLETON EVENT LISTENER
 */
function initListener() {
  if (initialized || typeof window === "undefined") return;

  initialized = true;

  window.addEventListener(APP_EVENT, (e: Event) => {
    const detail = (e as CustomEvent).detail;

    if (!isValidEvent(detail)) return;

    const step = EVENT_TO_STEP[detail.type];

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
