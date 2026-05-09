
import { normalizePath } from "./normalizePath";
import type { Route } from "@/lib/routes";

/* =============================================================
   ROUTE RESOLUTION LAYER (CORE SAFE)
   ============================================================= */

/**
 * NOTE:
 * ROUTES MUST BE STATIC CONFIG ONLY.
 * No runtime mutation allowed.
 */

/* =============================================================
   ROUTE RESOLVER
   ============================================================= */

export function resolveRoute(
  path: string,
  routes: readonly Route[]
): Route | null {
  const normalized = normalizePath(path);

  for (const route of routes) {
    if (normalizePath(route.path) === normalized) {
      return route;
    }
  }

  return null;
}
