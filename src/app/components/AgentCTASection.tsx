"use client";

import { useState } from "react";
import { Dictionary, Locale } from "../i18n/types";
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
      const response = await fetch("/api/service-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          language: locale,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSuccess(true);
      setFormData({ name: "", email: "", propertyAddress: "", message: "" });
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
          <div className="property-card p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-property-navy/10 rounded-full flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-property-navy" />
              </div>
              <h3 className="property-subheading text-xl">
                {agentCta.clientCard.title}
              </h3>
            </div>

            <p className="text-property-text-muted leading-relaxed mb-6">
              {agentCta.clientCard.description}
            </p>

            <div className="bg-property-cream-dark border border-property-border rounded-lg p-4 mb-6">
              <p className="text-sm text-property-text-muted italic">
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
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckIcon className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-green-800 font-medium">
                  {agentCta.serviceCard.form.successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mt-auto">
                <div>
                  <label className="block text-sm font-medium text-property-navy mb-1">
                    {agentCta.serviceCard.form.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-property-border rounded-lg focus:ring-2 focus:ring-property-gold/50 focus:border-property-gold outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-property-navy mb-1">
                    {agentCta.serviceCard.form.emailLabel} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-property-border rounded-lg focus:ring-2 focus:ring-property-gold/50 focus:border-property-gold outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-property-navy mb-1">
                    {agentCta.serviceCard.form.propertyAddressLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.propertyAddress}
                    onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                    className="w-full px-4 py-2 border border-property-border rounded-lg focus:ring-2 focus:ring-property-gold/50 focus:border-property-gold outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-property-navy mb-1">
                    {agentCta.serviceCard.form.messageLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-property-border rounded-lg focus:ring-2 focus:ring-property-gold/50 focus:border-property-gold outline-none transition-all resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
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
