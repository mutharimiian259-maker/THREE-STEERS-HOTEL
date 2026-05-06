"use client";

export type EventType =
  | "page_view"
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "booking_intent"
  | "navigation"
  | "email_click";

export type EventSource =
  | "navbar"
  | "footer"
  | "room_card"
  | "exit_intent"
  | "sticky_cta"
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
  source: "core";
  origin: EventSource;
};

export const APP_EVENT = "app:event";

const STORAGE_KEY = "hotel_events";
const MAX_EVENTS = 200;
const DEDUP_WINDOW_MS = 3000;
const MAX_PAYLOAD_SIZE = 2000;

let cache: StoredEvent[] = [];

const VALID_TYPES = new Set<EventType>([
  "page_view",
  "room_view",
  "whatsapp_click",
  "call_click",
  "booking_intent",
  "navigation",
  "email_click",
]);

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * CONSISTENT STRINGIFY (fix dedup inconsistency)
 */
function stableStringify(obj: any) {
  if (!obj || typeof obj !== "object") return JSON.stringify(obj);

  return JSON.stringify(
    Object.keys(obj)
      .sort()
      .reduce((acc: any, key) => {
        acc[key] = obj[key];
        return acc;
      }, {})
  );
}

function isValidEvent(e: any): e is StoredEvent {
  return (
    e &&
    VALID_TYPES.has(e.type) &&
    typeof e.id === "string" &&
    typeof e.ts === "number" &&
    typeof e.url === "string"
  );
}

function syncCache() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    cache = Array.isArray(parsed) ? parsed.filter(isValidEvent) : [];
  } catch {
    cache = [];
  }
}

function safeGet(): StoredEvent[] {
  if (!cache.length) syncCache();
  return cache;
}

function safeSet(events: StoredEvent[]) {
  cache = events.slice(-MAX_EVENTS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch (err) {
    console.error("[TRACK] storage write failed", err);
  }
}

function isDuplicate(events: StoredEvent[], next: StoredEvent) {
  for (let i = events.length - 1; i >= 0; i--) {
    const e = events[i];

    if (next.ts - e.ts > DEDUP_WINDOW_MS) break;

    if (
      e.type === next.type &&
      e.url === next.url &&
      stableStringify(e.payload) === stableStringify(next.payload)
    ) {
      return true;
    }
  }
  return false;
}

function sanitizePayload(payload: EventPayload): EventPayload {
  try {
    const size = JSON.stringify(payload).length;
    if (size > MAX_PAYLOAD_SIZE) {
      return { __truncated: true };
    }
    return payload;
  } catch {
    return {};
  }
}

/**
 * SAFE INTERCEPT HOOK (no mutation risk)
 */
type Listener = (event: StoredEvent) => void;
const listeners = new Set<Listener>();

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function sendToGA(event: StoredEvent) {
  const w = window as any;

  if (typeof w.gtag !== "function") return;

  try {
    w.gtag("event", event.type, {
      event_category: "engagement",
      event_label: event.origin,
      page_location: event.url,
      ...event.payload,
    });
  } catch {}
}

/**
 * CORE TRACK FUNCTION
 */
export function track(
  type: EventType,
  payload: EventPayload = {},
  origin: EventSource = "unknown"
): void {
  if (typeof window === "undefined") return;

  if (!VALID_TYPES.has(type)) return;

  const now = Date.now();

  const event: StoredEvent = {
    id: generateId(),
    type,
    payload: sanitizePayload(payload),
    time: new Date(now).toISOString(),
    ts: now,
    url: window.location.href,
    source: "core",
    origin,
  };

  const events = safeGet();

  if (isDuplicate(events, event)) return;

  events.push(event);
  safeSet(events);

  /**
   * EVENT BUS
   */
  window.dispatchEvent(new CustomEvent(APP_EVENT, { detail: event }));

  /**
   * MULTI-LISTENER SUPPORT
   */
  listeners.forEach((fn) => {
    try {
      fn(event);
    } catch {}
  });

  /**
   * GA
   */
  sendToGA(event);

  if (process.env.NODE_ENV === "development") {
    console.log("[TRACK]", event);
  }
}
