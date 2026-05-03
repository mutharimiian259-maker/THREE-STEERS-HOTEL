import { HOTEL } from "@/lib/config";

export const hotelContent = {
  brand: {
    name: HOTEL.identity.name,
    tagline:
      "Embrace the vibrant pulse of our city hotel, where comfort meets convenience.",
    description: HOTEL.seo.defaultDescription,
  },

  contacts: {
    email: HOTEL.contact.email,
    phones: [
      HOTEL.contact.phone.primary,
      HOTEL.contact.phone.secondary,
    ],
  },

  navigation: [
    { name: "Home", path: "/", type: "navigation" },

    { name: "Rooms & Suites", path: "/rooms", type: "revenue" },

    { name: "Food & Drinks", path: "/#dining", type: "engagement" },

    {
      name: "Conferencing & Banqueting",
      path: "/#conference",
      type: "revenue",
    },

    { name: "Fun Experiences", path: "/#experiences", type: "engagement" },

    {
      name: "Blogs",
      path: "/blog",
      type: "engagement",
    },

    {
      name: "Contact Us",
      path: "/#booking",
      type: "conversion",
    },
  ],

  highlights: {
    rooms: {
      title: "Accommodation Categories",
      description:
        "Multiple room categories designed for business and leisure travelers.",
      priority: "high",
    },

    dining: {
      title: "Food & Drinks",
      description:
        "Premium dining experiences crafted by expert chefs.",
      priority: "medium",
    },

    conferences: {
      title: "Meetings, Seminars & Events",
      description:
        "Professional event spaces for corporate and private functions.",
      capacity: "10 to 300 guests",
      priority: "high",
    },

    experiences: {
      wildlife: [
        "Lewa Wildlife Conservancy",
        "Ol Pejeta Conservancy",
        "Meru National Reserve Game Drives",
      ],

      adventure: [
        "Mt. Kenya Hiking",
        "Ngare Ndare Forest Reserve",
      ],

      culture: [
        "Meru Museum",
      ],

      leisure: [
        "Swimming Pool",
      ],
    },
  },

  footer: {
    legal: [
      "Privacy Policy",
      "Cookie Policy",
      "Recruitment Policy",
    ],

    social: [
      { name: "Facebook", url: "#" },
      { name: "Instagram", url: "#" },
      { name: "Twitter", url: "#" },
    ],
  },
};
