import "./../styles/globals.css";
import Navbar from "@/components/Navbar";
import StickyCTA from "@/components/StickyCTA";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Three Steers Hotel Meru | Luxury Hotel in Kenya",
  description:
    "Book luxury accommodation in Meru Kenya. Three Steers Hotel offers rooms, dining, conferences, and Mt Kenya experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        {children}

        <Footer />

        <StickyCTA />

      </body>
    </html>
  );
}
