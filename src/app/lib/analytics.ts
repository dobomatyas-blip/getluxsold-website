// Google Analytics 4 event tracking utility
// Set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local to enable

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// Pre-defined events for lead generation
export function trackFormSubmission(formName: string, locale: string) {
  trackEvent("generate_lead", {
    form_name: formName,
    language: locale,
  });
}

export function trackServiceInquiry(locale: string, propertyType?: string) {
  trackEvent("generate_lead", {
    form_name: "service_inquiry",
    language: locale,
    ...(propertyType && { property_type: propertyType }),
  });
}

export function trackPropertyInquiry(inquiryType: string, locale: string) {
  trackEvent("generate_lead", {
    form_name: "property_inquiry",
    inquiry_type: inquiryType,
    language: locale,
  });
}
