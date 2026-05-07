export type HotelConfig = {
  identity: {
    name: string;
    brand: string;
  };

  domain: {
    primary: string;
  };

  contact: {
    phones: {
      label: "primary" | "secondary" | "whatsapp";
      number: string;
    }[];
    email: string;
  };

  location: {
    city: string;
    region: string;
    country: string;
    full: string;
    timezone: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };

  seo: {
    defaultTitle: string;
    defaultDescription: string;
  };

  pricing: {
    currency: string;
    range: {
      min: number;
      max: number;
    };
  };

  business: {
    checkIn: string;
    checkOut: string;
    starRating: number;
    policies: {
      cancellation: string;
      lateCheckout: string;
    };
  };
};

export const HOTEL: Readonly<HotelConfig> = {
  identity: {
    name: "Three Steers Hotel Meru",
    brand: "Three Steers Hotel",
  },

  domain: {
    primary:
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000",
  },

  contact: {
    phones: [
      { label: "primary", number: "+254728588005" },
      { label: "secondary", number: "+254735497772" },
      { label: "whatsapp", number: "+254728588005" },
    ],
    email: "reservation@threesteershotel.com",
  },

  location: {
    city: "Meru",
    region: "Meru County",
    country: "Kenya",
    full: "Meru, Kenya",
    timezone: "Africa/Nairobi",
    coordinates: {
      lat: -0.046,
      lng: 37.65,
    },
  },

  seo: {
    defaultTitle: "Three Steers Hotel Meru | Luxury Hotel in Kenya",
    defaultDescription:
      "Luxury hotel in Meru, Kenya offering accommodation, dining, conferences, and events near Mount Kenya. Book direct for best rates.",
  },

  pricing: {
    currency: "KES",
    range: {
      min: 5000,
      max: 40000,
    },
  },

  business: {
    checkIn: "12:00",
    checkOut: "10:00",
    starRating: 4,
    policies: {
      cancellation: "24h flexible",
      lateCheckout: "subject to availability",
    },
  },
};
