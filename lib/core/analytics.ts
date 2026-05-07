"use client";

export type EventType =
  | "page_view"
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "booking_intent";

export type EventSource =
  | "navbar"
  | "footer"
  | "room_card"
  | "sticky_cta"
  | "exit_intent"
  | "page"
  | "unknown";

export type EventPayload = Record<string, unknown>;

export type StoredEvent = {
  id: string;
  type: EventType;
  payload: EventPayload;
  time: string;
  ts: number;
  url: string;
  origin: EventSource;
  session_id: string;
  _sig: string;
};

/* ── CONFIG ───────────────────────────── */

const STORAGE_KEY = "hotel_events";
const SESSION_KEY = "hotel_session_id";
const MAX_EVENTS = 200;
const DEDUP_WINDOW_MS = 3000;

/* ── CACHE ────────────────────────────── */

let _cache: StoredEvent[] | null = null;
let _sessionId: string | null = null;

/* ── SESSION ──────────────────────────── */

function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  if (_sessionId) return _sessionId;

  _sessionId = localStorage.getItem(SESSION_KEY) ?? crypto.randomUUID();
  localStorage.setItem(SESSION_KEY, _sessionId);
  return _sessionId;
}

/* ── SAFE STORAGE ─────────────────────── */

function safeGet(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function safeSet(value: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {}
}

/* ── NORMALIZATION (FIXED STABILITY) ──── */

function normalize(value: unknown): unknown {
  if (value === null || typeof value !== "object") return value;

  if (Array.isArray(value)) {
    return value.map(normalize);
  }

  const obj = value as Record<string, unknown>;
  const sorted: Record<string, unknown> = {};

  for (const k of Object.keys(obj).sort()) {
    sorted[k] = normalize(obj[k]);
  }

  return sorted;
}

/* ── SIGNATURE ────────────────────────── */

function buildSig(
  type: EventType,
  payload: EventPayload,
  origin: EventSource,
  session_id: string
): string {
  return JSON.stringify({
    type,
    payload: normalize(payload),
    origin,
    session_id,
  });
}

/* ── CACHE LOADER ─────────────────────── */

function loadCache(): StoredEvent[] {
  if (_cache) return _cache;

  try {
    const raw = safeGet();
    _cache = raw ? (JSON.parse(raw) as StoredEvent[]) : [];
  } catch {
    _cache = [];
  }

  if (_cache.length > MAX_EVENTS) {
    _cache = _cache.slice(-MAX_EVENTS);
    safeSet(JSON.stringify(_cache));
  }

  return _cache;
}

function flushCache(): void {
  if (!_cache) return;
  safeSet(JSON.stringify(_cache));
}

/* ── DEDUP ────────────────────────────── */

function isDuplicate(sig: string, now: number, events: StoredEvent[]): boolean {
  const cutoff = now - DEDUP_WINDOW_MS;

  for (let i = events.length - 1; i >= 0; i--) {
    const e = events[i];

    if (e.ts < cutoff) break;

    if (e._sig === sig) return true;
  }

  return false;
}

/* ── TRACK ────────────────────────────── */

export function track(
  type: EventType,
  payload: EventPayload = {},
  origin: EventSource = "unknown"
): void {
  if (typeof window === "undefined") return;

  const events = loadCache();
  const now = Date.now();
  const session_id = getSessionId();

  const sig = buildSig(type, payload, origin, session_id);

  if (isDuplicate(sig, now, events)) return;

  const event: StoredEvent = {
    id: crypto.randomUUID(),
    type,
    payload: normalize(payload),
    time: new Date(now).toISOString(),
    ts: now,
    url: window.location.pathname, // 🔥 FIX: removes query-string noise
    origin,
    session_id,
    _sig: sig,
  };

  events.push(event);

  if (events.length > MAX_EVENTS) {
    events.splice(0, events.length - MAX_EVENTS);
  }

  flushCache();
}

/* ── PUBLIC API ───────────────────────── */

export function getEvents(): StoredEvent[] {
  return loadCache();
}

export function clearEvents(): void {
  _cache = [];
  safeSet("[]");
}
