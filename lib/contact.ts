import { HOTEL } from "@/lib/config";
import { trackLead } from "@/lib/analytics/trackLead";

/**
 * Phone link (tracked)
 */
export function getPhoneLink(source?: string) {
  if (typeof window !== "undefined") {
    trackLead("call_click");
  }

  return `tel:${HOTEL.contact.phone.primary}`;
}

/**
 * Email link (tracked)
 */
export function getEmailLink(source?: string) {
  if (typeof window !== "undefined") {
    trackLead("booking_intent");
  }

  return `mailto:${HOTEL.contact.email}`;
}
