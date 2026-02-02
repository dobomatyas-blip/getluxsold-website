import Link from "next/link";
import { Locale } from "../i18n/types";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  isScrolled?: boolean;
  basePath?: string;
}

const languages: { locale: Locale; label: string }[] = [
  { locale: "hu", label: "HU" },
  { locale: "en", label: "EN" },
  { locale: "de", label: "DE" },
];

function getLocalePath(locale: Locale, basePath?: string): string {
  if (basePath) {
    return locale === "hu" ? basePath : `${basePath}/${locale}`;
  }
  return locale === "hu" ? "/" : `/${locale}`;
}

export default function LanguageSwitcher({ currentLocale, isScrolled = false, basePath }: LanguageSwitcherProps) {
  return (
    <div
      className={`flex items-center gap-1 backdrop-blur-sm rounded-full px-2 py-1 transition-colors duration-300 ${
        isScrolled ? "bg-property-navy/5" : "bg-white/10"
      }`}
    >
      {languages.map(({ locale, label }, index) => (
        <span key={locale} className="flex items-center">
          {index > 0 && (
            <span
              className={`mx-1 transition-colors duration-300 ${
                isScrolled ? "text-property-navy/30" : "text-white/30"
              }`}
            >
              |
            </span>
          )}
          <Link
            href={getLocalePath(locale, basePath)}
            className={`px-2 py-1 text-sm font-medium transition-colors rounded ${
              currentLocale === locale
                ? "text-property-gold"
                : isScrolled
                ? "text-property-navy/70 hover:text-property-navy"
                : "text-white/70 hover:text-white"
            }`}
          >
            {label}
          </Link>
        </span>
      ))}
    </div>
  );
}
