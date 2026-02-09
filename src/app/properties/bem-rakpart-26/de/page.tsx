import { Metadata } from "next";
import { de } from "../../../i18n/dictionaries";
import PropertyPage from "../../../components/PropertyPage";
import { PropertyJsonLd, BreadcrumbJsonLd } from "../../../components/JsonLd";
import { bemRakpart26 } from "../../../data/properties/bem-rakpart-26";

export const metadata: Metadata = {
  title: de.meta.title,
  description: de.meta.description,
  openGraph: {
    title: de.meta.title,
    description: de.meta.description,
    url: "https://getluxsold.com/properties/bem-rakpart-26/de",
    siteName: "GetLuxSold",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: de.meta.title,
    description: de.meta.description,
  },
  alternates: {
    canonical: "https://getluxsold.com/properties/bem-rakpart-26/de",
    languages: {
      hu: "https://getluxsold.com/properties/bem-rakpart-26",
      en: "https://getluxsold.com/properties/bem-rakpart-26/en",
      de: "https://getluxsold.com/properties/bem-rakpart-26/de",
      zh: "https://getluxsold.com/properties/bem-rakpart-26/zh",
      he: "https://getluxsold.com/properties/bem-rakpart-26/he",
      vi: "https://getluxsold.com/properties/bem-rakpart-26/vi",
      ru: "https://getluxsold.com/properties/bem-rakpart-26/ru",
      "x-default": "https://getluxsold.com/properties/bem-rakpart-26/en",
    },
  },
};

export default function BemRakpartGermanPage() {
  return (
    <>
      <PropertyJsonLd
        name="Bem rakpart 26"
        description={de.meta.description}
        url="https://getluxsold.com/properties/bem-rakpart-26/de"
        streetAddress="Bem rakpart 26"
        addressLocality="Budapest"
        postalCode="1011"
        addressRegion="District I"
        latitude={47.5064}
        longitude={19.0395}
        floorSize={89}
        numberOfRooms={3}
        price={500000}
        priceCurrency="EUR"
        images={["/images/hero.jpg", "/images/panorama-360.jpg"]}
        amenities={[
          "360° Panorama View",
          "Parliament View",
          "Danube View",
          "Margaret Bridge View",
          "Balcony",
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "GetLuxSold", url: "https://getluxsold.com/de" },
          { name: "Bem rakpart 26", url: "https://getluxsold.com/properties/bem-rakpart-26/de" },
        ]}
      />
      <PropertyPage dictionary={de} locale="de" basePath="/properties/bem-rakpart-26" propertyData={bemRakpart26} />
    </>
  );
}
