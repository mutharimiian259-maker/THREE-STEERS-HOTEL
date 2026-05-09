import { normalizePath } from "./normalizePath";

import type { Route } from "@/lib/routes";

/* =============================================================
   ROUTE INDEX
   ============================================================= */

export type RouteIndex = ReadonlyMap<string, Route>;

/* =============================================================
   BUILD ROUTE INDEX
   ============================================================= */

/**
 * ROUTES MUST BE STATIC CONFIG ONLY.
 * NO RUNTIME MUTATION ALLOWED.
 */

export function buildRouteIndex(
  routes: readonly Route[]
): RouteIndex {
  const index = new Map<string, Route>();

  for (const route of routes) {
    const normalized = normalizePath(route.path);

    if (index.has(normalized)) {
      throw new Error(
        `[ROUTER] Duplicate normalized route: ${normalized}`
      );
    }

    index.set(normalized, Object.freeze(route));
  }

  return index;
}

/* =============================================================
   ROUTE RESOLUTION
   ============================================================= */

export function resolveRoute(
  path: string,
  routeIndex: RouteIndex
): Route | undefined {
  const normalized = normalizePath(path);

  return routeIndex.get(normalized);
}
