import {
  createEvent,
  getSessionId,
  isEventSource,
  isEventType,
} from "./types";

import type {
  EventPayload,
  EventSource,
  EventType,
  StoredEvent,
  TrackingRequest,
} from "./types";

import { dispatch } from "./router";

/* =============================================================
   TRACK RESULT
   ============================================================= */

export type TrackResult = Readonly<{
  accepted: boolean;
  event?: StoredEvent;
  error?: unknown;
}>;

/* =============================================================
   LEGACY TRACK SIGNATURE
   ============================================================= */

type LegacyTrackSignature = (
  type: EventType,
  payload?: EventPayload,
  source?: EventSource
) => Promise<TrackResult>;

/* =============================================================
   CANONICAL TRACK SIGNATURE
   ============================================================= */

type CanonicalTrackSignature = (
  request: TrackingRequest
) => Promise<TrackResult>;

/* =============================================================
   OVERLOADS
   ============================================================= */

export function track(
  request: TrackingRequest
): Promise<TrackResult>;

export function track(
  type: EventType,
  payload?: EventPayload,
  source?: EventSource
): Promise<TrackResult>;

/* =============================================================
   CORE TRACK
   SYSTEM ENTRY POINT
   ============================================================= */

export async function track(
  input:
    | TrackingRequest
    | EventType,

  payload: EventPayload = {},

  source: EventSource = "unknown"
): Promise<TrackResult> {
  try {
    /* -----------------------------
       NORMALIZATION
       SUPPORTS MIGRATION SAFELY
       ----------------------------- */

    const request: TrackingRequest =
      typeof input === "string"
        ? {
            type: input,
            payload,
            source,
          }
        : input;

    const normalizedSource =
      request.source ?? "unknown";

    const normalizedPayload =
      request.payload ?? {};

    /* -----------------------------
       STRICT VALIDATION
       ----------------------------- */

    if (!isEventType(request.type)) {
      throw new Error(
        `[CORE] Invalid event type: ${String(
          request.type
        )}`
      );
    }

    if (!isEventSource(normalizedSource)) {
      throw new Error(
        `[CORE] Invalid event source: ${String(
          normalizedSource
        )}`
      );
    }

    /* -----------------------------
       CORE EVENT OWNERSHIP
       ----------------------------- */

    const event = createEvent({
      id: crypto.randomUUID() as any,

      type: request.type,

      source: normalizedSource,

      payload: normalizedPayload,

      metadata: request.metadata,

      url:
        typeof window !== "undefined"
          ? window.location.href
          : "server",

      sessionId: getSessionId(),
    });

    /* -----------------------------
       DISPATCH
       ----------------------------- */

    const results = await dispatch(event);

    const accepted =
      results.length > 0;

    /* -----------------------------
       ADAPTER FAILURE OBSERVABILITY
       ----------------------------- */

    const failedAdapters = results.filter(
      (result) => !result.accepted
    );

    if (failedAdapters.length > 0) {
      console.warn(
        "[CORE] Some adapters failed",
        failedAdapters
      );
    }

    return {
      accepted,
      event,
    };
  } catch (error) {
    console.error("[CORE] track() failed", {
      input,
      error,
    });

    return {
      accepted: false,
      error,
    };
  }
}
