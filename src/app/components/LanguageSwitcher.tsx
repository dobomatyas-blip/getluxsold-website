"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Locale } from "../i18n/types";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  isScrolled?: boolean;
  basePath?: string;
}

const languages: { locale: Locale; label: string; nativeName: string }[] = [
  { locale: "hu", label: "HU", nativeName: "Magyar" },
  { locale: "en", label: "EN", nativeName: "English" },
  { locale: "de", label: "DE", nativeName: "Deutsch" },
  { locale: "zh", label: "ZH", nativeName: "中文" },
  { locale: "he", label: "HE", nativeName: "עברית" },
  { locale: "vi", label: "VI", nativeName: "Tiếng Việt" },
  { locale: "ru", label: "RU", nativeName: "Русский" },
];

function getLocalePath(locale: Locale, basePath?: string): string {
  if (basePath) {
    return locale === "hu" ? basePath : `${basePath}/${locale}`;
  }
  return locale === "hu" ? "/" : `/${locale}`;
}

export default function LanguageSwitcher({ currentLocale, isScrolled = false, basePath }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.locale === currentLocale);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors backdrop-blur-sm ${
          isScrolled
            ? "bg-property-navy/5 text-property-navy hover:bg-property-navy/10"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
      >
        {currentLang?.label}
        <svg
          className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute end-0 top-full mt-2 bg-white rounded-lg shadow-lg py-1 min-w-[160px] z-50 border border-gray-100">
          {languages.map(({ locale, label, nativeName }) => (
            <Link
              key={locale}
              href={getLocalePath(locale, basePath)}
              className={`block px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${
                currentLocale === locale
                  ? "text-property-gold font-medium"
                  : "text-gray-700 hover:text-gray-900"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="font-medium">{label}</span>
              <span className="mx-1.5 text-gray-300">·</span>
              <span>{nativeName}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
