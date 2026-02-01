"use client";

import { useState } from "react";
import { Dictionary, Locale } from "../i18n/types";
import CTAButton from "./CTAButton";

interface ContactFormProps {
  dictionary: Dictionary;
  locale: Locale;
}

type InquiryType = "viewing" | "investment" | "pricing" | "other";
type ContactMethod = "email" | "phone";

interface FormData {
  name: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  preferredContact: ContactMethod[];
  message: string;
  privacyConsent: boolean;
}

export default function ContactForm({ dictionary, locale }: ContactFormProps) {
  const { contact } = dictionary;
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    inquiryType: "viewing",
    preferredContact: ["email"],
    message: "",
    privacyConsent: false,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleContactMethodChange = (method: ContactMethod) => {
    setFormData((prev) => {
      const current = prev.preferredContact;
      if (current.includes(method)) {
        return { ...prev, preferredContact: current.filter((m) => m !== method) };
      } else {
        return { ...prev, preferredContact: [...current, method] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/inquiry", {
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

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "viewing",
        preferredContact: ["email"],
        message: "",
        privacyConsent: false,
      });
    } catch {
      setStatus("error");
      setErrorMessage(contact.form.errorMessage);
    }
  };

  if (status === "success") {
    return (
      <section id="contact" className="property-section property-section-alt">
        <div className="max-w-2xl mx-auto text-center">
          <div className="property-card p-12">
            <div className="w-16 h-16 bg-property-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-8 h-8 text-property-gold-dark" />
            </div>
            <h2 className="property-heading text-2xl mb-4">
              {contact.form.successTitle}
            </h2>
            <p className="text-property-text-muted">
              {contact.form.successMessage}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="property-section property-section-alt">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="property-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            {contact.sectionTitle}
          </h2>
          <p className="text-property-text-muted text-lg">
            {contact.sectionSubtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="property-card p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-property-text mb-2">
                {contact.form.nameLabel} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder={contact.form.namePlaceholder}
                className="property-input"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-property-text mb-2">
                {contact.form.emailLabel} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder={contact.form.emailPlaceholder}
                className="property-input"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-property-text mb-2">
                {contact.form.phoneLabel}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={contact.form.phonePlaceholder}
                className="property-input"
              />
            </div>

            {/* Inquiry Type */}
            <div>
              <label htmlFor="inquiryType" className="block text-sm font-medium text-property-text mb-2">
                {contact.form.inquiryTypeLabel}
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleInputChange}
                className="property-input"
              >
                <option value="viewing">{contact.form.inquiryTypes.viewing}</option>
                <option value="investment">{contact.form.inquiryTypes.investment}</option>
                <option value="pricing">{contact.form.inquiryTypes.pricing}</option>
                <option value="other">{contact.form.inquiryTypes.other}</option>
              </select>
            </div>
          </div>

          {/* Preferred Contact Method */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-property-text mb-3">
              {contact.form.preferredContactLabel}
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.preferredContact.includes("email")}
                  onChange={() => handleContactMethodChange("email")}
                  className="w-4 h-4 text-property-gold border-property-border rounded focus:ring-property-gold"
                />
                <span className="text-sm text-property-text">{contact.form.contactMethods.email}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.preferredContact.includes("phone")}
                  onChange={() => handleContactMethodChange("phone")}
                  className="w-4 h-4 text-property-gold border-property-border rounded focus:ring-property-gold"
                />
                <span className="text-sm text-property-text">{contact.form.contactMethods.phone}</span>
              </label>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-property-text mb-2">
              {contact.form.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              placeholder={contact.form.messagePlaceholder}
              className="property-input resize-none"
            />
          </div>

          {/* Privacy Consent */}
          <div className="mb-8">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="privacyConsent"
                required
                checked={formData.privacyConsent}
                onChange={handleInputChange}
                className="w-4 h-4 mt-1 text-property-gold border-property-border rounded focus:ring-property-gold"
              />
              <span className="text-sm text-property-text-muted">
                {contact.form.privacyConsent}
              </span>
            </label>
          </div>

          {/* Error Message */}
          {status === "error" && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <CTAButton
            type="submit"
            variant="primary"
            disabled={status === "submitting"}
            className="w-full"
          >
            {status === "submitting" ? contact.form.submitting : contact.form.submitButton}
          </CTAButton>

          {/* Trust Elements */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-property-text-light">
            {contact.trustElements.map((element, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-property-gold-dark" />
                <span>{element}</span>
              </div>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
