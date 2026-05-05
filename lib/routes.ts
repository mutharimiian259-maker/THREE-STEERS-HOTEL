export type Route = {
  name: string;
  path: string;

  /**
   * page = full page navigation (/rooms)
   * section = in-page anchor scroll (#dining)
   */
  type: "page" | "section";

  /**
   * UI hint ONLY (DOES NOT affect funnel or analytics)
   */
  intent: "navigation" | "engagement" | "action";
};

export const routes: Route[] = [
  {
    name: "Home",
    path: "/",
    type: "page",
    intent: "navigation",
  },
  {
    name: "Rooms",
    path: "/rooms",
    type: "page",
    intent: "action",
  },
  {
    name: "Dining",
    path: "#dining",
    type: "section",
    intent: "engagement",
  },
  {
    name: "Conference",
    path: "#conference",
    type: "section",
    intent: "action",
  },
  {
    name: "Experiences",
    path: "#experiences",
    type: "section",
    intent: "engagement",
  },
  {
    name: "Book Stay",
    path: "#booking",
    type: "section",
    intent: "action",
  },
];

/**
 * Normalize ONLY pathname (no URL parsing)
 */
function normalizePath(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}

/**
 * Extract base + hash separately (safe + deterministic)
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

export function getRoutesByIntent(
  intent: Route["intent"]
): Route[] {
  return routes.filter((r) => r.intent === intent);
}

export function getSectionRoutes(): Route[] {
  return routes.filter((r) => r.type === "section");
}

/**
 * DEV SAFETY CHECK
 */
if (process.env.NODE_ENV === "development") {
  const seen = new Set<string>();

  for (const route of routes) {
    const key = route.path;

    if (seen.has(key)) {
      console.warn("[ROUTE DUPLICATE DETECTED]", route.path);
    }

    seen.add(key);
  }
}
