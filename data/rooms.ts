export type Room = {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: "KES";
  desc: string;
  image: string;
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
    image: "/images/rooms/batian-wing/deluxe-room/hero.jpg",
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
    image: "/images/rooms/batian-wing/executive-suite/hero.jpg",
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
    image: "/images/rooms/lenana-wing/standard-single/hero.jpg",
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
    image: "/images/rooms/lenana-wing/family-room/hero.jpg",
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
