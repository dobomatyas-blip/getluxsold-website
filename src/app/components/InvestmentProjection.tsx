"use client";

import { Dictionary } from "../i18n/types";

interface InvestmentProjectionProps {
  dictionary: Dictionary;
}

export default function InvestmentProjection({ dictionary }: InvestmentProjectionProps) {
  const { potential } = dictionary;

  const PROPERTY_SIZE = 89; // m²
  const ACQUISITION_COST = 500000; // €500,000
  const RENOVATION_COST = 130000; // €130,000 estimated
  const TOTAL_INVESTMENT = ACQUISITION_COST + RENOVATION_COST;

  // Annual appreciation rates (conservative estimate based on Budapest premium market)
  const ANNUAL_APPRECIATION = 0.08; // 8% annual appreciation for premium Danube-front

  // Post-renovation market value (€8,000/m² average for renovated Bem rakpart)
  const POST_RENOVATION_VALUE = PROPERTY_SIZE * 8000; // €712,000

  // Monthly rent estimate (€2,800 for premium renovated Danube-view)
  const MONTHLY_RENT = 2800;
  const ANNUAL_RENT = MONTHLY_RENT * 12;

  // Calculate projections for 1, 3, and 5 years
  const projections = [1, 3, 5].map((years) => {
    const appreciatedValue = POST_RENOVATION_VALUE * Math.pow(1 + ANNUAL_APPRECIATION, years);
    const capitalGain = appreciatedValue - TOTAL_INVESTMENT;
    const rentalIncome = ANNUAL_RENT * years;
    const totalReturn = capitalGain + rentalIncome;
    const roi = (totalReturn / TOTAL_INVESTMENT) * 100;
    const annualizedRoi = roi / years;

    return {
      years,
      marketValue: Math.round(appreciatedValue),
      capitalGain: Math.round(capitalGain),
      rentalIncome: Math.round(rentalIncome),
      totalReturn: Math.round(totalReturn),
      roi: Math.round(roi),
      annualizedRoi: annualizedRoi.toFixed(1),
    };
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="property-card p-8">
      <h3 className="property-subheading text-xl mb-2">
        {potential.projectionTitle}
      </h3>
      <p className="text-sm text-property-text-muted mb-8">
        {potential.projection.description}
      </p>

      {/* Investment Summary */}
      <div className="bg-property-cream-dark rounded-lg p-5 mb-8">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-property-text-muted uppercase tracking-wide mb-1">
              {potential.projection.acquisitionLabel}
            </div>
            <div className="font-semibold text-property-navy">
              {formatCurrency(ACQUISITION_COST)}
            </div>
          </div>
          <div>
            <div className="text-xs text-property-text-muted uppercase tracking-wide mb-1">
              {potential.projection.renovationLabel}
            </div>
            <div className="font-semibold text-property-navy">
              {formatCurrency(RENOVATION_COST)}
            </div>
          </div>
          <div>
            <div className="text-xs text-property-text-muted uppercase tracking-wide mb-1">
              {potential.projection.totalInvestmentLabel}
            </div>
            <div className="font-bold text-property-gold-dark text-lg">
              {formatCurrency(TOTAL_INVESTMENT)}
            </div>
          </div>
        </div>
      </div>

      {/* Projection Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {projections.map((proj) => (
          <div
            key={proj.years}
            className={`rounded-lg p-5 ${
              proj.years === 5
                ? "bg-property-navy text-white"
                : "bg-property-cream-dark"
            }`}
          >
            {/* Year Header */}
            <div className="text-center mb-4 pb-3 border-b border-current/20">
              <div className="text-3xl font-bold">
                {proj.years}
              </div>
              <div className={`text-xs uppercase tracking-wide ${
                proj.years === 5 ? "text-white/70" : "text-property-text-muted"
              }`}>
                {potential.projection.yearLabel}
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className={proj.years === 5 ? "text-white/70" : "text-property-text-muted"}>
                  {potential.projection.marketValueLabel}
                </span>
                <span className="font-medium">
                  {formatCurrency(proj.marketValue)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className={proj.years === 5 ? "text-white/70" : "text-property-text-muted"}>
                  {potential.projection.capitalGainLabel}
                </span>
                <span className="font-medium text-green-600">
                  +{formatCurrency(proj.capitalGain)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className={proj.years === 5 ? "text-white/70" : "text-property-text-muted"}>
                  {potential.projection.rentalIncomeLabel}
                </span>
                <span className="font-medium">
                  +{formatCurrency(proj.rentalIncome)}
                </span>
              </div>

              <div className={`flex justify-between text-sm pt-3 border-t ${
                proj.years === 5 ? "border-white/20" : "border-property-border"
              }`}>
                <span className={proj.years === 5 ? "text-white/70" : "text-property-text-muted"}>
                  {potential.projection.totalReturnLabel}
                </span>
                <span className={`font-bold ${proj.years === 5 ? "text-property-gold" : "text-green-600"}`}>
                  +{formatCurrency(proj.totalReturn)}
                </span>
              </div>
            </div>

            {/* ROI */}
            <div className={`mt-4 pt-3 border-t text-center ${
              proj.years === 5 ? "border-white/20" : "border-property-border"
            }`}>
              <div className={`text-2xl font-bold ${proj.years === 5 ? "text-property-gold" : "text-property-navy"}`}>
                +{proj.roi}%
              </div>
              <div className={`text-xs ${proj.years === 5 ? "text-white/70" : "text-property-text-muted"}`}>
                {potential.projection.roiLabel} ({proj.annualizedRoi}% {potential.projection.annualizedLabel})
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assumptions */}
      <div className="text-xs text-property-text-light p-4 bg-property-cream-dark rounded-lg">
        <div className="font-semibold mb-2">{potential.projection.assumptions}</div>
        <ul className="space-y-1 list-disc list-inside">
          <li>{potential.projection.appreciationNote}</li>
          <li>{potential.projection.rentalNote}</li>
        </ul>
      </div>
    </div>
  );
}
