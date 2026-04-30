import { trackEvent } from "./trackEvent";

export function trackRoomView(roomName: string) {
  trackEvent("room_view", { room: roomName });
}

export function trackWhatsAppClick(roomName?: string) {
  trackEvent("whatsapp_click", { room: roomName });
}

export function trackCallClick() {
  trackEvent("call_click");
}

export function trackBookingIntent(roomName?: string) {
  trackEvent("booking_intent", { room: roomName });
}
