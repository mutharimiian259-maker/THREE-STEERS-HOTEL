export function resolveUrl(base: string, path: string): string {
  try {
    return new URL(path || "/", base).toString();
  } catch {
    return base;
  }
}

export function validateImage(image?: string): string {
  const fallback = "/images/hotel/og/default.jpg";

  if (!image) return fallback;

  if (image.startsWith("http")) return image;
  if (image.startsWith("/")) return image;

  return fallback;
}
