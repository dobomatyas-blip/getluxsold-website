// UTM parameter handling utility for viral tracking

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "ref"] as const;
type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = "glx_utm";

/**
 * Captures UTM parameters from the current URL and stores them in sessionStorage.
 * Call this on page load (client-side only).
 */
export function captureUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  const url = new URL(window.location.href);
  const params: UtmParams = {};
  let hasAny = false;

  for (const key of UTM_KEYS) {
    const value = url.searchParams.get(key);
    if (value) {
      params[key] = value;
      hasAny = true;
    }
  }

  // Only overwrite stored params if new UTM params are present
  if (hasAny) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
    } catch {
      // sessionStorage unavailable (private browsing, etc.)
    }
  }

  return hasAny ? params : getStoredUtmParams();
}

/**
 * Returns stored UTM parameters from sessionStorage.
 */
export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Builds a URL with UTM parameters appended.
 */
export function buildShareUrl(
  baseUrl: string,
  params: {
    source: string;
    medium: string;
    campaign: string;
    ref?: string;
  }
): string {
  const url = new URL(baseUrl);
  url.searchParams.set("utm_source", params.source);
  url.searchParams.set("utm_medium", params.medium);
  url.searchParams.set("utm_campaign", params.campaign);
  if (params.ref) {
    url.searchParams.set("ref", params.ref);
  }
  return url.toString();
}
