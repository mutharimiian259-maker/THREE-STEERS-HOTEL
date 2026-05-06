export type Route = {
  name: string;
  path: string;

  /**
   * routing classification ONLY
   */
  type: "navigation" | "anchor";

  /**
   * UI rendering hint ONLY (never analytics, never funnel)
   */
  uiHint: "navigation" | "engagement" | "action";
};

/* ---------------------------------------
   ROUTES (SOURCE OF TRUTH)
--------------------------------------- */

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

/* ---------------------------------------
   NORMALIZATION (STRICT + SAFE)
--------------------------------------- */

function normalizePath(path: string): string {
  const cleaned = path.trim();

  if (!cleaned) return "/";

  // remove trailing slashes (except root)
  const withoutTrailing = cleaned.replace(/\/+$/, "");

  return withoutTrailing || "/";
}

/* ---------------------------------------
   SPLIT ROUTE (SAFE PARSING)
--------------------------------------- */

function splitPath(path: string): {
  base: string;
  hash?: string;
} {
  const [base, hash] = path.split("#");

  return {
    base: normalizePath(base || "/"),
    hash: hash ? `#${hash}` : undefined,
  };
}

/* ---------------------------------------
   ROUTE LOOKUP (STRICT MATCH ONLY)
--------------------------------------- */

export function getRoute(path: string): Route | undefined {
  const target = splitPath(path);

  return routes.find((route) => {
    const current = splitPath(route.path);

    return (
      current.base === target.base &&
      current.hash === target.hash
    );
  });
}

/* ---------------------------------------
   FILTER HELPERS (PURE QUERIES)
--------------------------------------- */

export function getRoutesByUiHint(
  uiHint: Route["uiHint"]
): Route[] {
  return routes.filter((route) => route.uiHint === uiHint);
}

export function getAnchorRoutes(): Route[] {
  return routes.filter((route) => route.type === "anchor");
}

/* ---------------------------------------
   DUPLICATE SAFETY (DEV ONLY)
--------------------------------------- */

if (process.env.NODE_ENV === "development") {
  const seen = new Map<string, Route>();

  for (const route of routes) {
    const key = route.path;

    if (seen.has(key)) {
      console.warn("[ROUTE DUPLICATE DETECTED]", {
        path: key,
        first: seen.get(key),
        duplicate: route,
      });
    } else {
      seen.set(key, route);
    }
  }
}
