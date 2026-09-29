import React from "react";
import Link from "next/link";
import { calculateProfit, DEFAULT_CONFIG } from "@/lib/calculator";
import { Tag, ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Shopify Margin Calculator for Home Decor | E-commerce Profit Engine",
  description: "Calculate net margins, Stripe transaction fees, ad spend buffers, and shipping costs for home decor e-commerce brands on Shopify.",
};

export default function ShopifyHomeDecorPage() {
  const sampleCalculations = [
    { name: "Ceramic Minimalist Vase", retail: 38.0, cogs: 7.2, shipping: 4.5, packaging: 1.8 },
    { name: "Linen Throw Pillow Set", retail: 54.0, cogs: 11.0, shipping: 3.8, packaging: 1.2 },
    { name: "Handcrafted Scented Candle", retail: 26.0, cogs: 4.5, shipping: 3.0, packaging: 0.9 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Workspace
        </Link>

        <div className="space-y-3 border-b border-slate-800 pb-6">
          <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-full text-xs font-mono border border-emerald-800/60">
            Programmatic SEO Landing Page
          </span>
          <h1 className="text-3xl font-extrabold text-white">Shopify Margin Calculator for Home Decor</h1>
          <p className="text-slate-400 text-sm">
            Model accurate net profits for Shopify store owners in the Home & Kitchen niche, taking payment gateway percentages and marketing overhead into account.
          </p>
        </div>

        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Tag className="w-5 h-5 text-emerald-400" /> Home Decor SKU Profit Benchmarks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleCalculations.map((item, i) => {
              const res = calculateProfit({
                cogs: item.cogs,
                shipping: item.shipping,
                packaging: item.packaging,
                retailPrice: item.retail,
                platform: "shopify",
              });
              return (
                <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="font-semibold text-slate-200 text-sm">{item.name}</h3>
                  <div className="text-xs text-slate-400 space-y-1">
                    <p>Retail Price: <span className="text-slate-200 font-mono">${item.retail}</span></p>
                    <p>Shopify/Stripe Fee: <span className="text-amber-400 font-mono">${res.platformFees}</span></p>
                    <p>Net Profit: <span className="text-emerald-400 font-mono font-bold">${res.netProfit}</span></p>
                    <p>Margin: <span className="text-emerald-400 font-mono">{res.marginPercent}%</span></p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
