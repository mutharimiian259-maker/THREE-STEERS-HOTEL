"use client";

import type { EventType, EventPayload, EventSource, StoredEvent } from "./types";
import { dispatch } from "./router";

/* ─────────────────────────────────────────
   SESSION (in-memory only — IO removed)
───────────────────────────────────────── */

let _sessionId: string | null = null;

function getSessionId(): string {
  if (_sessionId) return _sessionId;
  _sessionId = crypto.randomUUID();
  return _sessionId;
}

/* ─────────────────────────────────────────
   NORMALIZATION
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
   SIGNATURE (stable identity)
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
   CORE TRACK FUNCTION
───────────────────────────────────────── */

export function track(
  type: EventType,
  payload: EventPayload = {},
  source: EventSource = "unknown"
): void {
  if (typeof window === "undefined") return;

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
    signature: buildSignature(type, payload, source, session_id, url),
  };

  dispatch(event);
}
