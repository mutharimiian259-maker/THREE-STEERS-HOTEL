const STORAGE_KEY = "hotel_funnel_step";

export const FUNNEL_STEPS = {
  VISIT: "VISIT",
  ROOM_VIEW: "ROOM_VIEW",
  INTENT: "INTENT",
  CONTACT: "CONTACT",
  BOOKED: "BOOKED",
} as const;

export type FunnelStep = typeof FUNNEL_STEPS[keyof typeof FUNNEL_STEPS];

function isValidStep(value: unknown): value is FunnelStep {
  return Object.values(FUNNEL_STEPS).includes(value as FunnelStep);
}

function safeGetItem(key: string): string | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, value);
  } catch {
    // silent fail (production-safe)
  }
}

export function setFunnelStep(step: FunnelStep): void {
  const previousRaw = safeGetItem(STORAGE_KEY);
  const previous = isValidStep(previousRaw) ? previousRaw : null;

  if (previous === step) return;

  safeSetItem(STORAGE_KEY, step);

  if (typeof window === "undefined") return;

  try {
    window.dispatchEvent(
      new CustomEvent("funnel_step", {
        detail: {
          step,
          previous: previous ?? "UNKNOWN",
          source: "funnel_engine",
        },
      })
    );
  } catch {
    // silent fail
  }
}

export function getFunnelStep(): FunnelStep | null {
  const value = safeGetItem(STORAGE_KEY);
  return isValidStep(value) ? value : null;
}
