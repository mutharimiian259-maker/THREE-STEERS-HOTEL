import { normalizePath } from "./normalizePath";
import { routes } from "@/lib/routes";

/* =============================================================
   ROUTE VALIDATION (DEV TOOL ONLY)
   ============================================================= */

export function validateRoutes(): void {
  if (process.env.NODE_ENV !== "development") return;

  const seen = new Map<string, unknown>();

  for (const route of routes) {
    if (!route || typeof route.path !== "string") {
      console.error("[ROUTE INVALID]", route);
      continue;
    }

    const key = normalizePath(route.path);

    if (seen.has(key)) {
      console.warn("[ROUTE DUPLICATE]", {
        normalized_path: key,
        first: seen.get(key),
        duplicate: route,
      });
    } else {
      seen.set(key, route);
    }
  }
}
