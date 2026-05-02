export type Route = {
  name: string;
  path: string;

  // structural routing
  type: "page" | "section";

  // NEW: conversion intelligence layer
  intent: "navigation" | "engagement" | "revenue" | "conversion";
};

export const routes: Route[] = [
  {
    name: "Home",
    path: "/",
    type: "page",
    intent: "navigation",
  },

  {
    name: "Rooms",
    path: "/rooms",
    type: "page",
    intent: "revenue",
  },

  {
    name: "Dining",
    path: "/#dining",
    type: "section",
    intent: "engagement",
  },

  {
    name: "Conference",
    path: "/#conference",
    type: "section",
    intent: "revenue",
  },

  {
    name: "Experiences",
    path: "/#experiences",
    type: "section",
    intent: "engagement",
  },

  // IMPORTANT: renamed mentally as booking, not contact
  {
    name: "Book Stay",
    path: "/#booking",
    type: "section",
    intent: "conversion",
  },
];
