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
      return "custom_event";
  }
}

/* =============================================================
   SAFE GTAG ACCESS
   ============================================================= */

function getGtag(): Function | null {
  if (typeof window === "undefined") return null;

  const gtag = (window as any).gtag;

  if (typeof gtag !== "function") return null;

  return gtag;
}

/* =============================================================
   ADAPTER
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

        // IMPORTANT: still treated as "handled"
        // router does NOT fail pipeline for external dependency absence
        return;
      }

      const payload = event.payload as Record<string, unknown>;

      const label =
        typeof payload?.label === "string"
          ? payload.label
          : event.type;

      const value =
        typeof payload?.value === "number"
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
