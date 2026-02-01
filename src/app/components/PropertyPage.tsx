import { Dictionary, Locale } from "../i18n/types";
import PropertyHero from "./PropertyHero";
import OpportunitySection from "./OpportunitySection";
import ViewsGallery from "./ViewsGallery";
import LocationMap from "./LocationMap";
import PotentialSection from "./PotentialSection";
import ProcessSection from "./ProcessSection";
import TestimonialsSection from "./TestimonialsSection";
import ContactForm from "./ContactForm";
import AgentCTASection from "./AgentCTASection";
import PropertyFooter from "./PropertyFooter";

interface PropertyPageProps {
  dictionary: Dictionary;
  locale: Locale;
}

export default function PropertyPage({ dictionary, locale }: PropertyPageProps) {
  return (
    <>
      <PropertyHero dictionary={dictionary} locale={locale} />
      <OpportunitySection dictionary={dictionary} />
      <ViewsGallery dictionary={dictionary} />
      <LocationMap dictionary={dictionary} />
      <PotentialSection dictionary={dictionary} />
      <ProcessSection dictionary={dictionary} />
      <TestimonialsSection dictionary={dictionary} />
      <ContactForm dictionary={dictionary} locale={locale} />
      <AgentCTASection dictionary={dictionary} locale={locale} />
      <PropertyFooter dictionary={dictionary} />
    </>
  );
}
