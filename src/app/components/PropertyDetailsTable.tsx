import { Dictionary } from "../i18n/types";
import { PropertyData } from "../data/properties/types";

interface PropertyDetailsTableProps {
  dictionary: Dictionary;
  property: PropertyData;
}

export default function PropertyDetailsTable({ dictionary, property }: PropertyDetailsTableProps) {
  const { sectionTitle, labels, types, conditions, heatingTypes, flooringTypes } = dictionary.propertyDetails;

  const conditionKey = property.condition === "needs-renovation" ? "needsRenovation" : property.condition;

  const leftColumn = [
    { label: labels.objectType, value: types[property.type] },
    { label: labels.condition, value: conditions[conditionKey as keyof typeof conditions] },
    { label: labels.rooms, value: String(property.rooms) },
    property.halfRooms != null ? { label: labels.halfRooms, value: String(property.halfRooms) } : null,
    property.bathrooms != null ? { label: labels.bathrooms, value: String(property.bathrooms) } : null,
    property.kitchens != null ? { label: labels.kitchens, value: String(property.kitchens) } : null,
    property.floor != null ? { label: labels.floor, value: String(property.floor) } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const rightColumn = [
    { label: labels.totalSurface, value: `~${property.totalSurface} m²` },
    { label: labels.livingArea, value: `~${property.livingArea} m²` },
    property.balconySurface != null ? { label: labels.balconySurface, value: `~${property.balconySurface} m²` } : null,
    property.ceilingHeight != null ? { label: labels.ceilingHeight, value: `~${property.ceilingHeight} m` } : null,
    property.heating != null ? { label: labels.heating, value: heatingTypes[property.heating as keyof typeof heatingTypes] || property.heating } : null,
    property.flooring != null && property.flooring.length > 0
      ? { label: labels.flooring, value: property.flooring.map(f => flooringTypes[f as keyof typeof flooringTypes] || f).join(", ") }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div>
      <h3 className="property-subheading text-xl mb-6">
        {sectionTitle}
      </h3>
      <div className="grid md:grid-cols-2 gap-0 md:gap-12">
        <div>
          {leftColumn.map((row, i) => (
            <DetailRow key={i} label={row.label} value={row.value} />
          ))}
        </div>
        <div>
          {rightColumn.map((row, i) => (
            <DetailRow key={i} label={row.label} value={row.value} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline py-3 border-b border-property-border">
      <span className="text-property-text-muted text-sm">{label}</span>
      <span className="text-property-text font-medium text-sm">{value}</span>
    </div>
  );
}
