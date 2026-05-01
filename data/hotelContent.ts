import { HOTEL } from "@/lib/config/hotel";

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
    { name: "Home", path: "/" },
    { name: "Rooms & Suites", path: "/rooms" },
    { name: "Food & Drinks", path: "/dining" },
    { name: "Events & Offers", path: "/offers" },
    { name: "Conferencing & Banqueting", path: "/conference" },
    { name: "Fun Experiences", path: "/experiences" },
    { name: "Blogs", path: "/blog" },
    { name: "Careers", path: "/careers" },
    { name: "Media", path: "/media" },
    { name: "Contact Us", path: "/contact" },
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
      capacity: "10 to 300 guests",
    },

    experiences: [
      "Ngare Ndare Forest Reserve",
      "Mt. Kenya Hiking",
      "Lewa Wildlife Conservancy",
      "Meru National Reserve Game Drives",
      "Meru Museum",
      "Swimming Pool",
      "Ol Pejeta Conservancy",
    ],
  },

  footer: {
    legal: [
      "Privacy Policy",
      "Cookie Policy",
      "Recruitment Policy",
    ],
    social: ["Facebook", "Instagram", "Twitter"],
  },
};
