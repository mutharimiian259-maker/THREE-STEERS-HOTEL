// lib/core/pageIdentity.ts

import type { Route } from "@/lib/routes";
import type { SeoIntent } from "@/lib/seoTypes";
import type { FunnelStage } from "@/lib/core/types";

/* =============================================================
   SINGLE PAGE TRUTH MODEL
   -------------------------------------------------------------
   Derived identity projection from canonical route state.
   NO BUSINESS LOGIC.
   ============================================================= */

export type PageIdentity = Readonly<{
  /* ===========================================================
     ORIGINAL INPUT PATH
     =========================================================== */

  path: string;

  /* ===========================================================
     CANONICAL NORMALIZED PATH
     =========================================================== */

  normalizedPath: string;

  /* ===========================================================
     ROUTE RESOLUTION
     =========================================================== */

  route: Route | null;

  /* ===========================================================
     DERIVED CONTEXT
     =========================================================== */

  seoIntent: SeoIntent | null;

  funnelStage: FunnelStage | null;

  keywords: readonly string[];

  /* ===========================================================
     ROUTE CLASSIFICATION
     =========================================================== */

  isNavigation: boolean;
}>;
