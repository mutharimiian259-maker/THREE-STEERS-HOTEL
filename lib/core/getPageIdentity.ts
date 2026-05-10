import { routes } from "@/lib/routes";

import {
  buildRouteIndex,
  resolveRoute,
} from "./pageResolver";

import { normalizePath } from "./normalizePath";

import type { PageIdentity } from "./pageIdentity";
import type { Route } from "@/lib/routes";

/* =============================================================
   STATIC ROUTE INDEX
   ============================================================= */

const ROUTE_INDEX = buildRouteIndex(routes);

/* =============================================================
   PAGE IDENTITY (ROUTING ONLY)
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

  const route: Route | undefined =
    resolveRoute(
      normalizedPath,
      ROUTE_INDEX
    );

  /* =========================================================
     FINAL OBJECT (NO ANALYTICS COUPLING)
     ========================================================= */

  return Object.freeze({
    path,
    normalizedPath,
    route,
  });
}
