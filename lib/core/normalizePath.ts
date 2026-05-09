export function normalizePath(path: string): string {
  if (!path) return "/";

  const cleaned = path.trim();

  if (!cleaned) return "/";

  /* =============================================================
     REMOVE QUERY STRING + HASH
     ============================================================= */

  const [withoutQuery] = cleaned.split("?");
  const [withoutHash] = withoutQuery.split("#");

  /* =============================================================
     NORMALIZE CASE (ROUTE STABILITY)
     ============================================================= */

  const lower = withoutHash.toLowerCase();

  /* =============================================================
     REMOVE TRAILING SLASHES
     ============================================================= */

  const normalized = lower.replace(/\/+$/, "");

  /* =============================================================
     FINAL ROOT SAFETY
     ============================================================= */

  return normalized === "" ? "/" : normalized;
}
