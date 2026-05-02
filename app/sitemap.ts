import { MetadataRoute } from "next";
import { HOTEL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    typeof HOTEL.domain.primary === "string"
      ? HOTEL.domain.primary.replace(/\/$/, "")
      : "http://localhost:3000";

  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },

    {
      url: `${baseUrl}/rooms`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },

    // future-safe dynamic blog structure (no new files added, safe fallback)
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
