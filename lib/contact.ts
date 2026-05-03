export type Intent =
  | "navigation"
  | "engagement"
  | "revenue"
  | "conversion";

export const INTENT = {
  NAVIGATION: "navigation",
  ENGAGEMENT: "engagement",
  REVENUE: "revenue",
  CONVERSION: "conversion",
} as const;

export type FunnelStep = "VISIT" | "INTENT" | "CONTACT" | "BOOKED";

export const FUNNEL = {
  VISIT: "VISIT",
  INTENT: "INTENT",
  CONTACT: "CONTACT",
  BOOKED: "BOOKED",
} as const;

/**
 * SINGLE SOURCE OF TRUTH FOR ALL TRACKED EVENTS
 */
export const EVENTS = {
  PAGE_VIEW: "page_view",

  WHATSAPP_CLICK: "whatsapp_click",
  CALL_CLICK: "call_click",
  EMAIL_CLICK: "email_click",

  BOOKING_INTENT: "booking_intent",
  ROOM_VIEW: "room_view",
  BLOG_CLICK: "blog_click",

  NAVIGATION: "navigation",
} as const;

export type EventType = typeof EVENTS[keyof typeof EVENTS];
