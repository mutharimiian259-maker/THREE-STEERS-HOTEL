export type Route = {
  name: string;
  path: string;

  /**
   * page = full route (/rooms)
   * section = hash scroll section (#dining)
   */
  type: "page" | "section";

  /**
   * Semantic intent (used for analytics + personalization)
   */
  intent: "navigation" | "engagement" | "revenue" | "conversion";
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
    intent: "revenue",
  },
  {
    name: "Dining",
    path: "/#dining",
    type: "section",
    intent: "engagement",
  },
  {
    name: "Conference",
    path: "/#conference",
    type: "section",
    intent: "revenue",
  },
  {
    name: "Experiences",
    path: "/#experiences",
    type: "section",
    intent: "engagement",
  },
  {
    name: "Book Stay",
    path: "/#booking",
    type: "section",
    intent: "conversion",
  },
];

/**
 * 🔧 Normalize path for consistent matching
 */
function normalizePath(path: string): string {
  if (!path) return "/";

  try {
    const url = new URL(path, window.location.origin);

    let normalized = url.pathname.replace(/\/+$/, "") || "/";

    if (url.hash) {
      normalized += url.hash;
    }

    return normalized;
  } catch {
    // fallback (SSR or malformed)
    return path.replace(/\/+$/, "") || "/";
  }
}

/**
 * 🔥 Helper: get route by path (normalized)
 */
export function getRoute(path: string): Route | undefined {
  const target = normalizePath(path);

  return routes.find(
    (r) => normalizePath(r.path) === target
  );
}

/**
 * 🔥 SAFE UTILITY: filter by intent
 */
export function getRoutesByIntent(
  intent: Route["intent"]
): Route[] {
  return routes.filter((r) => r.intent === intent);
}

/**
 * 🔥 SAFE UTILITY: get all section routes
 */
export function getSectionRoutes(): Route[] {
  return routes.filter((r) => r.type === "section");
}

/**
 * 🔥 DEV SAFETY CHECK (normalized duplicate detection)
 */
if (process.env.NODE_ENV === "development") {
  const seen = new Set<string>();

  for (const route of routes) {
    const normalized = normalizePath(route.path);

    if (seen.has(normalized)) {
      console.warn(
        "[ROUTE DUPLICATE DETECTED]",
        route.path
      );
    }

    seen.add(normalized);
  }
}
