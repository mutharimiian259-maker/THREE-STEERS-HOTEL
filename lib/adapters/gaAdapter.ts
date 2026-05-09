import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";

/* =============================================================
   GA EVENT MAPPING
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
   GTAG TYPE
   ============================================================= */

type GtagFunction = (
  command: "event",
  eventName: string,
  params?: Record<string, unknown>
) => void;

/* =============================================================
   SAFE GTAG ACCESS
   ============================================================= */

function getGtag(): GtagFunction | null {
  if (typeof window === "undefined") return null;

  const gtag = (window as Window & { gtag?: unknown }).gtag;

  if (typeof gtag !== "function") return null;

  return gtag as GtagFunction;
}

/* =============================================================
   DEDUPE CACHE
   ============================================================= */

const sentEvents = new Set<string>();

/* =============================================================
   ADAPTER
   ============================================================= */

export const GAAdapter: EventAdapter = {
  name: "ga",

  handle(event: StoredEvent) {
    try {
      /* =========================================================
         DEDUPE PROTECTION
         ========================================================= */

      if (sentEvents.has(event.signature)) {
        return;
      }

      sentEvents.add(event.signature);

      const gtag = getGtag();

      if (!gtag) {
        console.warn("[GAAdapter] gtag not available", {
          event_id: event.id,
          type: event.type,
        });

        return;
      }

      const payload =
        typeof event.payload === "object" &&
        event.payload !== null
          ? event.payload
          : {};

      const label =
        typeof payload.label === "string"
          ? payload.label
          : event.type;

      const value =
        typeof payload.value === "number"
          ? payload.value
          : undefined;

      gtag("event", mapGAEventName(event.type), {
        event_category: event.source,

        event_label: label,

        ...(value !== undefined ? { value } : {}),

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
