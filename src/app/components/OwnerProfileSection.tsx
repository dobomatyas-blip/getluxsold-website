import Image from "next/image";
import { Dictionary } from "../i18n/types";
import CTAButton from "./CTAButton";

interface OwnerProfileSectionProps {
  dictionary: Dictionary;
  ownerName: string;
  ownerPhoto: string;
}

export default function OwnerProfileSection({
  dictionary,
  ownerName,
  ownerPhoto,
}: OwnerProfileSectionProps) {
  const { ownerProfile } = dictionary;

  return (
    <section className="property-section">
      <div className="max-w-3xl mx-auto">
        <div className="property-card p-8 md:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Photo */}
          <div className="shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-property-gold/30">
              <Image
                src={ownerPhoto}
                alt={ownerName}
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="text-center sm:text-start flex-1">
            <p className="text-xs uppercase tracking-widest text-property-gold-dark mb-1">
              {ownerProfile.sectionTitle}
            </p>
            <h3 className="text-xl md:text-2xl font-semibold text-property-text mb-1">
              {ownerName}
            </h3>
            <p className="text-sm text-property-gold-dark mb-3">
              {ownerProfile.role}
            </p>
            <p className="text-property-text-muted text-sm leading-relaxed mb-5">
              {ownerProfile.description}
            </p>
            <CTAButton href="#contact" variant="secondary">
              {ownerProfile.contactButton}
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
