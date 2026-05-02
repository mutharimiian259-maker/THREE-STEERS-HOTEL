import "@/styles/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/global/Navbar";
import StickyCTA from "@/components/global/StickyCTA";
import Footer from "@/components/global/Footer";
import ExitIntentModal from "@/components/global/ExitIntentModal";
import Script from "next/script";
import { HOTEL } from "@/lib/config";

const siteUrl = HOTEL.domain.primary;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: HOTEL.seo.defaultTitle,
    template: `%s | ${HOTEL.identity.name}`,
  },

  description: HOTEL.seo.defaultDescription,

  keywords: [...HOTEL.seo.keywords],

  openGraph: {
    title: HOTEL.identity.name,
    description: HOTEL.seo.defaultDescription,
    url: siteUrl,
    siteName: HOTEL.identity.name,
    type: "website",
    locale: "en_KE",
    images: [
      {
        url: `${siteUrl}/images/hotel.jpg`,
        width: 1200,
        height: 630,
        alt: HOTEL.identity.name,
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">

        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>

        <StickyCTA />
        <ExitIntentModal />
        <Footer />

        {/* GOOGLE ANALYTICS */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />

            <Script id="ga-script" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;

                gtag('js', new Date());
                gtag('config', '${gaId}');
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
              telephone: HOTEL.contact.phone.primary,
              priceRange: HOTEL.pricing.range.display,
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
              image: `${siteUrl}/images/hotel.jpg`,
              description: HOTEL.seo.defaultDescription,
            }),
          }}
        />

      </body>
    </html>
  );
}
