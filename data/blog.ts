export type BlogPost = {
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
};

export const blogPosts: BlogPost[] = [
  {
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

    content:
      "Best Hotel in Meru Kenya\n\nThree Steers Hotel offers premium accommodation in Meru Kenya with modern rooms, fine dining, and conference facilities.\n\nWhy choose us:\n- 11 room categories\n- Conference halls\n- Fine dining restaurants\n- Gardens & leisure spaces",

    author: "Three Steers Hotel",
    publishedAt: "2026-04-30",
    image: "/images/blog/hotel-meru.jpg",
    category: "Accommodation",
    readingTime: 3,
  },

  {
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

    content:
      "Conference Venues in Meru\n\nThree Steers Hotel provides fully equipped conference halls in Meru suitable for seminars, workshops, and corporate meetings.\n\nFacilities include:\n- High-speed WiFi\n- Audio-visual equipment\n- Catering services\n- Flexible seating capacity",

    author: "Three Steers Hotel",
    publishedAt: "2026-04-30",
    image: "/images/blog/conference-meru.jpg",
    category: "Events",
    readingTime: 4,
  },
];
