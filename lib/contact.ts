export const INTENT = {
  NAVIGATION: "navigation",
  ENGAGEMENT: "engagement",
  ACTION: "action",
} as const;

export type Intent =
  typeof INTENT[keyof typeof INTENT];

export const FUNNEL = {
  VISIT: "VISIT",
  ENGAGEMENT: "ENGAGEMENT",
  INTENT: "INTENT",
  CONTACT: "CONTACT",
} as const;

export type FunnelStep =
  typeof FUNNEL[keyof typeof FUNNEL];

/**
 * RAW USER BEHAVIOR EVENTS (analytics input layer)
 */
export const EVENTS = {
  PAGE_VIEW: "page_view",
  ROOM_VIEW: "room_view",

  WHATSAPP_CLICK: "whatsapp_click",
  CALL_CLICK: "call_click",
  EMAIL_CLICK: "email_click",

  BLOG_CLICK: "blog_click",

  /**
   * 🔥 FIX: missing conversion trigger event
   * This is what connects UI → INTENT funnel stage
   */
  BOOKING_INTENT: "booking_intent",

  /**
   * 🔥 FIX: structural navigation tracking (used in routes)
   */
  NAVIGATION_CLICK: "navigation_click",
} as const;

export type EventType =
  typeof EVENTS[keyof typeof EVENTS];
