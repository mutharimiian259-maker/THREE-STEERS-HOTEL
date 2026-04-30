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

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">{children}</main>

      <Footer />
      <StickyCTA />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white scroll-smooth">

        <ClientLayout>{children}</ClientLayout>

        {/* Google Analytics */}
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

        {/* Schema */}
        <Script
          id="schema-hotel"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              name: "Three Steers Hotel",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Meru",
                addressCountry: "KE",
              },
              telephone: "+254728588005",
              url: "https://yourdomain.com",
              image: "/images/hotel.jpg",
              description:
                "Luxury hotel in Meru Kenya offering accommodation, conferences, dining and Mt Kenya experiences.",
            }),
          }}
        />
      </body>
    </html>
  );
}
