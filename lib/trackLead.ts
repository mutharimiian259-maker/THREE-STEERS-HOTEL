"use client";

import { track } from "@/lib/core/analytics";

/**
 * STRICT INTENT TYPES (NOT LEADS)
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
  [key: string]: unknown;
};

/**
 * INTENT TRACKING ONLY
 *
 * ❗ This is NOT a lead system
 * ❗ This is NOT CRM data
 * ❗ This is behavioral enrichment only
 */
export function trackIntent(
  type: IntentType,
  payload: IntentPayload = {}
) {
  if (typeof window === "undefined") return;

  track(type, {
    ...payload,
    event_category: "intent",
    url: window.location.href,
    referrer: document.referrer || undefined,
    ua: navigator.userAgent,
    lang: navigator.language,
  });
}
