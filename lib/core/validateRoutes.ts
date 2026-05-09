import { normalizePath } from "./normalizePath";
import { routes } from "@/lib/routes";

/* =============================================================
   ROUTE VALIDATION (STRUCTURED + CI SAFE)
   ============================================================= */

export type RouteValidationReport = {
  duplicates: Array<{
    path: string;
    normalized: string;
    first: unknown;
    duplicate: unknown;
  }>;
  invalid: unknown[];
};

/* =============================================================
   ROUTE VALIDATION
   ============================================================= */

export function validateRoutes(): RouteValidationReport {
  const seen = new Map<string, unknown>();
  const duplicates: RouteValidationReport["duplicates"] = [];
  const invalid: unknown[] = [];

  for (const route of routes) {
    if (!route || typeof (route as any).path !== "string") {
      invalid.push(route);
      continue;
    }

    const normalized = normalizePath((route as any).path);

    const existing = seen.get(normalized);

    if (existing) {
      duplicates.push({
        path: (route as any).path,
        normalized,
        first: existing,
        duplicate: route,
      });
    } else {
      seen.set(normalized, route);
    }
  }

  return {
    duplicates,
    invalid,
  };
}
