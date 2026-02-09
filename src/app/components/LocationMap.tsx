import { Dictionary } from "../i18n/types";

interface LocationMapProps {
  dictionary: Dictionary;
}

export default function LocationMap({ dictionary }: LocationMapProps) {
  const { location } = dictionary;

  return (
    <section id="location" className="property-section property-section-alt">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="property-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            {location.sectionTitle}
          </h2>
          <p className="text-property-text-muted text-lg max-w-2xl mx-auto">
            {location.sectionSubtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map */}
          <div className="property-card overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.8254589067847!2d19.03721!3d47.5059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc14ca087e31%3A0x7d1d5df14f8e5e0!2sBem%20rakpart%2026%2C%20Budapest%2C%201011%20Hungary!5e0!3m2!1sen!2sus!4v1706000000000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>

          {/* Info */}
          <div>
            {/* Neighborhood Description */}
            <div className="mb-8">
              <h3 className="property-subheading text-xl mb-4">
                {location.neighborhoodTitle}
              </h3>
              <p className="text-property-text-muted leading-relaxed">
                {location.neighborhoodDescription}
              </p>
            </div>

            {/* Distances */}
            <div>
              <h4 className="font-semibold text-property-gold mb-4">
                {dictionary.common.from === "-tól" ? "Távolságok" : "Distances"}
              </h4>
              <div className="space-y-4">
                {location.distances.map((distance, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-property-border last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-property-gold/10 rounded-full flex items-center justify-center">
                        {index === 0 && <MetroIcon className="w-4 h-4 text-property-gold" />}
                        {index === 1 && <CastleIcon className="w-4 h-4 text-property-gold" />}
                        {index === 2 && <BridgeIcon className="w-4 h-4 text-property-gold" />}
                        {index === 3 && <PlaneIcon className="w-4 h-4 text-property-gold" />}
                      </div>
                      <span className="text-property-text">{distance.label}</span>
                    </div>
                    <span className="text-property-gold-dark font-medium">
                      {distance.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetroIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  );
}

function CastleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
  );
}

function BridgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25V21m-7.5-3.75V21m15-3.75V21M5.25 6.75L12 3l6.75 3.75M5.25 12l6.75-3 6.75 3" />
    </svg>
  );
}

function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
  );
}
