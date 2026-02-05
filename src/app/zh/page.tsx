import { Metadata } from "next";
import HomePage from "../components/HomePage";

export const metadata: Metadata = {
  title: "GetLuxSold - 布达佩斯尊贵物业",
  description: "布达佩斯独家高端房产。在最优越的地段找到您的梦想家园。",
  openGraph: {
    title: "GetLuxSold - 布达佩斯尊贵物业",
    description: "布达佩斯独家高端房产。",
    url: "https://getluxsold.com/zh",
    siteName: "GetLuxSold",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetLuxSold - 布达佩斯尊贵物业",
    description: "布达佩斯独家高端房产。在最优越的地段找到您的梦想家园。",
  },
  alternates: {
    canonical: "https://getluxsold.com/zh",
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

export default function ChineseHomePage() {
  return <HomePage locale="zh" />;
}
