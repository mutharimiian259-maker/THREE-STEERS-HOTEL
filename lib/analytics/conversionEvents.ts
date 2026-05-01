import { trackEvent } from "./trackEvent";

export const FunnelEvents = {
  viewRoom: (room: string) => {
    if (!room) return;
    trackEvent("room_view", { room });
  },

  startIntent: (source: string) => {
    if (!source) return;
    trackEvent("booking_intent", { source });
  },

  whatsappClick: (source: string) => {
    if (!source) return;
    trackEvent("whatsapp_click", { source });
  },

  callClick: (source: string) => {
    if (!source) return;
    trackEvent("call_click", { source });
  },
};
