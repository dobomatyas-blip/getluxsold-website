import { Metadata } from "next";
import { en } from "../i18n/dictionaries";
import PropertyPage from "../components/PropertyPage";

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
  openGraph: {
    title: en.meta.title,
    description: en.meta.description,
    url: "https://getluxsold.com/en",
    siteName: "Bem rakpart 26",
    locale: "en_US",
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

export default function EnglishPage() {
  return <PropertyPage dictionary={en} locale="en" />;
}
