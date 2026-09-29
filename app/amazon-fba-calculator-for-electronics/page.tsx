import React from "react";
import Link from "next/link";
import { calculateProfit, DEFAULT_CONFIG } from "@/lib/calculator";
import { Calculator, ShoppingBag, ArrowLeft, CheckCircle2 } from "lucide-react";
import Metadata from "next";

export const metadata = {
  title: "Amazon FBA Calculator for Electronics | Profit Margin Analyzer",
  description: "Calculate net profit margins, Amazon FBA referral fees, pick and pack rates, and ROI specifically tailored for selling consumer electronics on Amazon.",
};

export default function ElectronicsFbaPage() {
  const sampleCalculations = [
    { name: "Wireless Bluetooth Earbuds", retail: 49.99, cogs: 12.5, shipping: 3.0, packaging: 1.0 },
    { name: "Fast USB-C Charger Hub", retail: 29.99, cogs: 6.8, shipping: 2.2, packaging: 0.8 },
    { name: "Smart Fitness Watch", retail: 89.99, cogs: 24.0, shipping: 4.5, packaging: 1.5 },
  ];

  // Technical SEO Schema Markup (SoftwareApplication & FAQPage)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Amazon FBA Electronics Margin Calculator",
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the standard Amazon FBA referral fee for electronics?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The referral fee for Consumer Electronics on Amazon is typically 8% for items priced above $100 and 15% for items priced below $100."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Workspace
        </Link>

        <div className="space-y-3 border-b border-slate-800 pb-6">
          <span className="px-3 py-1 bg-amber-950 text-amber-300 rounded-full text-xs font-mono border border-amber-800/60">
            Programmatic SEO Landing Page
          </span>
          <h1 className="text-3xl font-extrabold text-white">Amazon FBA Margin Calculator for Electronics</h1>
          <p className="text-slate-400 text-sm">
            Modeled specifically for consumer technology sellers needing precise breakdown of Amazon referral fees, FBA storage, return allocations, and target ROI.
          </p>
        </div>

        {/* Dynamic Sample SKU Table */}
        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" /> Electronics SKU Margin Models
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleCalculations.map((item, i) => {
              const res = calculateProfit({
                cogs: item.cogs,
                shipping: item.shipping,
                packaging: item.packaging,
                retailPrice: item.retail,
                platform: "amazon",
              });
              return (
                <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="font-semibold text-slate-200 text-sm">{item.name}</h3>
                  <div className="text-xs text-slate-400 space-y-1">
                    <p>Retail Price: <span className="text-slate-200 font-mono">${item.retail}</span></p>
                    <p>FBA Fees: <span className="text-amber-400 font-mono">${res.platformFees}</span></p>
                    <p>Net Profit: <span className="text-emerald-400 font-mono font-bold">${res.netProfit}</span></p>
                    <p>Margin: <span className="text-emerald-400 font-mono">{res.marginPercent}%</span></p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="font-semibold text-white">Why Use MarginPro for Electronics FBA?</h3>
          <ul className="text-xs text-slate-400 space-y-2">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-time pick, pack, and storage fee calculations</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Accounts for electronic return rate buffers</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Side-by-side comparison with Shopify store sales</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
