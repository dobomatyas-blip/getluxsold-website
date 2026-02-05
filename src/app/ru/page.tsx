import { Metadata } from "next";
import HomePage from "../components/HomePage";

export const metadata: Metadata = {
  title: "GetLuxSold - Элитная Недвижимость | Будапешт",
  description: "Эксклюзивная премиальная недвижимость в Будапеште. Найдите дом вашей мечты в самых престижных локациях.",
  openGraph: {
    title: "GetLuxSold - Элитная Недвижимость Будапешт",
    description: "Эксклюзивная премиальная недвижимость в Будапеште.",
    url: "https://getluxsold.com/ru",
    siteName: "GetLuxSold",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetLuxSold - Элитная Недвижимость | Будапешт",
    description: "Эксклюзивная премиальная недвижимость в Будапеште. Найдите дом вашей мечты в самых престижных локациях.",
  },
  alternates: {
    canonical: "https://getluxsold.com/ru",
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

export default function RussianHomePage() {
  return <HomePage locale="ru" />;
}
