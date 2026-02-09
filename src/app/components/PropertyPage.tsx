import { Dictionary, Locale } from "../i18n/types";
import { PropertyData } from "../data/properties/types";
import FloatingHeader from "./FloatingHeader";
import PropertyHero from "./PropertyHero";
import PropertyKeyFacts from "./PropertyKeyFacts";
import PropertyFeatures from "./PropertyFeatures";
import PropertyDetailsTable from "./PropertyDetailsTable";
import OpportunitySection from "./OpportunitySection";
import ViewsGallery from "./ViewsGallery";
import LocationMap from "./LocationMap";
import PotentialSection from "./PotentialSection";
import ProcessSection from "./ProcessSection";
import TestimonialsSection from "./TestimonialsSection";
import ContactForm from "./ContactForm";
import AgentCTASection from "./AgentCTASection";
import SellerCTASection from "./SellerCTASection";
import PropertyFooter from "./PropertyFooter";
import HtmlLangSetter from "./HtmlLangSetter";
import DirectionWrapper from "./DirectionWrapper";
import ShareBar from "./ShareBar";
import UtmCapture from "./UtmCapture";
import AgentBrandBanner from "./AgentBrandBanner";
import SocialProofBar from "./SocialProofBar";

interface PropertyPageProps {
  dictionary: Dictionary;
  locale: Locale;
  basePath?: string;
  propertySlug?: string;
  propertyData: PropertyData;
}

export default function PropertyPage({ dictionary, locale, basePath, propertySlug = "bem-rakpart-26", propertyData }: PropertyPageProps) {
  return (
    <DirectionWrapper locale={locale}>
      <HtmlLangSetter locale={locale} />
      <UtmCapture propertySlug={propertySlug} locale={locale} />
      <AgentBrandBanner locale={locale} />
      <FloatingHeader locale={locale} basePath={basePath} />
      <PropertyHero dictionary={dictionary} locale={locale} />
      <PropertyKeyFacts dictionary={dictionary} property={propertyData} />
      <ShareBar propertySlug={propertySlug} locale={locale} propertyTitle={dictionary.hero.headline} />
      <OpportunitySection dictionary={dictionary} />

      {/* Property Details & Features Section */}
      <section className="property-section property-section-alt">
        <div className="max-w-5xl mx-auto">
          <PropertyDetailsTable dictionary={dictionary} property={propertyData} />
          <div className="mt-12">
            <PropertyFeatures dictionary={dictionary} property={propertyData} />
          </div>
        </div>
      </section>

      <ViewsGallery dictionary={dictionary} />
      <LocationMap dictionary={dictionary} />
      <PotentialSection dictionary={dictionary} locale={locale} />
      <ProcessSection dictionary={dictionary} />
      <TestimonialsSection dictionary={dictionary} />
      <SocialProofBar locale={locale} />
      <ContactForm dictionary={dictionary} locale={locale} />
      <AgentCTASection dictionary={dictionary} locale={locale} />
      <SellerCTASection locale={locale} showCaseStudy={false} />
      <PropertyFooter dictionary={dictionary} />
    </DirectionWrapper>
  );
}
