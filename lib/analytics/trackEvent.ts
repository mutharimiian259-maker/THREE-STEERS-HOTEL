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
const MAX_EVENTS = 200; // prevent storage overflow

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
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

    const raw = localStorage.getItem(STORAGE_KEY);

    let events: Payload[] = [];

    if (raw) {
      try {
        events = JSON.parse(raw);
      } catch {
        events = [];
      }
    }

    // ✅ Deduplication (simple recent check)
    const last = events[events.length - 1];
    if (
      last &&
      last.event === payload.event &&
      JSON.stringify(last.data) === JSON.stringify(payload.data)
    ) {
      return;
    }

    events.push(payload);

    // ✅ Prevent storage overflow
    if (events.length > MAX_EVENTS) {
      events = events.slice(-MAX_EVENTS);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));

    // ✅ Only fire GA in production
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "production" &&
      typeof (window as any).gtag === "function"
    ) {
      (window as any).gtag("event", event, data);
    }
  } catch (error) {
    console.error("Analytics error:", error);
  }
}
