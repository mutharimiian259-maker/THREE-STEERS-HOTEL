import "./../styles/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/global/Navbar";
import StickyCTA from "@/components/global/StickyCTA";
import Footer from "@/components/global/Footer";
import ExitIntentModal from "@/components/global/ExitIntentModal";
import Script from "next/script";
import { HOTEL } from "@/lib/config/hotel";

export const metadata: Metadata = {
  metadataBase: new URL(HOTEL.domain.primary),

  title: {
    default: HOTEL.seo.defaultTitle,
    template: `%s | ${HOTEL.identity.name}`,
  },

  description: HOTEL.seo.defaultDescription,

  keywords: [
    "hotel in Meru Kenya",
    "Three Steers Hotel",
    "luxury hotel Kenya",
    "conference hotel Meru",
    "book hotel direct Kenya",
  ],

  openGraph: {
    title: HOTEL.identity.name,
    description: HOTEL.seo.defaultDescription,
    url: HOTEL.domain.primary,
    siteName: HOTEL.identity.name,
    type: "website",
    locale: "en_KE",
    images: [
      {
        url: "/images/hotel.jpg",
        width: 1200,
        height: 630,
        alt: HOTEL.identity.name,
      },
    ],
  },

  alternates: {
    canonical: HOTEL.domain.primary,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">

        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>

        <StickyCTA />
        <ExitIntentModal />
        <Footer />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${HOTEL.analytics.gaId}`}
          strategy="afterInteractive"
        />

        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${HOTEL.analytics.gaId}');
          `}
        </Script>

        <Script
          id="schema-hotel"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              name: HOTEL.identity.name,
              url: HOTEL.domain.primary,
              telephone: HOTEL.contact.phone.primary,
              priceRange: HOTEL.pricing.range,
              address: {
                "@type": "PostalAddress",
                addressLocality: HOTEL.location.city,
                addressCountry: HOTEL.location.country,
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: HOTEL.location.coordinates.lat,
                longitude: HOTEL.location.coordinates.lng,
              },
              image: `${HOTEL.domain.primary}/images/hotel.jpg`,
              description: HOTEL.seo.defaultDescription,
            }),
          }}
        />

      </body>
    </html>
  );
}
