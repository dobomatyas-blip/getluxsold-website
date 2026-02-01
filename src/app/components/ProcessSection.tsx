import { Dictionary } from "../i18n/types";

interface ProcessSectionProps {
  dictionary: Dictionary;
}

export default function ProcessSection({ dictionary }: ProcessSectionProps) {
  const { process } = dictionary;

  return (
    <section id="process" className="property-section property-section-alt">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="property-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            {process.sectionTitle}
          </h2>
          <p className="text-property-text-muted text-lg max-w-2xl mx-auto">
            {process.sectionSubtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-property-border md:-translate-x-px" />

          {/* Steps */}
          <div className="space-y-8">
            {process.steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="property-card p-6">
                    <div className="flex items-center gap-3 mb-3 justify-start md:justify-end">
                      {index % 2 !== 0 && (
                        <span className="text-sm font-medium text-property-gold-dark">
                          {step.duration}
                        </span>
                      )}
                      <h3 className="property-subheading text-lg">
                        {step.title}
                      </h3>
                      {index % 2 === 0 && (
                        <span className="text-sm font-medium text-property-gold-dark md:hidden">
                          {step.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-property-text-muted text-sm leading-relaxed">
                      {step.description}
                    </p>
                    {index % 2 === 0 && (
                      <span className="hidden md:inline-block mt-3 text-sm font-medium text-property-gold-dark">
                        {step.duration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Circle */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 bg-property-gold rounded-full flex items-center justify-center text-property-navy font-bold text-sm">
                  {index + 1}
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-16 property-card p-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {process.trustSignals.map((signal, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-property-gold-dark flex-shrink-0 mt-0.5" />
                <span className="text-sm text-property-text-muted">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
