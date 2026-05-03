import { HOTEL } from "@/lib/config";
import { trackLead } from "@/lib/analytics/trackLead";

/**
 * Phone link (NO side effects)
 */
export function getPhoneLink() {
  return `tel:${HOTEL.contact.phone.primary}`;
}

/**
 * Email link (NO side effects)
 */
export function getEmailLink() {
  return `mailto:${HOTEL.contact.email}`;
}

/**
 * Explicit tracking functions (SEPARATED RESPONSIBILITY)
 */
export function trackPhoneClick() {
  if (typeof window === "undefined") return;

  trackLead("call_click");
}

export function trackEmailClick() {
  if (typeof window === "undefined") return;

  trackLead("booking_intent");
}
