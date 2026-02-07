import Image from "next/image";
import Link from "next/link";
import { Locale } from "../i18n/types";
import HtmlLangSetter from "./HtmlLangSetter";
import LanguageSwitcher from "./LanguageSwitcher";
import SellerCTASection from "./SellerCTASection";
import SocialProofBar from "./SocialProofBar";

// Text logo component matching the FloatingHeader style
function TextLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-[family-name:var(--font-property-display)] text-lg md:text-xl font-semibold tracking-tight ${className}`}
    >
      GetLuxSold
    </span>
  );
}

interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  size: string;
  price: string;
  image: string;
  badge?: string;
}

interface HomePageDictionary {
  title: string;
  subtitle: string;
  viewProperty: string;
  ctaBanner: {
    text: string;
    button: string;
  };
}

const homeDictionaries: Record<Locale, HomePageDictionary> = {
  hu: {
    title: "Listázott Ingatlanok",
    subtitle: "Prémium ingatlanok, exkluzív helyszíneken",
    viewProperty: "Megtekintés",
    ctaBanner: {
      text: "Luxus ingatlant értékesít? Személyre szabott szolgáltatás tulajdonosoknak.",
      button: "Kapcsolat",
    },
  },
  en: {
    title: "Listed Properties",
    subtitle: "Premium properties in exclusive locations",
    viewProperty: "View Property",
    ctaBanner: {
      text: "Selling a luxury property? Bespoke service for owners.",
      button: "Contact Us",
    },
  },
  de: {
    title: "Gelistete Immobilien",
    subtitle: "Premium-Immobilien an exklusiven Standorten",
    viewProperty: "Immobilie ansehen",
    ctaBanner: {
      text: "Verkaufen Sie eine Luxusimmobilie? Maßgeschneiderter Service für Eigentümer.",
      button: "Kontakt",
    },
  },
  zh: {
    title: "在售房产",
    subtitle: "优越地段的高端房产",
    viewProperty: "查看详情",
    ctaBanner: {
      text: "出售豪华房产？为业主提供定制化服务。",
      button: "联系我们",
    },
  },
  he: {
    title: "נכסים מוצעים",
    subtitle: "נכסי פרימיום במיקומים בלעדיים",
    viewProperty: "צפה בנכס",
    ctaBanner: {
      text: "מוכר נכס יוקרה? שירות מותאם אישית לבעלי נכסים.",
      button: "צור קשר",
    },
  },
  vi: {
    title: "Bất Động Sản Đang Bán",
    subtitle: "Bất động sản cao cấp tại các vị trí đắc địa",
    viewProperty: "Xem chi tiết",
    ctaBanner: {
      text: "Bán bất động sản cao cấp? Dịch vụ tùy chỉnh cho chủ sở hữu.",
      button: "Liên hệ",
    },
  },
  ru: {
    title: "Объекты недвижимости",
    subtitle: "Премиальная недвижимость в эксклюзивных локациях",
    viewProperty: "Подробнее",
    ctaBanner: {
      text: "Продаёте элитную недвижимость? Индивидуальный сервис для собственников.",
      button: "Связаться",
    },
  },
};

const properties: Property[] = [
  {
    id: "bem-rakpart-26",
    slug: "bem-rakpart-26",
    title: "Bem rakpart 26",
    location: "Budapest, I. kerület",
    size: "89 m²",
    price: "205 M Ft-tól",
    image: "/images/hero.jpg",
    badge: "Exkluzív",
  },
];

interface HomePageProps {
  locale: Locale;
}

export default function HomePage({ locale }: HomePageProps) {
  const dict = homeDictionaries[locale];
  const langSuffix = locale === "hu" ? "" : `/${locale}`;
  const homePath = locale === "hu" ? "/" : `/${locale}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <HtmlLangSetter locale={locale} />
      {/* CTA Banner */}
      <div className="bg-slate-900 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left">
          <p className="text-sm sm:text-base">{dict.ctaBanner.text}</p>
          <a
            href="#sellers"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors whitespace-nowrap"
          >
            {dict.ctaBanner.button}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href={homePath} className="flex items-center gap-3">
              <TextLogo className="text-slate-900" />
            </Link>
            <LanguageSwitcher currentLocale={locale} isScrolled />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {dict.title}
          </h1>
          <p className="text-xl text-slate-600">{dict.subtitle}</p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.slug}${langSuffix}`}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {property.badge && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {property.badge}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {property.title}
                </h2>
                <p className="text-slate-600 mb-4">{property.location}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>{property.size}</span>
                  </div>
                  <span className="text-amber-600 font-semibold">
                    {property.price}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-amber-600 font-medium group-hover:text-amber-700 flex items-center gap-2">
                    {dict.viewProperty}
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Social Proof */}
      <SocialProofBar locale={locale} />

      {/* Seller / Agent Section */}
      <SellerCTASection locale={locale} />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4">
            <TextLogo className="text-white" />
          </div>
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Endless Solutions Kft. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
