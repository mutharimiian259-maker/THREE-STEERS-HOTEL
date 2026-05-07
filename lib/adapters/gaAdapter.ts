import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";

function mapGAEventName(type: StoredEvent["type"]): string {
  switch (type) {
    case "page_view":
      return "page_view";
    case "room_view":
      return "view_item";
    case "whatsapp_click":
      return "contact_whatsapp";
    case "call_click":
      return "contact_call";
    case "booking_intent":
      return "begin_checkout";
    default:
      return "custom_event";
  }
}

export const GAAdapter: EventAdapter = {
  name: "ga",

  handle(event: StoredEvent) {
    if (typeof window === "undefined") return;

    if (!window.gtag) {
      console.warn("[GAAdapter] gtag not available", event);
      return;
    }

    try {
      window.gtag("event", mapGAEventName(event.type), {
        event_category: event.source,
        event_label: typeof event.payload?.label === "string"
          ? event.payload.label
          : event.type,

        value: typeof event.payload?.value === "number"
          ? event.payload.value
          : 0,

        page_location: event.url,
        session_id: event.session_id,
      });
    } catch (err) {
      console.error("[GAAdapter] failed", err, event);
    }
  },
};
