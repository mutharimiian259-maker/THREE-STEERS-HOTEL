export type Route = {
  name: string;
  path: string;
  type: "navigation" | "anchor";
};

export const routes: Route[] = [
  { name: "Home", path: "/", type: "navigation" },
  { name: "Rooms", path: "/rooms", type: "navigation" },
  { name: "Dining", path: "#dining", type: "anchor" },
  { name: "Conference", path: "#conference", type: "anchor" },
  { name: "Experiences", path: "#experiences", type: "anchor" },
  { name: "Book Stay", path: "#booking", type: "anchor" },
];
