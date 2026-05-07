import { routes } from "@/lib/routes";
import type { Route } from "@/lib/routes";

/* ---------------------------------------
   PURE ROUTE QUERIES
   Navigation concerns only
--------------------------------------- */

export function getAllRoutes(): Route[] {
  return routes;
}

export function getNavigationRoutes(): Route[] {
  return routes.filter(
    (route) => route.type === "navigation"
  );
}

export function getAnchorRoutes(): Route[] {
  return routes.filter(
    (route) => route.type === "anchor"
  );
}

export function getRouteByPath(
  path: string
): Route | null {
  return (
    routes.find((route) => route.path === path) ??
    null
  );
}

export function getRouteByName(
  name: string
): Route | null {
  return (
    routes.find((route) => route.name === name) ??
    null
  );
}
