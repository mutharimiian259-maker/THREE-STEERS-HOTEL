import { normalizePath } from "./normalizePath";
import { routes } from "@/lib/routes";

export type RouteValidationReport = Readonly<{
  duplicates: Array<{
    path: string;
    normalized: string;
    first: RouteLike;
    duplicate: RouteLike;
  }>;
  invalid: unknown[];
}>;

type RouteLike = Readonly<{
  path: string;
}>;

function isRouteLike(value: unknown): value is RouteLike {
  return (
    typeof value === "object" &&
    value !== null &&
    "path" in value &&
    typeof value.path === "string"
  );
}

/* =============================================================
   ROUTE VALIDATION
   ============================================================= */

export function validateRoutes(): RouteValidationReport {
  const seen = new Map<string, RouteLike>();

  const duplicates: RouteValidationReport["duplicates"] = [];

  const invalid: unknown[] = [];

  for (const route of routes) {
    if (!isRouteLike(route)) {
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
  }

  return {
    duplicates,
    invalid,
  };
}
