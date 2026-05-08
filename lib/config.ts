/* =============================================================
   HOTEL CONFIGURATION (CANONICAL SOURCE OF TRUTH)

   RULES:
   - This file contains ONLY raw configuration data
   - NO business logic
   - NO sanitization logic
   - NO analytics logic
   - NO domain decisions

   All access must go through:
   lib/domain/contact.ts or typed accessors
   ============================================================= */

export type PhoneLabel = "primary" | "secondary" | "whatsapp";

export type HotelConfig = {
  identity: {
    name: string;
    brand: string;
  };

  domain: {
    primary: string;
  };

  contact: {
    phones: ReadonlyArray<{
      label: PhoneLabel;
      number: string;
    }>;
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

/* =============================================================
   IMMUTABLE HOTEL CONFIG OBJECT
   ============================================================= */

export const HOTEL: Readonly<HotelConfig> = Object.freeze({
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
});

/* =============================================================
   CONFIG ACCESS HELPERS (ONLY SAFE ENTRY POINTS)
   ============================================================= */

function sanitizePhone(raw: string): string {
  return raw.replace(/[^\d]/g, "");
}

function findPhone(label: PhoneLabel): string | null {
  const entry = HOTEL.contact.phones.find(
    (p) => p.label === label
  );

  if (!entry) return null;

  const cleaned = sanitizePhone(entry.number);

  return cleaned || null;
}

/* =============================================================
   PUBLIC ACCESSORS (ONLY ALLOWED WAY TO ACCESS CONTACT DATA)
   ============================================================= */

export function getPhoneByLabel(
  label: PhoneLabel
): string | null {
  return findPhone(label);
}

export function getPrimaryPhone(): string | null {
  return findPhone("primary");
}

export function getWhatsAppPhone(): string | null {
  return findPhone("whatsapp");
}

export function getAllPhones(): ReadonlyArray<{
  label: PhoneLabel;
  number: string;
}> {
  return HOTEL.contact.phones;
}

/* =============================================================
   DOMAIN SAFETY NOTE
   =============================================================

   UI MUST NEVER DO:
   HOTEL.contact.phones[x]

   UI MUST ONLY DO:
   getPrimaryPhone()
   getPhoneByLabel()
   getWhatsAppPhone()

   This prevents:
   - schema drift
   - runtime crashes
   - inconsistent formatting
   - analytics mismatch
   ============================================================= */
