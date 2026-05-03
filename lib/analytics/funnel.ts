// /lib/core/funnel.ts

import { FunnelStep } from "./types";

const STORAGE_KEY = "hotel_funnel";

const ORDER: FunnelStep[] = [
  "VISIT",
  "ENGAGEMENT",
  "INTENT",
  "CONTACT",
];

function safeGet(): FunnelStep | null {
  if (typeof window === "undefined") return null;

  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value as FunnelStep | null;
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

/**
 * SINGLE CONTROLLER
 */
export const funnel = {
  /**
   * Always returns a valid step
   */
  get(): FunnelStep {
    return safeGet() ?? "VISIT";
  },

  /**
   * STRICT forward-only movement
   */
  set(next: FunnelStep): void {
    const current = this.get();

    const currentIndex = ORDER.indexOf(current);
    const nextIndex = ORDER.indexOf(next);

    // ❌ block backward or same step
    if (nextIndex <= currentIndex) return;

    safeSet(next);
  },
};
