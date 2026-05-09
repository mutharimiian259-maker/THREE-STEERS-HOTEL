"use client";

/* =============================================================
   CORE ANALYTICS (SINGLE EVENT AUTHORITY)
   ============================================================= */

import { createEvent, isEventSource, isEventType } from "./types";
import type { EventPayload, EventSource, EventType, StoredEvent } from "./types";
import { dispatch } from "./router";

/* =============================================================
   TYPES
   ============================================================= */

export type TrackResult = Readonly<{
  accepted: boolean;
  event?: StoredEvent;
  error?: unknown;
}>;

/* =============================================================
   BROWSER META (OPTIONAL ATTACHMENT ONLY)
   ============================================================= */

function getBrowserMeta() {
  if (typeof window === "undefined") return undefined;

  return {
    pathname: window.location.pathname,
    referrer: document.referrer,
    user_agent: navigator.userAgent,
  };
}

/* =============================================================
   TRACK (SINGLE CORE ENTRY POINT)
   ============================================================= */

export function track(
  type: EventType,
  payload: EventPayload = {},
  source: EventSource = "ui"
): TrackResult {
  try {
    /* =========================================================
       STRICT TYPE GUARD ONLY (NO REGISTRY)
       ========================================================= */

    if (!isEventType(type)) {
      throw new Error(`[CORE] Invalid event type: ${String(type)}`);
    }

    const safeSource: EventSource = isEventSource(source)
      ? source
      : "ui";

    const event = createEvent({
      type,
      source: safeSource,
      payload,
      metadata: getBrowserMeta(),
    });

    /* =========================================================
       DISPATCH TO ADAPTER LAYER ONLY
       ========================================================= */

    dispatch(event);

    return {
      accepted: true,
      event,
    };
  } catch (error) {
    console.error("[CORE] track() failed", { type, source, error });

    return {
      accepted: false,
      error,
    };
  }
}
