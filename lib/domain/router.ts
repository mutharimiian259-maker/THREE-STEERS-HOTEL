import { routes, type Route } from "@/lib/routes";

/* ---------------------------------------
   PATH NORMALIZATION
--------------------------------------- */

export function normalizePath(path: string): string {
  const cleaned = path.trim();

  if (!cleaned) return "/";

  const normalized = cleaned.replace(/\/+$/, "");

  return normalized || "/";
}

/* ---------------------------------------
   PATH PARSING
--------------------------------------- */

export function parseRoutePath(path: string): {
  base: string;
  hash: string | null;
} {
  try {
    const url = new URL(path, "http://localhost");

    return {
      base: normalizePath(url.pathname),
      hash: url.hash || null,
    };
  } catch {
    return {
      base: "/",
      hash: null,
    };
  }
}

/* ---------------------------------------
   ROUTE LOOKUP
--------------------------------------- */

export function getRoute(
  path: string
): Route | null {
  const target = parseRoutePath(path);

  return (
    routes.find((route) => {
      const current = parseRoutePath(route.path);

      return (
        current.base === target.base &&
        current.hash === target.hash
      );
    }) ?? null
  );
}
