import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent, EventType } from "@/lib/core/types";

/* =============================================================
   GA EVENT MAPPING (SHOULD EVENTUALLY MOVE TO CORE DOMAIN MAP)
   ============================================================= */

function mapGAEventName(type: EventType): string {
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
      return "unknown_event";
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
   SAFE PAYLOAD EXTRACTOR
   ============================================================= */

function getPayloadValue(
  payload: Record<string, unknown> | undefined,
  key: string
): unknown {
  if (!payload || typeof payload !== "object") return undefined;
  return payload[key];
}

/* =============================================================
   CLEAN PARAM BUILDER
   ============================================================= */

function buildGAParams(event: StoredEvent) {
  const params: Record<string, unknown> = {
    event_category: event.source,
    page_location: event.url,
    session_id: event.session_id,
  };

  const label = getPayloadValue(event.payload, "label");
  const value = getPayloadValue(event.payload, "value");

  if (typeof label === "string") {
    params.event_label = label;
  } else {
    params.event_label = event.type;
  }

  if (typeof value === "number") {
    params.value = value;
  }

  return params;
}

/* =============================================================
   ADAPTER (PURE TRANSPORT LAYER)
   ============================================================= */

export const GAAdapter: EventAdapter = {
  name: "ga",

  handle(event: StoredEvent) {
    const gtag = getGtag();

    if (!gtag) {
      console.warn("[GAAdapter] gtag not available", {
        event_id: event.id,
        type: event.type,
      });
      return;
    }

    try {
      gtag("event", mapGAEventName(event.type), buildGAParams(event));
    } catch (err) {
      console.error("[GAAdapter] failed", {
        error: err,
        event_id: event.id,
        type: event.type,
      });
    }
  },
};
