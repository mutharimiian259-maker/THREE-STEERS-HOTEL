import { HOTEL } from "@/lib/config";

/* =============================================================
   DOMAIN: HOTEL
   -------------------------------------------------------------
   Intent-based access layer over configuration
   ============================================================= */

/* =============================================================
   IMMUTABILITY HELPERS (SAFE SHALLOW FREEZE ONLY)
   ============================================================= */

function freeze<T>(value: T): Readonly<T> {
  return Object.freeze(value);
}

/* =============================================================
   CORE DOMAIN ACCESS
   ============================================================= */

export function getDomain(): string {
  return HOTEL.domain.primary;
}

/* =============================================================
   IDENTITY DOMAIN
   ============================================================= */

export function getIdentity() {
  return freeze({
    name: HOTEL.identity.name,
    brand: HOTEL.identity.brand,
  });
}

/* =============================================================
   SEO DOMAIN
   ============================================================= */

export function getSEO() {
  return freeze({
    title: HOTEL.seo.defaultTitle,
    description: HOTEL.seo.defaultDescription,
  });
}

/* =============================================================
   LOCATION DOMAIN
   ============================================================= */

export function getLocation() {
  return freeze({
    city: HOTEL.location.city,
    region: HOTEL.location.region,
    country: HOTEL.location.country,
    full: HOTEL.location.full,
    timezone: HOTEL.location.timezone,
  });
}

export function getCoordinates() {
  return freeze({
    lat: HOTEL.location.coordinates.lat,
    lng: HOTEL.location.coordinates.lng,
  });
}
