"use client";

/* ---------------------------------------
   EVENT TYPES
--------------------------------------- */

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

/* ---------------------------------------
   EVENT PAYLOAD (keep flexible but safe)
--------------------------------------- */

export type EventPayload = Record<string, unknown>;

/* ---------------------------------------
   EVENT STRUCTURE (FIXED)
--------------------------------------- */

export type StoredEvent = {
  id: string;
  type: EventType;
  payload: EventPayload;
  time: string;
  ts: number;
  url: string;
  source: "core";
  origin: EventSource;
  session_id: string; // 🔥 CRITICAL FIX
};

/* ---------------------------------------
   CONSTANTS
--------------------------------------- */

const STORAGE_KEY = "hotel_events";
const SESSION_KEY = "hotel_session_id";

const MAX_EVENTS = 200;
const DEDUP_WINDOW_MS = 3000;
const MAX_PAYLOAD_SIZE = 2000;

/* ---------------------------------------
   INTERNAL STATE
--------------------------------------- */

let cache: StoredEvent[] | null = null;

/* ---------------------------------------
   VALIDATION
--------------------------------------- */

const VALID_TYPES = new Set<EventType>([
  "page_view",
  "room_view",
  "whatsapp_click",
  "call_click",
  "booking_intent",
]);

/* ---------------------------------------
   SESSION (CRITICAL)
--------------------------------------- */

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);

  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }

  return id;
}

/* ---------------------------------------
   HELPERS
--------------------------------------- */

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function stableStringify(obj: any) {
  if (!obj || typeof obj !== "object") return JSON.stringify(obj);

  return JSON.stringify(
    Object.keys(obj).sort().reduce((acc: any, key) => {
      acc[key] = obj[key];
      return acc;
    }, {})
  );
}

function sanitizePayload(payload: EventPayload): EventPayload {
  try {
    if (JSON.stringify(payload).length > MAX_PAYLOAD_SIZE) {
      return { __truncated: true };
    }
    return payload;
  } catch {
    return {};
  }
}

/* ---------------------------------------
   STORAGE
--------------------------------------- */

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
  if (cache === null) syncCache();
  return cache!;
}

function safeSet(events: StoredEvent[]) {
  cache = events.slice(-MAX_EVENTS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch (err) {
    console.error("[TRACK] storage failed", err);
  }
}

/* ---------------------------------------
   CROSS TAB SYNC (RESTORED)
--------------------------------------- */

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) syncCache();
  });
}

/* ---------------------------------------
   DEDUP
--------------------------------------- */

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

/* ---------------------------------------
   SINGLE EVENT BUS (ONE ONLY)
--------------------------------------- */

type Listener = (event: StoredEvent) => void;

const listeners = new Set<Listener>();

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/* ---------------------------------------
   GA LAYER
--------------------------------------- */

function sendToGA(event: StoredEvent) {
  const w = window as any;
  if (typeof w.gtag !== "function") return;

  try {
    w.gtag("event", event.type, {
      event_category: event.type,
      event_label: event.origin,
      page_location: event.url,
      session_id: event.session_id,
      ...event.payload,
    });
  } catch (err) {
    console.warn("[GA] failed", err);
  }
}

/* ---------------------------------------
   CORE TRACK
--------------------------------------- */

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
    session_id: getSessionId(),
  };

  const events = safeGet();

  if (isDuplicate(events, event)) return;

  events.push(event);
  safeSet(events);

  listeners.forEach((fn) => {
    try {
      fn(event);
    } catch (e) {
      console.warn("[TRACK] listener error", e);
    }
  });

  sendToGA(event);

  if (process.env.NODE_ENV === "development") {
    console.log("[TRACK]", event);
  }
}
