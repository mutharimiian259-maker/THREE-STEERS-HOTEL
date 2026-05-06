"use client";

import { track } from "@/lib/core/analytics";

type LeadType =
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "email_click"
  | "blog_click"
  | "navigation";

type LeadPayload = {
  source?: string;
  context?: string;
  page?: string;
  value?: number;
  [key: string]: unknown;
};

/**
 * CLEAN ARCHITECTURE:
 * Leads are just enriched analytics events.
 * No queues, no retries, no API coupling.
 */
export function trackLead(type: LeadType, payload: LeadPayload = {}) {
  if (typeof window === "undefined") return;

  track(type, {
    ...payload,

    // unified metadata layer
    event_category: "lead",
    url: window.location.href,
    referrer: document.referrer || null,
    timestamp: Date.now(),

    device: {
      ua: navigator.userAgent,
      lang: navigator.language,
    },
  });
}
