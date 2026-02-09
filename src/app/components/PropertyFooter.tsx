import Link from "next/link";
import { Dictionary } from "../i18n/types";

interface PropertyFooterProps {
  dictionary: Dictionary;
}

export default function PropertyFooter({ dictionary }: PropertyFooterProps) {
  const { footer } = dictionary;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-property-bg-primary text-white py-12 border-t border-property-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-[family-name:var(--font-property-display)] text-xl font-semibold mb-4">
              Bem rakpart 26
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              {footer.companyName}
              <br />
              {footer.address}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-white/70">
              <p>
                <a
                  href="mailto:info@endlesssolutions.net"
                  className="hover:text-property-gold transition-colors"
                >
                  info@endlesssolutions.net
                </a>
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2 text-sm">
              <p>
                <Link
                  href="/privacy"
                  className="text-white/70 hover:text-property-gold transition-colors"
                >
                  {footer.privacyLink}
                </Link>
              </p>
              <p>
                <Link
                  href="/terms"
                  className="text-white/70 hover:text-property-gold transition-colors"
                >
                  {footer.termsLink}
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>
              &copy; {currentYear} {footer.companyName} {footer.copyright}
            </p>
            <p>
              Budapest, Hungary
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
