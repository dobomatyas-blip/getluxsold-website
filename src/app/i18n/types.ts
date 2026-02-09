export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    agentLink: string;
    stats: {
      size: string;
      ceilingHeight: string;
      floor: string;
      views: string;
      location: string;
      price: string;
    };
  };
  opportunity: {
    sectionTitle: string;
    sectionSubtitle: string;
    priceComparison: {
      title: string;
      locations: {
        name: string;
        priceRange: string;
      }[];
      thisProperty: string;
    };
    scarcityTitle: string;
    scarcityText: string;
    lossAversionTitle: string;
    lossAversionText: string;
  };
  views: {
    sectionTitle: string;
    sectionSubtitle: string;
    panoramaTitle: string;
    panoramaComingSoon: string;
    galleryTitle: string;
    viewPoints: string[];
  };
  location: {
    sectionTitle: string;
    sectionSubtitle: string;
    neighborhoodTitle: string;
    neighborhoodDescription: string;
    distances: {
      label: string;
      time: string;
    }[];
  };
  potential: {
    sectionTitle: string;
    sectionSubtitle: string;
    currentStateTitle: string;
    visionTitle: string;
    renovationNote: string;
    inspirationTitle: string;
    inspirationSubtitle: string;
    inspirationRooms: {
      hallway: string;
      bathroom: string;
      kitchen: string;
      middleRoom1: string;
      middleRoom2: string;
    };
    rooms: {
      title: string;
      living: string;
      middleRoom: string;
      smallRoom: string;
      kitchen: string;
      bathroom: string;
      hallway: string;
      balcony: string;
      smallBalcony: string;
      utilities: string;
      total: string;
      openKitchenLiving: string;
      bedroomOffice: string;
    };
    renovation: {
      tabCurrent: string;
      tabRenovated: string;
    };
    projectionTitle: string;
    projection: {
      description: string;
      acquisitionLabel: string;
      renovationLabel: string;
      totalInvestmentLabel: string;
      yearLabel: string;
      marketValueLabel: string;
      capitalGainLabel: string;
      rentalIncomeLabel: string;
      totalReturnLabel: string;
      roiLabel: string;
      annualizedLabel: string;
      assumptions: string;
      appreciationNote: string;
      rentalNote: string;
    };
  };
  process: {
    sectionTitle: string;
    sectionSubtitle: string;
    steps: {
      title: string;
      description: string;
      duration: string;
    }[];
    trustSignals: string[];
  };
  testimonials: {
    sectionTitle: string;
    sectionSubtitle: string;
    ownershipBadges: {
      privateSale: string;
      mortgageFree: string;
      directOwner: string;
    };
    marketQuotes: {
      text: string;
      source: string;
    }[];
  };
  contact: {
    sectionTitle: string;
    sectionSubtitle: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      inquiryTypeLabel: string;
      inquiryTypes: {
        viewing: string;
        investment: string;
        pricing: string;
        agent: string;
        other: string;
      };
      preferredContactLabel: string;
      contactMethods: {
        email: string;
        phone: string;
      };
      messageLabel: string;
      messagePlaceholder: string;
      privacyConsent: string;
      submitButton: string;
      submitting: string;
      successTitle: string;
      successMessage: string;
      errorMessage: string;
    };
    trustElements: string[];
  };
  agentCta: {
    sectionTitle: string;
    sectionSubtitle: string;
    spotsCounter: string;
    clientCard: {
      title: string;
      description: string;
      requirementsTitle: string;
      requirements: string[];
      note: string;
      cta: string;
    };
    serviceCard: {
      title: string;
      description: string;
      freeOffer: {
        badge: string;
        headline: string;
        description: string;
      };
      benefits: string[];
      form: {
        nameLabel: string;
        emailLabel: string;
        propertyAddressLabel: string;
        propertyTypeLabel: string;
        propertyTypes: {
          apartment: string;
          house: string;
          villa: string;
          penthouse: string;
          other: string;
        };
        estimatedValueLabel: string;
        estimatedValuePlaceholder: string;
        messageLabel: string;
        submitButton: string;
        submitting: string;
        successMessage: string;
        errorMessage: string;
      };
    };
  };
  footer: {
    companyName: string;
    address: string;
    privacyLink: string;
    termsLink: string;
    copyright: string;
  };
  propertyDetails: {
    sectionTitle: string;
    keyFactsTitle: string;
    featuresTitle: string;
    labels: {
      objectType: string;
      condition: string;
      rooms: string;
      halfRooms: string;
      bedrooms: string;
      bathrooms: string;
      kitchens: string;
      floor: string;
      totalSurface: string;
      livingArea: string;
      plotSurface: string;
      terraceSurface: string;
      balconySurface: string;
      ceilingHeight: string;
      garages: string;
      yearBuilt: string;
      heating: string;
      flooring: string;
      orientation: string;
      energyRating: string;
    };
    types: {
      apartment: string;
      house: string;
      villa: string;
      penthouse: string;
    };
    conditions: {
      new: string;
      renovated: string;
      good: string;
      needsRenovation: string;
    };
    heatingTypes: {
      central: string;
      individual: string;
      underfloor: string;
      electric: string;
    };
    flooringTypes: {
      parquet: string;
      tiles: string;
      wooden: string;
      marble: string;
      laminate: string;
    };
    features: {
      danubeView: string;
      balcony: string;
      heritageBuilding: string;
      parquetFlooring: string;
      highCeilings: string;
      centralHeating: string;
      metroNearby: string;
      unescoArea: string;
      cornerApartment: string;
      naturalLight: string;
      elevator: string;
      cellar: string;
    };
  };
  common: {
    learnMore: string;
    scheduleViewing: string;
    downloadBrochure: string;
    requestInfo: string;
    sqm: string;
    floor: string;
    from: string;
  };
}

export type Locale = "hu" | "en" | "de" | "zh" | "he" | "vi" | "ru";

export const ALL_LOCALES: Locale[] = ["hu", "en", "de", "zh", "he", "vi", "ru"];
export const RTL_LOCALES: Locale[] = ["he"];

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}
