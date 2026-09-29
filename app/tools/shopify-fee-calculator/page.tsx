"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DEFAULT_CONFIG } from "@/lib/calculator";
import { ArrowLeft, Tag, DollarSign, Calculator } from "lucide-react";

export default function MicroToolShopifyFees() {
  const [salePrice, setSalePrice] = useState<number>(50.0);
  const stripePercent = DEFAULT_CONFIG.shopifyStripeFee; // 2.9%
  const fixedFee = DEFAULT_CONFIG.shopifyFixedFeePerTx; // $0.30

  const totalFee = Number(((salePrice * stripePercent) / 100 + fixedFee).toFixed(2));
  const netAmount = Number((salePrice - totalFee).toFixed(2));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans flex flex-col items-center justify-center">
      <div className="max-w-xl w-full space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Full Margin Workspace
        </Link>

        <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 space-y-6 shadow-2xl backdrop-blur-md">
          <div className="space-y-2 text-center">
            <span className="px-3 py-1 bg-amber-950 text-amber-300 rounded-full text-xs font-mono border border-amber-800/60">
              Un-gated Lead Magnet Micro-Tool
            </span>
            <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <Tag className="w-6 h-6 text-emerald-400" /> Shopify Transaction Fee Calculator
            </h1>
            <p className="text-xs text-slate-400">
              Instant calculation of Shopify Payments & Stripe fees per transaction.
            </p>
          </div>

          <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
            <label className="block text-xs font-medium text-slate-300 flex items-center justify-between">
              <span>Transaction Amount ($)</span>
              <span className="text-emerald-400 font-mono text-base font-bold">${salePrice}</span>
            </label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 font-mono text-lg focus:outline-none focus:border-emerald-500"
            />
            <input
              type="range"
              min="5"
              max="500"
              value={salePrice}
              onChange={(e) => setSalePrice(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block">Gateway Fee ({stripePercent}% + ${fixedFee})</span>
              <span className="text-xl font-bold text-amber-400 font-mono">${totalFee}</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block">You Keep</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">${netAmount}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-center space-y-3">
            <p className="text-xs text-slate-400">Need to calculate complete product margins including COGS & shipping?</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 py-2.5 px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
            >
              <Calculator className="w-4 h-4" /> Open Full E-commerce Analyzer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
