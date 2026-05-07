import { routes } from "@/lib/routes";
import type { Route } from "@/lib/routes";

export function getRoutesByUiHint(
  uiHint: Route["uiHint"]
): Route[] {
  return routes.filter((route) => route.uiHint === uiHint);
}

export function getAnchorRoutes(): Route[] {
  return routes.filter((route) => route.type === "anchor");
}
