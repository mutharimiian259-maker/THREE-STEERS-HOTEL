// lib/core/pageResolver.ts

import { routes } from "@/lib/routes";
import { normalizePath } from "./normalizePath";

/* =============================================================
   CANONICAL ROUTE MAP
   -------------------------------------------------------------
   Pre-normalized once to prevent repeated normalization work.
   ============================================================= */

const ROUTE_MAP = new Map(
  routes.map((route) => [
    normalizePath(route.path),
    route,
  ])
);

/* =============================================================
   ROUTE RESOLVER
   ============================================================= */

export function resolveRoute(path: string) {
  const normalized = normalizePath(path);

  return ROUTE_MAP.get(normalized) ?? null;
}
