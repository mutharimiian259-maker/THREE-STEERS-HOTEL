export const HOTEL = {
  identity: {
    name: "Three Steers Hotel Meru",
    brand: "Three Steers Hotel",
  },

  domain: {
    primary: "https://www.threesteershotel.com",
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
    timezone: "Africa/Nairobi", // 🔥 FIX: important for analytics + booking flows
    coordinates: {
      lat: -0.046,
      lng: 37.65,
    },
  },

  seo: {
    defaultTitle: "Three Steers Hotel Meru | Luxury Hotel in Kenya",
    defaultDescription:
      "Luxury hotel in Meru, Kenya offering accommodation, dining, conferences, and events near Mount Kenya. Book direct for best rates.",

    /**
     * GLOBAL SEO KEYWORDS ONLY (STATIC BRAND LAYER)
     * Do NOT use for page-level ranking logic
     */
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

    // 🔥 FIX: future extensibility hook (important for booking engine later)
    policies: {
      cancellation: "24h flexible",
      lateCheckout: "subject to availability",
    },
  },
} as const;

/* --------------------------------------------------
   PURE HELPERS (NO BUSINESS LOGIC SIDE EFFECTS)
-------------------------------------------------- */

export function getCleanPhone(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

export function getWhatsAppNumber(): string {
  return getCleanPhone(HOTEL.contact.phone.whatsapp);
}

export function getPrimaryPhone(): string {
  return getCleanPhone(HOTEL.contact.phone.primary);
}

export function getDomain(): string {
  return HOTEL.domain.primary;
}
