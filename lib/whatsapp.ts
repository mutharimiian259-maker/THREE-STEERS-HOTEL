import { HOTEL } from "@/lib/config";

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);

  return `https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encoded}`;
}
