"use client";

import type { EventType, EventPayload, EventSource, StoredEvent } from "./types";
import { dispatch } from "./router";

/* ─────────────────────────────────────────
   SESSION (lightweight, browser only)
───────────────────────────────────────── */

let _sessionId: string | null = null;

function getSessionId(): string {
  if (typeof window === "undefined") return "server";

  if (_sessionId) return _sessionId;

  const key = "hotel_session_id";

  _sessionId =
    localStorage.getItem(key) ?? crypto.randomUUID();

  localStorage.setItem(key, _sessionId);

  return _sessionId;
}

/* ─────────────────────────────────────────
   NORMALIZATION (deterministic payload)
───────────────────────────────────────── */

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

/* ─────────────────────────────────────────
   SIGNATURE (dedup-safe identity)
───────────────────────────────────────── */

function buildSig(
  type: EventType,
  payload: EventPayload,
  origin: EventSource,
  session_id: string,
  url: string
): string {
  return JSON.stringify({
    type,
    payload: normalize(payload),
    origin,
    session_id,
    url
  });
}

/* ─────────────────────────────────────────
   MAIN TRACK FUNCTION (CORE ENTRYPOINT)
───────────────────────────────────────── */

export function track(
  type: EventType,
  payload: EventPayload = {},
  origin: EventSource = "unknown"
): void {
  if (typeof window === "undefined") return;

  const now = Date.now();
  const session_id = getSessionId();
  const url = window.location.pathname;

  const event: StoredEvent = {
    id: crypto.randomUUID(),
    type,
    payload: normalize(payload),
    time: new Date(now).toISOString(),
    ts: now,
    url,
    origin,
    session_id,
    _sig: buildSig(type, payload, origin, session_id, url),
  };

  /* ─────────────────────────────────────
     SINGLE RESPONSIBILITY:
     HAND OFF TO ROUTER ONLY
  ───────────────────────────────────── */

  dispatch(event);
}
