import { HOTEL } from "@/lib/config";

function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

export function getPhoneByLabel(
  label: "primary" | "secondary" | "whatsapp"
): string | null {
  const phone = HOTEL.contact.phones.find(
    (p) => p.label === label
  );

  return phone ? sanitizePhone(phone.number) : null;
}

export function getWhatsAppNumber(): string | null {
  return getPhoneByLabel("whatsapp");
}
