import { Metadata } from "next";
import HomePage from "../components/HomePage";

export const metadata: Metadata = {
  title: "GetLuxSold - Premium Properties | Budapest",
  description:
    "Exclusive premium properties in Budapest. Find your dream home in the finest locations.",
  openGraph: {
    title: "GetLuxSold - Premium Properties",
    description: "Exclusive premium properties in Budapest.",
    url: "https://getluxsold.com/en",
    siteName: "GetLuxSold",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetLuxSold - Premium Properties | Budapest",
    description:
      "Exclusive premium properties in Budapest. Find your dream home in the finest locations.",
  },
  alternates: {
    canonical: "https://getluxsold.com/en",
    languages: {
      hu: "https://getluxsold.com",
      en: "https://getluxsold.com/en",
      de: "https://getluxsold.com/de",
      "x-default": "https://getluxsold.com/en",
    },
  },
};

export default function EnglishHomePage() {
  return <HomePage locale="en" />;
}
