"use client";

export type EventType =
  | "page_view"
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "booking_intent";

type EventPayload = {
  event: EventType;
  data: Record<string, any>;
  time: string;
  url: string;
  sessionId: string;
};

const STORAGE_KEY = "hotel_analytics";
const SESSION_KEY = "hotel_session_id";

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";

  try {
    let sessionId = sessionStorage.getItem(SESSION_KEY);

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, sessionId);
    }

    return sessionId;
  } catch {
    return "unknown";
  }
}

function safeParse(json: string | null): EventPayload[] {
  if (!json) return [];

  try {
    const parsed = JSON.parse(json);

    if (Array.isArray(parsed)) return parsed;

    return [];
  } catch {
    return [];
  }
}

export function trackEvent(
  event: EventType,
  data: Record<string, any> = {}
) {
  if (typeof window === "undefined") return;

  try {
    const payload: EventPayload = {
      event,
      data,
      time: new Date().toISOString(),
      url: window.location.href,
      sessionId: getSessionId(),
    };

    const existing = safeParse(localStorage.getItem(STORAGE_KEY));

    const updated = [...existing, payload];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", event, {
        ...data,
        page_location: payload.url,
      });
    }
  } catch {
    return;
  }
}
