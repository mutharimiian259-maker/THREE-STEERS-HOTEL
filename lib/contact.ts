/**
 * UI EVENT SEMANTIC MAP
 * ONLY for UI readability / grouping
 * MUST NOT be used as analytics source of truth
 */

/* ---------------------------------------
   UI INTENT CLASSIFICATION
--------------------------------------- */

export const INTENT = {
  NAVIGATION: "navigation",
  ENGAGEMENT: "engagement",
  ACTION: "action",
} as const;

export type Intent =
  (typeof INTENT)[keyof typeof INTENT];

/* ---------------------------------------
   EVENT LABELS (UI REFERENCE ONLY)
   MUST MATCH CORE EventType SEMANTICS
--------------------------------------- */

export const EVENT_LABELS = {
  PAGE_VIEW: "page_view",
  ROOM_VIEW: "room_view",

  WHATSAPP_CLICK: "whatsapp_click",
  CALL_CLICK: "call_click",
  EMAIL_CLICK: "email_click",

  BOOKING_INTENT: "booking_intent",
  NAVIGATION_CLICK: "navigation_click",
} as const;
