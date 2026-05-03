import { track } from "@/lib/core/analytics";

function isValid(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * 🔥 PURE SEMANTIC DOMAIN LAYER
 * ONLY expresses intent → NEVER handles analytics logic
 */
export const FunnelEvents = {
  viewRoom(room: string) {
    if (!isValid(room)) return;

    track("room_view", {
      room: room.trim(),
    });
  },

  startIntent(source: string) {
    if (!isValid(source)) return;

    /**
     * mapped to safe event type (no custom event pollution)
     */
    track("page_view", {
      source: source.trim(),
      intent: "booking",
    });
  },

  whatsappClick(source: string) {
    if (!isValid(source)) return;

    track("whatsapp_click", {
      source: source.trim(),
    });
  },

  callClick(source: string) {
    if (!isValid(source)) return;

    track("call_click", {
      source: source.trim(),
    });
  },
} as const;
