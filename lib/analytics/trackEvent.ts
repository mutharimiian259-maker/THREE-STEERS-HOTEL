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
  ts: number;
  url: string;
};

export const APP_EVENT = "app:event";

const STORAGE_KEY = "hotel_events";
const MAX_EVENTS = 200;
const DEDUP_WINDOW_MS = 1500;
const MAX_PAYLOAD_SIZE = 2000;

let cache: StoredEvent[] | null = null;

const VALID_TYPES: EventType[] = [
  "page_view",
  "room_view",
  "whatsapp_click",
  "call_click",
];

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function isValidEvent(e: any): e is StoredEvent {
  return (
    e &&
    VALID_TYPES.includes(e.type) &&
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
    if (e.key === STORAGE_KEY) {
      syncCache();
    }
  });
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
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[TRACK] localStorage write failed", err);
    }
  }
}

function stableStringify(obj: any): string {
  try {
    return JSON.stringify(obj, Object.keys(obj).sort());
  } catch {
    return "";
  }
}

function safePayloadEqual(a: EventPayload, b: EventPayload) {
  return stableStringify(a) === stableStringify(b);
}

function isDuplicate(
  last: StoredEvent | undefined,
  next: StoredEvent
) {
  if (!last) return false;

  const timeDiff = next.ts - last.ts;
  if (timeDiff > DEDUP_WINDOW_MS) return false;

  return (
    last.type === next.type &&
    last.url === next.url &&
    safePayloadEqual(last.payload, next.payload)
  );
}

function sanitizePayload(payload: EventPayload): EventPayload {
  try {
    const json = JSON.stringify(payload);

    if (json.length > MAX_PAYLOAD_SIZE) {
      return {
        ...payload,
        __truncated: true,
      };
    }

    return JSON.parse(json);
  } catch {
    return {};
  }
}

export function track(
  type: EventType,
  payload: EventPayload = {}
): void {
  if (typeof window === "undefined") return;
  if (!VALID_TYPES.includes(type)) return;

  const now = Date.now();

  const event: StoredEvent = {
    id: generateId(),
    type,
    payload: sanitizePayload(payload),
    time: new Date(now).toISOString(),
    ts: now,
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
    try {
      w.gtag("event", type, {
        event_category: "engagement",
        event_label: type,
        ...event.payload,
        page_location: event.url,
      });
    } catch {}
  }

  try {
    window.dispatchEvent(
      new CustomEvent<StoredEvent>(APP_EVENT, {
        detail: event,
      })
    );
  } catch {}

  if (process.env.NODE_ENV === "development") {
    console.log("[TRACK]", event);
  }
}
