import "./../styles/globals.css";
import Navbar from "@/components/Navbar";
import StickyCTA from "@/components/StickyCTA";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Three Steers Hotel Meru | Best Hotel in Meru Kenya",
  description:
    "Looking for a hotel in Meru Kenya? Three Steers Hotel offers luxury rooms, conferences, dining, and Mt Kenya experiences. Book directly via WhatsApp or call for best rates.",
  
  keywords: [
    "hotel in Meru Kenya",
    "accommodation in Meru",
    "best hotel near Mt Kenya",
    "conference venues in Meru",
    "affordable hotel Meru Kenya"
  ],

  openGraph: {
    title: "Three Steers Hotel Meru",
    description:
      "Luxury hotel in Meru offering accommodation, dining, conferences, and experiences near Mt Kenya.",
    url: "https://yourdomain.com",
    siteName: "Three Steers Hotel",
    images: [
      {
        url: "/images/hotel.jpg",
        width: 1200,
        height: 630,
        alt: "Three Steers Hotel Meru",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white scroll-smooth">

        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />

        {/* MOBILE STICKY CTA */}
        <StickyCTA />

        {/* STRUCTURED DATA (SEO BOOST) */}
        <script
          type="application/ld+json"
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
