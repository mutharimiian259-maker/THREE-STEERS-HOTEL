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
};

export function trackEvent(
  event: EventType,
  data?: Record<string, any>
) {
  if (typeof window === "undefined") return;

  try {
    const payload: EventPayload = {
      event,
      data: data || {},
      time: new Date().toISOString(),
      url: window.location.href,
    };

    const existingRaw = localStorage.getItem("hotel_analytics");

    let existing: EventPayload[] = [];

    if (existingRaw) {
      try {
        existing = JSON.parse(existingRaw);
      } catch {
        existing = [];
      }
    }

    existing.push(payload);

    localStorage.setItem(
      "hotel_analytics",
      JSON.stringify(existing)
    );

    if (typeof window.gtag === "function") {
      window.gtag("event", event, {
        ...data,
      });
    }
  } catch {
    return;
  }
}
