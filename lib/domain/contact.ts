import { HOTEL } from "@/lib/config";

/* ---------------------------------------
   DOMAIN UTIL: PHONE SANITIZATION
--------------------------------------- */

function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

/* ---------------------------------------
   DOMAIN: PHONE RESOLVER
--------------------------------------- */

function resolvePhone(label: "primary" | "secondary" | "whatsapp") {
  return HOTEL.contact.phones.find((p) => p.label === label);
}

/* ---------------------------------------
   PUBLIC API
--------------------------------------- */

export function getPhoneByLabel(
  label: "primary" | "secondary" | "whatsapp"
): string | null {
  const phone = resolvePhone(label);

  if (!phone) return null;

  const sanitized = sanitizePhone(phone.number);

  return sanitized || null;
}

export function getWhatsAppNumber(): string | null {
  return getPhoneByLabel("whatsapp");
}

/* ---------------------------------------
   OPTIONAL: STRONGER DOMAIN SAFETY LAYER
--------------------------------------- */

export function getPrimaryPhone(): string | null {
  return getPhoneByLabel("primary");
}
