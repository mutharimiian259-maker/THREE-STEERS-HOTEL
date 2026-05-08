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
import { Funnel } from "./Funnel";

/* =============================================================
   🔒 SIMPLE EVENT LOCK (FK-STYLE DUPLICATE PREVENTION)
   ============================================================= */

const EVENT_REGISTRY = new Set<EventType>();

export function registerEventType(type: EventType) {
  if (EVENT_REGISTRY.has(type)) {
    console.warn(`[CORE LOCK] Duplicate event type blocked: ${String(type)}`);
    return false;
  }

  EVENT_REGISTRY.add(type);
  return true;
}

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
    /* =============================================================
       🔒 HARD GATE: EVENT MUST BE REGISTERED
       ============================================================= */

    invariant(
      isEventType(type) && EVENT_REGISTRY.has(type),
      `Unregistered event type "${String(type)}"`
    );

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
       EVENT DISPATCH (EXTERNAL SYSTEMS)
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

    /* =============================================================
       🔥 FUNNEL (ONLY AFTER SUCCESSFUL DISPATCH)
       ============================================================= */

    try {
      Funnel.ingest(event);
    } catch (error) {
      console.error("[analytics] funnel ingest failed", error);
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
