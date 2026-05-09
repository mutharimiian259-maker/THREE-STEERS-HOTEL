
import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";

/* =============================================================
   GA EVENT MAPPING (MUST MOVE TO CORE IN FUTURE IF EXPANDS)
   ============================================================= */

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
      return type;
  }
}

/* =============================================================
   SAFE GTAG ACCESS
   ============================================================= */

type GtagFunction = (
  command: "event",
  eventName: string,
  params?: Record<string, unknown>
) => void;

function getGtag(): GtagFunction | null {
  if (typeof window === "undefined") return null;

  const gtag = (window as Window & { gtag?: unknown }).gtag;

  if (typeof gtag !== "function") return null;

  return gtag as GtagFunction;
}

/* =============================================================
   ADAPTER (PURE TRANSPORT LAYER)
   ============================================================= */

export const GAAdapter: EventAdapter = {
  name: "ga",

  handle(event: StoredEvent) {
    try {
      const gtag = getGtag();

      if (!gtag) {
        console.warn("[GAAdapter] gtag not available", {
          event_id: event.id,
          type: event.type,
        });
        return;
      }

      gtag("event", mapGAEventName(event.type), {
        event_category: event.source,
        event_label:
          typeof event.payload?.label === "string"
            ? event.payload.label
            : event.type,

        value:
          typeof event.payload?.value === "number"
            ? event.payload.value
            : undefined,

        page_location: event.url,
        session_id: event.session_id,
      });
    } catch (err) {
      console.error("[GAAdapter] failed", {
        error: err,
        event_id: event.id,
        type: event.type,
      });
    }
  },
};
