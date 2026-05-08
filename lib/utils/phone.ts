/* =============================================================
   PHONE UTILITIES
   -------------------------------------------------------------
   Pure utility layer:
   - no config access
   - no business logic
   - no domain assumptions
   - framework independent
   ============================================================= */

/**
 * Removes all non-digit characters from a phone number.
 * Safe for international formats like +254..., spaces, dashes, etc.
 *
 * Always returns a clean numeric string.
 */
export function sanitizePhone(phone?: string | null): string {
  if (!phone) return "";
  return phone.replace(/[^\d]/g, "");
}

/**
 * Backward-compatible alias.
 *
 * NOTE:
 * - Do not use in new code
 * - Kept only to prevent breaking legacy imports
 *
 * @deprecated Use sanitizePhone() instead
 */
export const normalizePhoneDigits = sanitizePhone;

/* =============================================================
   SAFETY HELPERS (optional but production-safe)
   ============================================================= */

/**
 * Checks if a phone string has valid numeric content after sanitization.
 */
export function isValidPhone(phone?: string | null): boolean {
  const cleaned = sanitizePhone(phone);
  return cleaned.length >= 9; // generic safety threshold
}

/**
 * Formats a phone into a readable international style (basic).
 * Does NOT assume country rules — safe fallback formatter.
 */
export function formatPhone(phone?: string | null): string {
  const cleaned = sanitizePhone(phone);

  if (!cleaned) return "";

  // Basic grouping for readability (not country-specific)
  return cleaned.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
}
