import { MetadataRoute } from "next";
import { HOTEL } from "@/lib/config";
import { rooms } from "@/data/rooms";
import { blogPosts } from "@/data/blog";

function getBaseUrl(): string {
  try {
    const url = new URL(HOTEL.domain.primary);
    return url.origin.replace(/\/$/, "");
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.warn("[SITEMAP] Invalid domain config");
    }
    return "";
  }
}

function buildUrl(base: string, path: string): string {
  try {
    return new URL(path, base).toString().replace(/\/$/, "");
  } catch {
    return base;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  if (!baseUrl) return [];

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: buildUrl(baseUrl, "/rooms"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: buildUrl(baseUrl, "/blog"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const roomPages: MetadataRoute.Sitemap = rooms.map((room) => ({
    url: buildUrl(baseUrl, `/rooms/${room.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: buildUrl(baseUrl, `/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt ?? post.date ?? now),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...roomPages, ...blogPages];
}
