import type { Metadata, Viewport } from "next";
import Footer, { BackToTopFloat } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "ÉLORE — Visual Stories · Photographer Portfolio",
  description:
    "ÉLORE — Visual stories by Elena Lore. Wedding, portrait, editorial and landscape photography. The art of seeing differently.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='15' fill='%236c151e'/%3E%3Ccircle cx='16' cy='16' r='6.5' fill='%23fffce7'/%3E%3Cpath d='M16 1.5 L20 12 M30.5 16 L20 20 M16 30.5 L12 20 M1.5 16 L12 12' stroke='%23fffce7' stroke-width='2.4'/%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = { themeColor: "#6c151e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="grain relative min-h-screen">
          <Navbar />
          {children}
          <Footer />
          <BackToTopFloat />
        </div>
      </body>
    </html>
  );
}
