"use client";

import { useState } from "react";
import Image from "next/image";
import { Dictionary, Locale } from "../i18n/types";
import InvestmentProjection from "./InvestmentProjection";
import FloorPlanSVG from "./FloorPlanSVG";
import RenovationFloorPlanSVG from "./RenovationFloorPlanSVG";

interface PotentialSectionProps {
  dictionary: Dictionary;
  locale: Locale;
}

export default function PotentialSection({ dictionary, locale }: PotentialSectionProps) {
  const { potential } = dictionary;
  const [activeTab, setActiveTab] = useState<"current" | "renovated">("current");

  return (
    <section id="potential" className="property-section">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="property-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            {potential.sectionTitle}
          </h2>
          <p className="text-property-text-muted text-lg max-w-2xl mx-auto">
            {potential.sectionSubtitle}
          </p>
        </div>

        {/* Floor Plan with Room Details */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Floor Plan SVG with Tabs */}
          <div className="lg:col-span-2 property-card overflow-hidden">
            <div className="flex border-b border-property-border">
              <button
                onClick={() => setActiveTab("current")}
                className={`flex-1 px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  activeTab === "current"
                    ? "bg-property-navy text-white"
                    : "bg-property-cream-dark text-property-text-muted hover:text-property-navy hover:bg-property-cream-dark/80"
                }`}
              >
                {potential.renovation.tabCurrent}
              </button>
              <button
                onClick={() => setActiveTab("renovated")}
                className={`flex-1 px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  activeTab === "renovated"
                    ? "bg-property-gold text-white"
                    : "bg-property-cream-dark text-property-text-muted hover:text-property-gold-dark hover:bg-property-cream-dark/80"
                }`}
              >
                {potential.renovation.tabRenovated}
              </button>
            </div>
            <div className="p-4 bg-white">
              {activeTab === "current" ? (
                <FloorPlanSVG dictionary={dictionary} locale={locale} />
              ) : (
                <RenovationFloorPlanSVG dictionary={dictionary} locale={locale} />
              )}
            </div>
          </div>

          {/* Room Details */}
          <div className="property-card overflow-hidden">
            <div className="p-4 bg-property-navy text-white border-b border-property-border">
              <h3 className="font-semibold">{potential.rooms.title}</h3>
            </div>
            <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
              <RoomCard
                code="A1"
                name={potential.rooms.balcony}
                area="7,2"
                dimensions="5,30 × 3,90"
                icon={<BalconyIcon />}
              />
              <RoomCard
                code="A2"
                name={potential.rooms.living}
                area="26,2"
                dimensions="5,20 × 5,23"
                icon={<SofaIcon />}
                highlight
              />
              {activeTab === "current" ? (
                <RoomCard
                  code="A3"
                  name={potential.rooms.middleRoom}
                  area="19,8"
                  dimensions="5,83 × 3,43"
                  icon={<BedIcon />}
                />
              ) : (
                <RoomCard
                  code="A3"
                  name={potential.rooms.openKitchenLiving}
                  area="19,8"
                  dimensions="5,83 × 3,43"
                  icon={<KitchenIcon />}
                  highlight
                />
              )}
              <RoomCard
                code="A4"
                name={potential.rooms.bathroom}
                area="7,6"
                dimensions="3,98 × 2,42"
                icon={<BathIcon />}
              />
              <RoomCard
                code="A5"
                name={potential.rooms.smallBalcony}
                area="4,25"
                dimensions="4,10"
                icon={<BalconyIcon />}
              />
              <RoomCard
                code="A6"
                name={potential.rooms.hallway}
                area="4,9"
                dimensions="3,36 × 1,46"
                icon={<DoorIcon />}
              />
              <div className="pt-3 border-t border-property-border">
                <div className="flex justify-between items-center text-sm text-property-text-muted">
                  <span className="flex gap-2">
                    <span className="text-property-navy font-medium">A7-A9</span>
                    {potential.rooms.utilities}
                  </span>
                  <span>3,6 m²</span>
                </div>
              </div>
              {activeTab === "current" ? (
                <>
                  <RoomCard
                    code="A10"
                    name={potential.rooms.kitchen}
                    area="7,3"
                    dimensions="3,95 × 1,85"
                    icon={<KitchenIcon />}
                  />
                  <RoomCard
                    code="A11"
                    name={potential.rooms.smallRoom}
                    area="7,2"
                    dimensions="4,10 × 1,80"
                    icon={<DeskIcon />}
                  />
                </>
              ) : (
                <RoomCard
                  code="A10"
                  name={potential.rooms.bedroomOffice}
                  area="14,5"
                  dimensions="összevont A10+A11"
                  icon={<BedIcon />}
                  highlight
                />
              )}
              <div className="pt-3 border-t-2 border-property-gold">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-property-navy">{potential.rooms.total}</span>
                  <span className="font-bold text-property-gold-dark text-lg">89 m²</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inspiration Gallery */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="property-subheading text-2xl md:text-3xl mb-2">
              {potential.inspirationTitle}
            </h3>
            <p className="text-property-text-muted">
              {potential.inspirationSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <InspirationCard
              src="/images/inspiration/hallway.jpg"
              label={potential.inspirationRooms.hallway}
            />
            <InspirationCard
              src="/images/inspiration/bathroom.jpg"
              label={potential.inspirationRooms.bathroom}
            />
            <InspirationCard
              src="/images/inspiration/kitchen.png"
              label={potential.inspirationRooms.kitchen}
            />
            <InspirationCard
              src="/images/inspiration/middle-room-1.jpg"
              label={potential.inspirationRooms.middleRoom1}
            />
            <InspirationCard
              src="/images/inspiration/middle-room-2.jpg"
              label={potential.inspirationRooms.middleRoom2}
            />
          </div>
        </div>

        {/* Renovation Note */}
        <div className="property-card p-8 mb-12 border-l-4 border-property-gold">
          <p className="text-property-text leading-relaxed text-lg italic">
            {potential.renovationNote}
          </p>
        </div>

        {/* Investment Projection */}
        <InvestmentProjection dictionary={dictionary} />
      </div>
    </section>
  );
}

function RoomCard({
  code,
  name,
  area,
  dimensions,
  icon,
  highlight = false,
}: {
  code: string;
  name: string;
  area: string;
  dimensions: string;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg ${
        highlight ? "bg-property-gold/10 border border-property-gold/30" : "bg-property-cream-dark"
      }`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        highlight ? "bg-property-gold/20 text-property-gold-dark" : "bg-property-navy/10 text-property-navy"
      }`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-property-navy truncate">
          <span className="font-bold mr-1.5">{code}</span>
          {name}
        </div>
        <div className="text-xs text-property-text-muted">{dimensions} m</div>
      </div>
      <div className={`text-right ${highlight ? "text-property-gold-dark" : "text-property-navy"}`}>
        <span className="font-semibold">{area}</span>
        <span className="text-xs text-property-text-muted ml-0.5">m²</span>
      </div>
    </div>
  );
}

function SofaIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 10V7a2 2 0 00-2-2H6a2 2 0 00-2 2v3m16 0v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7m16 0H4m4 0v3m8-3v3" />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12v6a1 1 0 001 1h16a1 1 0 001-1v-6M3 12V9a3 3 0 013-3h12a3 3 0 013 3v3M7 9h.01M7 9a1 1 0 100-2 1 1 0 000 2z" />
    </svg>
  );
}

function DeskIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  );
}

function KitchenIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12" />
    </svg>
  );
}

function DoorIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function BalconyIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function InspirationCard({ src, label }: { src: string; label: string }) {
  return (
    <div className="group relative overflow-hidden rounded-lg property-card">
      <div className="aspect-[3/4] relative">
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-property-navy/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <span className="text-white text-sm font-medium">{label}</span>
        </div>
      </div>
    </div>
  );
}
