import { HOTEL } from "@/lib/config";
import { trackLead } from "@/lib/analytics/trackLead";

/**
 * Phone link (PURE)
 */
export function getPhoneLink() {
  return `tel:${HOTEL.contact.phone.primary}`;
}

/**
 * Email link (PURE)
 */
export function getEmailLink() {
  return `mailto:${HOTEL.contact.email}`;
}

/**
 * Tracking layer (explicit side effects)
 */
export function trackPhoneClick() {
  if (typeof window === "undefined") return;

  trackLead("call_click");
}

/**
 * FIXED: more accurate analytics meaning
 */
export function trackEmailClick() {
  if (typeof window === "undefined") return;

  trackLead("email_click");
}
