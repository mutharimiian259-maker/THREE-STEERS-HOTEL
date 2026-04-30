import "./../styles/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import StickyCTA from "@/components/global/StickyCTA";
import Footer from "@/components/global/Footer";
import ExitIntentModal from "@/components/global/ExitIntentModal";
import Script from "next/script";

const siteUrl = "https://www.threesteershotel.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Three Steers Hotel Meru | Book Direct & Save More",
    template: "%s | Three Steers Hotel Meru",
  },

  description:
    "Luxury hotel in Meru, Kenya offering accommodation, dining, conferences, and events near Mount Kenya. Book direct via WhatsApp or call for best rates.",

  keywords: [
    "hotel in Meru Kenya",
    "Three Steers Hotel",
    "luxury hotel Kenya",
    "conference hotel Meru",
    "book hotel direct Kenya",
  ],

  openGraph: {
    title: "Three Steers Hotel Meru",
    description:
      "Luxury stay in Meru with premium rooms, dining, and conference facilities.",
    url: siteUrl,
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

  alternates: {
    canonical: siteUrl,
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

        {/* NAVIGATION */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* CONVERSION LAYERS */}
        <StickyCTA />
        <ExitIntentModal />

        {/* TRUST / INFO */}
        <Footer />

        {/* GOOGLE ANALYTICS (REPLACE ID BEFORE PROD) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />

        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

        {/* HOTEL SCHEMA */}
        <Script
          id="schema-hotel"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              name: "Three Steers Hotel Meru",
              url: siteUrl,
              telephone: "+254728588005",
              priceRange: "KSh 5,000 - 40,000",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Meru",
                addressCountry: "KE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -0.046,
                longitude: 37.650,
              },
              image: `${siteUrl}/images/hotel.jpg`,
              description:
                "Luxury hotel in Meru Kenya offering accommodation, dining, conferences, and events.",
            }),
          }}
        />

      </body>
    </html>
  );
}
