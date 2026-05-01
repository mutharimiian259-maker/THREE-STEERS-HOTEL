export type Room = {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: "KES";
  desc: string;
  image: string;
  tag?: string;

  maxGuests?: number;
  bedType?: string;
  amenities?: string[];
  view?: string;
};

const rooms: Room[] = [
  {
    id: "deluxe",
    slug: "deluxe-room",
    name: "Deluxe Room",
    price: 8500,
    currency: "KES",
    desc: "Luxury comfort with modern amenities",
    image: "/images/room1.jpg",
    tag: "Most Booked",
    maxGuests: 2,
    bedType: "Queen Bed",
    amenities: ["WiFi", "Breakfast", "Room Service", "Hot Shower"],
    view: "City View",
  },
  {
    id: "executive",
    slug: "executive-suite",
    name: "Executive Suite",
    price: 12000,
    currency: "KES",
    desc: "Premium suite with Mt Kenya views",
    image: "/images/room2.jpg",
    tag: "Best Value",
    maxGuests: 3,
    bedType: "King Bed",
    amenities: ["WiFi", "Breakfast", "Lounge Access", "Mini Bar"],
    view: "Mountain View",
  },
];

export default rooms;
