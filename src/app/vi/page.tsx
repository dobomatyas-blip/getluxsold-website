import { Metadata } from "next";
import HomePage from "../components/HomePage";

export const metadata: Metadata = {
  title: "GetLuxSold - Bất Động Sản Cao Cấp | Budapest",
  description: "Bất động sản cao cấp độc quyền tại Budapest. Tìm ngôi nhà mơ ước của bạn tại những vị trí đắc địa nhất.",
  openGraph: {
    title: "GetLuxSold - Bất Động Sản Cao Cấp Budapest",
    description: "Bất động sản cao cấp độc quyền tại Budapest.",
    url: "https://getluxsold.com/vi",
    siteName: "GetLuxSold",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetLuxSold - Bất Động Sản Cao Cấp | Budapest",
    description: "Bất động sản cao cấp độc quyền tại Budapest. Tìm ngôi nhà mơ ước của bạn tại những vị trí đắc địa nhất.",
  },
  alternates: {
    canonical: "https://getluxsold.com/vi",
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

export default function VietnameseHomePage() {
  return <HomePage locale="vi" />;
}
