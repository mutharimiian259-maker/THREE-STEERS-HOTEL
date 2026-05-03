export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  keywords: string[];
  content: string;
  author: string;
  publishedAt: string;
  image?: string;
  category?: string;
  readingTime?: number;

  // SEO + conversion layer
  intent?: "engagement" | "revenue" | "conversion";

  cta?: {
    label: string;
    action: "whatsapp" | "rooms" | "conference";
  };
};

export const blogPosts: BlogPost[] = [
  {
    id: "blog-001",
    slug: "best-hotel-in-meru-kenya",
    title: "Best Hotel in Meru Kenya for Luxury Stay",
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

## Why choose us:
- 11 room categories
- Conference halls
- Fine dining restaurants
- Gardens & leisure spaces

Looking for a stay in Meru? Book directly for the best rates and availability.
    `,

    author: "Three Steers Hotel",
    publishedAt: "2026-04-30",

    image: "/images/blog/accommodation/best-hotel-meru/hero.jpg",

    category: "Accommodation",
    readingTime: 3,

    intent: "revenue",

    cta: {
      label: "Book Your Stay via WhatsApp",
      action: "whatsapp",
    },
  },

  {
    id: "blog-002",
    slug: "conference-venues-in-meru",
    title: "Top Conference Venues in Meru for Corporate Events",
    excerpt:
      "Explore modern conference facilities at Three Steers Hotel suitable for meetings and corporate events.",

    metaDescription:
      "Three Steers Hotel offers modern conference venues in Meru Kenya with WiFi, AV equipment, and catering services.",

    keywords: [
      "conference venues Meru",
      "meetings Meru hotel",
      "corporate events Meru Kenya",
    ],

    content: `
# Conference Venues in Meru

Three Steers Hotel provides fully equipped conference halls in Meru suitable for seminars, workshops, and corporate meetings.

## Facilities include:
- High-speed WiFi
- Audio-visual equipment
- Catering services
- Flexible seating capacity

Planning a corporate event? Contact us for tailored packages.
    `,

    author: "Three Steers Hotel",
    publishedAt: "2026-04-30",

    image: "/images/blog/conference/conference-venues-meru/hero.jpg",

    category: "Events",
    readingTime: 4,

    intent: "conversion",

    cta: {
      label: "Make Conference Enquiry",
      action: "conference",
    },
  },
];
