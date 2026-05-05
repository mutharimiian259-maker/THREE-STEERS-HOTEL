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
 * PURE UI EVENT LAYER
 * ONLY sends raw user actions (NO funnel meaning)
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
    });
  },

  startIntent(source: string) {
    if (!isValid(source)) {
      warn("Invalid source in startIntent()");
      return;
    }

    /**
     * FIX: keep event semantically pure
     * INTENT is derived in CORE funnel engine, not UI
     */
    track("page_view", {
      source: source.trim(),
    });
  },

  whatsappClick(source: string) {
    if (!isValid(source)) {
      warn("Invalid source in whatsappClick()");
      return;
    }

    track("whatsapp_click", {
      source: source.trim(),
    });
  },

  callClick(source: string) {
    if (!isValid(source)) {
      warn("Invalid source in callClick()");
      return;
    }

    track("call_click", {
      source: source.trim(),
    });
  },
} as const;
