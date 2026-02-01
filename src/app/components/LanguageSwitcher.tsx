import Link from "next/link";
import { Locale } from "../i18n/types";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

const languages: { locale: Locale; label: string; path: string }[] = [
  { locale: "hu", label: "HU", path: "/" },
  { locale: "en", label: "EN", path: "/en" },
  { locale: "de", label: "DE", path: "/de" },
];

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1">
      {languages.map(({ locale, label, path }, index) => (
        <span key={locale} className="flex items-center">
          {index > 0 && (
            <span className="text-white/30 mx-1">|</span>
          )}
          <Link
            href={path}
            className={`px-2 py-1 text-sm font-medium transition-colors rounded ${
              currentLocale === locale
                ? "text-property-gold"
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
