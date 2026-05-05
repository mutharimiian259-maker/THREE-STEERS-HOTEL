
export type Route = {
  name: string;
  path: string;

  /**
   * page = full route (/rooms)
   * section = hash scroll section (#dining)
   */
  type: "page" | "section";

  /**
   * UI classification ONLY (NOT funnel state)
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
    path: "/#dining",
    type: "section",
    intent: "engagement",
  },
  {
    name: "Conference",
    path: "/#conference",
    type: "section",
    intent: "action",
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
    intent: "action",
  },
];

function normalizePath(path: string): string {
  if (typeof window === "undefined") return path || "/";

  try {
    const url = new URL(path, window.location.origin);

    const normalizedPath =
      url.pathname.replace(/\/+$/, "") || "/";

    return url.hash
      ? `${normalizedPath}${url.hash}`
      : normalizedPath;
  } catch {
    return path.replace(/\/+$/, "") || "/";
  }
}

export function getRoute(path: string): Route | undefined {
  const target = normalizePath(path);

  return routes.find((r) => {
    const normalized = normalizePath(r.path);
    return normalized === target;
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
    const normalized = route.path;

    if (seen.has(normalized)) {
      console.warn("[ROUTE DUPLICATE DETECTED]", route.path);
    }

    seen.add(normalized);
  }
}
