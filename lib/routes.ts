export type RouteKind =
  | "navigation"
  | "anchor";

export type Route = Readonly<{
  id: string;

  name: string;

  path: string;

  kind: RouteKind;
}>;

/* ---------------------------------------
   CANONICAL ROUTE REGISTRY
--------------------------------------- */

export const routes: readonly Route[] = [
  {
    id: "home",
    name: "Home",
    path: "/",
    kind: "navigation",
  },

  {
    id: "rooms",
    name: "Rooms",
    path: "/rooms",
    kind: "navigation",
  },

  {
    id: "dining",
    name: "Dining",
    path: "#dining",
    kind: "anchor",
  },

  {
    id: "conference",
    name: "Conference",
    path: "#conference",
    kind: "anchor",
  },

  {
    id: "experiences",
    name: "Experiences",
    path: "#experiences",
    kind: "anchor",
  },

  {
    id: "booking",
    name: "Book Stay",
    path: "#booking",
    kind: "anchor",
  },
] as const;
