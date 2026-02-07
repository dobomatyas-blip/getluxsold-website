import { Dictionary, Locale } from "../i18n/types";
import FloatingHeader from "./FloatingHeader";
import PropertyHero from "./PropertyHero";
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

interface PropertyPageProps {
  dictionary: Dictionary;
  locale: Locale;
  basePath?: string;
}

export default function PropertyPage({ dictionary, locale, basePath }: PropertyPageProps) {
  return (
    <DirectionWrapper locale={locale}>
      <HtmlLangSetter locale={locale} />
      <FloatingHeader locale={locale} basePath={basePath} />
      <PropertyHero dictionary={dictionary} locale={locale} />
      <OpportunitySection dictionary={dictionary} />
      <ViewsGallery dictionary={dictionary} />
      <LocationMap dictionary={dictionary} />
      <PotentialSection dictionary={dictionary} locale={locale} />
      <ProcessSection dictionary={dictionary} />
      <TestimonialsSection dictionary={dictionary} />
      <ContactForm dictionary={dictionary} locale={locale} />
      <AgentCTASection dictionary={dictionary} locale={locale} />
      <SellerCTASection locale={locale} showCaseStudy={false} />
      <PropertyFooter dictionary={dictionary} />
    </DirectionWrapper>
  );
}
