"use client";

import { useEffect, useRef, useState } from "react";
import { Locale } from "../i18n/types";

interface SocialProofBarProps {
  locale: Locale;
}

const texts: Record<Locale, { agents: string; inquiries: string; countries: string }> = {
  hu: { agents: "ügynök nézte meg", inquiries: "érdeklődés", countries: "országból nézték" },
  en: { agents: "agents viewed", inquiries: "inquiries", countries: "countries reached" },
  de: { agents: "Makler haben angesehen", inquiries: "Anfragen", countries: "Länder erreicht" },
  zh: { agents: "位经纪人已浏览", inquiries: "次咨询", countries: "个国家的访客" },
  he: { agents: "סוכנים צפו", inquiries: "פניות", countries: "מדינות" },
  vi: { agents: "đại lý đã xem", inquiries: "yêu cầu", countries: "quốc gia đã tiếp cận" },
  ru: { agents: "агентов просмотрели", inquiries: "запросов", countries: "стран охвачено" },
};

// Configurable stats - update these as real data comes in
const STATS = {
  agents: 47,
  inquiries: 12,
  countries: 9,
};

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return { count, ref };
}

export default function SocialProofBar({ locale }: SocialProofBarProps) {
  const t = texts[locale];
  const agentsCounter = useCountUp(STATS.agents);
  const inquiriesCounter = useCountUp(STATS.inquiries);
  const countriesCounter = useCountUp(STATS.countries);

  return (
    <div ref={agentsCounter.ref} className="bg-property-navy py-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <StatItem value={agentsCounter.count} label={t.agents} />
          <div className="hidden md:block w-px h-8 bg-white/20" />
          <StatItem value={inquiriesCounter.count} label={t.inquiries} />
          <div className="hidden md:block w-px h-8 bg-white/20" />
          <StatItem value={countriesCounter.count} label={t.countries} suffix="+" />
        </div>
      </div>
    </div>
  );
}

function StatItem({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-property-gold tabular-nums">
        {value}{suffix}
      </div>
      <div className="text-xs md:text-sm text-white/60 mt-1">{label}</div>
    </div>
  );
}
