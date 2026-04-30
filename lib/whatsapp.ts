import { config } from "./config";

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
