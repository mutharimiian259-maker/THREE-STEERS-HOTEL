"use client";

export type EventType =
  | "page_view"
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "funnel_step"
  | "booking_intent";

type Payload = {
  event: EventType;
  data?: Record<string, any>;
  time: string;
  url: string;
};

export function trackEvent(event: EventType, data: Record<string, any> = {}) {
  if (typeof window === "undefined") return;

  const payload: Payload = {
    event,
    data,
    time: new Date().toISOString(),
    url: window.location.href,
  };

  try {
    const existing = JSON.parse(
      localStorage.getItem("hotel_analytics") || "[]"
    );

    existing.push(payload);

    localStorage.setItem("hotel_analytics", JSON.stringify(existing));
  } catch {}

  // GA safe
  (window as any)?.gtag?.("event", event, data);
}
