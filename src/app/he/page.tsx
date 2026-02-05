import { Metadata } from "next";
import HomePage from "../components/HomePage";

export const metadata: Metadata = {
  title: "GetLuxSold - נדל\"ן יוקרה | בודפשט",
  description: "נכסי יוקרה בלעדיים בבודפשט. מצא את בית חלומותיך במיקומים היוקרתיים ביותר.",
  openGraph: {
    title: "GetLuxSold - נדל\"ן יוקרה בודפשט",
    description: "נכסי יוקרה בלעדיים בבודפשט.",
    url: "https://getluxsold.com/he",
    siteName: "GetLuxSold",
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetLuxSold - נדל\"ן יוקרה | בודפשט",
    description: "נכסי יוקרה בלעדיים בבודפשט. מצא את בית חלומותיך במיקומים היוקרתיים ביותר.",
  },
  alternates: {
    canonical: "https://getluxsold.com/he",
    languages: {
      hu: "https://getluxsold.com",
      en: "https://getluxsold.com/en",
      de: "https://getluxsold.com/de",
      zh: "https://getluxsold.com/zh",
      he: "https://getluxsold.com/he",
      vi: "https://getluxsold.com/vi",
      ru: "https://getluxsold.com/ru",
      "x-default": "https://getluxsold.com/en",
    },
  },
};

export default function HebrewHomePage() {
  return <HomePage locale="he" />;
}
