import { Dictionary } from "../i18n/types";
import { PropertyData } from "../data/properties/types";

interface PropertyKeyFactsProps {
  dictionary: Dictionary;
  property: PropertyData;
}

export default function PropertyKeyFacts({ dictionary, property }: PropertyKeyFactsProps) {
  const { labels, types, conditions } = dictionary.propertyDetails;

  const facts = [
    { icon: <RoomsIcon />, value: String(property.rooms), label: labels.rooms },
    property.halfRooms != null
      ? { icon: <HalfRoomIcon />, value: String(property.halfRooms), label: labels.halfRooms }
      : null,
    { icon: <BathroomIcon />, value: String(property.bathrooms), label: labels.bathrooms },
    property.kitchens != null
      ? { icon: <KitchenIcon />, value: String(property.kitchens), label: labels.kitchens }
      : null,
    { icon: <AreaIcon />, value: `${property.livingArea} m²`, label: labels.livingArea },
    property.floor != null
      ? { icon: <FloorIcon />, value: String(property.floor), label: labels.floor }
      : null,
    property.ceilingHeight != null
      ? { icon: <CeilingIcon />, value: `~${property.ceilingHeight} m`, label: labels.ceilingHeight }
      : null,
    { icon: <TypeIcon />, value: types[property.type], label: labels.objectType },
    { icon: <ConditionIcon />, value: conditions[property.condition === "needs-renovation" ? "needsRenovation" : property.condition], label: labels.condition },
  ].filter(Boolean) as { icon: React.ReactNode; value: string; label: string }[];

  return (
    <section className="border-t border-b border-property-border bg-property-bg-secondary">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {facts.map((fact, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded border border-property-border text-property-gold">
                {fact.icon}
              </div>
              <div>
                <div className="text-property-text font-semibold text-sm leading-tight">
                  {fact.value}
                </div>
                <div className="text-property-text-muted text-xs">
                  {fact.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoomsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  );
}

function HalfRoomIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M12 3v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5" />
    </svg>
  );
}

function BathroomIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 0a7.5 7.5 0 017.5 7.5H4.5a7.5 7.5 0 017.5-7.5zM4.5 12.75v3a3.75 3.75 0 003.75 3.75h7.5a3.75 3.75 0 003.75-3.75v-3M6 19.5v1.5m12-1.5v1.5" />
    </svg>
  );
}

function KitchenIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.468 5.99 5.99 0 00-1.925 3.547 5.975 5.975 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
    </svg>
  );
}

function AreaIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
  );
}

function FloorIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  );
}

function CeilingIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18M3.75 12h16.5" />
    </svg>
  );
}

function TypeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
    </svg>
  );
}

function ConditionIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.385 3.17 1.042-5.982L2.32 7.87l6.064-.862L11.42 2l3.037 5.008 6.064.862-4.757 4.488 1.042 5.982z" />
    </svg>
  );
}
