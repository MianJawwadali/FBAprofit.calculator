"use client";

import React from "react";
import SellerWorkspace from "@/components/SellerWorkspace";
import Link from "next/link";
import { Calculator, ArrowUpRight, Shield } from "lucide-react";

export default function MainPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
      {/* Top Navbar */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-sm">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-base leading-none">MarginPro Seller Workspace</h1>
              <span className="text-[10px] text-gray-500 font-mono">E-commerce Profit Analyzer</span>
            </div>
          </div>

          {/* Separate Host Navigation Links */}
          <div className="flex items-center gap-6 text-xs font-semibold text-gray-600">
            <Link href="/admin" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-300 bg-gray-50">
              <Shield className="w-3.5 h-3.5 text-emerald-600" /> Admin Host Dashboard
            </Link>
            <div className="hidden md:flex items-center gap-4 text-xs font-medium text-gray-500 border-l border-gray-200 pl-4">
              <Link href="/amazon-fba-calculator-for-electronics" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                FBA Electronics <ArrowUpRight className="w-3 h-3" />
              </Link>
              <Link href="/shopify-margin-calculator-for-home-decor" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                Shopify Decor <ArrowUpRight className="w-3 h-3" />
              </Link>
              <Link href="/tools/shopify-fee-calculator" className="hover:text-amber-600 transition-colors flex items-center gap-1 font-semibold text-gray-700">
                Free Micro-Tool
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SellerWorkspace />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-12 bg-white text-gray-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 E-commerce Profit Margin Analyzer SaaS. Seller Workspace Host.</p>
          <div className="flex gap-4">
            <Link href="/admin" className="hover:underline text-emerald-600 font-medium">Admin Dashboard Host</Link>
            <Link href="/amazon-fba-calculator-for-electronics" className="hover:underline">Amazon Calculator</Link>
            <Link href="/shopify-margin-calculator-for-home-decor" className="hover:underline">Shopify Calculator</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
