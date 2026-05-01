import { HOTEL } from "@/lib/config";

export function getPhoneLink() {
  return `tel:${HOTEL.contact.phone.primary}`;
}

export function getEmailLink() {
  return `mailto:${HOTEL.contact.email}`;
}
