import { routes, Route } from "@/lib/routes";

function normalizePath(path: string): string {
  const cleaned = path.trim();
  if (!cleaned) return "/";
  const withoutTrailing = cleaned.replace(/\/+$/, "");
  return withoutTrailing || "/";
}

function splitPath(path: string): {
  base: string;
  hash?: string;
} {
  const [base, hash] = path.split("#");

  return {
    base: normalizePath(base || "/"),
    hash: hash ? `#${hash}` : undefined,
  };
}

export function getRoute(path: string): Route | undefined {
  const target = splitPath(path);

  return routes.find((route) => {
    const current = splitPath(route.path);

    return (
      current.base === target.base &&
      current.hash === target.hash
    );
  });
}
