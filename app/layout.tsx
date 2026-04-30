import "./../styles/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import StickyCTA from "@/components/StickyCTA";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Three Steers Hotel Meru | Best Hotel in Meru Kenya",
  description:
    "Luxury hotel in Meru Kenya offering rooms, dining, conferences, and Mt Kenya experiences. Book directly via WhatsApp or call for best rates.",

  metadataBase: new URL("https://yourdomain.com"),

  keywords: [
    "hotel in Meru Kenya",
    "accommodation in Meru",
    "best hotel near Mt Kenya",
    "conference venues in Meru",
    "affordable hotel Meru Kenya",
  ],

  openGraph: {
    title: "Three Steers Hotel Meru",
    description:
      "Luxury hotel in Meru offering accommodation, dining, conferences, and experiences near Mt Kenya.",
    url: "https://yourdomain.com",
    siteName: "Three Steers Hotel",
    type: "website",
    locale: "en_KE",
    images: [
      {
        url: "/images/hotel.jpg",
        width: 1200,
        height: 630,
        alt: "Three Steers Hotel Meru",
      },
    ],
  },
};
