import { Metadata } from "next";
import HomePage from "../components/HomePage";

export const metadata: Metadata = {
  title: "GetLuxSold - Premium-Immobilien | Budapest",
  description:
    "Exklusive Premium-Immobilien in Budapest. Finden Sie Ihr Traumhaus an den besten Standorten.",
  openGraph: {
    title: "GetLuxSold - Premium-Immobilien",
    description: "Exklusive Premium-Immobilien in Budapest.",
    url: "https://getluxsold.com/de",
    siteName: "GetLuxSold",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetLuxSold - Premium-Immobilien | Budapest",
    description:
      "Exklusive Premium-Immobilien in Budapest. Finden Sie Ihr Traumhaus an den besten Standorten.",
  },
  alternates: {
    canonical: "https://getluxsold.com/de",
    languages: {
      hu: "https://getluxsold.com",
      en: "https://getluxsold.com/en",
      de: "https://getluxsold.com/de",
      "x-default": "https://getluxsold.com/en",
    },
  },
};

export default function GermanHomePage() {
  return <HomePage locale="de" />;
}
