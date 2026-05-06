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
  source: "core";
  origin?: EventSource;
};

export const APP_EVENT = "app:event";

const STORAGE_KEY = "hotel_events";
const MAX_EVENTS = 200;
const DEDUP_WINDOW_MS = 3000;
const MAX_PAYLOAD_SIZE = 2000;

let cache: StoredEvent[] = [];

/**
 * STRICT EVENT CONTRACT
 */
const VALID_TYPES = new Set<EventType>([
  "page_view",
  "room_view",
  "whatsapp_click",
  "call_click",
  "booking_intent",
]);

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
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

function isValidEventArray(data: unknown): data is StoredEvent[] {
  return Array.isArray(data) && data.every(isValidEvent);
}

/**
 * STORAGE SYNC
 */
function syncCache() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    cache = isValidEventArray(parsed) ? parsed : [];
  } catch {
    cache = [];
  }
}

/**
 * SAFE GET/SET
 */
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

/**
 * CONSISTENT STRINGIFY (single source of truth)
 */
function stableStringify(obj: any) {
  if (!obj || typeof obj !== "object") return JSON.stringify(obj);
  return JSON.stringify(
    Object.keys(obj).sort().reduce((acc: any, key) => {
      acc[key] = obj[key];
      return acc;
    }, {})
  );
}

/**
 * GLOBAL DEDUP (expanded window)
 */
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

/**
 * PAYLOAD SAFETY
 */
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
 * MULTI-LISTENER EVENT BUS
 */
type EventListener = (event: StoredEvent) => void;

const listeners = new Set<EventListener>();

export function subscribe(listener: EventListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * GA LAYER
 */
function sendToGA(type: EventType, event: StoredEvent) {
  const w = window as any;
  if (typeof w.gtag !== "function") return;

  try {
    w.gtag("event", type, {
      event_category: "engagement",
      event_label: event.origin ?? "unknown",
      page_location: event.url,
      ...event.payload,
    });
  } catch (err) {
    console.warn("[GA] failed", err);
  }
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

  if (!VALID_TYPES.has(type)) {
    console.warn("[TRACK] invalid event:", type);
    return;
  }

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
   * EVENT BUS (multi consumer safe)
   */
  listeners.forEach((fn) => {
    try {
      fn(event);
    } catch (e) {
      console.warn("[TRACK] listener error", e);
    }
  });

  /**
   * DOM EVENT (legacy compatibility)
   */
  try {
    window.dispatchEvent(new CustomEvent(APP_EVENT, { detail: event }));
  } catch {}

  /**
   * GA
   */
  sendToGA(type, event);

  if (process.env.NODE_ENV === "development") {
    console.log("[TRACK]", event);
  }
}
