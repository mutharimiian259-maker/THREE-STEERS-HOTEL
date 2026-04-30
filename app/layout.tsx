import "./../styles/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import StickyCTA from "@/components/StickyCTA";
import Footer from "@/components/Footer";
import Script from "next/script";

const siteUrl = "https://yourdomain.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Three Steers Hotel Meru | Best Hotel in Kenya",
    template: "%s | Three Steers Hotel Meru",
  },

  description:
    "Luxury hotel in Meru Kenya offering accommodation, dining, conferences, and experiences near Mt Kenya. Book directly via WhatsApp for best rates.",

  keywords: [
    "hotel in Meru Kenya",
    "accommodation Meru",
    "best hotel Meru",
    "conference venues Meru",
    "luxury hotel Kenya",
  ],

  openGraph: {
    title: "Three Steers Hotel Meru",
    description:
      "Luxury hotel in Meru offering accommodation, dining, conferences, and Mt Kenya experiences.",
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
      <body className="bg-black text-white scroll-smooth">

        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="min-h-screen">{children}</main>

        {/* CTA + FOOTER */}
        <StickyCTA />
        <Footer />

        {/* GOOGLE ANALYTICS */}
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

        {/* SCHEMA (SEO STRUCTURED DATA) */}
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
              address: {
                "@type": "PostalAddress",
                addressLocality: "Meru",
                addressCountry: "KE",
              },
              image: `${siteUrl}/images/hotel.jpg`,
              description:
                "Luxury hotel in Meru Kenya offering accommodation, dining, conferences and Mt Kenya experiences.",
            }),
          }}
        />

      </body>
    </html>
  );
}
