"use client";

import { useState, useEffect } from "react";
import { Locale } from "../i18n/types";
import LanguageSwitcher from "./LanguageSwitcher";

interface FloatingHeaderProps {
  locale: Locale;
  basePath?: string;
}

export default function FloatingHeader({ locale, basePath }: FloatingHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-property-bg-primary/95 backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.3)] border-b border-property-border"
          : ""
      }`}
    >
      {/* Logo */}
      <a href={locale === "hu" ? "/" : `/${locale}`} className="flex items-center gap-1.5 group">
        <span
          className={`font-[family-name:var(--font-property-display)] text-lg md:text-xl font-semibold tracking-tight transition-colors duration-300 ${
            scrolled ? "text-property-gold" : "text-white"
          }`}
        >
          GetLuxSold
        </span>
      </a>

      {/* Language Switcher */}
      <LanguageSwitcher currentLocale={locale} isScrolled={scrolled} basePath={basePath} />
    </header>
  );
}
