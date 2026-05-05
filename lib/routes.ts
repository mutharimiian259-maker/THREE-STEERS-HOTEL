export type Route = {
  name: string;
  path: string;

  /**
   * navigation = full route (/rooms)
   * anchor = in-page section (#dining)
   */
  type: "navigation" | "anchor";

  /**
   * UI metadata ONLY (DO NOT use for funnel or analytics)
   */
  uiHint: "navigation" | "engagement" | "action";
};

export const routes: Route[] = [
  {
    name: "Home",
    path: "/",
    type: "navigation",
    uiHint: "navigation",
  },
  {
    name: "Rooms",
    path: "/rooms",
    type: "navigation",
    uiHint: "action",
  },
  {
    name: "Dining",
    path: "#dining",
    type: "anchor",
    uiHint: "engagement",
  },
  {
    name: "Conference",
    path: "#conference",
    type: "anchor",
    uiHint: "action",
  },
  {
    name: "Experiences",
    path: "#experiences",
    type: "anchor",
    uiHint: "engagement",
  },
  {
    name: "Book Stay",
    path: "#booking",
    type: "anchor",
    uiHint: "action",
  },
];

/**
 * Normalize only base path
 */
function normalizePath(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}

/**
 * Split path safely (no URL parsing dependency)
 */
function splitPath(path: string): { base: string; hash?: string } {
  const [base, hash] = path.split("#");

  return {
    base: normalizePath(base || "/"),
    hash: hash ? `#${hash}` : undefined,
  };
}

export function getRoute(path: string): Route | undefined {
  const { base, hash } = splitPath(path);

  return routes.find((r) => {
    const { base: rBase, hash: rHash } = splitPath(r.path);

    return rBase === base && rHash === hash;
  });
}

export function getRoutesByUiHint(
  uiHint: Route["uiHint"]
): Route[] {
  return routes.filter((r) => r.uiHint === uiHint);
}

export function getAnchorRoutes(): Route[] {
  return routes.filter((r) => r.type === "anchor");
}

/**
 * DEV SAFETY CHECK
 */
if (process.env.NODE_ENV === "development") {
  const seen = new Set<string>();

  for (const route of routes) {
    if (seen.has(route.path)) {
      console.warn("[ROUTE DUPLICATE DETECTED]", route.path);
    }
    seen.add(route.path);
  }
}
