import { Dictionary } from "../i18n/types";

interface TestimonialsSectionProps {
  dictionary: Dictionary;
}

export default function TestimonialsSection({ dictionary }: TestimonialsSectionProps) {
  const { testimonials } = dictionary;

  return (
    <section id="testimonials" className="property-section">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="property-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            {testimonials.sectionTitle}
          </h2>
          <p className="text-property-text-muted text-lg max-w-2xl mx-auto">
            {testimonials.sectionSubtitle}
          </p>
        </div>

        {/* Ownership Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Badge icon={<KeyIcon />} text={testimonials.ownershipBadges.privateSale} />
          <Badge icon={<ShieldCheckIcon />} text={testimonials.ownershipBadges.mortgageFree} />
          <Badge icon={<UserIcon />} text={testimonials.ownershipBadges.directOwner} />
        </div>

        {/* Market Quotes */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.marketQuotes.map((quote, index) => (
            <div key={index} className="property-card p-6 flex flex-col">
              {/* Quote Icon */}
              <div className="mb-4">
                <ChartIcon className="w-8 h-8 text-property-gold" />
              </div>

              {/* Quote Text */}
              <blockquote className="flex-1 text-property-text leading-relaxed mb-4">
                &ldquo;{quote.text}&rdquo;
              </blockquote>

              {/* Source */}
              <div className="pt-4 border-t border-property-border">
                <div className="text-sm text-property-text-muted italic">
                  — {quote.source}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 bg-property-gold/10 border border-property-gold/30 text-property-text rounded-full">
      <span className="text-property-gold">{icon}</span>
      <span className="font-medium">{text}</span>
    </div>
  );
}

function KeyIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}
