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
   ROUTE NORMALIZATION (STRICT)
--------------------------------------- */

function normalize(path: string): string {
  const cleaned = path.trim();

  if (!cleaned) return "/";

  return cleaned.replace(/\/+$/, "");
}

/* ---------------------------------------
   SAFE ROUTE SPLIT
--------------------------------------- */

function split(path: string) {
  const [base, hash] = path.split("#");

  return {
    base: normalize(base || "/"),
    hash: hash ? `#${hash}` : undefined,
  };
}

/* ---------------------------------------
   SINGLE LOOKUP (NO FUZZY MATCHING)
--------------------------------------- */

export function getRoute(path: string): Route | undefined {
  const target = split(path);

  return routes.find((r) => {
    const current = split(r.path);

    return (
      current.base === target.base &&
      current.hash === target.hash
    );
  });
}

/* ---------------------------------------
   FILTER HELPERS (PURE QUERIES ONLY)
--------------------------------------- */

export function getRoutesByUiHint(
  uiHint: Route["uiHint"]
): Route[] {
  return routes.filter((r) => r.uiHint === uiHint);
}

export function getAnchorRoutes(): Route[] {
  return routes.filter((r) => r.type === "anchor");
}

/* ---------------------------------------
   BACKBONE SAFETY (DEV ONLY)
--------------------------------------- */

if (process.env.NODE_ENV === "development") {
  const seen = new Set<string>();

  for (const r of routes) {
    if (seen.has(r.path)) {
      console.warn("[ROUTE DUPLICATE]", r.path);
    }
    seen.add(r.path);
  }
}
