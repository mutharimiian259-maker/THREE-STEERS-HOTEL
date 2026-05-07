export type BlogIntent =
  | "content"
  | "conversion";

export type BlogCTAAction =
  | "whatsapp"
  | "rooms"
  | "conference";

export type BlogCTA = Readonly<{
  label: string;

  action: BlogCTAAction;
}>;

export type BlogPost = Readonly<{
  id: string;

  slug: string;

  title: string;

  excerpt: string;

  metaDescription: string;

  keywords?: readonly string[];

  content: string;

  author: string;

  publishedAt: string;

  imageKey?: string;

  category?: string;

  readingTime?: number;

  intent?: BlogIntent;

  cta?: BlogCTA;
}>;

/* ---------------------------------------
   BLOG CONTENT REGISTRY
--------------------------------------- */

export const blogPosts: readonly BlogPost[] = [
  {
    id: "blog-001",

    slug: "best-hotel-in-meru-kenya",

    title:
      "Best Hotel in Meru Kenya for Luxury Stay",

    excerpt:
      "Discover why Three Steers Hotel is among the top hotels in Meru for comfort, conferences, and dining.",

    metaDescription:
      "Stay at Three Steers Hotel in Meru Kenya offering luxury rooms, dining, and conference facilities near Mt Kenya.",

    keywords: [
      "hotel in Meru Kenya",
      "accommodation Meru",
      "best hotel Meru",
      "luxury hotel Meru Kenya",
    ],

    content: `
# Best Hotel in Meru Kenya

Three Steers Hotel offers premium accommodation in Meru Kenya with modern rooms, fine dining, and conference facilities.
    `,

    author: "Three Steers Hotel",

    publishedAt: "2026-04-30",

    imageKey:
      "blog.accommodation.bestHotelMeru",

    category: "Accommodation",

    readingTime: 3,

    intent: "conversion",

    cta: {
      label: "Book Your Stay via WhatsApp",

      action: "whatsapp",
    },
  },
] as const;
