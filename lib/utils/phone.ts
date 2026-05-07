export function normalizePhoneDigits(phone?: string): string {
  if (!phone) return "";

  return phone.replace(/[^\d]/g, "");
}
