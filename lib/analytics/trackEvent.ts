// /lib/core/analytics.ts

export type EventType =
  | "page_view"
  | "room_view"
  | "whatsapp_click"
  | "call_click";

export type EventPayload = Record<string, unknown>;

export type StoredEvent = {
  id: string;
  type: EventType;
  payload: EventPayload;
  time: string;
  url: string;
};

/**
 * 🔥 SINGLE EVENT BUS CONTRACT
 */
export const APP_EVENT = "app:event";

const STORAGE_KEY = "hotel_events";
const MAX_EVENTS = 200;

// in-memory cache
let cache: StoredEvent[] | null = null;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function syncCache() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cache = raw ? JSON.parse(raw) : [];
  } catch {
    cache = [];
  }
}

function safeGet(): StoredEvent[] {
  if (typeof window === "undefined") return [];

  if (!cache) syncCache();
  return cache!;
}

function safeSet(events: StoredEvent[]) {
  if (typeof window === "undefined") return;

  cache = events;

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(events.slice(-MAX_EVENTS))
    );
  } catch {
    // ignore
  }
}

function shallowEqual(a: EventPayload, b: EventPayload) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    if (a[key] !== b[key]) return false;
  }

  return true;
}

function isDuplicate(last: StoredEvent | undefined, next: StoredEvent) {
  if (!last) return false;

  return (
    last.type === next.type &&
    last.url === next.url &&
    shallowEqual(last.payload, next.payload)
  );
}

/**
 * SINGLE SOURCE OF TRUTH
 */
export function track(
  type: EventType,
  payload: EventPayload = {}
): void {
  if (typeof window === "undefined") return;

  const event: StoredEvent = {
    id: generateId(),
    type,
    payload,
    time: new Date().toISOString(),
    url: window.location.href,
  };

  const events = safeGet();
  const last = events.at(-1);

  if (isDuplicate(last, event)) return;

  events.push(event);
  safeSet(events);

  /**
   * 🔥 External Analytics Bridge
   */
  const w = window as Window & {
    gtag?: (
      command: string,
      event: string,
      params?: Record<string, unknown>
    ) => void;
  };

  if (typeof w.gtag === "function") {
    w.gtag("event", type, {
      ...payload,
      page_location: event.url,
    });
  }

  /**
   * 🔥 Event Bus
   */
  window.dispatchEvent(
    new CustomEvent<StoredEvent>(APP_EVENT, {
      detail: event,
    })
  );

  /**
   * 🔥 DEV DEBUG (optional safety hook)
   */
  if (process.env.NODE_ENV === "development") {
    console.log("[TRACK]", event);
  }
}
