"use client";

import { trackEvent } from "@/lib/analytics/trackEvent";

export type FunnelStep =
  | "VISIT"
  | "ROOM_VIEW"
  | "INTENT"
  | "CONTACT"
  | "BOOKED";

const STORAGE_KEY = "hotel_funnel_step";

function isValidStep(value: any): value is FunnelStep {
  return (
    value === "VISIT" ||
    value === "ROOM_VIEW" ||
    value === "INTENT" ||
    value === "CONTACT" ||
    value === "BOOKED"
  );
}

function safeGetItem(key: string): string | null {
  if (typeof window === "undefined") return null;

  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, value);
  } catch {
    return;
  }
}

export function setFunnelStep(step: FunnelStep) {
  if (typeof window === "undefined") return;

  try {
    const previousRaw = safeGetItem(STORAGE_KEY);

    const previous: FunnelStep | null =
      previousRaw && isValidStep(previousRaw)
        ? previousRaw
        : null;

    if (previous === step) return;

    safeSetItem(STORAGE_KEY, step);

    trackEvent("funnel_step", {
      step,
      previous,
      source: "funnel_engine",
    });
  } catch {
    return;
  }
}

export function getFunnelStep(): FunnelStep | null {
  if (typeof window === "undefined") return null;

  try {
    const value = safeGetItem(STORAGE_KEY);

    if (!value) return null;

    return isValidStep(value) ? value : null;
  } catch {
    return null;
  }
}
