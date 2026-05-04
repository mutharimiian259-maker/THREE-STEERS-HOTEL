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
 * 🔥 Helper: get route by path
 */
export function getRoute(path: string): Route | undefined {
  return routes.find((r) => r.path === path);
}

/**
 * 🔥 SAFE UTILITY: filter by intent (future personalization ready)
 */
export function getRoutesByIntent(
  intent: Route["intent"]
): Route[] {
  return routes.filter((r) => r.intent === intent);
}

/**
 * 🔥 SAFE UTILITY: get all section routes (scroll-based UX)
 */
export function getSectionRoutes(): Route[] {
  return routes.filter((r) => r.type === "section");
}

/**
 * 🔥 DEV SAFETY CHECK (no runtime cost in production)
 * Prevents duplicate paths accidentally being introduced
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
