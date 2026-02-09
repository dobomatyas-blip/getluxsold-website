"use client";

import { useEffect, useState } from "react";
import { Locale } from "../i18n/types";

interface AgentBrandBannerProps {
  locale: Locale;
}

const presentedByTexts: Record<Locale, string> = {
  hu: "Bemutatja",
  en: "Presented by",
  de: "Präsentiert von",
  zh: "推荐人",
  he: "מוצג על ידי",
  vi: "Giới thiệu bởi",
  ru: "Представлено",
};

/**
 * Displays a co-branding banner when an agent referral link (?ref=) is used.
 * The agent name is decoded from the ref parameter (e.g., ?ref=john-doe → "John Doe").
 */
export default function AgentBrandBanner({ locale }: AgentBrandBannerProps) {
  const [agentName, setAgentName] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      // Decode slug back to name: "john-doe" → "John Doe"
      const name = ref
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setAgentName(name);
    }
  }, []);

  if (!agentName) return null;

  return (
    <div className="bg-property-bg-primary text-white py-2 px-4 text-center text-sm z-50 relative border-b border-property-border">
      <span className="text-property-text-muted">{presentedByTexts[locale]}</span>{" "}
      <span className="font-semibold text-property-gold">{agentName}</span>
    </div>
  );
}
