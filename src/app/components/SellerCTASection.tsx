"use client";

import { useState } from "react";
import Link from "next/link";
import { Locale } from "../i18n/types";
import { trackServiceInquiry } from "../lib/analytics";
import { getStoredUtmParams } from "../lib/utm";

interface SellerDictionary {
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
}

const sellerDictionaries: Record<Locale, SellerDictionary> = {
  hu: {
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
  en: {
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
  de: {
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
  zh: {
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
  he: {
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
  vi: {
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
  ru: {
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
};

interface SellerCTASectionProps {
  locale: Locale;
  showCaseStudy?: boolean;
}

export default function SellerCTASection({ locale, showCaseStudy = true }: SellerCTASectionProps) {
  const dict = sellerDictionaries[locale];
  const langSuffix = locale === "hu" ? "" : `/${locale}`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    propertyAddress: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const utmParams = getStoredUtmParams();
      const response = await fetch("/api/service-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          language: locale,
          source: "seller-cta-section",
          ...(Object.keys(utmParams).length > 0 && { utm: utmParams }),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      trackServiceInquiry(locale);
      setIsSuccess(true);
      setFormData({ name: "", email: "", propertyAddress: "" });
    } catch {
      setError(dict.form.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="sellers" className="bg-property-bg-surface-alt text-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Value proposition */}
          <div>
            <div className="inline-flex items-center gap-2 bg-property-gold/20 text-property-gold text-sm font-medium px-3 py-1 rounded-full mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              {dict.spotsLeft}
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-[family-name:var(--font-property-display)]">
              {dict.title}
            </h2>
            <p className="text-lg text-property-text-muted mb-8">
              {dict.subtitle}
            </p>

            {/* Benefits */}
            <ul className="space-y-4 mb-8">
              {dict.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-property-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-property-text">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Case study link */}
            {showCaseStudy && (
              <div className="bg-property-bg-elevated/50 border border-property-border rounded-xl p-5">
                <p className="text-sm text-property-text-muted mb-2">{dict.caseStudy.label}</p>
                <Link
                  href={`/properties/bem-rakpart-26${langSuffix}`}
                  className="inline-flex items-center gap-2 text-property-gold hover:text-property-gold-light font-medium transition-colors"
                >
                  {dict.caseStudy.link}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          {/* Right: Lead capture form */}
          <div className="bg-property-bg-secondary rounded-2xl p-8 text-property-text border border-property-border">
            {isSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-green-400 font-medium text-lg mb-4">
                  {dict.form.successMessage}
                </p>

                {/* Post-submission viral CTA */}
                <div className="mt-4 pt-4 border-t border-property-border">
                  <p className="text-sm text-property-text-muted mb-3">
                    {locale === "hu" ? "Addig is nézze meg élő demo oldalunkat:" :
                     locale === "de" ? "Sehen Sie sich in der Zwischenzeit unsere Live-Demo an:" :
                     locale === "zh" ? "同时，请查看我们的在线演示：" :
                     locale === "he" ? "בינתיים, צפו בהדגמה החיה שלנו:" :
                     locale === "vi" ? "Trong khi chờ đợi, hãy xem bản demo trực tiếp:" :
                     locale === "ru" ? "А пока посмотрите наше живое демо:" :
                     "In the meantime, check out our live demo:"}
                  </p>
                  <Link
                    href={`/properties/bem-rakpart-26${langSuffix}`}
                    className="inline-flex items-center gap-2 text-property-gold hover:text-property-gold-light font-medium text-sm transition-colors"
                  >
                    {dict.caseStudy.link}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-6">{dict.cta}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-property-text-muted mb-1">
                      {dict.form.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={dict.form.namePlaceholder}
                      className="w-full px-4 py-3 border border-property-border rounded-lg bg-property-bg-elevated text-property-text focus:ring-2 focus:ring-property-gold/50 focus:border-property-gold outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-property-text-muted mb-1">
                      {dict.form.emailLabel} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={dict.form.emailPlaceholder}
                      className="w-full px-4 py-3 border border-property-border rounded-lg bg-property-bg-elevated text-property-text focus:ring-2 focus:ring-property-gold/50 focus:border-property-gold outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-property-text-muted mb-1">
                      {dict.form.propertyAddressLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.propertyAddress}
                      onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                      placeholder={dict.form.propertyAddressPlaceholder}
                      className="w-full px-4 py-3 border border-property-border rounded-lg bg-property-bg-elevated text-property-text focus:ring-2 focus:ring-property-gold/50 focus:border-property-gold outline-none transition-all"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-property-gold hover:bg-property-gold-dark text-property-bg-primary font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? dict.form.submitting : dict.form.submitButton}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
