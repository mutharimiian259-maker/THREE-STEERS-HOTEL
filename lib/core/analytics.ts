"use client";

/* =============================================================
   CORE ANALYTICS (ENFORCED EVENT GATEWAY)
   ============================================================= */

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
import { Funnel } from "./Funnel"; // 🔥 ENFORCED OWNERSHIP BOUNDARY

/* =============================================================
   TYPES
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

function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`[analytics] ${message}`);
  }
}

/* =============================================================
   NORMALIZER
   ============================================================= */

function normalize(value: unknown): unknown {
  if (value === null || typeof value !== "object") return value;

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
   SAFE BROWSER CONTEXT
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
   TRACK (SINGLE ENFORCED ENTRY POINT)
   ============================================================= */

export async function track(
  type: EventType,
  payload: EventPayload = {},
  source: EventSource = "unknown"
): Promise<TrackResult> {
  if (typeof window === "undefined") {
    return { accepted: false, error: "track() called on server" };
  }

  try {
    invariant(isEventType(type), `Invalid event type "${String(type)}"`);

    const safeSource: EventSource = isEventSource(source)
      ? source
      : "unknown";

    const normalizedPayload = normalize(payload) as EventPayload;

    const event = createEvent({
      type,
      source: safeSource,
      payload: normalizedPayload,
      metadata: getBrowserMeta(),
    });

    /* =============================================================
       🔥 ENFORCED FUNNEL BOUNDARY
       ============================================================= */

    Funnel.ingest(event); // ONLY funnel entry point allowed

    /* =============================================================
       EVENT DISPATCH
       ============================================================= */

    let results: AdapterDispatchResult[];

    try {
      results = await dispatch(event);
    } catch (error) {
      console.error("[analytics] dispatch crashed", error);

      return {
        accepted: false,
        event,
        error,
      };
    }

    return {
      accepted: true,
      event,
      results,
    };
  } catch (error) {
    console.error("[analytics] track() failed", { type, source, error });

    return {
      accepted: false,
      error,
    };
  }
}

/* =============================================================
   SAFE TRACK
   ============================================================= */

export async function safeTrack(
  type: EventType,
  payload: EventPayload = {},
  source: EventSource = "unknown"
): Promise<void> {
  try {
    await track(type, payload, source);
  } catch (error) {
    console.error("[analytics] safeTrack() swallowed error", error);
  }
}
