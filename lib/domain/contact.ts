/* =============================================================
   DOMAIN: CONTACT RESOLUTION LAYER

   Responsibilities:
   - Provide safe, stable contact API to UI
   - Hide config structure completely
   - Prevent direct config coupling in components

   Rules:
   - NO direct HOTEL access
   - NO sanitization logic here
   - NO formatting logic here
   - ONLY orchestration of config accessors
   ============================================================= */

import {
  getPhoneByLabel as _getPhoneByLabel,
  getWhatsAppPhone as _getWhatsAppPhone,
  getPrimaryPhone as _getPrimaryPhone,
} from "@/lib/config";

import type { PhoneLabel } from "@/lib/config";

/* =============================================================
   CORE CONTACT API (DOMAIN FACADE)
   ============================================================= */

export type { PhoneLabel };

/**
 * Returns sanitized phone number by label.
 */
export function getPhoneByLabel(
  label: PhoneLabel
): string | null {
  return _getPhoneByLabel(label);
}

/**
 * Returns primary hotel contact number.
 */
export function getPrimaryPhone(): string | null {
  return _getPrimaryPhone();
}

/**
 * Returns WhatsApp contact number.
 */
export function getWhatsAppPhone(): string | null {
  return _getWhatsAppPhone();
}

/* =============================================================
   LEGACY COMPATIBILITY LAYER
   ============================================================= */

/**
 * @deprecated Use getWhatsAppPhone()
 *
 * Kept only for legacy components that still import old naming.
 */
export function getWhatsAppNumber(): string | null {
  return getWhatsAppPhone();
}
