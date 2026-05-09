import {
  createEvent,
  isEventSource,
  isEventType,
} from "./types";

import type {
  EventPayload,
  EventSource,
  EventType,
  StoredEvent,
} from "./types";

import { dispatch } from "./router";

export type TrackParams = Readonly<{
  type: EventType;
  source: EventSource;
  payload?: EventPayload;
}>;

export type TrackResult = Readonly<{
  accepted: boolean;
  event?: StoredEvent;
  error?: unknown;
}>;

/* =============================================================
   CORE TRACK
   STRICT SYSTEM ENTRY POINT
   ============================================================= */

export async function track({
  type,
  source,
  payload = {},
}: TrackParams): Promise<TrackResult> {
  try {
    /* -----------------------------
       STRICT TYPE VALIDATION
       ----------------------------- */

    if (!isEventType(type)) {
      throw new Error(
        `[CORE] Invalid event type: ${String(type)}`
      );
    }

    if (!isEventSource(source)) {
      throw new Error(
        `[CORE] Invalid event source: ${String(source)}`
      );
    }

    /* -----------------------------
       EVENT CREATION
       CORE OWNS INFRASTRUCTURE
       ----------------------------- */

    const event = createEvent({
      type,
      source,
      payload,
    });

    /* -----------------------------
       DISPATCH
       MUST COMPLETE BEFORE SUCCESS
       ----------------------------- */

    const results = await dispatch(event);

    const accepted = results.every(
      (result) => result.accepted
    );

    return {
      accepted,
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
