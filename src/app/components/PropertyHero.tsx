import { Dictionary, Locale } from "../i18n/types";
import CTAButton from "./CTAButton";

interface PropertyHeroProps {
  dictionary: Dictionary;
  locale: Locale;
}

export default function PropertyHero({ dictionary }: PropertyHeroProps) {
  const { hero } = dictionary;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero.jpg')`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 property-hero-overlay" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="property-animate-fade-up mb-6">
          <span className="inline-block px-4 py-2 text-sm font-semibold tracking-wider uppercase bg-property-gold text-property-navy rounded-sm">
            {hero.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="property-animate-fade-up property-delay-100 font-[family-name:var(--font-property-display)] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
          {hero.headline}
        </h1>

        {/* Subheadline */}
        <p className="property-animate-fade-up property-delay-200 text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
          {hero.subheadline}
        </p>

        {/* CTAs */}
        <div className="property-animate-fade-up property-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <CTAButton href="#contact" variant="primary">
            {hero.ctaPrimary}
          </CTAButton>
          <CTAButton href="#potential" variant="secondary-white">
            {hero.ctaSecondary}
          </CTAButton>
        </div>

        {/* Agent Link */}
        <a
          href="#agents"
          className="property-animate-fade-up property-delay-400 inline-block text-white/70 hover:text-white text-sm underline underline-offset-4 transition-colors mb-16"
        >
          {hero.agentLink}
        </a>

        {/* Stats Bar */}
        <div className="property-animate-fade-up property-delay-500 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white/90">
          <StatItem label={hero.stats.size} />
          <Divider />
          <StatItem label={hero.stats.ceilingHeight} />
          <Divider />
          <StatItem label={hero.stats.floor} />
          <Divider />
          <StatItem label={hero.stats.views} />
          <Divider />
          <StatItem label={hero.stats.location} />
          <Divider />
          <StatItem label={hero.stats.price} highlight />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/70 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function StatItem({ label, highlight = false }: { label: string; highlight?: boolean }) {
  return (
    <span className={`text-sm md:text-base font-medium ${highlight ? "text-property-gold" : ""}`}>
      {label}
    </span>
  );
}

function Divider() {
  return <span className="hidden md:block w-px h-4 bg-white/30" />;
}
