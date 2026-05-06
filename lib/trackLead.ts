"use client";

import { track } from "@/lib/core/analytics";

/**
 * Intent layer = semantic tagging ONLY
 * NO schema mutation allowed here
 */

type IntentType =
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "email_click"
  | "blog_click"
  | "navigation";

type IntentPayload = {
  source?: string;
  context?: string;
  page?: string;
  value?: number;
};

/**
 * INTENT LAYER (SAFE)
 *
 * - Does NOT redefine event schema
 * - Does NOT inject non-core fields
 * - Only enriches metadata
 */
export function trackIntent(
  type: IntentType,
  payload: IntentPayload = {}
) {
  if (typeof window === "undefined") return;

  track(type, {
    ...payload,
    intent: true, // simple semantic flag ONLY
  });
}
