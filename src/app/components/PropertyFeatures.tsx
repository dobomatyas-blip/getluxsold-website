import { Dictionary } from "../i18n/types";
import { PropertyData } from "../data/properties/types";

interface PropertyFeaturesProps {
  dictionary: Dictionary;
  property: PropertyData;
}

export default function PropertyFeatures({ dictionary, property }: PropertyFeaturesProps) {
  const { featuresTitle, features: featureLabels } = dictionary.propertyDetails;

  return (
    <div>
      <h3 className="property-subheading text-xl mb-6">
        {featuresTitle}
      </h3>
      <div className="flex flex-wrap gap-3">
        {property.features.map((featureKey) => {
          const label = featureLabels[featureKey as keyof typeof featureLabels];
          if (!label) return null;
          return (
            <span
              key={featureKey}
              className="inline-block px-4 py-2 text-sm text-property-text bg-property-bg-elevated border border-property-border rounded-full transition-colors hover:border-property-gold/40 hover:text-property-gold"
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
