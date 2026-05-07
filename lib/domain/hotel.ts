import { HOTEL } from "@/lib/config";

/* ---------------------------------------
   CORE DOMAIN ACCESS
--------------------------------------- */

export const getDomain = () => HOTEL.domain.primary;

export const getIdentity = () => ({
  name: HOTEL.identity.name,
  brand: HOTEL.identity.brand,
});

/* ---------------------------------------
   SEO DOMAIN (intent-based, not raw)
--------------------------------------- */

export const getSEO = () => ({
  title: HOTEL.seo.defaultTitle,
  description: HOTEL.seo.defaultDescription,
});

/* ---------------------------------------
   LOCATION DOMAIN (intent-based)
--------------------------------------- */

export const getLocation = () => ({
  city: HOTEL.location.city,
  region: HOTEL.location.region,
  country: HOTEL.location.country,
  full: HOTEL.location.full,
});

export const getCoordinates = () => ({
  lat: HOTEL.location.coordinates.lat,
  lng: HOTEL.location.coordinates.lng,
});
