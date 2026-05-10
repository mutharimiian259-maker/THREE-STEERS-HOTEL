import type { Route } from "@/lib/routes";

/* =============================================================
   SINGLE PAGE TRUTH MODEL (CORE PURE CONTRACT)
   ============================================================= */

/**
 * Pure routing identity snapshot only.
 * No analytics, no funnel logic.
 */
export type PageIdentity = Readonly<{
  /* =========================================================
     INPUT PATH
     ========================================================= */

  path: string;

  /* =========================================================
     CANONICAL PATH
     ========================================================= */

  normalizedPath: string;

  /* =========================================================
     ROUTE RESOLUTION SNAPSHOT
     ========================================================= */

  route?: Route;
}>;
