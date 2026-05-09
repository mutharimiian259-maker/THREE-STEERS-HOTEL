import { routes } from "@/lib/routes";

import { buildRouteIndex, resolveRoute } from "./pageResolver";
import { normalizePath } from "./normalizePath";

import { FUNNEL_STAGE_MAP } from "./types";

import type { PageIdentity } from "./pageIdentity";

/* =============================================================
   STATIC ROUTE INDEX
   ============================================================= */

const ROUTE_INDEX = buildRouteIndex(routes);

/* =============================================================
   PAGE IDENTITY
   ============================================================= */

export function getPageIdentity(
  path: string
): PageIdentity {
  /* =========================================================
     NORMALIZATION
     ========================================================= */

  const normalizedPath =
    normalizePath(path);

  /* =========================================================
     ROUTE RESOLUTION
     ========================================================= */

  const route = resolveRoute(
    normalizedPath,
    ROUTE_INDEX
  );

  /* =========================================================
     FUNNEL DERIVATION
     ========================================================= */

  const funnelStage =
    route?.eventType
      ? FUNNEL_STAGE_MAP[route.eventType]
      : undefined;

  /* =========================================================
     FINAL OBJECT
     ========================================================= */

  return Object.freeze({
    path,
    normalizedPath,
    route,
    funnelStage,
  });
}
