"use client";

import { trackEvent } from "@/lib/analytics/trackEvent";

export type FunnelStep =
  | "VISIT"
  | "ROOM_VIEW"
  | "INTENT"
  | "CONTACT"
  | "BOOKED";

const STORAGE_KEY = "hotel_funnel_step";

export function setFunnelStep(step: FunnelStep) {
  if (typeof window === "undefined") return;

  try {
    const previous = localStorage.getItem(STORAGE_KEY);

    localStorage.setItem(STORAGE_KEY, step);

    trackEvent("booking_intent", {
      step,
      previous,
    });
  } catch {
    return;
  }
}

export function getFunnelStep(): FunnelStep | null {
  if (typeof window === "undefined") return null;

  try {
    return localStorage.getItem(STORAGE_KEY) as FunnelStep;
  } catch {
    return null;
  }
}
