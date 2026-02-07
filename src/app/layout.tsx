import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Noto_Sans_SC } from "next/font/google";
import Script from "next/script";
import "./styles/property.css";
import DevTools from "./components/DevTools";
import { OrganizationJsonLd } from "./components/JsonLd";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const playfair = Playfair_Display({
  variable: "--font-property-display",
  subsets: ["latin", "latin-ext", "cyrillic", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-property-body",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "vietnamese"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-property-cjk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
    <html lang="hu" suppressHydrationWarning>
      {GA_MEASUREMENT_ID && (
        <head>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </head>
      )}
      <body className={`${playfair.variable} ${inter.variable} ${notoSansSC.variable} property-page`}>
        <OrganizationJsonLd />
        {children}
        <DevTools />
      </body>
    </html>
  );
}
