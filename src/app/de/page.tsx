import { Metadata } from "next";
import { de } from "../i18n/dictionaries";
import PropertyPage from "../components/PropertyPage";

export const metadata: Metadata = {
  title: de.meta.title,
  description: de.meta.description,
  openGraph: {
    title: de.meta.title,
    description: de.meta.description,
    url: "https://getluxsold.com/de",
    siteName: "Bem rakpart 26",
    locale: "de_DE",
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

export default function GermanPage() {
  return <PropertyPage dictionary={de} locale="de" />;
}
