"use client";

import {
  track,
  EventType,
  EventSource,
} from "@/lib/core/analytics";

/**
 * Intent = semantic tagging only
 * MUST reuse core types
 */

type IntentPayload = {
  source?: string;
  context?: string;
  page?: string;
  value?: number;
};

export function trackIntent(
  type: EventType,
  payload: IntentPayload = {},
  origin: EventSource = "unknown"
) {
  if (typeof window === "undefined") return;

  // 🔥 ensure payload is always an object (safety for core)
  const safePayload = payload ?? {};

  track(
    type,
    {
      ...safePayload,
      intent: true, // semantic flag only
    },
    origin
  );
}
