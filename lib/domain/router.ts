import { routes, type Route } from "@/lib/routes";

/* =============================================================
   PATH NORMALIZATION (CANONICAL CORE VERSION)
   ============================================================= */

export function normalizePath(path: string): string {
  const cleaned = path?.trim();

  if (!cleaned) return "/";

  const withoutTrailing = cleaned.replace(/\/+$/, "");

  return withoutTrailing || "/";
}

/* =============================================================
   PATH PARSING (SAFE + CONSISTENT)
   ============================================================= */

export function parseRoutePath(path: string): {
  base: string;
  hash: string | null;
} {
  try {
    const url = new URL(
      path.startsWith("http")
        ? path
        : `http://local${path}`
    );

    return {
      base: normalizePath(url.pathname),
      hash: url.hash
        ? url.hash.toLowerCase()
        : null,
    };
  } catch {
    return {
      base: "/",
      hash: null,
    };
  }
}

/* =============================================================
   ROUTE INDEX (STATIC SNAPSHOT - CURRENT ARCHITECTURE)
   ============================================================= */

const ROUTE_INDEX = routes.map((route) => {
  const parsed = parseRoutePath(route.path);

  return {
    route,
    base: parsed.base,
    hash: parsed.hash,
  };
});

/* =============================================================
   ROUTE LOOKUP (LINEAR SEARCH - OPTIMIZED LATER STAGE)
   ============================================================= */

export function getRoute(path: string): Route | null {
  const target = parseRoutePath(path);

  const match = ROUTE_INDEX.find((r) => {
    return (
      r.base === target.base &&
      r.hash === target.hash
    );
  });

  return match?.route ?? null;
}
