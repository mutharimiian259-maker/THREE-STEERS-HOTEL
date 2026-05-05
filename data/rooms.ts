import { HOTEL } from "@/lib/config";

export type Room = {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: "KES";
  desc: string;

  /**
   * 🔥 FIX: decouple raw path from system
   * (future CMS-ready)
   */
  imageKey: string;

  tag?: string;

  wing: "batianWing" | "lenanaWing";

  maxGuests?: number;
  bedType?: string;
  amenities?: string[];
  view?: string;

  demand?: "high" | "medium" | "low";
};

const rooms: Room[] = [
  {
    id: "deluxe",
    slug: "deluxe-room",
    name: "Deluxe Room",
    price: 8500,
    currency: "KES",
    desc: "Luxury comfort with modern amenities in a calm setting.",
    imageKey: "batianWing.deluxeTwin",
    tag: "Most Booked",
    wing: "batianWing",
    maxGuests: 2,
    bedType: "Queen Bed",
    amenities: ["WiFi", "Breakfast", "Room Service", "Hot Shower"],
    view: "City View",
    demand: "high",
  },
  {
    id: "executive",
    slug: "executive-suite",
    name: "Executive Suite",
    price: 12000,
    currency: "KES",
    desc: "Premium suite offering Mt Kenya views and executive comfort.",
    imageKey: "batianWing.executiveSuite",
    tag: "Best Value",
    wing: "batianWing",
    maxGuests: 3,
    bedType: "King Bed",
    amenities: ["WiFi", "Breakfast", "Lounge Access", "Mini Bar"],
    view: "Mountain View",
    demand: "high",
  },
  {
    id: "standard-single",
    slug: "standard-single",
    name: "Standard Single Room",
    price: 6000,
    currency: "KES",
    desc: "Comfortable and affordable room for solo travelers.",
    imageKey: "lenanaWing.standardSingle",
    wing: "lenanaWing",
    maxGuests: 1,
    bedType: "Single Bed",
    amenities: ["WiFi", "Breakfast", "Hot Shower"],
    view: "Garden View",
    demand: "medium",
  },
  {
    id: "family-room",
    slug: "family-room",
    name: "Family Room",
    price: 15000,
    currency: "KES",
    desc: "Spacious room designed for families and group stays.",
    imageKey: "lenanaWing.familyRoom",
    tag: "Family Choice",
    wing: "lenanaWing",
    maxGuests: 4,
    bedType: "Multiple Beds",
    amenities: ["WiFi", "Breakfast", "Extra Space", "Living Area"],
    view: "Garden View",
    demand: "medium",
  },
];

export default rooms;

/* --------------------------------------------------
   🔥 DOMAIN HELPERS
-------------------------------------------------- */

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug);
}

export function getRoomById(id: string): Room | undefined {
  return rooms.find((r) => r.id === id);
}

export function getHighDemandRooms(): Room[] {
  return rooms.filter((r) => r.demand === "high");
}

export function getRoomsByWing(wing: Room["wing"]): Room[] {
  return rooms.filter((r) => r.wing === wing);
}

export function formatRoomPrice(price: number): string {
  return `${HOTEL.pricing.currency} ${price.toLocaleString()}`;
}

/**
 * 🔥 NEW: demand-based sorting (REVENUE OPTIMIZATION)
 */
export function getSortedRooms(): Room[] {
  const weight = {
    high: 3,
    medium: 2,
    low: 1,
  };

  return [...rooms].sort(
    (a, b) => (weight[b.demand ?? "medium"] - weight[a.demand ?? "medium"])
  );
}
