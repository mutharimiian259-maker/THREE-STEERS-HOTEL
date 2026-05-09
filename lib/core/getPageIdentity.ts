import { resolveRoute } from "./pageResolver";
import { normalizePath } from "./normalizePath";

import type { PageIdentity } from "./pageIdentity";
import type { EventType } from "@/lib/core/types";

/* =============================================================
   PAGE IDENTITY DERIVATION LAYER (CORE SAFE)
   ============================================================= */

export function getPageIdentity(path: string): PageIdentity {
  /* =========================================================
     NORMALIZATION
     ========================================================= */

  const normalizedPath = normalizePath(path);

  /* =========================================================
     ROUTE RESOLUTION
     ========================================================= */

  const route = resolveRoute(normalizedPath);

  /* =========================================================
     SAFE FUNNEL DERIVATION (OPTIONAL CONTEXT ONLY)
     ========================================================= */

  const funnelStage: "VISIT" | undefined = "VISIT";

  /* =========================================================
     FINAL IDENTITY OBJECT
     ========================================================= */

  return Object.freeze({
    path,
    normalizedPath,

    route,

    funnelStage,

    keywords: undefined,

    isNavigation: Boolean(route?.kind === "navigation"),
  });
}
