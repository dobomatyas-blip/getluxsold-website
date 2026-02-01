import { Metadata } from "next";
import { hu } from "./i18n/dictionaries";
import PropertyPage from "./components/PropertyPage";

export const metadata: Metadata = {
  title: hu.meta.title,
  description: hu.meta.description,
  openGraph: {
    title: hu.meta.title,
    description: hu.meta.description,
    url: "https://getluxsold.com",
    siteName: "Bem rakpart 26",
    locale: "hu_HU",
    type: "website",
  },
  alternates: {
    languages: {
      hu: "/",
      en: "/en",
      de: "/de",
    },
  },
};

export default function HomePage() {
  return <PropertyPage dictionary={hu} locale="hu" />;
}
