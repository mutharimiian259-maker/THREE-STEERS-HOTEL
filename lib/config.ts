export const HOTEL = {
  identity: {
    name: "Three Steers Hotel Meru",
    brand: "Three Steers Hotel",
  },

  domain: {
    primary: "https://www.threesteershotel.com",
    canonical: "https://www.threesteershotel.com",
  },

  contact: {
    phone: {
      primary: "+254728588005",
      secondary: "+254735497772",
      whatsapp: "254728588005",
    },
    email: "reservation@threesteershotel.com",
  },

  location: {
    city: "Meru",
    region: "Meru County",
    country: "Kenya",
    full: "Meru, Kenya",
    coordinates: {
      lat: -0.046,
      lng: 37.650,
    },
  },

  seo: {
    defaultTitle: "Three Steers Hotel Meru | Luxury Hotel in Kenya",
    defaultDescription:
      "Luxury hotel in Meru, Kenya offering accommodation, dining, conferences, and events near Mount Kenya. Book direct for best rates.",

    keywords: [
      "hotel in Meru Kenya",
      "Three Steers Hotel",
      "Meru accommodation",
      "conference hotel Meru",
      "best hotel near Mount Kenya",
    ],
  },

  business: {
    priceRange: "KSh 5,000 - KSh 40,000",
    currency: "KES",
  },
} as const;
