export type Route = {
  name: string;
  path: string;

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
