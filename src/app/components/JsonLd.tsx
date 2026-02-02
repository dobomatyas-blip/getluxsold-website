import Script from "next/script";

const BASE_URL = "https://getluxsold.com";

// Organization Schema - for site-wide branding
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "GetLuxSold",
    alternateName: "Endless Solutions Kft.",
    url: BASE_URL,
    logo: `${BASE_URL}/icon`,
    description:
      "Premium luxury real estate agency specializing in exclusive properties in Budapest, Hungary.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Budapest",
      addressCountry: "HU",
    },
    areaServed: {
      "@type": "City",
      name: "Budapest",
    },
    priceRange: "$$$",
  };

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Property Listing Schema - for individual property pages
interface PropertyJsonLdProps {
  name: string;
  description: string;
  url: string;
  streetAddress: string;
  addressLocality: string;
  postalCode: string;
  addressRegion: string;
  latitude: number;
  longitude: number;
  floorSize: number;
  numberOfRooms: number;
  price: number;
  priceCurrency: string;
  images: string[];
  amenities: string[];
  datePosted?: string;
}

export function PropertyJsonLd({
  name,
  description,
  url,
  streetAddress,
  addressLocality,
  postalCode,
  addressRegion,
  latitude,
  longitude,
  floorSize,
  numberOfRooms,
  price,
  priceCurrency,
  images,
  amenities,
  datePosted = "2024-01-01",
}: PropertyJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name,
    description,
    url,
    datePosted,
    image: images.map((img) =>
      img.startsWith("http") ? img : `${BASE_URL}${img}`
    ),
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality,
      postalCode,
      addressRegion,
      addressCountry: "HU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude,
      longitude,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: floorSize,
      unitCode: "MTK", // Square meters
    },
    numberOfRooms,
    amenityFeature: amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
    })),
    offers: {
      "@type": "Offer",
      price,
      priceCurrency,
      availability: "https://schema.org/InStock",
    },
    seller: {
      "@type": "RealEstateAgent",
      name: "GetLuxSold",
      url: BASE_URL,
    },
  };

  return (
    <Script
      id="property-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema - for navigation
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Website Schema - for site-wide search features
export function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GetLuxSold",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
