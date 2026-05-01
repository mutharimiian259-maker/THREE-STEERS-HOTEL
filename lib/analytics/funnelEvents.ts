"use client";

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
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  } catch {
    // ignore storage failures (private mode, quota, etc.)
  }
}

export function setFunnelStep(step: FunnelStep): void {
  const previousRaw = safeGetItem(STORAGE_KEY);
  const previous = isValidStep(previousRaw) ? previousRaw : null;

  if (previous === step) return;

  safeSetItem(STORAGE_KEY, step);

  // fire event (non-blocking, safe failure isolation)
  try {
    window.dispatchEvent(
      new CustomEvent("funnel_step", {
        detail: {
          step,
          previous,
          source: "funnel_engine",
        },
      })
    );
  } catch {
    // do nothing
  }
}

export function getFunnelStep(): FunnelStep | null {
  const value = safeGetItem(STORAGE_KEY);
  return isValidStep(value) ? value : null;
}
