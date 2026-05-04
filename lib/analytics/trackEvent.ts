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

export const APP_EVENT = "app:event";

const STORAGE_KEY = "hotel_events";
const MAX_EVENTS = 200;
const DEDUP_WINDOW_MS = 1500;

let cache: StoredEvent[] | null = null;
let writeLock = false;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function isValidEventArray(data: unknown): data is StoredEvent[] {
  return Array.isArray(data);
}

function syncCache() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    cache = isValidEventArray(parsed) ? parsed : [];
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

  const trimmed = events.slice(-MAX_EVENTS);
  cache = trimmed;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // ignore write failure
  }

  if (
    process.env.NODE_ENV === "development" &&
    events.length > MAX_EVENTS
  ) {
    console.warn("[TRACK] Event storage truncated");
  }
}

function safePayloadEqual(a: EventPayload, b: EventPayload) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    const av = a[key];
    const bv = b[key];

    if (
      typeof av === "object" ||
      typeof bv === "object"
    ) {
      return false;
    }

    if (av !== bv) return false;
  }

  return true;
}

function isDuplicate(
  last: StoredEvent | undefined,
  next: StoredEvent
) {
  if (!last) return false;

  const timeDiff =
    new Date(next.time).getTime() -
    new Date(last.time).getTime();

  if (timeDiff > DEDUP_WINDOW_MS) return false;

  return (
    last.type === next.type &&
    last.url === next.url &&
    safePayloadEqual(last.payload, next.payload)
  );
}

export function track(
  type: EventType,
  payload: EventPayload = {}
): void {
  if (typeof window === "undefined") return;

  if (writeLock) return;
  writeLock = true;

  try {
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

    const w = window as Window & {
      gtag?: (
        command: string,
        event: string,
        params?: Record<string, unknown>
      ) => void;
    };

    if (typeof w.gtag === "function") {
      w.gtag("event", type, {
        event_category: "engagement",
        event_label: type,
        ...payload,
        page_location: event.url,
      });
    }

    try {
      window.dispatchEvent(
        new CustomEvent<StoredEvent>(APP_EVENT, {
          detail: event,
        })
      );
    } catch {
      // isolate listener failures
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[TRACK]", event);
    }
  } finally {
    writeLock = false;
  }
}
