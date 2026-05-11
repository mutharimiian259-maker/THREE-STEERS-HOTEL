export function normalizePath(path: unknown): string {
  /* =============================================================
     CONTRACT SAFETY CHECK (FAIL LOUD OPTION)
     ============================================================= */

  if (typeof path !== "string") {
    console.warn(
      "[normalizePath] invalid input type",
      path
    );
    return "/";
  }

  const trimmed = path.trim();

  if (!trimmed) return "/";

  /* =============================================================
     REMOVE HASH (FRAGMENT IS NEVER ROUTE IDENTITY)
     ============================================================= */

  const noHash = trimmed.split("#")[0];

  /* =============================================================
     REMOVE QUERY STRING
     ============================================================= */

  const noQuery = noHash.split("?")[0];

  /* =============================================================
     ENSURE LEADING SLASH
     ============================================================= */

  const withLeadingSlash = noQuery.startsWith("/")
    ? noQuery
    : `/${noQuery}`;

  /* =============================================================
     COLLAPSE MULTIPLE SLASHES (SAFE MODE)
     ============================================================= */

  const collapsed = withLeadingSlash.replace(
    /\/{2,}/g,
    "/"
  );

  /* =============================================================
     REMOVE TRAILING SLASHES (EXCEPT ROOT)
     ============================================================= */

  const withoutTrailing = collapsed.replace(/\/+$/, "");

  /* =============================================================
     FINAL CANONICAL OUTPUT
     ============================================================= */

  return withoutTrailing === "" ? "/" : withoutTrailing;
}
