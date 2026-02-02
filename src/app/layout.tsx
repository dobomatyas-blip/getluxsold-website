import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./styles/property.css";
import DevTools from "./components/DevTools";
import { OrganizationJsonLd } from "./components/JsonLd";

const playfair = Playfair_Display({
  variable: "--font-property-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-property-body",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getluxsold.com"),
  title: {
    template: "%s | GetLuxSold",
    default: "GetLuxSold - Premium Properties Budapest",
  },
  description:
    "Exclusive premium properties in Budapest. Find your dream home in the most prestigious locations.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#f59e0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className={`${playfair.variable} ${inter.variable} property-page`}>
        <OrganizationJsonLd />
        {children}
        <DevTools />
      </body>
    </html>
  );
}
