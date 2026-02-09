"use client";

import { useState, useEffect } from "react";
import { Locale } from "../i18n/types";
import { trackShare } from "../lib/analytics";
import { buildShareUrl } from "../lib/utm";

interface ShareBarProps {
  propertySlug: string;
  locale: Locale;
  propertyTitle?: string;
}

const shareTexts: Record<Locale, { shareLabel: string; copyLabel: string; copiedLabel: string; shareTitle: string }> = {
  hu: { shareLabel: "Megosztás", copyLabel: "Link másolása", copiedLabel: "Másolva!", shareTitle: "Nézd meg ezt a luxus ingatlant" },
  en: { shareLabel: "Share", copyLabel: "Copy link", copiedLabel: "Copied!", shareTitle: "Check out this luxury property" },
  de: { shareLabel: "Teilen", copyLabel: "Link kopieren", copiedLabel: "Kopiert!", shareTitle: "Sehen Sie sich diese Luxusimmobilie an" },
  zh: { shareLabel: "分享", copyLabel: "复制链接", copiedLabel: "已复制!", shareTitle: "看看这个豪华房产" },
  he: { shareLabel: "שתף", copyLabel: "העתק קישור", copiedLabel: "הועתק!", shareTitle: "צפה בנכס היוקרה הזה" },
  vi: { shareLabel: "Chia sẻ", copyLabel: "Sao chép liên kết", copiedLabel: "Đã sao chép!", shareTitle: "Xem bất động sản cao cấp này" },
  ru: { shareLabel: "Поделиться", copyLabel: "Копировать ссылку", copiedLabel: "Скопировано!", shareTitle: "Посмотрите эту элитную недвижимость" },
};

export default function ShareBar({ propertySlug, locale, propertyTitle = "Bem rakpart 26" }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const texts = shareTexts[locale];

  useEffect(() => {
    setCurrentUrl(window.location.origin + window.location.pathname);
  }, []);

  function getShareUrl(platform: string) {
    return buildShareUrl(currentUrl || `https://getluxsold.com/properties/${propertySlug}`, {
      source: platform,
      medium: "social",
      campaign: propertySlug,
    });
  }

  function handleShare(platform: string) {
    trackShare(platform, propertySlug, locale);
    const shareUrl = getShareUrl(platform);
    const text = `${texts.shareTitle}: ${propertyTitle}`;

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text}\n${shareUrl}`)}`,
      email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`${text}\n\n${shareUrl}`)}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "noopener,noreferrer,width=600,height=400");
    }
  }

  async function handleCopyLink() {
    const shareUrl = getShareUrl("link_copy");
    trackShare("link_copy", propertySlug, locale);

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  async function handleNativeShare() {
    if (!navigator.share) return;

    const shareUrl = getShareUrl("native_share");
    trackShare("native_share", propertySlug, locale);

    try {
      await navigator.share({
        title: propertyTitle,
        text: texts.shareTitle,
        url: shareUrl,
      });
    } catch {
      // User cancelled or share failed
    }
  }

  return (
    <>
      {/* Desktop: Floating sidebar */}
      <div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2">
        <span className="text-xs font-medium text-property-text-muted mb-1 [writing-mode:vertical-lr] rotate-180">
          {texts.shareLabel}
        </span>
        <div className="flex flex-col gap-2 bg-property-bg-secondary/90 backdrop-blur-sm rounded-full py-3 px-2 shadow-lg border border-property-border">
          <ShareButton onClick={() => handleShare("facebook")} label="Facebook">
            <FacebookIcon />
          </ShareButton>
          <ShareButton onClick={() => handleShare("linkedin")} label="LinkedIn">
            <LinkedInIcon />
          </ShareButton>
          <ShareButton onClick={() => handleShare("twitter")} label="X">
            <XIcon />
          </ShareButton>
          <ShareButton onClick={() => handleShare("whatsapp")} label="WhatsApp">
            <WhatsAppIcon />
          </ShareButton>
          <ShareButton onClick={() => handleShare("email")} label="Email">
            <EmailIcon />
          </ShareButton>
          <div className="w-6 h-px bg-property-border mx-auto" />
          <ShareButton onClick={handleCopyLink} label={copied ? texts.copiedLabel : texts.copyLabel}>
            {copied ? <CheckIcon /> : <LinkIcon />}
          </ShareButton>
        </div>
      </div>

      {/* Mobile: Bottom sticky bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-property-bg-primary/95 backdrop-blur-md border-t border-property-border px-4 py-2 safe-area-bottom">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {typeof navigator !== "undefined" && "share" in navigator ? (
            <MobileShareButton onClick={handleNativeShare} label={texts.shareLabel}>
              <NativeShareIcon />
            </MobileShareButton>
          ) : (
            <>
              <MobileShareButton onClick={() => handleShare("facebook")} label="Facebook">
                <FacebookIcon />
              </MobileShareButton>
              <MobileShareButton onClick={() => handleShare("whatsapp")} label="WhatsApp">
                <WhatsAppIcon />
              </MobileShareButton>
              <MobileShareButton onClick={() => handleShare("linkedin")} label="LinkedIn">
                <LinkedInIcon />
              </MobileShareButton>
            </>
          )}
          <MobileShareButton onClick={() => handleShare("email")} label="Email">
            <EmailIcon />
          </MobileShareButton>
          <MobileShareButton onClick={handleCopyLink} label={copied ? texts.copiedLabel : texts.copyLabel}>
            {copied ? <CheckIcon /> : <LinkIcon />}
          </MobileShareButton>
        </div>
      </div>
    </>
  );
}

function ShareButton({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className="w-9 h-9 flex items-center justify-center rounded-full text-property-text-muted hover:text-property-gold hover:bg-property-bg-elevated transition-colors"
    >
      {children}
    </button>
  );
}

function MobileShareButton({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-0.5 py-1 px-2 text-property-text-muted hover:text-property-gold transition-colors"
    >
      <span className="w-6 h-6">{children}</span>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

// --- Icons ---

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-4.122a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364l1.757 1.757" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-green-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function NativeShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
    </svg>
  );
}
