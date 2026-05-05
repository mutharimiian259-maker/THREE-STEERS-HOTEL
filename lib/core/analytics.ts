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
  ts: number;
  url: string;
  source?: "core";
};

export const APP_EVENT = "app:event";

const STORAGE_KEY = "hotel_events";
const MAX_EVENTS = 200;
const DEDUP_WINDOW_MS = 1500;
const MAX_PAYLOAD_SIZE = 2000;

let cache: StoredEvent[] | null = null;

const VALID_TYPES = new Set<EventType>([
  "page_view",
  "room_view",
  "whatsapp_click",
  "call_click",
]);

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function isValidEvent(e: any): e is StoredEvent {
  return (
    e &&
    VALID_TYPES.has(e.type) &&
    typeof e.id === "string" &&
    typeof e.time === "string" &&
    typeof e.ts === "number" &&
    typeof e.url === "string" &&
    typeof e.payload === "object"
  );
}

function isValidEventArray(data: unknown): data is StoredEvent[] {
  return Array.isArray(data) && data.every(isValidEvent);
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

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) syncCache();
  });
}

function safeGet(): StoredEvent[] {
  if (typeof window === "undefined") return [];
  if (!cache) syncCache();
  return cache!;
}

function safeSet(events: StoredEvent[]) {
  if (typeof window === "undefined") return;

  cache = events.slice(-MAX_EVENTS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch (err) {
    console.error("[TRACK] localStorage write failed", err);
  }
}

function isDuplicate(events: StoredEvent[], next: StoredEvent) {
  return events.slice(-10).reverse().some((e) => {
    if (next.ts - e.ts > DEDUP_WINDOW_MS) return false;

    return (
      e.type === next.type &&
      e.url === next.url &&
      JSON.stringify(e.payload) === JSON.stringify(next.payload)
    );
  });
}

function sanitizePayload(payload: EventPayload): EventPayload {
  try {
    if (JSON.stringify(payload).length > MAX_PAYLOAD_SIZE) {
      return { ...payload, __truncated: true };
    }
    return payload;
  } catch {
    return {};
  }
}

/**
 * Funnel hook (safe extension point)
 */
export let onEventIntercept:
  | ((event: StoredEvent) => void)
  | undefined;

export function track(type: EventType, payload: EventPayload = {}): void {
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
  };

  const events = safeGet();

  if (isDuplicate(events, event)) return;

  try {
    onEventIntercept?.(event);
  } catch {}

  events.push(event);
  safeSet(events);

  // GA isolation layer (prevents payload pollution)
  const gtagPayload: Record<string, unknown> = {
    event_category: "engagement",
    event_label: type,
    page_location: event.url,
    ...event.payload,
  };

  try {
    window.dispatchEvent(
      new CustomEvent(APP_EVENT, { detail: event })
    );
  } catch {}

  const w = window as any;
  if (typeof w.gtag === "function") {
    try {
      w.gtag("event", type, gtagPayload);
    } catch {}
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[TRACK]", event);
  }
}
