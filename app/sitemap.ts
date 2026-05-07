import { MetadataRoute } from "next";
import { HOTEL } from "@/lib/config";
import rooms from "@/data/rooms";
import { blogPosts } from "@/data/blog";

function getBaseUrl(): string | null {
  try {
    return new URL(HOTEL.domain.primary).origin.replace(/\/$/, "");
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.warn("[SITEMAP] Invalid domain config");
    }
    return null;
  }
}

function normalizeUrl(base: string, path: string): string {
  try {
    const url = new URL(path, base);
    return url.origin + url.pathname.replace(/\/$/, "");
  } catch {
    return base;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  if (!baseUrl) {
    return [];
  }

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: normalizeUrl(baseUrl, "/rooms"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: normalizeUrl(baseUrl, "/blog"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const roomPages: MetadataRoute.Sitemap = rooms.map((room) => ({
    url: normalizeUrl(
      baseUrl,
      `/rooms/${room.slug}`
    ),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: normalizeUrl(
      baseUrl,
      `/blog/${post.slug}`
    ),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...roomPages,
    ...blogPages,
  ];
}
