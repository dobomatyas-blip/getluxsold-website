"use client";

import { useState } from "react";
import Image from "next/image";
import { Dictionary } from "../i18n/types";

interface ViewsGalleryProps {
  dictionary: Dictionary;
}

const propertyImages = [
  {
    src: "/images/room-curtains.png",
    alt: "Szoba halszálka parkettával és kilátással",
  },
  {
    src: "/images/room-shelves.png",
    alt: "Nappali beépített polcokkal",
  },
  {
    src: "/images/bathroom-current.png",
    alt: "Fürdőszoba kilátással",
  },
  {
    src: "/images/hallway-parquet.jpg",
    alt: "Előszoba halszálka parkettával",
  },
  {
    src: "/images/room-checkered.png",
    alt: "Szoba kockás padlóval",
  },
  {
    src: "/images/hallway-checkered.png",
    alt: "Folyosó kockás padlóval",
  },
];

export default function ViewsGallery({ dictionary }: ViewsGalleryProps) {
  const { views } = dictionary;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="views" className="property-section">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="property-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            {views.sectionTitle}
          </h2>
          <p className="text-property-text-muted text-lg max-w-2xl mx-auto">
            {views.sectionSubtitle}
          </p>
        </div>

        {/* 360° Panorama */}
        <div className="property-card overflow-hidden mb-12">
          <div className="p-4 bg-property-bg-secondary border-b border-property-border">
            <h3 className="font-semibold text-property-gold">
              {views.panoramaTitle}
            </h3>
          </div>
          <div className="relative aspect-[21/9]">
            <Image
              src="/images/panorama-360.jpg"
              alt="360° panoráma kilátás"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Gallery */}
        <div>
          <h3 className="property-subheading text-xl mb-6">
            {views.galleryTitle}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {propertyImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-property-bg-primary/0 group-hover:bg-property-bg-primary/50 transition-colors duration-300 flex items-center justify-center">
                  <ExpandIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* View Points */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {views.viewPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-8 h-8 bg-property-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <EyeIcon className="w-4 h-4 text-property-gold-dark" />
              </div>
              <p className="text-property-text-muted leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white"
            onClick={() => setSelectedImage(null)}
          >
            <CloseIcon className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-4xl aspect-video">
            <Image
              src={propertyImages[selectedImage].src}
              alt={propertyImages[selectedImage].alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}

function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
