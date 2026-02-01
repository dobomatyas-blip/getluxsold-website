import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./styles/property.css";
import DevTools from "./components/DevTools";

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
  title: "Bem rakpart 26 | Budapest",
  description: "Exkluziv dunaparti ingatlan a Budai Varban. 89m2, 360 fokos panorama: Parlament, Duna, Margit hid.",
  openGraph: {
    title: "Bem rakpart 26 | Budapest",
    description: "Exkluziv dunaparti ingatlan a Budai Varban",
    url: "https://getluxsold.com",
    siteName: "Bem rakpart 26",
    locale: "hu_HU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className={`${playfair.variable} ${inter.variable} property-page`}>
        {children}
        <DevTools />
      </body>
    </html>
  );
}
