"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "../i18n/types";
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

      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setError(dict.contact.errorMessage);
    } finally {
      setIsSubmitting(false);
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
