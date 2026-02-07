"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Locale } from "../i18n/types";

interface QRCodeGeneratorProps {
  url: string;
  locale: Locale;
  size?: number;
}

const texts: Record<Locale, { title: string; download: string; description: string }> = {
  hu: { title: "QR Kód", download: "Letöltés (PNG)", description: "Nyomtassa ki és használja marketinganyagaiban" },
  en: { title: "QR Code", download: "Download (PNG)", description: "Print and use in your marketing materials" },
  de: { title: "QR-Code", download: "Herunterladen (PNG)", description: "Drucken und in Marketingmaterialien verwenden" },
  zh: { title: "二维码", download: "下载 (PNG)", description: "打印并用于您的营销材料" },
  he: { title: "קוד QR", download: "הורד (PNG)", description: "הדפס והשתמש בחומרי השיווק שלך" },
  vi: { title: "Mã QR", download: "Tải xuống (PNG)", description: "In và sử dụng trong tài liệu marketing" },
  ru: { title: "QR-код", download: "Скачать (PNG)", description: "Распечатайте и используйте в маркетинговых материалах" },
};

export default function QRCodeGenerator({ url, locale, size = 200 }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string>("");
  const t = texts[locale];

  useEffect(() => {
    if (!canvasRef.current) return;

    QRCode.toCanvas(canvasRef.current, url, {
      width: size,
      margin: 2,
      color: {
        dark: "#0f172a", // property-navy
        light: "#ffffff",
      },
      errorCorrectionLevel: "H", // High - allows logo overlay
    }).then(() => {
      if (canvasRef.current) {
        setDataUrl(canvasRef.current.toDataURL("image/png"));
      }
    });
  }, [url, size]);

  function handleDownload() {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = `getluxsold-qr-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  }

  return (
    <div className="text-center">
      <p className="text-sm font-medium text-property-navy mb-3">{t.title}</p>
      <div className="inline-block bg-white p-3 rounded-lg shadow-sm border border-property-border">
        <canvas ref={canvasRef} />
      </div>
      <p className="text-xs text-property-text-muted mt-2 mb-3">{t.description}</p>
      <button
        onClick={handleDownload}
        className="text-xs font-medium text-property-gold-dark hover:text-property-gold transition-colors underline underline-offset-2"
      >
        {t.download}
      </button>
    </div>
  );
}
