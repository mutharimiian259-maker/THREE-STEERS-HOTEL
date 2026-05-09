// lib/core/normalizePath.ts

/* =============================================================
   NORMALIZE PATH
   -------------------------------------------------------------
   Canonicalizes browser paths for:
   - analytics consistency
   - funnel integrity
   - route identity stability
   ============================================================= */

export function normalizePath(path: string): string {
  const cleaned = path.trim();

  if (!cleaned) return "/";

  /* =============================================================
     REMOVE QUERY STRING + HASH
     ============================================================= */

  const [withoutQuery] = cleaned.split("?");
  const [withoutHash] = withoutQuery.split("#");

  /* =============================================================
     REMOVE TRAILING SLASHES
     ============================================================= */

  return withoutHash.replace(/\/+$/, "") || "/";
}
