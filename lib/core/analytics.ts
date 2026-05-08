"use client";

/* =============================================================
   CORE ANALYTICS
   -------------------------------------------------------------
   The ONLY public tracking entry point in the application.

   Responsibilities:
   - validate runtime inputs
   - normalize payloads
   - create canonical events
   - dispatch events to adapters
   - expose observability hooks

   Forbidden:
   - direct gtag() usage
   - localStorage writes
   - custom event object creation
   - duplicate event pipelines
   ============================================================= */

import {
  createEvent,
  isEventSource,
  isEventType,
  type EventPayload,
  type EventSource,
  type EventType,
  type StoredEvent,
} from "./types";

import { dispatch } from "./router";

/* =============================================================
   TRACK RESULT
   ============================================================= */

export type AdapterDispatchResult = Readonly<{
  adapter: string;
  success: boolean;
  error?: unknown;
}>;

export type TrackResult = Readonly<{
  accepted: boolean;
  event?: StoredEvent;
  results?: readonly AdapterDispatchResult[];
  error?: unknown;
}>;

/* =============================================================
   INVARIANT
   ============================================================= */

function invariant(
  condition: unknown,
  message: string
): asserts condition {
  if (!condition) {
    throw new Error(`[analytics] ${message}`);
  }
}

/* =============================================================
   PAYLOAD NORMALIZATION
   Stable deterministic serialization
   ============================================================= */

function normalize(value: unknown): unknown {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(normalize);
  }

  const obj = value as Record<string, unknown>;

  const sorted: Record<string, unknown> = {};

  for (const key of Object.keys(obj).sort()) {
    sorted[key] = normalize(obj[key]);
  }

  return sorted;
}

/* =============================================================
   DEV LOGGER
   ============================================================= */

function devLog(
  message: string,
  payload?: unknown
): void {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  console.log(`[analytics] ${message}`, payload ?? "");
}

/* =============================================================
   PUBLIC TRACK API
   ============================================================= */

export async function track(
  type: EventType,
  payload: EventPayload = {},
  source: EventSource = "unknown"
): Promise<TrackResult> {
  if (typeof window === "undefined") {
    return {
      accepted: false,
      error: "track() called on server",
    };
  }

  try {
    /* ---------------------------------------------------------
       VALIDATION
       --------------------------------------------------------- */

    invariant(
      isEventType(type),
      `Invalid event type "${String(type)}"`
    );

    const safeSource: EventSource = isEventSource(source)
      ? source
      : "unknown";

    /* ---------------------------------------------------------
       NORMALIZATION
       --------------------------------------------------------- */

    const normalizedPayload = normalize(
      payload
    ) as EventPayload;

    /* ---------------------------------------------------------
       EVENT CREATION
       --------------------------------------------------------- */

    const event = createEvent({
      type,
      source: safeSource,
      payload: normalizedPayload,

      metadata: {
        pathname: window.location.pathname,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
      },
    });

    devLog("event created", event);

    /* ---------------------------------------------------------
       DISPATCH
       --------------------------------------------------------- */

    const results = await dispatch(event);

    /* ---------------------------------------------------------
       OBSERVABILITY
       --------------------------------------------------------- */

    const failed = results.filter(
      (result) => !result.success
    );

    if (failed.length > 0) {
      console.warn(
        "[analytics] adapter failures detected",
        failed
      );
    }

    devLog("dispatch completed", {
      event_id: event.id,
      adapters: results.length,
      failed: failed.length,
    });

    /* ---------------------------------------------------------
       SUCCESS
       --------------------------------------------------------- */

    return {
      accepted: true,
      event,
      results,
    };
  } catch (error) {
    console.error("[analytics] track() failed", {
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

/* =============================================================
   SAFE TRACK
   -------------------------------------------------------------
   Never throws.
   Useful for UI interaction handlers.
   ============================================================= */

export async function safeTrack(
  type: EventType,
  payload: EventPayload = {},
  source: EventSource = "unknown"
): Promise<void> {
  try {
    await track(type, payload, source);
  } catch (error) {
    console.error(
      "[analytics] safeTrack() swallowed error",
      error
    );
  }
}
