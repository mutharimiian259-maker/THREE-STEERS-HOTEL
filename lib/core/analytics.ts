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
   CONFIG
--------------------------------------- */

const STORAGE_KEY = "hotel_events";
const SESSION_KEY = "hotel_session_id";

const MAX_EVENTS = 200;
const DEDUP_WINDOW_MS = 3000;

/* ---------------------------------------
   SESSION CORE
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
   STORAGE CORE
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
   MEMORY CACHE
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
   EVENT VALIDATION
--------------------------------------- */

function isValidEventType(type: string): type is EventType {
  return (
    type === "page_view" ||
    type === "room_view" ||
    type === "whatsapp_click" ||
    type === "call_click" ||
    type === "booking_intent"
  );
}

/* ---------------------------------------
   STRICT DEDUP (FINAL VERSION)
--------------------------------------- */

function getEventSignature(event: StoredEvent): string {
  return JSON.stringify({
    type: event.type,
    url: event.url,
    origin: event.origin,
    payload: event.payload,
  });
}

function isDuplicate(events: StoredEvent[], next: StoredEvent) {
  const nextSig = getEventSignature(next);

  for (let i = events.length - 1; i >= 0; i--) {
    const e = events[i];

    if (next.ts - e.ts > DEDUP_WINDOW_MS) break;

    if (getEventSignature(e) === nextSig) {
      return true;
    }
  }

  return false;
}

/* ---------------------------------------
   EVENT BUS
--------------------------------------- */

type Listener = (event: StoredEvent) => void;

const listeners = new Set<Listener>();

export function subscribe(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/* ---------------------------------------
   CORE TRACK ENGINE
--------------------------------------- */

export function track(
  type: EventType,
  payload: EventPayload = {},
  origin: EventSource = "unknown"
) {
  if (typeof window === "undefined") return;

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

  cache = updated;

  listeners.forEach((fn) => {
    try {
      fn(event);
    } catch (e) {
      console.warn("[CORE] listener error", e);
    }
  });

  if (process.env.NODE_ENV === "development") {
    console.log("[CORE EVENT]", event);
  }
}
