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
    { name: "Home", path: "/", ui: "navigation" },

    { name: "Rooms & Suites", path: "/rooms", ui: "primary" },

    { name: "Food & Drinks", path: "/#dining", ui: "secondary" },

    {
      name: "Conferencing & Banqueting",
      path: "/#conference",
      ui: "primary",
    },

    {
      name: "Fun Experiences",
      path: "/#experiences",
      ui: "secondary",
    },

    {
      name: "Blogs",
      path: "/blog",
      ui: "secondary",
    },

    {
      name: "Contact Us",
      path: "/#booking",
      ui: "conversion",
    },
  ],

  highlights: {
    rooms: {
      title: "Accommodation Categories",
      description:
        "Multiple room categories designed for business and leisure travelers.",
    },

    dining: {
      title: "Food & Drinks",
      description:
        "Premium dining experiences crafted by expert chefs.",
    },

    conferences: {
      title: "Meetings, Seminars & Events",
      description:
        "Professional event spaces for corporate and private functions.",
      capacity: "10 to 300 guests",
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

      culture: ["Meru Museum"],

      leisure: ["Swimming Pool"],
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
} as const;
