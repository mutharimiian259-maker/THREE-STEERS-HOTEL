"use client";

import { createEvent, isEventSource, isEventType } from "./types";
import type { EventPayload, EventSource, EventType, StoredEvent } from "./types";
import { dispatch } from "./router";

export type TrackResult = Readonly<{
  accepted: boolean;
  event?: StoredEvent;
  error?: unknown;
}>;

/* =============================================================
   CORE TRACK (STRICT BRAIN ENTRY POINT)
   ============================================================= */

export function track(
  type: EventType,
  payload: EventPayload = {},
  source: EventSource = "ui"
): TrackResult {
  try {
    /* -----------------------------
       STRICT VALIDATION (NO FALLBACKS)
       ----------------------------- */

    if (!isEventType(type)) {
      throw new Error(`[CORE] Invalid event type: ${String(type)}`);
    }

    if (!isEventSource(source)) {
      throw new Error(`[CORE] Invalid event source: ${String(source)}`);
    }

    /* -----------------------------
       PURE EVENT CREATION
       (NO BROWSER COUPLING HERE)
       ----------------------------- */

    const event = createEvent({
      type,
      source,
      payload,
    });

    /* -----------------------------
       DISPATCH ONLY (BRAIN OUTPUT)
       ----------------------------- */

    dispatch(event);

    return {
      accepted: true,
      event,
    };
  } catch (error) {
    console.error("[CORE] track() failed", {
      type,
      source,
      error,
    });

    return {
      accepted: false,
      error,
    };
  }
}
