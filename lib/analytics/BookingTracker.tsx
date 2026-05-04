import { track } from "@/lib/core/analytics";

function isValid(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function warn(message: string) {
  if (process.env.NODE_ENV === "development") {
    console.warn(`[FunnelEvents] ${message}`);
  }
}

/**
 * 🔥 PURE SEMANTIC DOMAIN LAYER
 * ONLY expresses intent → NEVER handles analytics logic
 */
export const FunnelEvents = {
  viewRoom(room: string, source = "unknown") {
    if (!isValid(room)) {
      warn("Invalid room in viewRoom()");
      return;
    }

    track("room_view", {
      room: room.trim(),
      source,
      context: "room_interest",
    });
  },

  startIntent(source: string, context = "unknown") {
    if (!isValid(source)) {
      warn("Invalid source in startIntent()");
      return;
    }

    /**
     * Maintain system constraint (no new event types)
     * but structure intent clearly for downstream interpretation
     */
    track("page_view", {
      source: source.trim(),
      context,
      intent: "booking",
    });
  },

  whatsappClick(source: string, context = "unknown") {
    if (!isValid(source)) {
      warn("Invalid source in whatsappClick()");
      return;
    }

    track("whatsapp_click", {
      source: source.trim(),
      context,
      intent: "conversion",
    });
  },

  callClick(source: string, context = "unknown") {
    if (!isValid(source)) {
      warn("Invalid source in callClick()");
      return;
    }

    track("call_click", {
      source: source.trim(),
      context,
      intent: "conversion",
    });
  },
} as const;
