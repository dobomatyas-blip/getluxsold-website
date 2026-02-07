"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "../i18n/types";
import { trackFormSubmission, trackServiceInquiry } from "../lib/analytics";
import HtmlLangSetter from "./HtmlLangSetter";
import LanguageSwitcher from "./LanguageSwitcher";

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
  sellerSection: {
    title: string;
    subtitle: string;
    benefits: string[];
    caseStudy: {
      label: string;
      link: string;
    };
    cta: string;
    spotsLeft: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      propertyAddressLabel: string;
      propertyAddressPlaceholder: string;
      submitButton: string;
      submitting: string;
      successMessage: string;
      errorMessage: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    submitting: string;
    successMessage: string;
    errorMessage: string;
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
    sellerSection: {
      title: "Adja el ingatlanát a világ nyelvén",
      subtitle: "Professzionális, 7 nyelvű landing page az Ön ingatlanához — ügynöki jutalék nélkül.",
      benefits: [
        "7 nyelven elérhető prémium bemutató oldal",
        "Beépített érdeklődő-gyűjtés és kapcsolatfelvételi űrlap",
        "Interaktív alaprajz, befektetési kalkulátor, galéria",
        "Mobilbarát, gyors, SEO-optimalizált",
      ],
      caseStudy: {
        label: "Nézze meg élőben a Bem rakpart 26 bemutatóját",
        link: "Élő demo megtekintése",
      },
      cta: "Kérjen ingyenes konzultációt",
      spotsLeft: "Még 7 ingyenes hely a 10-ből",
      form: {
        nameLabel: "Név",
        namePlaceholder: "Az Ön neve",
        emailLabel: "Email",
        emailPlaceholder: "email@pelda.hu",
        propertyAddressLabel: "Ingatlan címe",
        propertyAddressPlaceholder: "pl. Budapest, II. kerület...",
        submitButton: "Ingyenes konzultáció kérése",
        submitting: "Küldés...",
        successMessage: "Köszönjük! 48 órán belül felvesszük Önnel a kapcsolatot.",
        errorMessage: "Hiba történt. Kérjük, próbálja újra.",
      },
    },
    contact: {
      title: "Kapcsolatfelvétel",
      subtitle: "Érdeklődik szolgáltatásaink iránt? Írjon nekünk!",
      nameLabel: "Név",
      namePlaceholder: "Az Ön neve",
      emailLabel: "Email",
      emailPlaceholder: "email@pelda.hu",
      messageLabel: "Üzenet",
      messagePlaceholder: "Miben segíthetünk?",
      submitButton: "Üzenet küldése",
      submitting: "Küldés...",
      successMessage: "Köszönjük! Hamarosan felvesszük Önnel a kapcsolatot.",
      errorMessage: "Hiba történt. Kérjük, próbálja újra.",
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
    sellerSection: {
      title: "Sell your property in 7 languages",
      subtitle: "A professional, multilingual landing page for your property — without agent commissions.",
      benefits: [
        "Premium showcase page available in 7 languages",
        "Built-in lead capture and contact forms",
        "Interactive floor plans, investment calculator, gallery",
        "Mobile-friendly, fast-loading, SEO-optimized",
      ],
      caseStudy: {
        label: "See the Bem rakpart 26 showcase live",
        link: "View live demo",
      },
      cta: "Request a free consultation",
      spotsLeft: "7 of 10 free spots remaining",
      form: {
        nameLabel: "Name",
        namePlaceholder: "Your name",
        emailLabel: "Email",
        emailPlaceholder: "email@example.com",
        propertyAddressLabel: "Property address",
        propertyAddressPlaceholder: "e.g. Budapest, District II...",
        submitButton: "Request free consultation",
        submitting: "Sending...",
        successMessage: "Thank you! We'll contact you within 48 hours.",
        errorMessage: "An error occurred. Please try again.",
      },
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Interested in our services? Send us a message!",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "email@example.com",
      messageLabel: "Message",
      messagePlaceholder: "How can we help?",
      submitButton: "Send Message",
      submitting: "Sending...",
      successMessage: "Thank you! We'll be in touch soon.",
      errorMessage: "An error occurred. Please try again.",
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
    sellerSection: {
      title: "Verkaufen Sie Ihre Immobilie in 7 Sprachen",
      subtitle: "Eine professionelle, mehrsprachige Landingpage für Ihre Immobilie — ohne Maklerprovision.",
      benefits: [
        "Premium-Präsentationsseite in 7 Sprachen verfügbar",
        "Integrierte Lead-Erfassung und Kontaktformulare",
        "Interaktive Grundrisse, Investitionsrechner, Galerie",
        "Mobilfreundlich, schnell ladend, SEO-optimiert",
      ],
      caseStudy: {
        label: "Sehen Sie die Bem rakpart 26 Präsentation live",
        link: "Live-Demo ansehen",
      },
      cta: "Kostenlose Beratung anfordern",
      spotsLeft: "Noch 7 von 10 kostenlosen Plätzen verfügbar",
      form: {
        nameLabel: "Name",
        namePlaceholder: "Ihr Name",
        emailLabel: "E-Mail",
        emailPlaceholder: "email@beispiel.de",
        propertyAddressLabel: "Immobilienadresse",
        propertyAddressPlaceholder: "z.B. Budapest, Bezirk II...",
        submitButton: "Kostenlose Beratung anfordern",
        submitting: "Wird gesendet...",
        successMessage: "Vielen Dank! Wir kontaktieren Sie innerhalb von 48 Stunden.",
        errorMessage: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
      },
    },
    contact: {
      title: "Kontaktieren Sie uns",
      subtitle: "Interesse an unseren Dienstleistungen? Schreiben Sie uns!",
      nameLabel: "Name",
      namePlaceholder: "Ihr Name",
      emailLabel: "E-Mail",
      emailPlaceholder: "email@beispiel.de",
      messageLabel: "Nachricht",
      messagePlaceholder: "Wie können wir helfen?",
      submitButton: "Nachricht senden",
      submitting: "Wird gesendet...",
      successMessage: "Vielen Dank! Wir melden uns bald bei Ihnen.",
      errorMessage: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
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
    sellerSection: {
      title: "用7种语言出售您的房产",
      subtitle: "为您的房产打造专业的多语言展示页面——无需中介佣金。",
      benefits: [
        "支持7种语言的高端展示页面",
        "内置潜在客户获取和联系表单",
        "交互式户型图、投资计算器、图片库",
        "移动端友好、加载快速、SEO优化",
      ],
      caseStudy: {
        label: "查看Bem rakpart 26实时展示",
        link: "查看在线演示",
      },
      cta: "申请免费咨询",
      spotsLeft: "10个免费名额中还剩7个",
      form: {
        nameLabel: "姓名",
        namePlaceholder: "您的姓名",
        emailLabel: "电子邮箱",
        emailPlaceholder: "email@example.com",
        propertyAddressLabel: "房产地址",
        propertyAddressPlaceholder: "例如：布达佩斯，二区...",
        submitButton: "申请免费咨询",
        submitting: "发送中...",
        successMessage: "感谢您！我们将在48小时内与您联系。",
        errorMessage: "发生错误，请重试。",
      },
    },
    contact: {
      title: "联系我们",
      subtitle: "对我们的服务感兴趣？发送消息给我们！",
      nameLabel: "姓名",
      namePlaceholder: "您的姓名",
      emailLabel: "电子邮箱",
      emailPlaceholder: "email@example.com",
      messageLabel: "留言",
      messagePlaceholder: "我们能帮您什么？",
      submitButton: "发送消息",
      submitting: "发送中...",
      successMessage: "感谢您！我们会尽快与您联系。",
      errorMessage: "发生错误，请重试。",
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
    sellerSection: {
      title: "מכור את הנכס שלך ב-7 שפות",
      subtitle: "דף נחיתה מקצועי ורב-לשוני לנכס שלך — ללא עמלות תיווך.",
      benefits: [
        "דף תצוגה פרימיום זמין ב-7 שפות",
        "מערכת איסוף לידים וטפסי יצירת קשר מובנים",
        "תוכניות קומה אינטראקטיביות, מחשבון השקעות, גלריה",
        "ידידותי למובייל, טעינה מהירה, מותאם SEO",
      ],
      caseStudy: {
        label: "צפה בתצוגה חיה של Bem rakpart 26",
        link: "צפה בהדגמה חיה",
      },
      cta: "בקש ייעוץ חינם",
      spotsLeft: "נותרו 7 מתוך 10 מקומות חינמיים",
      form: {
        nameLabel: "שם",
        namePlaceholder: "השם שלך",
        emailLabel: "דוא\"ל",
        emailPlaceholder: "email@example.com",
        propertyAddressLabel: "כתובת הנכס",
        propertyAddressPlaceholder: "לדוגמה: בודפשט, מחוז II...",
        submitButton: "בקש ייעוץ חינם",
        submitting: "שולח...",
        successMessage: "תודה! ניצור קשר תוך 48 שעות.",
        errorMessage: "אירעה שגיאה. אנא נסה שוב.",
      },
    },
    contact: {
      title: "צור קשר",
      subtitle: "מעוניין בשירותים שלנו? שלח לנו הודעה!",
      nameLabel: "שם",
      namePlaceholder: "השם שלך",
      emailLabel: "דוא\"ל",
      emailPlaceholder: "email@example.com",
      messageLabel: "הודעה",
      messagePlaceholder: "כיצד נוכל לעזור?",
      submitButton: "שלח הודעה",
      submitting: "שולח...",
      successMessage: "תודה! ניצור קשר בקרוב.",
      errorMessage: "אירעה שגיאה. אנא נסה שוב.",
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
    sellerSection: {
      title: "Bán bất động sản bằng 7 ngôn ngữ",
      subtitle: "Trang giới thiệu chuyên nghiệp, đa ngôn ngữ cho bất động sản của bạn — không cần hoa hồng môi giới.",
      benefits: [
        "Trang trưng bày cao cấp có sẵn bằng 7 ngôn ngữ",
        "Thu thập khách hàng tiềm năng và biểu mẫu liên hệ tích hợp",
        "Sơ đồ tầng tương tác, công cụ tính đầu tư, thư viện ảnh",
        "Thân thiện di động, tải nhanh, tối ưu SEO",
      ],
      caseStudy: {
        label: "Xem trực tiếp trang giới thiệu Bem rakpart 26",
        link: "Xem bản demo trực tiếp",
      },
      cta: "Yêu cầu tư vấn miễn phí",
      spotsLeft: "Còn 7 trong 10 suất miễn phí",
      form: {
        nameLabel: "Họ tên",
        namePlaceholder: "Tên của bạn",
        emailLabel: "Email",
        emailPlaceholder: "email@example.com",
        propertyAddressLabel: "Địa chỉ bất động sản",
        propertyAddressPlaceholder: "VD: Budapest, Quận II...",
        submitButton: "Yêu cầu tư vấn miễn phí",
        submitting: "Đang gửi...",
        successMessage: "Cảm ơn bạn! Chúng tôi sẽ liên hệ trong vòng 48 giờ.",
        errorMessage: "Đã xảy ra lỗi. Vui lòng thử lại.",
      },
    },
    contact: {
      title: "Liên Hệ",
      subtitle: "Quan tâm đến dịch vụ của chúng tôi? Gửi tin nhắn cho chúng tôi!",
      nameLabel: "Họ tên",
      namePlaceholder: "Tên của bạn",
      emailLabel: "Email",
      emailPlaceholder: "email@example.com",
      messageLabel: "Tin nhắn",
      messagePlaceholder: "Chúng tôi có thể giúp gì?",
      submitButton: "Gửi tin nhắn",
      submitting: "Đang gửi...",
      successMessage: "Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.",
      errorMessage: "Đã xảy ra lỗi. Vui lòng thử lại.",
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
    sellerSection: {
      title: "Продайте недвижимость на 7 языках",
      subtitle: "Профессиональная многоязычная посадочная страница для вашей недвижимости — без агентских комиссий.",
      benefits: [
        "Премиальная страница-витрина на 7 языках",
        "Встроенный сбор заявок и контактные формы",
        "Интерактивные планировки, инвестиционный калькулятор, галерея",
        "Мобильная версия, быстрая загрузка, SEO-оптимизация",
      ],
      caseStudy: {
        label: "Посмотрите живую презентацию Bem rakpart 26",
        link: "Смотреть демо",
      },
      cta: "Запросить бесплатную консультацию",
      spotsLeft: "Осталось 7 из 10 бесплатных мест",
      form: {
        nameLabel: "Имя",
        namePlaceholder: "Ваше имя",
        emailLabel: "Электронная почта",
        emailPlaceholder: "email@example.com",
        propertyAddressLabel: "Адрес недвижимости",
        propertyAddressPlaceholder: "напр. Будапешт, район II...",
        submitButton: "Запросить бесплатную консультацию",
        submitting: "Отправка...",
        successMessage: "Спасибо! Мы свяжемся с вами в течение 48 часов.",
        errorMessage: "Произошла ошибка. Попробуйте ещё раз.",
      },
    },
    contact: {
      title: "Свяжитесь с нами",
      subtitle: "Интересуют наши услуги? Напишите нам!",
      nameLabel: "Имя",
      namePlaceholder: "Ваше имя",
      emailLabel: "Электронная почта",
      emailPlaceholder: "email@example.com",
      messageLabel: "Сообщение",
      messagePlaceholder: "Чем мы можем помочь?",
      submitButton: "Отправить сообщение",
      submitting: "Отправка...",
      successMessage: "Спасибо! Мы свяжемся с вами в ближайшее время.",
      errorMessage: "Произошла ошибка. Попробуйте ещё раз.",
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Seller section form state
  const [sellerFormData, setSellerFormData] = useState({
    name: "",
    email: "",
    propertyAddress: "",
  });
  const [isSellerSubmitting, setIsSellerSubmitting] = useState(false);
  const [isSellerSuccess, setIsSellerSuccess] = useState(false);
  const [sellerError, setSellerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          inquiryType: "general",
          language: locale,
          source: "homepage",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      trackFormSubmission("homepage_contact", locale);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setError(dict.contact.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSellerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSellerSubmitting(true);
    setSellerError(null);

    try {
      const response = await fetch("/api/service-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...sellerFormData,
          language: locale,
          source: "homepage-seller-section",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      trackServiceInquiry(locale);
      setIsSellerSuccess(true);
      setSellerFormData({ name: "", email: "", propertyAddress: "" });
    } catch {
      setSellerError(dict.sellerSection.form.errorMessage);
    } finally {
      setIsSellerSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <HtmlLangSetter locale={locale} />
      {/* CTA Banner */}
      <div className="bg-slate-900 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left">
          <p className="text-sm sm:text-base">{dict.ctaBanner.text}</p>
          <a
            href="#contact"
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

      {/* Seller / Agent Section */}
      <section id="sellers" className="bg-slate-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Value proposition */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 text-sm font-medium px-3 py-1 rounded-full mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                {dict.sellerSection.spotsLeft}
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-[family-name:var(--font-property-display)]">
                {dict.sellerSection.title}
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                {dict.sellerSection.subtitle}
              </p>

              {/* Benefits */}
              <ul className="space-y-4 mb-8">
                {dict.sellerSection.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-slate-200">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Case study link */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-sm text-slate-400 mb-2">{dict.sellerSection.caseStudy.label}</p>
                <Link
                  href={`/properties/bem-rakpart-26${langSuffix}`}
                  className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  {dict.sellerSection.caseStudy.link}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: Lead capture form */}
            <div className="bg-white rounded-2xl p-8 text-slate-900">
              {isSellerSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-green-800 font-medium text-lg">
                    {dict.sellerSection.form.successMessage}
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-6">{dict.sellerSection.cta}</h3>
                  <form onSubmit={handleSellerSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {dict.sellerSection.form.nameLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={sellerFormData.name}
                        onChange={(e) => setSellerFormData({ ...sellerFormData, name: e.target.value })}
                        placeholder={dict.sellerSection.form.namePlaceholder}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {dict.sellerSection.form.emailLabel} *
                      </label>
                      <input
                        type="email"
                        required
                        value={sellerFormData.email}
                        onChange={(e) => setSellerFormData({ ...sellerFormData, email: e.target.value })}
                        placeholder={dict.sellerSection.form.emailPlaceholder}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {dict.sellerSection.form.propertyAddressLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={sellerFormData.propertyAddress}
                        onChange={(e) => setSellerFormData({ ...sellerFormData, propertyAddress: e.target.value })}
                        placeholder={dict.sellerSection.form.propertyAddressPlaceholder}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                      />
                    </div>

                    {sellerError && (
                      <p className="text-red-600 text-sm">{sellerError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSellerSubmitting}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSellerSubmitting ? dict.sellerSection.form.submitting : dict.sellerSection.form.submitButton}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-slate-100 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {dict.contact.title}
            </h2>
            <p className="text-lg text-slate-600">{dict.contact.subtitle}</p>
          </div>

          {isSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-green-800 font-medium text-lg">
                {dict.contact.successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {dict.contact.nameLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={dict.contact.namePlaceholder}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {dict.contact.emailLabel} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={dict.contact.emailPlaceholder}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {dict.contact.messageLabel} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={dict.contact.messagePlaceholder}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all resize-none"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? dict.contact.submitting : dict.contact.submitButton}
              </button>
            </form>
          )}
        </div>
      </section>

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
