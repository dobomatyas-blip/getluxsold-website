import { Dictionary } from "../i18n/types";

interface OpportunitySectionProps {
  dictionary: Dictionary;
}

export default function OpportunitySection({ dictionary }: OpportunitySectionProps) {
  const { opportunity } = dictionary;

  return (
    <section id="opportunity" className="property-section property-section-alt">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="property-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            {opportunity.sectionTitle}
          </h2>
          <p className="text-property-text-muted text-lg max-w-2xl mx-auto">
            {opportunity.sectionSubtitle}
          </p>
        </div>

        {/* Price Comparison Table */}
        <div className="property-card p-8 mb-12">
          <h3 className="property-subheading text-xl mb-6">
            {opportunity.priceComparison.title}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-property-border">
                  <th className="text-left py-3 px-4 text-property-text-muted font-medium">
                    {dictionary.location.sectionTitle}
                  </th>
                  <th className="text-right py-3 px-4 text-property-text-muted font-medium">
                    {dictionary.common.sqm}
                  </th>
                </tr>
              </thead>
              <tbody>
                {opportunity.priceComparison.locations.map((location, index) => (
                  <tr
                    key={index}
                    className={`border-b border-property-border ${
                      index === opportunity.priceComparison.locations.length - 1
                        ? "bg-property-gold/10"
                        : ""
                    }`}
                  >
                    <td className="py-4 px-4">
                      <span className={index === opportunity.priceComparison.locations.length - 1 ? "font-semibold text-property-navy" : ""}>
                        {location.name}
                      </span>
                      {index === opportunity.priceComparison.locations.length - 1 && (
                        <span className="ml-2 text-xs bg-property-gold text-property-navy px-2 py-0.5 rounded-full font-semibold">
                          {opportunity.priceComparison.thisProperty}
                        </span>
                      )}
                    </td>
                    <td className={`py-4 px-4 text-right font-medium ${
                      index === opportunity.priceComparison.locations.length - 1
                        ? "text-property-gold-dark"
                        : "text-property-text-muted"
                    }`}>
                      {location.priceRange}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scarcity & Loss Aversion */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Scarcity Card */}
          <div className="property-card p-8">
            <div className="w-12 h-12 bg-property-navy/10 rounded-lg flex items-center justify-center mb-4">
              <DiamondIcon className="w-6 h-6 text-property-navy" />
            </div>
            <h3 className="property-subheading text-xl mb-4">
              {opportunity.scarcityTitle}
            </h3>
            <p className="text-property-text-muted leading-relaxed">
              {opportunity.scarcityText}
            </p>
          </div>

          {/* Loss Aversion Card */}
          <div className="property-card p-8">
            <div className="w-12 h-12 bg-property-gold/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUpIcon className="w-6 h-6 text-property-gold-dark" />
            </div>
            <h3 className="property-subheading text-xl mb-4">
              {opportunity.lossAversionTitle}
            </h3>
            <p className="text-property-text-muted leading-relaxed">
              {opportunity.lossAversionText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DiamondIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 6-9 12-9-12 9-6z" />
    </svg>
  );
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  );
}
