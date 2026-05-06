"use client";

/* ---------------------------------------
   TYPES (CORE TRUTH ONLY)
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
};

/* ---------------------------------------
   CONFIG (CORE CONSTANTS ONLY)
--------------------------------------- */

const STORAGE_KEY = "hotel_events";
const SESSION_KEY = "hotel_session_id";

const MAX_EVENTS = 200;
const DEDUP_WINDOW_MS = 3000;

/* ---------------------------------------
   SESSION CORE (IDENTITY LAYER)
--------------------------------------- */

function getSessionId(): string {
  if (typeof window === "undefined") return "server";

  let id = localStorage.getItem(SESSION_KEY);

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }

  return id;
}

/* ---------------------------------------
   STORAGE CORE (FUTURE DB READY)
--------------------------------------- */

const storage = {
  get(): string | null {
    return localStorage.getItem(STORAGE_KEY);
  },

  set(value: string) {
    localStorage.setItem(STORAGE_KEY, value);
  },
};

/* ---------------------------------------
   MEMORY CACHE (PERFORMANCE ONLY)
--------------------------------------- */

let cache: StoredEvent[] = [];

/* ---------------------------------------
   HELPERS
--------------------------------------- */

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadEvents(): StoredEvent[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = storage.get();
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEvents(events: StoredEvent[]) {
  const trimmed = events.slice(-MAX_EVENTS);
  cache = trimmed;

  try {
    storage.set(JSON.stringify(trimmed));
  } catch (e) {
    console.warn("[CORE] storage failed", e);
  }
}

/* ---------------------------------------
   EVENT VALIDATION (RUNTIME SAFETY)
--------------------------------------- */

function isValidEventType(type: string): type is EventType {
  return [
    "page_view",
    "room_view",
    "whatsapp_click",
    "call_click",
    "booking_intent",
  ].includes(type);
}

/* ---------------------------------------
   DEDUP LOGIC (STABLE VERSION)
--------------------------------------- */

function isDuplicate(events: StoredEvent[], next: StoredEvent) {
  for (let i = events.length - 1; i >= 0; i--) {
    const e = events[i];

    if (next.ts - e.ts > DEDUP_WINDOW_MS) break;

    if (
      e.type === next.type &&
      e.url === next.url &&
      e.origin === next.origin
    ) {
      return true;
    }
  }

  return false;
}

/* ---------------------------------------
   EVENT BUS (ADAPTER ENTRY POINT)
--------------------------------------- */

type Listener = (event: StoredEvent) => void;

const listeners = new Set<Listener>();

export function subscribe(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/* ---------------------------------------
   CORE TRACK ENGINE (ONLY ENTRY POINT)
--------------------------------------- */

export function track(
  type: EventType,
  payload: EventPayload = {},
  origin: EventSource = "unknown"
) {
  if (typeof window === "undefined") return;

  // runtime safety guard
  if (!isValidEventType(type)) return;

  const now = Date.now();

  const event: StoredEvent = {
    id: generateId(),
    type,
    payload,
    time: new Date(now).toISOString(),
    ts: now,
    url: window.location.href,
    origin,
    session_id: getSessionId(),
  };

  const events = loadEvents();

  if (isDuplicate(events, event)) return;

  const updated = [...events, event];

  saveEvents(updated);

  // broadcast to adapters (GA, API, etc later)
  listeners.forEach((fn) => {
    try {
      fn(event);
    } catch (e) {
      console.warn("[CORE] listener error", e);
    }
  });

  // dev visibility only
  if (process.env.NODE_ENV === "development") {
    console.log("[CORE EVENT]", event);
  }
}
