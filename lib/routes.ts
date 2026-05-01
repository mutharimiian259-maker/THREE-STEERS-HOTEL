export type Route = {
  name: string;
  path: string;
  type: "page" | "section";
};

export const routes: Route[] = [
  { name: "Home", path: "/", type: "page" },
  { name: "Rooms", path: "/rooms", type: "page" },
  { name: "Dining", path: "/#dining", type: "section" },
  { name: "Conference", path: "/#conference", type: "section" },
  { name: "Experiences", path: "/#experiences", type: "section" },
  { name: "Blog", path: "/blog", type: "page" },
  { name: "Contact", path: "/#contact", type: "section" },
];
