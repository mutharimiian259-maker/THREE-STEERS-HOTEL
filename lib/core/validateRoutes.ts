import { normalizePath } from "./normalizePath";

import type { Route } from "@/lib/routes";

/* =============================================================
   ROUTE VALIDATION REPORT
   ============================================================= */

export type RouteValidationReport = Readonly<{
  duplicates: Array<{
    path: string;
    normalized: string;
    first: Route;
    duplicate: Route;
  }>;

  invalid: unknown[];

  valid: Route[];

  index: Record<string, Route>;
}>;

/* =============================================================
   TYPE GUARD
   ============================================================= */

function isRoute(value: unknown): value is Route {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Route).path === "string" &&
    typeof (value as Route).id === "string" &&
    typeof (value as Route).kind === "string"
  );
}

/* =============================================================
   ROUTE VALIDATION
   ============================================================= */

export function validateRoutes(
  routesInput: unknown[]
): RouteValidationReport {
  const seen = new Map<string, Route>();

  const duplicates: RouteValidationReport["duplicates"] =
    [];

  const invalid: unknown[] = [];

  const valid: Route[] = [];

  const index: Record<string, Route> = {};

  for (const route of routesInput) {
    if (!isRoute(route)) {
      invalid.push(route);
      continue;
    }

    const normalized = normalizePath(route.path);

    const existing = seen.get(normalized);

    if (existing) {
      duplicates.push({
        path: route.path,
        normalized,
        first: existing,
        duplicate: route,
      });

      continue;
    }

    seen.set(normalized, route);

    valid.push(route);

    index[normalized] = route;
  }

  return {
    duplicates,
    invalid,
    valid,
    index,
  };
}
