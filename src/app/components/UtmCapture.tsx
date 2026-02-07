"use client";

import { useEffect } from "react";
import { captureUtmParams, getStoredUtmParams } from "../lib/utm";
import { trackReferralVisit } from "../lib/analytics";
import { Locale } from "../i18n/types";

interface UtmCaptureProps {
  propertySlug: string;
  locale: Locale;
}

/**
 * Invisible component that captures UTM parameters and referral data on page load.
 * Fires a referral_visit event if a ref parameter is present.
 */
export default function UtmCapture({ propertySlug, locale }: UtmCaptureProps) {
  useEffect(() => {
    const params = captureUtmParams();

    // Track referral visit if ref parameter is present
    if (params.ref) {
      trackReferralVisit(params.ref, propertySlug, locale);
    }
  }, [propertySlug, locale]);

  return null;
}

/**
 * Hook to get stored UTM params for use in forms.
 */
export function useUtmParams() {
  return getStoredUtmParams;
}
