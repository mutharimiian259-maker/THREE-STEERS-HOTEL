"use client";

/* ---------------------------------------
   TYPES
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
   CONFIG (CORE RULES)
--------------------------------------- */

const STORAGE_KEY = "hotel_events";
const SESSION_KEY = "hotel_session_id";

const MAX_EVENTS = 200;
const DEDUP_WINDOW_MS = 3000;

/* ---------------------------------------
   MEMORY CACHE
--------------------------------------- */

let cache: StoredEvent[] = [];

/* ---------------------------------------
   SESSION CORE (FIXED)
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
   HELPERS
--------------------------------------- */

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/* ---------------------------------------
   STORAGE CORE (ONLY SOURCE OF TRUTH)
--------------------------------------- */

function loadEvents(): StoredEvent[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEvents(events: StoredEvent[]) {
  cache = events.slice(-MAX_EVENTS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn("[CORE] storage failed", e);
  }
}

/* ---------------------------------------
   DEDUP CORE
--------------------------------------- */

function isDuplicate(events: StoredEvent[], next: StoredEvent) {
  for (let i = events.length - 1; i >= 0; i--) {
    const e = events[i];

    if (next.ts - e.ts > DEDUP_WINDOW_MS) break;

    if (
      e.type === next.type &&
      e.url === next.url
    ) {
      return true;
    }
  }

  return false;
}

/* ---------------------------------------
   CORE EVENT ENGINE (SINGLE SOURCE OF TRUTH)
--------------------------------------- */

type Listener = (event: StoredEvent) => void;

const listeners = new Set<Listener>();

export function subscribe(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/* ---------------------------------------
   CORE TRACK FUNCTION
--------------------------------------- */

export function track(
  type: EventType,
  payload: EventPayload = {},
  origin: EventSource = "unknown"
) {
  if (typeof window === "undefined") return;

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

  events.push(event);
  saveEvents(events);

  cache = events;

  listeners.forEach((fn) => fn(event));

  if (process.env.NODE_ENV === "development") {
    console.log("[CORE EVENT]", event);
  }
}
