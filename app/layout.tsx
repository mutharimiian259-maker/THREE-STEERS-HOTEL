"use client";

import "@/styles/globals.css";
import Navbar from "@/components/global/Navbar";
import StickyCTA from "@/components/global/StickyCTA";
import Footer from "@/components/global/Footer";
import ExitIntentModal from "@/components/global/ExitIntentModal";
import Script from "next/script";

import { HOTEL } from "@/lib/config";
import { useEffect } from "react";
import { initAnalytics } from "@/lib/adapters/bootstrap";

/* ---------------------------------------
   SAFE URL
--------------------------------------- */

function getSafeUrl(): string {
  try {
    return new URL(HOTEL.domain.primary).origin;
  } catch {
    return "http://localhost:3000";
  }
}

const siteUrl = getSafeUrl();

/* ---------------------------------------
   ROOT LAYOUT
--------------------------------------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  const safeGaId =
    typeof gaId === "string" && /^[A-Z0-9-]+$/.test(gaId.trim())
      ? gaId.trim()
      : null;

  /* ---------------------------------------
     CORE SYSTEM BOOTSTRAP (CRITICAL FIX)
  --------------------------------------- */

  useEffect(() => {
    initAnalytics(); // ✅ THIS WAS MISSING
  }, []);

  return (
    <html lang="en" dir="ltr">
      <body className="bg-black text-white antialiased">

        <Navbar />

        <main className="min-h-screen">{children}</main>

        <StickyCTA />

        <ExitIntentModal />

        <Footer />

        {/* GA */}
        {safeGaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${safeGaId}`}
              strategy="afterInteractive"
            />

            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];

                function gtag(){
                  window.dataLayer.push(arguments);
                }

                window.gtag = window.gtag || gtag;

                gtag('js', new Date());

                gtag('config', '${safeGaId}', {
                  send_page_view: false
                });
              `}
            </Script>
          </>
        )}

        {/* STRUCTURED DATA */}
        <Script
          id="schema-hotel"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              name: HOTEL.identity.name,
              url: siteUrl,

              telephone:
                HOTEL.contact.phones.find(p => p.label === "primary")
                  ?.number ?? "",

              priceRange: HOTEL.pricing.range.display ?? "",

              address: {
                "@type": "PostalAddress",
                addressLocality: HOTEL.location.city,
                addressRegion: HOTEL.location.region,
                addressCountry: HOTEL.location.country,
              },

              geo: {
                "@type": "GeoCoordinates",
                latitude: HOTEL.location.coordinates.lat,
                longitude: HOTEL.location.coordinates.lng,
              },

              image: `${siteUrl}/images/hotel/exterior-hero.jpg`,
              description: HOTEL.seo.defaultDescription,
            }),
          }}
        />
      </body>
    </html>
  );
}
