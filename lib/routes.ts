export type Route = {
  name: string;
  path: string;
  type: "navigation" | "anchor";
  uiHint: "navigation" | "engagement" | "action";
};

export const routes: Route[] = [
  { name: "Home", path: "/", type: "navigation", uiHint: "navigation" },
  { name: "Rooms", path: "/rooms", type: "navigation", uiHint: "action" },
  { name: "Dining", path: "#dining", type: "anchor", uiHint: "engagement" },
  { name: "Conference", path: "#conference", type: "anchor", uiHint: "action" },
  { name: "Experiences", path: "#experiences", type: "anchor", uiHint: "engagement" },
  { name: "Book Stay", path: "#booking", type: "anchor", uiHint: "action" },
];
