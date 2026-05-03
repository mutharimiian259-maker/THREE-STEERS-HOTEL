export const INTENT = {
  NAVIGATION: "navigation",
  ENGAGEMENT: "engagement",
  REVENUE: "revenue",
  CONVERSION: "conversion",
} as const;

export type Intent = typeof INTENT[keyof typeof INTENT];

export const FUNNEL = {
  VISIT: "VISIT",
  INTENT: "INTENT",
  CONTACT: "CONTACT",
  BOOKED: "BOOKED",
} as const;

export type FunnelStep = typeof FUNNEL[keyof typeof FUNNEL];

/**
 * EVENT ACTIONS (what the user DOES)
 * NOT funnel states
 * NOT intent labels
 */
export const EVENTS = {
  PAGE_VIEW: "page_view",

  ROOM_VIEW: "room_view",

  WHATSAPP_CLICK: "whatsapp_click",
  CALL_CLICK: "call_click",
  EMAIL_CLICK: "email_click",

  BOOKING_INTENT: "booking_intent",
  BLOG_CLICK: "blog_click",

  NAVIGATION: "navigation",
} as const;

export type EventType = typeof EVENTS[keyof typeof EVENTS];
