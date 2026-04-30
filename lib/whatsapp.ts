import { HOTEL } from "@/lib/config/hotel";

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);

  return `https://wa.me/${HOTEL.contact.whatsapp}?text=${encoded}`;
}
