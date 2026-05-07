"use client";

import type { EventType, EventPayload, EventSource, StoredEvent } from "./types";
import { dispatch } from "./router";

/* ─────────────────────────────────────────
   SESSION (stable per tab lifecycle)
───────────────────────────────────────── */

let _sessionId: string | null = null;

function getSessionId(): string {
  if (_sessionId) return _sessionId;
  _sessionId = crypto.randomUUID();
  return _sessionId;
}

/* ─────────────────────────────────────────
   NORMALIZATION (deterministic payload)
───────────────────────────────────────── */

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

/* ─────────────────────────────────────────
   ENRICHMENT (system context injection)
───────────────────────────────────────── */

function enrich(): Record<string, unknown> {
  if (typeof window === "undefined") return {};

  return {
    userAgent: navigator.userAgent,
    path: window.location.pathname,
    referrer: document.referrer || null,
    ts: Date.now(),
  };
}

/* ─────────────────────────────────────────
   SIGNATURE (deduplication identity)
───────────────────────────────────────── */

function buildSignature(
  type: EventType,
  payload: EventPayload,
  source: EventSource,
  session_id: string,
  url: string
): string {
  return JSON.stringify({
    type,
    payload: normalize(payload),
    source,
    session_id,
    url,
  });
}

/* ─────────────────────────────────────────
   EVENT TRACKER (CORE KERNEL)
───────────────────────────────────────── */

export function track(
  type: EventType,
  payload: EventPayload = {},
  source: EventSource = "unknown"
): void {
  if (typeof window === "undefined") return;

  try {
    const timestamp = Date.now();
    const session_id = getSessionId();
    const url = window.location.pathname;

    const event: StoredEvent = {
      id: crypto.randomUUID(),

      type,
      payload: normalize(payload),
      source,

      timestamp,
      session_id,
      url,

      version: 1,

      signature: buildSignature(type, payload, source, session_id, url),

      // optional enrichment (non-breaking extension)
      ...enrich(),
    } as StoredEvent;

    const result = dispatch(event);

    // optional safety hook (if dispatch ever becomes async-capable later)
    if (!result) {
      console.warn("[analytics] event dropped by dispatcher", event);
    }
  } catch (err) {
    console.error("[analytics] tracking failed", err);
  }
}
