
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
 * EVENT ACTIONS (RAW USER BEHAVIOR ONLY)
 */
export const EVENTS = {
  PAGE_VIEW: "page_view",
  ROOM_VIEW: "room_view",

  WHATSAPP_CLICK: "whatsapp_click",
  CALL_CLICK: "call_click",
  EMAIL_CLICK: "email_click",

  BLOG_CLICK: "blog_click",
} as const;

export type EventType =
  typeof EVENTS[keyof typeof EVENTS];
