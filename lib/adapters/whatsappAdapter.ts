import { track } from "@/lib/core/analytics";
import { getPhoneByLabel } from "@/lib/domain/contact";
import { sanitizePhone } from "@/lib/domain/phone";

export function buildWhatsAppLink(message: string): string {
  const rawPhone = getPhoneByLabel("whatsapp");
  const phone = sanitizePhone(rawPhone || "");

  if (!phone) {
    console.warn("[WHATSAPP] Missing WhatsApp phone number");

    track("system_error", {
      context: "whatsapp_missing_phone",
    }, "system");

    return "https://wa.me/";
  }

  track("whatsapp_click", {
    label: "whatsapp_cta",
    message_length: message.length,
  }, "sticky_cta");

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
