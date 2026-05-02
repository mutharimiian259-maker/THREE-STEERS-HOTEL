export type FunnelStep =
  | "VISIT"
  | "ROOM_VIEW"
  | "INTENT"
  | "CONTACT"
  | "BOOKED";

const STORAGE_KEY = "hotel_funnel_step";

function isValidStep(value: unknown): value is FunnelStep {
  return (
    value === "VISIT" ||
    value === "ROOM_VIEW" ||
    value === "INTENT" ||
    value === "CONTACT" ||
    value === "BOOKED"
  );
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
    // ignore storage failures
  }
}

export function setFunnelStep(step: FunnelStep): void {
  const previousRaw = safeGetItem(STORAGE_KEY);
  const previous = isValidStep(previousRaw) ? previousRaw : null;

  if (previous === step) return;

  safeSetItem(STORAGE_KEY, step);

  try {
    if (typeof window === "undefined") return;

    const event = new CustomEvent("funnel_step", {
      detail: {
        step,
        previous: previous ?? "UNKNOWN",
        source: "funnel_engine",
      },
    });

    window.dispatchEvent(event);
  } catch {
    // silent fail
  }
}

export function getFunnelStep(): FunnelStep | null {
  const value = safeGetItem(STORAGE_KEY);
  return isValidStep(value) ? value : null;
}
