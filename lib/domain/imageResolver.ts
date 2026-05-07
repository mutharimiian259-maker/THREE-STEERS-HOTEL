const DEFAULT_IMAGE = "/images/hotel/exterior-hero.jpg";

export function getImage(
  path?: string,
  fallback: string = DEFAULT_IMAGE
): string {
  if (!path) return fallback;

  // external URL validation
  if (path.startsWith("http")) {
    try {
      new URL(path);
      return path;
    } catch {
      return fallback;
    }
  }

  // internal asset validation
  if (path.startsWith("/")) {
    return path;
  }

  if (process.env.NODE_ENV === "development") {
    console.warn("[IMAGE INVALID]", path);
  }

  return fallback;
}
