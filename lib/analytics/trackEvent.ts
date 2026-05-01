"use client";

export type EventType =
  | "page_view"
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "funnel_step"
  | "booking_intent";

type Payload = {
  id: string;
  event: EventType;
  data: Record<string, any>;
  time: string;
  url: string;
};

const STORAGE_KEY = "hotel_analytics";
const MAX_EVENTS = 200;

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// stable comparison (avoids key-order issues)
function stableStringify(obj: any) {
  try {
    return JSON.stringify(
      Object.keys(obj || {})
        .sort()
        .reduce((acc: any, key) => {
          acc[key] = obj[key];
          return acc;
        }, {})
    );
  } catch {
    return "";
  }
}

export function trackEvent(
  event: EventType,
  data: Record<string, any> = {}
) {
  if (typeof window === "undefined") return;

  try {
    const payload: Payload = {
      id: generateId(),
      event,
      data,
      time: new Date().toISOString(),
      url: window.location.href,
    };

    let events: Payload[] = [];

    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          events = parsed;
        }
      } catch {
        // recover corrupted storage instead of failing silently
        localStorage.removeItem(STORAGE_KEY);
        events = [];
      }
    }

    const last = events[events.length - 1];

    if (
      last &&
      last.event === payload.event &&
      stableStringify(last.data) === stableStringify(payload.data)
    ) {
      return;
    }

    events.push(payload);

    if (events.length > MAX_EVENTS) {
      events = events.slice(-MAX_EVENTS);
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      // ignore quota exceeded errors
    }

    const w = window as any;

    if (typeof w.gtag === "function") {
      w.gtag("event", event, data);
    }
  } catch (error) {
    console.error("Analytics error:", error);
  }
}
