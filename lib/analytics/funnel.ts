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

export function setFunnelStep(step: FunnelStep) {
  if (typeof window === "undefined") return;

  try {
    const previousRaw = localStorage.getItem(STORAGE_KEY);
    const previous: FunnelStep | null = isValidStep(previousRaw)
      ? previousRaw
      : null;

    if (previous === step) return;

    localStorage.setItem(STORAGE_KEY, step);

    trackEvent("funnel_step", {
      step,
      previous,
    });
  } catch (error) {
    console.error("Funnel storage error:", error);
  }
}

export function getFunnelStep(): FunnelStep | null {
  if (typeof window === "undefined") return null;

  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return isValidStep(value) ? value : null;
  } catch (error) {
    console.error("Funnel read error:", error);
    return null;
  }
}
