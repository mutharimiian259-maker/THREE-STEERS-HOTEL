// /lib/core/analytics.ts

import { funnel } from "./funnel";

export type EventType =
  | "page_view"
  | "room_view"
  | "whatsapp_click"
  | "call_click";

type EventPayload = Record<string, unknown>;

type StoredEvent = {
  id: string;
  type: EventType;
  payload: EventPayload;
  time: string;
  url: string;
};

const STORAGE_KEY = "hotel_events";
const MAX_EVENTS = 200;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function safeGet(): StoredEvent[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function safeSet(events: StoredEvent[]) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(events.slice(-MAX_EVENTS))
    );
  } catch {
    // ignore
  }
}

/**
 * STRICT duplicate check:
 * only compares last event for performance
 */
function isDuplicate(last: StoredEvent | undefined, next: StoredEvent) {
  if (!last) return false;

  return (
    last.type === next.type &&
    last.url === next.url &&
    shallowEqual(last.payload, next.payload)
  );
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
   * 🔥 Funnel automation (CENTRALIZED)
   */
  switch (type) {
    case "page_view":
      funnel.set("VISIT");
      break;

    case "room_view":
      funnel.set("ENGAGEMENT");
      break;

    case "whatsapp_click":
    case "call_click":
      funnel.set("CONTACT");
      break;
  }

  /**
   * 🔥 Google Analytics bridge
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
}
