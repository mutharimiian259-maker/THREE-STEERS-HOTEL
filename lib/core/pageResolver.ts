// lib/core/pageResolver.ts

import { routes } from "@/lib/routes";
import { normalizePath } from "./normalizePath";

export function resolveRoute(path: string) {
  const normalized = normalizePath(path);

  return (
    routes.find((r) => normalizePath(r.path) === normalized) ?? null
  );
}
