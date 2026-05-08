import { routes, type Route } from "@/lib/routes";
import { normalizePath } from "@/lib/utils/normalizePath";

/* =============================================================
   PRECOMPUTED INDEX (PERFORMANCE LAYER)
   ============================================================= */

const ROUTE_BY_PATH = new Map<string, Route>();
const ROUTE_BY_NAME = new Map<string, Route>();

for (const route of routes) {
  const normalizedPath = normalizePath(route.path);

  ROUTE_BY_PATH.set(normalizedPath, route);

  if (route.name) {
    ROUTE_BY_NAME.set(route.name, route);
  }
}

/* =============================================================
   PURE ROUTE QUERIES
   ============================================================= */

export function getAllRoutes(): Route[] {
  return routes;
}

export function getNavigationRoutes(): Route[] {
  return routes.filter((route) => route.type === "navigation");
}

export function getAnchorRoutes(): Route[] {
  return routes.filter((route) => route.type === "anchor");
}

/* =============================================================
   FAST LOOKUPS (O(1))
   ============================================================= */

export function getRouteByPath(path: string): Route | null {
  const normalized = normalizePath(path);
  return ROUTE_BY_PATH.get(normalized) ?? null;
}

export function getRouteByName(name: string): Route | null {
  return ROUTE_BY_NAME.get(name) ?? null;
}
