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
  data: Record<string, unknown>;
  time: string;
  url: string;
};

const STORAGE_KEY = "hotel_analytics";
const MAX_EVENTS = 200;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Fast shallow compare (better than JSON stringify for performance)
 */
function isDuplicate(a: Payload, b: Payload): boolean {
  if (!a || !b) return false;
  if (a.event !== b.event) return false;
  if (a.url !== b.url) return false;

  const aKeys = Object.keys(a.data || {});
  const bKeys = Object.keys(b.data || {});

  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    if (a.data[key] !== b.data[key]) return false;
  }

  return true;
}

export function trackEvent(
  event: EventType,
  data: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  const payload: Payload = {
    id: generateId(),
    event,
    data,
    time: new Date().toISOString(),
    url: window.location.href,
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let events: Payload[] = [];

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          events = parsed;
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        events = [];
      }
    }

    const last = events[events.length - 1];

    // prevent spam duplicates
    if (last && isDuplicate(last, payload)) return;

    events.push(payload);

    if (events.length > MAX_EVENTS) {
      events = events.slice(-MAX_EVENTS);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));

    // Google Analytics safe bridge
    const w = window as any;

    if (typeof w.gtag === "function") {
      w.gtag("event", event, {
        ...data,
        page_location: payload.url,
      });
    }
  } catch (error) {
    console.error("Analytics error:", error);
  }
}
