import "./../styles/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/global/Navbar";
import StickyCTA from "@/components/global/StickyCTA";
import Footer from "@/components/global/Footer";
import ExitIntentModal from "@/components/global/ExitIntentModal";
import Script from "next/script";
import { HOTEL } from "@/lib/config/hotel";

const siteUrl = HOTEL.domain.primary;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: HOTEL.seo.defaultTitle,
    template: `%s | ${HOTEL.identity.name}`,
  },

  description: HOTEL.seo.defaultDescription,

  keywords: HOTEL.seo.keywords,

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
  const gaId = (HOTEL as any)?.analytics?.gaId;

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
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

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
              priceRange: HOTEL.business?.priceRange || "N/A",
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
              image: `${siteUrl}/images/hotel.jpg`,
              description: HOTEL.seo.defaultDescription,
            }),
          }}
        />

      </body>
    </html>
  );
}
