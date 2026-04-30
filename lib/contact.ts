import { HOTEL } from "@/lib/config/hotel";

export function getPhoneLink() {
  return `tel:${HOTEL.contact.phone}`;
}

export function getEmailLink() {
  return `mailto:${HOTEL.contact.email}`;
}
