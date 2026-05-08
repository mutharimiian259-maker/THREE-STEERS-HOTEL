export function sanitizePhone(phone?: string | null): string {
  if (!phone) return "";

  return phone.replace(/[^\d]/g, "");
}

/* =============================================================
   LEGACY COMPATIBILITY
   ============================================================= */

export const normalizePhoneDigits = sanitizePhone;

/* =============================================================
   VALIDATION (IMPROVED)
   ============================================================= */

export function isValidPhone(phone?: string | null): boolean {
  const cleaned = sanitizePhone(phone);

  // realistic global safety bounds
  return cleaned.length >= 8 && cleaned.length <= 15;
}

/* =============================================================
   BASIC SAFE FORMATTER (DISPLAY ONLY)
   -------------------------------------------------------------
   NOTE: Not country-specific. Only for UI readability.
   ============================================================= */

export function formatPhone(phone?: string | null): string {
  const cleaned = sanitizePhone(phone);

  if (!cleaned) return "";

  // safer grouping: 3–4 digit chunks (less misleading than fixed 3s)
  return cleaned.replace(/(\d{3,4})(?=\d)/g, "$1 ").trim();
}

/* =============================================================
   E.164 GUARD (OPTIONAL BUT HIGH VALUE)
   ============================================================= */

export function toE164(phone?: string | null, defaultCountryCode = ""): string {
  const cleaned = sanitizePhone(phone);

  if (!cleaned) return "";

  // if already international
  if (cleaned.startsWith("+" as any)) {
    return cleaned;
  }

  return defaultCountryCode + cleaned;
}
