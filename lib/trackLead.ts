"use client";

import { track, EventType } from "@/lib/core/analytics";

/**
 * Intent = semantic tagging only
 * MUST reuse core EventType
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
  origin?: Parameters<typeof track>[2]
) {
  if (typeof window === "undefined") return;

  track(
    type,
    {
      ...payload,
      intent: true,
    },
    origin
  );
}
