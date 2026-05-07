"use client";

export type EventType =
  | "page_view"
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "navigation"
  | "email_click"
  | "booking_intent";

export type EventPayload = Record<string, unknown>;

export type StoredEvent = {
  id: string;
  type: EventType;
  payload: EventPayload;
  time: string;
  ts: number;
  url: string;
  source?: "core";
};

export const APP_EVENT = "app:event";

const STORAGE_KEY = "hotel_events";
const MAX_EVENTS = 200;
const DEDUP_WINDOW_MS = 1500;
const MAX_PAYLOAD_SIZE = 2000;

let cache: StoredEvent[] = [];

const VALID_TYPES = new Set<EventType>([
  "page_view",
  "room_view",
  "whatsapp_click",
  "call_click",
  "navigation",
  "email_click",
  "booking_intent",
]);

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/* ---------------------------------------
   STRICT VALIDATION (ENFORCED)
--------------------------------------- */

function isValidEventType(type: string): type is EventType {
  return VALID_TYPES.has(type as EventType);
}

/* ---------------------------------------
   STABLE PAYLOAD HASH (FIXED DEDUP)
--------------------------------------- */

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }

  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj).sort();

  const sorted: Record<string, unknown> = {};
  for (const k of keys) sorted[k] = obj[k];

  return JSON.stringify(
    Object.fromEntries(
      Object.entries(sorted).map(([k, v]) => [k, stableStringify(v)])
    )
  );
}

/* ---------------------------------------
   STORAGE SAFETY
--------------------------------------- */

function syncCache(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    cache = Array.isArray(parsed) ? parsed : [];
  } catch {
    cache = [];
  }
}

function safeGet(): StoredEvent[] {
  if (!cache.length) syncCache();
  return cache;
}

function safeSet(events: StoredEvent[]): void {
  cache = events.slice(-MAX_EVENTS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {}
}

/* ---------------------------------------
   DEDUP ENGINE (FIXED)
--------------------------------------- */

function isDuplicate(events: StoredEvent[], next: StoredEvent): boolean {
  const nextSig = stableStringify({
    type: next.type,
    url: next.url,
    payload: next.payload,
  });

  return events.slice(-10).some((e) => {
    const timeValid = next.ts - e.ts <= DEDUP_WINDOW_MS;

    const existingSig = stableStringify({
      type: e.type,
      url: e.url,
      payload: e.payload,
    });

    return timeValid && existingSig === nextSig;
  });
}

/* ---------------------------------------
   TRACK CORE ENGINE
--------------------------------------- */

export let onEventIntercept:
  | ((event: StoredEvent) => void)
  | undefined;

export function track(type: EventType, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;
  if (!isValidEventType(type)) return;

  const now = Date.now();

  const event: StoredEvent = {
    id: generateId(),
    type,
    payload:
      JSON.stringify(payload).length > MAX_PAYLOAD_SIZE
        ? { __truncated: true }
        : payload,
    time: new Date(now).toISOString(),
    ts: now,
    url: window.location.href,
    source: "core",
  };

  const events = safeGet();

  if (isDuplicate(events, event)) return;

  events.push(event);
  safeSet(events);

  /* event bus */
  window.dispatchEvent(new CustomEvent(APP_EVENT, { detail: event }));

  /* intercept hook (safe) */
  try {
    onEventIntercept?.(event);
  } catch {}

  /* GA adapter (isolated but NOT blocking core) */
  const w = window as any;

  if (typeof w.gtag === "function") {
    try {
      w.gtag("event", type, {
        event_category: "engagement",
        event_label: type,
        page_location: event.url,
        ...event.payload,
      });
    } catch {}
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[TRACK]", event);
  }
}
