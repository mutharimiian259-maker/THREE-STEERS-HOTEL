import { resolveRoute } from "./pageResolver";
import { normalizePath } from "./normalizePath";

import { getFunnelStage } from "@/lib/core/funnelAccessor";

import type { PageIdentity } from "./pageIdentity";
import type { EventType } from "@/lib/core/types";

/* =============================================================
   PAGE IDENTITY DERIVATION LAYER (CORE SAFE)
   ============================================================= */

export function getPageIdentity(
  path: string,
  lastEventType?: EventType
): PageIdentity {
  /* =========================================================
     NORMALIZATION (SINGLE SOURCE OF TRUTH)
     ========================================================= */

  const normalizedPath = normalizePath(path);

  /* =========================================================
     ROUTE RESOLUTION (CORE ONLY)
     ========================================================= */

  const route = resolveRoute(normalizedPath);

  /* =========================================================
     FUNNEL DERIVATION (SAFE FALLBACK)
     ========================================================= */

  const funnelStage = lastEventType
    ? getFunnelStage(lastEventType)
    : "VISIT";

  /* =========================================================
     FINAL IDENTITY OBJECT
     ========================================================= */

  return Object.freeze({
    path,
    normalizedPath,

    route,

    funnelStage,

    keywords: [], // intentionally decoupled from SEO layer

    isNavigation: Boolean(route && (route.kind === "navigation" || route.type === "navigation")),
  });
}
