"use client";

import { useState } from "react";
import { Dictionary, Locale } from "../i18n/types";
import { trackServiceInquiry } from "../lib/analytics";
import { getStoredUtmParams } from "../lib/utm";
import CTAButton from "./CTAButton";

interface AgentCTASectionProps {
  dictionary: Dictionary;
  locale: Locale;
}

export default function AgentCTASection({ dictionary, locale }: AgentCTASectionProps) {
  const { agentCta } = dictionary;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    propertyAddress: "",
    propertyType: "",
    estimatedValue: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

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
          ...(Object.keys(utmParams).length > 0 && { utm: utmParams }),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      trackServiceInquiry(locale, formData.propertyType || undefined);

      // Generate referral link from agent name
      const agentSlug = formData.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://getluxsold.com";
      setReferralLink(`${baseUrl}/properties/bem-rakpart-26?ref=${agentSlug}`);

      setIsSuccess(true);
      setFormData({ name: "", email: "", propertyAddress: "", propertyType: "", estimatedValue: "", message: "" });
    } catch {
      setError(agentCta.serviceCard.form.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="agents" className="property-section-alt">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-property-gold/10 text-property-gold-dark text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <SparklesIcon className="w-4 h-4" />
            {agentCta.spotsCounter}
          </div>
          <h2 className="property-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            {agentCta.sectionTitle}
          </h2>
          <p className="text-property-text-muted text-lg max-w-2xl mx-auto">
            {agentCta.sectionSubtitle}
          </p>
        </div>

        {/* Two Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Client Card */}
          <div className="property-card p-8 flex flex-col border-2 border-property-gold/20">
            {/* Header with icon */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-property-gold rounded-full flex items-center justify-center">
                <ShieldCheckIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="property-subheading text-xl">
                {agentCta.clientCard.title}
              </h3>
            </div>

            {/* Important notice banner */}
            <div className="bg-property-gold/5 border-l-4 border-property-gold rounded-r-lg p-4 mb-6">
              <p className="text-property-text font-medium text-sm leading-relaxed">
                {agentCta.clientCard.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-property-gold mb-3 uppercase tracking-wide">
                {agentCta.clientCard.requirementsTitle}
              </p>
              <ul className="space-y-2">
                {agentCta.clientCard.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-property-text-muted">
                    <CheckCircleIcon className="w-5 h-5 text-property-gold flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Note */}
            <div className="bg-property-bg-primary rounded-lg p-4 mb-6">
              <p className="text-sm text-property-text-muted">
                {agentCta.clientCard.note}
              </p>
            </div>

            <div className="mt-auto">
              <CTAButton
                href="#contact"
                variant="secondary"
                className="w-full justify-center"
              >
                {agentCta.clientCard.cta}
              </CTAButton>
            </div>
          </div>

          {/* Service Card */}
          <div className="property-card p-8 flex flex-col border-2 border-property-gold/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-property-gold/20 rounded-full flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-property-gold-dark" />
              </div>
              <h3 className="property-subheading text-xl">
                {agentCta.serviceCard.title}
              </h3>
            </div>

            {/* FREE Offer Banner */}
            <div className="bg-gradient-to-r from-property-gold to-property-gold-dark text-white rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold tracking-wider opacity-90">
                  {agentCta.serviceCard.freeOffer.badge}
                </span>
              </div>
              <p className="font-semibold text-lg mb-1">
                {agentCta.serviceCard.freeOffer.headline}
              </p>
              <p className="text-sm opacity-90">
                {agentCta.serviceCard.freeOffer.description}
              </p>
            </div>

            <p className="text-property-text-muted leading-relaxed mb-4">
              {agentCta.serviceCard.description}
            </p>

            {/* Benefits */}
            <ul className="space-y-2 mb-6">
              {agentCta.serviceCard.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-property-text">
                  <CheckIcon className="w-4 h-4 text-property-gold-dark flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>

            {/* Form */}
            {isSuccess ? (
              <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckIcon className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-green-400 font-medium mb-4">
                  {agentCta.serviceCard.form.successMessage}
                </p>

                {/* Referral Link */}
                {referralLink && (
                  <div className="mt-4 pt-4 border-t border-green-800/30">
                    <p className="text-sm text-property-gold font-medium mb-2">
                      {locale === "hu" ? "Az Ön egyedi ajánlási linkje:" :
                       locale === "de" ? "Ihr persönlicher Empfehlungslink:" :
                       locale === "zh" ? "您的专属推荐链接：" :
                       locale === "he" ? "קישור ההפניה האישי שלך:" :
                       locale === "vi" ? "Liên kết giới thiệu cá nhân của bạn:" :
                       locale === "ru" ? "Ваша персональная реферальная ссылка:" :
                       "Your personal referral link:"}
                    </p>
                    <div className="flex items-center gap-2 bg-property-bg-elevated rounded-lg border border-green-800/30 p-2">
                      <input
                        type="text"
                        readOnly
                        value={referralLink}
                        className="flex-1 text-xs text-property-text bg-transparent outline-none truncate"
                      />
                      <button
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(referralLink);
                            setLinkCopied(true);
                            setTimeout(() => setLinkCopied(false), 2000);
                          } catch { /* fallback */ }
                        }}
                        className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-md bg-property-gold text-white hover:bg-property-gold-dark transition-colors"
                      >
                        {linkCopied
                          ? (locale === "hu" ? "Másolva!" : locale === "de" ? "Kopiert!" : locale === "zh" ? "已复制!" : locale === "he" ? "הועתק!" : locale === "vi" ? "Đã sao chép!" : locale === "ru" ? "Скопировано!" : "Copied!")
                          : (locale === "hu" ? "Másolás" : locale === "de" ? "Kopieren" : locale === "zh" ? "复制" : locale === "he" ? "העתק" : locale === "vi" ? "Sao chép" : locale === "ru" ? "Копировать" : "Copy")}
                      </button>
                    </div>
                    <p className="text-xs text-property-text-muted mt-2">
                      {locale === "hu" ? "Ossza meg ezt a linket ügyfeleivel — minden érdeklődés Önhöz lesz rendelve." :
                       locale === "de" ? "Teilen Sie diesen Link mit Ihren Kunden — alle Anfragen werden Ihnen zugeordnet." :
                       locale === "zh" ? "与客户分享此链接——所有询问都将归属于您。" :
                       locale === "he" ? "שתפו קישור זה עם לקוחותיכם — כל הפניות ישויכו אליכם." :
                       locale === "vi" ? "Chia sẻ liên kết này với khách hàng — mọi yêu cầu sẽ được gán cho bạn." :
                       locale === "ru" ? "Поделитесь этой ссылкой с клиентами — все запросы будут привязаны к вам." :
                       "Share this link with your clients — all inquiries will be attributed to you."}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mt-auto">
                <div>
                  <label className="block text-sm font-medium text-property-text mb-1">
                    {agentCta.serviceCard.form.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-property-border rounded-lg bg-property-bg-elevated text-property-text focus:ring-2 focus:ring-property-gold/50 focus:border-property-gold outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-property-text mb-1">
                    {agentCta.serviceCard.form.emailLabel} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-property-border rounded-lg bg-property-bg-elevated text-property-text focus:ring-2 focus:ring-property-gold/50 focus:border-property-gold outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-property-text mb-1">
                    {agentCta.serviceCard.form.propertyAddressLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.propertyAddress}
                    onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                    className="w-full px-4 py-2 border border-property-border rounded-lg bg-property-bg-elevated text-property-text focus:ring-2 focus:ring-property-gold/50 focus:border-property-gold outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-property-text mb-1">
                      {agentCta.serviceCard.form.propertyTypeLabel}
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-4 py-2 border border-property-border rounded-lg bg-property-bg-elevated text-property-text focus:ring-2 focus:ring-property-gold/50 focus:border-property-gold outline-none transition-all"
                    >
                      <option value="">&mdash;</option>
                      <option value="apartment">{agentCta.serviceCard.form.propertyTypes.apartment}</option>
                      <option value="house">{agentCta.serviceCard.form.propertyTypes.house}</option>
                      <option value="villa">{agentCta.serviceCard.form.propertyTypes.villa}</option>
                      <option value="penthouse">{agentCta.serviceCard.form.propertyTypes.penthouse}</option>
                      <option value="other">{agentCta.serviceCard.form.propertyTypes.other}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-property-text mb-1">
                      {agentCta.serviceCard.form.estimatedValueLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.estimatedValue}
                      onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                      placeholder={agentCta.serviceCard.form.estimatedValuePlaceholder}
                      className="w-full px-4 py-2 border border-property-border rounded-lg bg-property-bg-elevated text-property-text focus:ring-2 focus:ring-property-gold/50 focus:border-property-gold outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-property-text mb-1">
                    {agentCta.serviceCard.form.messageLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-property-border rounded-lg bg-property-bg-elevated text-property-text focus:ring-2 focus:ring-property-gold/50 focus:border-property-gold outline-none transition-all resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-property-gold to-property-gold-dark text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? agentCta.serviceCard.form.submitting : agentCta.serviceCard.form.submitButton}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
