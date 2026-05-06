export const INTENT = {
  NAVIGATION: "navigation",
  ENGAGEMENT: "engagement",
  ACTION: "action",
} as const;

export type Intent =
  (typeof INTENT)[keyof typeof INTENT];

/* ---------------------------------------
   FUNNEL STAGES (REFERENCE ONLY)
   DO NOT USE AS RUNTIME SOURCE OF TRUTH
--------------------------------------- */

export const FUNNEL = {
  VISIT: "VISIT",
  ENGAGEMENT: "ENGAGEMENT",
  INTENT: "INTENT",
  CONTACT: "CONTACT",
} as const;

export type FunnelStep =
  (typeof FUNNEL)[keyof typeof FUNNEL];

/* ---------------------------------------
   EVENT LABELS (REFERENCE ONLY)
   MUST ALIGN WITH CORE ANALYTICS
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

/**
 * IMPORTANT RULES:
 * - This file is NOT a runtime engine
 * - This file is NOT analytics source of truth
 * - Core analytics owns EventType strictly
 * - These labels are only for mapping/reference/UI consistency
 */
