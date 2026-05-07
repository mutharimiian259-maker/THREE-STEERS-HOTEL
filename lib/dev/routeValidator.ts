import { routes } from "@/lib/routes";

export function validateRoutes() {
  if (process.env.NODE_ENV !== "development") return;

  const seen = new Map<string, any>();

  for (const route of routes) {
    const key = route.path;

    if (seen.has(key)) {
      console.warn("[ROUTE DUPLICATE]", {
        path: key,
        first: seen.get(key),
        duplicate: route,
      });
    } else {
      seen.set(key, route);
    }
  }
}
