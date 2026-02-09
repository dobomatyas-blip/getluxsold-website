import Image from "next/image";
import Link from "next/link";
import { Locale } from "../i18n/types";
import HtmlLangSetter from "./HtmlLangSetter";
import DirectionWrapper from "./DirectionWrapper";
import FloatingHeader from "./FloatingHeader";
import SellerCTASection from "./SellerCTASection";
import SocialProofBar from "./SocialProofBar";

function TextLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-[family-name:var(--font-property-display)] text-lg md:text-xl font-semibold tracking-tight ${className}`}
    >
      GetLuxSold
    </span>
  );
}

interface HomePageDictionary {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  portfolio: {
    title: string;
    subtitle: string;
    viewShowcase: string;
    badge: string;
  };
  footer: {
    copyright: string;
  };
}

const homeDictionaries: Record<Locale, HomePageDictionary> = {
  hu: {
    hero: {
      badge: "Boutique Digitális Ingatlanszolgáltatás",
      headline: "Az Ön Ingatlana. Bemutatva a Világnak.",
      subheadline:
        "Személyre szabott, többnyelvű bemutató oldalak, amelyek luxus ingatlanait lenyűgöző történetekké alakítják — 7 nyelven, a világ minden tájáról érkező vevőknek.",
      ctaPrimary: "Munkáink Megtekintése",
      ctaSecondary: "Konzultáció Kérése",
    },
    services: {
      title: "Amit Készítünk",
      subtitle:
        "Minden ingatlan megérdemel egy olyan bemutatást, amely maga is kivételes",
      items: [
        {
          title: "Egyedi Ingatlan Bemutatók",
          description:
            "Személyre szabott digitális prezentációk 7 nyelven, amelyek lenyűgözik a nemzetközi vásárlókat magával ragadó galériákkal, interaktív alaprajzokkal és befektetési elemzésekkel.",
        },
        {
          title: "Érdeklődő-szerző Rendszer",
          description:
            "Beépített kapcsolatfelvételi űrlapok, analitika és konverziókövetés, amelyek közvetlenül Önhöz juttatják a minősített érdeklődőket — közvetítők és jutalékok nélkül.",
        },
        {
          title: "Globális Elérés, Személyes Gondoskodás",
          description:
            "Budapesttől Pekingig — ingatlanát egy boutique ügynökség gondosságával és egy globális platform elérhetőségével mutatjuk be.",
        },
      ],
    },
    portfolio: {
      title: "Munkáink",
      subtitle:
        "Nézze meg, hogyan alakítjuk át az ingatlanokat lenyűgöző digitális élményekké",
      viewShowcase: "Élő Bemutató Megtekintése",
      badge: "Kiemelt Projekt",
    },
    footer: {
      copyright: "Minden jog fenntartva.",
    },
  },
  en: {
    hero: {
      badge: "Boutique Digital Real Estate",
      headline: "Your Property. Presented to the World.",
      subheadline:
        "Bespoke multilingual showcases that turn luxury properties into compelling stories — reaching qualified buyers in 7 languages.",
      ctaPrimary: "Explore Our Work",
      ctaSecondary: "Request Consultation",
    },
    services: {
      title: "What We Create",
      subtitle:
        "Every property deserves a presentation as exceptional as the property itself",
      items: [
        {
          title: "Bespoke Property Showcases",
          description:
            "Tailor-made digital presentations in 7 languages that captivate international buyers with immersive galleries, interactive floor plans, and investment analytics.",
        },
        {
          title: "Lead Generation Engine",
          description:
            "Built-in inquiry forms, analytics, and conversion tracking that bring qualified leads directly to you — no middlemen, no commissions.",
        },
        {
          title: "Global Reach, Personal Touch",
          description:
            "From Budapest to Beijing — your property presented with the care of a boutique agency and the reach of a global platform.",
        },
      ],
    },
    portfolio: {
      title: "Our Work",
      subtitle:
        "See how we transform properties into compelling digital experiences",
      viewShowcase: "View Live Showcase",
      badge: "Featured Project",
    },
    footer: {
      copyright: "All rights reserved.",
    },
  },
  de: {
    hero: {
      badge: "Boutique Digitale Immobilien",
      headline: "Ihre Immobilie. Der Welt Präsentiert.",
      subheadline:
        "Maßgeschneiderte mehrsprachige Präsentationen, die Luxusimmobilien in fesselnde Geschichten verwandeln — qualifizierte Käufer in 7 Sprachen erreichen.",
      ctaPrimary: "Unsere Arbeit Entdecken",
      ctaSecondary: "Beratung Anfordern",
    },
    services: {
      title: "Was Wir Erschaffen",
      subtitle:
        "Jede Immobilie verdient eine Präsentation, die so außergewöhnlich ist wie die Immobilie selbst",
      items: [
        {
          title: "Maßgeschneiderte Immobilienpräsentationen",
          description:
            "Individuelle digitale Präsentationen in 7 Sprachen, die internationale Käufer mit immersiven Galerien, interaktiven Grundrissen und Investitionsanalysen begeistern.",
        },
        {
          title: "Lead-Generierungs-System",
          description:
            "Integrierte Kontaktformulare, Analysen und Conversion-Tracking, die qualifizierte Leads direkt zu Ihnen bringen — ohne Vermittler, ohne Provisionen.",
        },
        {
          title: "Globale Reichweite, Persönlicher Service",
          description:
            "Von Budapest bis Peking — Ihre Immobilie mit der Sorgfalt einer Boutique-Agentur und der Reichweite einer globalen Plattform präsentiert.",
        },
      ],
    },
    portfolio: {
      title: "Unsere Arbeit",
      subtitle:
        "Sehen Sie, wie wir Immobilien in fesselnde digitale Erlebnisse verwandeln",
      viewShowcase: "Live-Präsentation Ansehen",
      badge: "Ausgewähltes Projekt",
    },
    footer: {
      copyright: "Alle Rechte vorbehalten.",
    },
  },
  zh: {
    hero: {
      badge: "精品数字房地产服务",
      headline: "您的房产，展示给全世界",
      subheadline:
        "量身定制的多语言展示，将豪华房产转化为引人入胜的故事——以7种语言触达全球优质买家。",
      ctaPrimary: "浏览我们的作品",
      ctaSecondary: "申请咨询",
    },
    services: {
      title: "我们的服务",
      subtitle: "每一处房产都值得一个与其同样卓越的展示",
      items: [
        {
          title: "定制房产展示",
          description:
            "7种语言的定制数字展示，通过沉浸式画廊、交互式户型图和投资分析吸引国际买家。",
        },
        {
          title: "潜客获取引擎",
          description:
            "内置咨询表单、数据分析和转化追踪，将优质潜在客户直接带到您面前——无中间人，无佣金。",
        },
        {
          title: "全球覆盖，贴心服务",
          description:
            "从布达佩斯到北京——以精品机构的用心和全球平台的覆盖面展示您的房产。",
        },
      ],
    },
    portfolio: {
      title: "我们的作品",
      subtitle: "了解我们如何将房产转化为引人入胜的数字体验",
      viewShowcase: "查看在线展示",
      badge: "精选项目",
    },
    footer: {
      copyright: "保留所有权利。",
    },
  },
  he: {
    hero: {
      badge: "שירותי נדל\"ן דיגיטלי בוטיק",
      headline: "הנכס שלך. מוצג לעולם.",
      subheadline:
        "מצגות רב-לשוניות מותאמות אישית שהופכות נכסי יוקרה לסיפורים מרתקים — מגיעים לקונים איכותיים ב-7 שפות.",
      ctaPrimary: "צפו בעבודות שלנו",
      ctaSecondary: "בקשו ייעוץ",
    },
    services: {
      title: "מה אנחנו יוצרים",
      subtitle: "כל נכס ראוי למצגת יוצאת דופן כמו הנכס עצמו",
      items: [
        {
          title: "מצגות נכסים מותאמות אישית",
          description:
            "מצגות דיגיטליות מותאמות ב-7 שפות שמרתקות קונים בינלאומיים עם גלריות סוחפות, תוכניות קומה אינטראקטיביות וניתוחי השקעות.",
        },
        {
          title: "מנוע יצירת לידים",
          description:
            "טפסי פנייה מובנים, אנליטיקה ומעקב המרות שמביאים לידים איכותיים ישירות אליכם — ללא מתווכים, ללא עמלות.",
        },
        {
          title: "חשיפה עולמית, מגע אישי",
          description:
            "מבודפשט ועד בייג׳ינג — הנכס שלכם מוצג עם הקפדה של סוכנות בוטיק והחשיפה של פלטפורמה גלובלית.",
        },
      ],
    },
    portfolio: {
      title: "העבודות שלנו",
      subtitle: "ראו כיצד אנו הופכים נכסים לחוויות דיגיטליות מרתקות",
      viewShowcase: "צפו בהדגמה חיה",
      badge: "פרויקט מומלץ",
    },
    footer: {
      copyright: "כל הזכויות שמורות.",
    },
  },
  vi: {
    hero: {
      badge: "Dịch Vụ Bất Động Sản Số Cao Cấp",
      headline: "Bất Động Sản Của Bạn. Giới Thiệu Đến Thế Giới.",
      subheadline:
        "Trang giới thiệu đa ngôn ngữ được thiết kế riêng, biến bất động sản cao cấp thành những câu chuyện hấp dẫn — tiếp cận người mua chất lượng bằng 7 ngôn ngữ.",
      ctaPrimary: "Khám Phá Dự Án",
      ctaSecondary: "Yêu Cầu Tư Vấn",
    },
    services: {
      title: "Chúng Tôi Tạo Ra Gì",
      subtitle:
        "Mỗi bất động sản đều xứng đáng có một cách trình bày xuất sắc như chính nó",
      items: [
        {
          title: "Trình Bày Bất Động Sản Theo Yêu Cầu",
          description:
            "Trình bày kỹ thuật số được thiết kế riêng bằng 7 ngôn ngữ, thu hút người mua quốc tế với thư viện ảnh sống động, sơ đồ tầng tương tác và phân tích đầu tư.",
        },
        {
          title: "Hệ Thống Thu Hút Khách Hàng",
          description:
            "Biểu mẫu liên hệ tích hợp, phân tích dữ liệu và theo dõi chuyển đổi mang khách hàng tiềm năng chất lượng trực tiếp đến bạn — không trung gian, không hoa hồng.",
        },
        {
          title: "Phạm Vi Toàn Cầu, Dịch Vụ Cá Nhân",
          description:
            "Từ Budapest đến Bắc Kinh — bất động sản của bạn được giới thiệu với sự chăm sóc của một đại lý boutique và phạm vi tiếp cận của nền tảng toàn cầu.",
        },
      ],
    },
    portfolio: {
      title: "Dự Án Của Chúng Tôi",
      subtitle:
        "Xem cách chúng tôi biến bất động sản thành trải nghiệm số hấp dẫn",
      viewShowcase: "Xem Trực Tiếp",
      badge: "Dự Án Nổi Bật",
    },
    footer: {
      copyright: "Bảo lưu mọi quyền.",
    },
  },
  ru: {
    hero: {
      badge: "Бутик Цифровой Недвижимости",
      headline: "Ваша Недвижимость. Представлена Миру.",
      subheadline:
        "Индивидуальные многоязычные презентации, превращающие элитную недвижимость в захватывающие истории — привлекая квалифицированных покупателей на 7 языках.",
      ctaPrimary: "Наши Работы",
      ctaSecondary: "Запросить Консультацию",
    },
    services: {
      title: "Что Мы Создаём",
      subtitle:
        "Каждый объект заслуживает презентации, столь же исключительной, как и сама недвижимость",
      items: [
        {
          title: "Индивидуальные Презентации",
          description:
            "Персональные цифровые презентации на 7 языках, привлекающие международных покупателей иммерсивными галереями, интерактивными планировками и инвестиционной аналитикой.",
        },
        {
          title: "Система Генерации Лидов",
          description:
            "Встроенные формы обратной связи, аналитика и отслеживание конверсий, которые приводят квалифицированных клиентов напрямую к вам — без посредников, без комиссий.",
        },
        {
          title: "Глобальный Охват, Личный Подход",
          description:
            "От Будапешта до Пекина — ваша недвижимость представлена с заботой бутик-агентства и охватом глобальной платформы.",
        },
      ],
    },
    portfolio: {
      title: "Наши Работы",
      subtitle:
        "Посмотрите, как мы превращаем недвижимость в захватывающий цифровой опыт",
      viewShowcase: "Смотреть Презентацию",
      badge: "Избранный Проект",
    },
    footer: {
      copyright: "Все права защищены.",
    },
  },
};

interface HomePageProps {
  locale: Locale;
}

export default function HomePage({ locale }: HomePageProps) {
  const dict = homeDictionaries[locale];
  const langSuffix = locale === "hu" ? "" : `/${locale}`;

  return (
    <DirectionWrapper locale={locale}>
      <div className="min-h-screen bg-property-bg-surface">
        <HtmlLangSetter locale={locale} />
        <FloatingHeader locale={locale} />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <Image
            src="/images/hero.jpg"
            alt="GetLuxSold"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 property-hero-overlay" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <div className="property-animate-fade-up">
              <span className="inline-block px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-property-gold/90 text-property-navy rounded-sm mb-8">
                {dict.hero.badge}
              </span>
            </div>
            <h1 className="property-animate-fade-up property-delay-100 font-[family-name:var(--font-property-display)] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              {dict.hero.headline}
            </h1>
            <p className="property-animate-fade-up property-delay-200 text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              {dict.hero.subheadline}
            </p>
            <div className="property-animate-fade-up property-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#portfolio" className="btn-property-primary text-base px-8 py-4">
                {dict.hero.ctaPrimary}
              </a>
              <a href="#sellers" className="btn-property-secondary-white text-base px-8 py-4">
                {dict.hero.ctaSecondary}
              </a>
            </div>
          </div>
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 property-animate-fade-in property-delay-500">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="property-section property-section-alt">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="property-heading text-3xl md:text-4xl lg:text-5xl mb-4">
                {dict.services.title}
              </h2>
              <p className="text-property-text-muted text-lg max-w-2xl mx-auto">
                {dict.services.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dict.services.items.map((item, index) => (
                <div
                  key={index}
                  className="property-card p-8 property-animate-fade-up"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-property-gold/10 rounded-lg flex items-center justify-center mb-6">
                    {index === 0 && <ShowcaseIcon className="w-6 h-6 text-property-gold" />}
                    {index === 1 && <LeadGenIcon className="w-6 h-6 text-property-gold" />}
                    {index === 2 && <GlobalIcon className="w-6 h-6 text-property-gold" />}
                  </div>
                  <h3 className="property-subheading text-xl mb-4">
                    {item.title}
                  </h3>
                  <p className="text-property-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="property-section">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="property-heading text-3xl md:text-4xl lg:text-5xl mb-4">
                {dict.portfolio.title}
              </h2>
              <p className="text-property-text-muted text-lg max-w-2xl mx-auto">
                {dict.portfolio.subtitle}
              </p>
            </div>
            <Link
              href={`/properties/bem-rakpart-26${langSuffix}`}
              className="group block property-card overflow-hidden"
            >
              <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                <Image
                  src="/images/hero.jpg"
                  alt="Bem rakpart 26"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-property-gold text-property-navy rounded-sm">
                    {dict.portfolio.badge}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h3 className="font-[family-name:var(--font-property-display)] text-2xl md:text-3xl font-bold text-white mb-2">
                    Bem rakpart 26
                  </h3>
                  <p className="text-white/70 mb-4">
                    Budapest, I. kerület · 89 m²
                  </p>
                  <span className="inline-flex items-center gap-2 text-property-gold font-medium group-hover:text-property-gold-light transition-colors">
                    {dict.portfolio.viewShowcase}
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl-flip"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Social Proof */}
        <SocialProofBar locale={locale} />

        {/* Seller / Agent Section */}
        <SellerCTASection locale={locale} />

        {/* Footer */}
        <footer className="bg-property-bg-primary py-12 border-t border-property-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-4">
              <TextLogo className="text-property-gold" />
            </div>
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Endless Solutions Kft.{" "}
              {dict.footer.copyright}
            </p>
          </div>
        </footer>
      </div>
    </DirectionWrapper>
  );
}

function ShowcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  );
}

function LeadGenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function GlobalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}
