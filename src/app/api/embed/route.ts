import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://getluxsold.com";

/**
 * Embed widget API - returns an HTML snippet for embedding a property card
 * on external websites.
 *
 * Query params:
 * - slug: property slug (required)
 * - ref: agent referral ID (optional)
 * - lang: language code (optional, defaults to "en")
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "bem-rakpart-26";
  const ref = searchParams.get("ref") || "";
  const lang = searchParams.get("lang") || "en";

  const langSuffix = lang === "hu" ? "" : `/${lang}`;
  const refParam = ref ? `?ref=${encodeURIComponent(ref)}` : "";
  const propertyUrl = `${BASE_URL}/properties/${slug}${langSuffix}${refParam}`;

  const ctaTexts: Record<string, string> = {
    hu: "Megtekintés",
    en: "View Property",
    de: "Immobilie ansehen",
    zh: "查看详情",
    he: "צפה בנכס",
    vi: "Xem chi tiết",
    ru: "Подробнее",
  };

  const cta = ctaTexts[lang] || ctaTexts.en;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:system-ui,-apple-system,sans-serif">
<div style="max-width:400px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
  <div style="position:relative;aspect-ratio:16/10;overflow:hidden">
    <img src="${BASE_URL}/images/hero.jpg" alt="Bem rakpart 26" style="width:100%;height:100%;object-fit:cover" />
    <div style="position:absolute;top:12px;left:12px;background:#f59e0b;color:#fff;font-size:11px;font-weight:600;padding:4px 10px;border-radius:20px;letter-spacing:0.5px">EXCLUSIVE</div>
  </div>
  <div style="padding:16px 20px">
    <h3 style="margin:0 0 4px;font-size:18px;font-weight:700;color:#0f172a">Bem rakpart 26</h3>
    <p style="margin:0 0 12px;font-size:13px;color:#64748b">District I, Budapest</p>
    <div style="display:flex;gap:16px;margin-bottom:16px;font-size:12px;color:#475569">
      <span><strong style="color:#0f172a">89 m²</strong></span>
      <span><strong style="color:#0f172a">3</strong> rooms</span>
      <span><strong style="color:#f59e0b">€500K</strong></span>
    </div>
    <a href="${propertyUrl}" target="_blank" rel="noopener" style="display:block;text-align:center;background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;font-size:14px;font-weight:600;padding:10px 20px;border-radius:8px;text-decoration:none">${cta}</a>
    <div style="margin-top:12px;text-align:center">
      <a href="${BASE_URL}" target="_blank" rel="noopener" style="font-size:10px;color:#94a3b8;text-decoration:none">Powered by <strong style="color:#f59e0b">GetLuxSold</strong></a>
    </div>
  </div>
</div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Frame-Options": "ALLOWALL",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
