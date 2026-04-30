export type EventType =
  | "page_view"
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "booking_intent";

export function trackEvent(
  event: EventType,
  data?: Record<string, any>
) {
  const payload = {
    event,
    data: data || {},
    time: new Date().toISOString(),
    url: window.location.href,
  };

  // Store locally (no backend needed)
  const existing = JSON.parse(
    localStorage.getItem("hotel_analytics") || "[]"
  );

  existing.push(payload);

  localStorage.setItem("hotel_analytics", JSON.stringify(existing));

  // Debug (remove later in production)
  console.log("TRACKED EVENT:", payload);
}
