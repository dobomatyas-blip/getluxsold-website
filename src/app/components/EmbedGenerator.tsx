"use client";

import { useState } from "react";
import { Locale } from "../i18n/types";

interface EmbedGeneratorProps {
  propertySlug: string;
  locale: Locale;
  agentRef?: string;
  onClose: () => void;
}

const texts: Record<Locale, { title: string; description: string; copy: string; copied: string; close: string; preview: string }> = {
  hu: { title: "Beágyazási kód", description: "Illessze be ezt a kódot weboldalába:", copy: "Kód másolása", copied: "Másolva!", close: "Bezárás", preview: "Előnézet" },
  en: { title: "Embed Code", description: "Paste this code into your website:", copy: "Copy Code", copied: "Copied!", close: "Close", preview: "Preview" },
  de: { title: "Einbettungscode", description: "Fügen Sie diesen Code in Ihre Website ein:", copy: "Code kopieren", copied: "Kopiert!", close: "Schließen", preview: "Vorschau" },
  zh: { title: "嵌入代码", description: "将此代码粘贴到您的网站中：", copy: "复制代码", copied: "已复制!", close: "关闭", preview: "预览" },
  he: { title: "קוד הטמעה", description: "הדביקו קוד זה באתר שלכם:", copy: "העתק קוד", copied: "הועתק!", close: "סגור", preview: "תצוגה מקדימה" },
  vi: { title: "Mã nhúng", description: "Dán mã này vào trang web của bạn:", copy: "Sao chép mã", copied: "Đã sao chép!", close: "Đóng", preview: "Xem trước" },
  ru: { title: "Код встраивания", description: "Вставьте этот код на свой сайт:", copy: "Копировать код", copied: "Скопировано!", close: "Закрыть", preview: "Предпросмотр" },
};

export default function EmbedGenerator({ propertySlug, locale, agentRef, onClose }: EmbedGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const t = texts[locale];

  const refParam = agentRef ? `&ref=${encodeURIComponent(agentRef)}` : "";
  const embedUrl = `https://getluxsold.com/api/embed?slug=${propertySlug}&lang=${locale}${refParam}`;
  const embedCode = `<iframe src="${embedUrl}" width="400" height="480" frameborder="0" style="border:none;max-width:100%;border-radius:12px"></iframe>`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-property-bg-secondary rounded-2xl shadow-2xl max-w-lg w-full p-6 relative border border-property-border">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-property-bg-elevated transition-colors text-property-text-muted hover:text-property-text"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-lg font-bold text-property-gold mb-2">{t.title}</h3>
        <p className="text-sm text-property-text-muted mb-4">{t.description}</p>

        {/* Code block */}
        <div className="bg-property-bg-primary border border-property-border rounded-lg p-3 mb-4">
          <code className="text-xs text-property-text-muted break-all block whitespace-pre-wrap">
            {embedCode}
          </code>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="w-full bg-property-gold text-property-bg-primary font-medium py-2.5 rounded-lg hover:bg-property-gold-light transition-colors text-sm"
        >
          {copied ? t.copied : t.copy}
        </button>

        {/* Preview */}
        <div className="mt-4 pt-4 border-t border-property-border">
          <p className="text-xs font-medium text-property-text-muted mb-2">{t.preview}</p>
          <div className="flex justify-center">
            <iframe
              src={embedUrl}
              width="320"
              height="400"
              className="border-none rounded-lg"
              title="Property embed preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
