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
      whatsapp: "+254728588005",
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
      lng: 37.65,
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

  pricing: {
    currency: "KES",
    range: {
      min: 5000,
      max: 40000,
      display: "KSh 5,000 - 40,000",
    },
  },

  business: {
    checkIn: "12:00",
    checkOut: "10:00",
    starRating: 4,
  },
} as const;

/* --------------------------------------------------
   🔥 DERIVED SAFE HELPERS (NO DUPLICATION ELSEWHERE)
-------------------------------------------------- */

/**
 * Always returns clean numeric phone (safe for tel + whatsapp)
 */
export function getCleanPhone(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

/**
 * Central WhatsApp-ready number (single source of truth usage)
 */
export function getWhatsAppNumber(): string {
  return getCleanPhone(HOTEL.contact.phone.whatsapp);
}

/**
 * Primary contact number safe for tel:
 */
export function getPrimaryPhone(): string {
  return getCleanPhone(HOTEL.contact.phone.primary);
}

/**
 * Canonical domain (safe single access point)
 */
export function getDomain(): string {
  return HOTEL.domain.canonical;
}

/**
 * SEO helper for future intent expansion (non-breaking extension)
 */
export function getSeoKeywords(intent?: "room" | "blog" | "conference" | "dining") {
  const base = [...HOTEL.seo.keywords];

  switch (intent) {
    case "room":
      return [...base, "hotel rooms Meru Kenya", "luxury stays Meru"];
    case "conference":
      return [...base, "conference venues Meru", "meeting rooms Kenya"];
    case "dining":
      return [...base, "restaurants Meru hotel", "fine dining Kenya"];
    case "blog":
      return [...base, "travel Meru", "Mt Kenya hotels"];
    default:
      return base;
  }
}
