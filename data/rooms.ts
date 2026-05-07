import { HOTEL } from "@/lib/config";

/* ---------------------------------------
   TYPES
--------------------------------------- */

export type RoomWing =
  | "batianWing"
  | "lenanaWing";

export type RoomDemand =
  | "high"
  | "medium"
  | "low";

export type ImageKey =
  | "batianWing.deluxeTwin"
  | "batianWing.executiveSuite"
  | "lenanaWing.standardSingle"
  | "lenanaWing.familyRoom";

export type Room = Readonly<{
  id: string;

  slug: string;

  name: string;

  price: number;

  desc: string;

  imageKey: ImageKey;

  wing: RoomWing;

  tag?: string;

  maxGuests?: number;

  bedType?: string;

  amenities?: readonly string[];

  view?: string;

  demand?: RoomDemand;
}>;

/* ---------------------------------------
   ROOM REGISTRY
--------------------------------------- */

export const rooms: readonly Room[] = [
  {
    id: "deluxe",

    slug: "deluxe-room",

    name: "Deluxe Room",

    price: 8500,

    desc:
      "Luxury comfort with modern amenities in a calm setting.",

    imageKey: "batianWing.deluxeTwin",

    tag: "Most Booked",

    wing: "batianWing",

    maxGuests: 2,

    bedType: "Queen Bed",

    amenities: [
      "WiFi",
      "Breakfast",
      "Room Service",
      "Hot Shower",
    ],

    view: "City View",

    demand: "high",
  },

  {
    id: "executive",

    slug: "executive-suite",

    name: "Executive Suite",

    price: 12000,

    desc:
      "Premium suite offering Mt Kenya views and executive comfort.",

    imageKey: "batianWing.executiveSuite",

    tag: "Best Value",

    wing: "batianWing",

    maxGuests: 3,

    bedType: "King Bed",

    amenities: [
      "WiFi",
      "Breakfast",
      "Lounge Access",
      "Mini Bar",
    ],

    view: "Mountain View",

    demand: "high",
  },
] as const;

/* ---------------------------------------
   DOMAIN QUERIES
--------------------------------------- */

export function getRoomBySlug(
  slug: string
): Room | null {
  return (
    rooms.find((room) => room.slug === slug) ??
    null
  );
}

export function getRoomById(
  id: string
): Room | null {
  return (
    rooms.find((room) => room.id === id) ??
    null
  );
}

export function getRoomsByWing(
  wing: RoomWing
): Room[] {
  return rooms.filter(
    (room) => room.wing === wing
  );
}

export function getHighDemandRooms(): Room[] {
  return rooms.filter(
    (room) => room.demand === "high"
  );
}

/* ---------------------------------------
   REVENUE PRIORITY SORTING
--------------------------------------- */

const DEMAND_WEIGHT: Record<
  RoomDemand,
  number
> = {
  high: 3,
  medium: 2,
  low: 1,
};

export function getSortedRooms(): Room[] {
  return [...rooms].sort((a, b) => {
    return (
      DEMAND_WEIGHT[b.demand ?? "medium"] -
      DEMAND_WEIGHT[a.demand ?? "medium"]
    );
  });
}

/* ---------------------------------------
   PRESENTATION HELPERS
--------------------------------------- */

export function formatRoomPrice(
  price: number
): string {
  return `${HOTEL.pricing.currency} ${price.toLocaleString()}`;
}
