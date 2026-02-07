import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Property Engagement Dashboard - GetLuxSold",
  description: "Track your property's performance and engagement metrics.",
  robots: "noindex, nofollow",
};

// In a real implementation, the token would be validated against a database.
// For now, this serves as the dashboard structure that will be populated
// with real analytics data once the backend is connected.

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg text-slate-900">
            GetLuxSold
          </Link>
          <span className="text-sm text-slate-500">Engagement Dashboard</span>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Bem rakpart 26</h1>
        <p className="text-slate-500 mb-8">District I, Budapest</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard label="Page Views" value="1,247" trend="+12%" />
          <StatCard label="Unique Visitors" value="893" trend="+8%" />
          <StatCard label="Inquiries" value="12" trend="+3" />
          <StatCard label="Countries" value="9" />
        </div>

        {/* Top Countries */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Top Countries</h3>
            <div className="space-y-3">
              <CountryRow country="Hungary" flag="HU" percentage={32} />
              <CountryRow country="Germany" flag="DE" percentage={18} />
              <CountryRow country="United Kingdom" flag="GB" percentage={14} />
              <CountryRow country="Israel" flag="IL" percentage={11} />
              <CountryRow country="China" flag="CN" percentage={9} />
              <CountryRow country="Others" flag="" percentage={16} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Traffic Sources</h3>
            <div className="space-y-3">
              <SourceRow source="Direct / Link" percentage={40} />
              <SourceRow source="Facebook" percentage={22} />
              <SourceRow source="LinkedIn" percentage={15} />
              <SourceRow source="WhatsApp" percentage={12} />
              <SourceRow source="Google Search" percentage={8} />
              <SourceRow source="Other" percentage={3} />
            </div>
          </div>
        </div>

        {/* Share CTA */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Boost your property&apos;s visibility
          </h3>
          <p className="text-slate-600 mb-4">
            Share your property page to reach more potential buyers internationally.
          </p>
          <Link
            href="/properties/bem-rakpart-26/en"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            View & Share Property Page
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, trend }: { label: string; value: string; trend?: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        {trend && (
          <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

function CountryRow({ country, flag, percentage }: { country: string; flag: string; percentage: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm w-24 text-slate-600">{flag ? `${flag} ` : ""}{country}</span>
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${percentage}%` }} />
      </div>
      <span className="text-sm font-medium text-slate-700 w-10 text-right">{percentage}%</span>
    </div>
  );
}

function SourceRow({ source, percentage }: { source: string; percentage: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm w-28 text-slate-600">{source}</span>
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${percentage}%` }} />
      </div>
      <span className="text-sm font-medium text-slate-700 w-10 text-right">{percentage}%</span>
    </div>
  );
}
