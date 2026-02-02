import { Metadata } from "next";
import HomePage from "./components/HomePage";

export const metadata: Metadata = {
  title: "GetLuxSold - Prémium Ingatlanok | Budapest",
  description:
    "Exkluzív prémium ingatlanok Budapesten. Találja meg álmai otthonát a legkiválóbb helyszíneken.",
  openGraph: {
    title: "GetLuxSold - Prémium Ingatlanok",
    description: "Exkluzív prémium ingatlanok Budapesten.",
    url: "https://getluxsold.com",
    siteName: "GetLuxSold",
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetLuxSold - Prémium Ingatlanok | Budapest",
    description:
      "Exkluzív prémium ingatlanok Budapesten. Találja meg álmai otthonát a legkiválóbb helyszíneken.",
  },
  alternates: {
    canonical: "https://getluxsold.com",
    languages: {
      hu: "https://getluxsold.com",
      en: "https://getluxsold.com/en",
      de: "https://getluxsold.com/de",
      "x-default": "https://getluxsold.com/en",
    },
  },
};

export default function RootPage() {
  return <HomePage locale="hu" />;
}
