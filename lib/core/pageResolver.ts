import { normalizePath } from "./normalizePath";
import type { Route } from "@/lib/routes";

/* =============================================================
   ROUTE RESOLUTION LAYER (CORE SAFE)
   ============================================================= */

/**
 * ROUTES MUST BE STATIC CONFIG ONLY.
 * No runtime mutation allowed.
 */

/* =============================================================
   BUILD ROUTE INDEX (ONCE)
   ============================================================= */

export function buildRouteIndex(routes: readonly Route[]) {
  const index = new Map<string, Route>();

  for (const route of routes) {
    index.set(normalizePath(route.path), route);
  }

  return index;
}

/* =============================================================
   ROUTE RESOLVER (O(1))
   ============================================================= */

export function resolveRoute(
  path: string,
  routeIndex: Map<string, Route>
): Route | undefined {
  const normalized = normalizePath(path);

  return routeIndex.get(normalized);
}
