export function normalizePath(path: string): string {
  if (typeof path !== "string") return "/";

  const trimmed = path.trim();

  if (!trimmed) return "/";

  /* =============================================================
     REMOVE HASH FIRST (FRAGMENT NEVER AFFECTS ROUTING)
     ============================================================= */

  const noHash = trimmed.split("#")[0];

  /* =============================================================
     REMOVE QUERY STRING
     ============================================================= */

  const noQuery = noHash.split("?")[0];

  /* =============================================================
     ENSURE LEADING SLASH (CRITICAL FIX)
     ============================================================= */

  const withLeadingSlash = noQuery.startsWith("/")
    ? noQuery
    : `/${noQuery}`;

  /* =============================================================
     COLLAPSE MULTIPLE SLASHES
     ============================================================= */

  const collapsed = withLeadingSlash.replace(/\/+/g, "/");

  /* =============================================================
     REMOVE TRAILING SLASHES (EXCEPT ROOT)
     ============================================================= */

  const withoutTrailing = collapsed.replace(/\/+$/, "");

  /* =============================================================
     FINAL SAFETY
     ============================================================= */

  return withoutTrailing === "" ? "/" : withoutTrailing;
}
