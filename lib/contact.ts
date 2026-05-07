import type { EventType } from "@/lib/core/types";

/**
 * UI SEMANTIC CLASSIFICATION
 * Presentation-only grouping
 *
 * MUST NOT be used as:
 * - analytics truth
 * - funnel source
 * - persistence schema
 */

export const UI_INTENT = {
  NAVIGATION: "navigation",
  ENGAGEMENT: "engagement",
  ACTION: "action",
} as const;

export type UiIntent =
  (typeof UI_INTENT)[keyof typeof UI_INTENT];

/* ---------------------------------------
   UI EVENT REFERENCES
   Derived from canonical EventType
--------------------------------------- */

export const UI_EVENT = {
  PAGE_VIEW: "page_view" as EventType,
  ROOM_VIEW: "room_view" as EventType,

  WHATSAPP_CLICK: "whatsapp_click" as EventType,
  CALL_CLICK: "call_click" as EventType,

  BOOKING_INTENT: "booking_intent" as EventType,
} as const;
