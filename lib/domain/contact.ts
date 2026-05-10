import {
  getPhoneByLabel as _getPhoneByLabel,
  getWhatsAppPhone as _getWhatsAppPhone,
  getPrimaryPhone as _getPrimaryPhone,
} from "@/lib/config";

import type { PhoneLabel } from "@/lib/config";

/* =============================================================
   DOMAIN: CONTACT RESOLUTION LAYER
   ============================================================= */

/**
 * Domain facade for contact resolution.
 *
 * RULES:
 * - No direct config usage outside this module
 * - No formatting or sanitization logic here
 * - Pure delegation layer (for now)
 */

export type { PhoneLabel };

/* =============================================================
   CORE CONTACT API
   ============================================================= */

export function getPhoneByLabel(
  label: PhoneLabel
): string | null {
  return _getPhoneByLabel(label);
}

export function getPrimaryPhone(): string | null {
  return _getPrimaryPhone();
}

export function getWhatsAppPhone(): string | null {
  return _getWhatsAppPhone();
}

/* =============================================================
   LEGACY COMPATIBILITY LAYER
   ============================================================= */

/**
 * @deprecated Use getWhatsAppPhone()
 */
export function getWhatsAppNumber(): string | null {
  return getWhatsAppPhone();
}
