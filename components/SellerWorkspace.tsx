"use client";

import React, { useState, useMemo } from "react";
import { calculateProfit, CalculationInput, DEFAULT_CONFIG } from "@/lib/calculator";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from "recharts";
import { 
  Calculator, 
  ShoppingBag, 
  Package, 
  Truck, 
  Tag, 
  Plus, 
  Trash2, 
  Sliders, 
  DollarSign, 
  Settings, 
  BarChart2,
  TrendingUp
} from "lucide-react";

interface CatalogItem extends CalculationInput {
  id: string;
  netProfit: number;
  marginPercent: number;
  roiPercent: number;
}

export default function SellerWorkspace() {
  const [platform, setPlatform] = useState<"amazon" | "shopify">("amazon");
  const [productName, setProductName] = useState<string>("Premium Kitchen Spatula");
  const [cogs, setCogs] = useState<number>(8.5);
  const [shipping, setShipping] = useState<number>(3.2);
  const [packaging, setPackaging] = useState<number>(1.1);
  const [retailPrice, setRetailPrice] = useState<number>(29.99);

  // Advanced toggles & settings
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [returnRate, setReturnRate] = useState<number>(2.5);
  const [storageMonths, setStorageMonths] = useState<number>(1);
  const [advertisingCost, setAdvertisingCost] = useState<number>(3.5);

  // Saved Catalog State
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);

  const currentInput: CalculationInput = useMemo(
    () => ({
      productName,
      cogs,
      shipping,
      packaging,
      retailPrice,
      platform,
      returnRate,
      storageMonths,
      advertisingCost,
    }),
    [productName, cogs, shipping, packaging, retailPrice, platform, returnRate, storageMonths, advertisingCost]
  );

  const results = useMemo(() => calculateProfit(currentInput, DEFAULT_CONFIG), [currentInput]);

  const pieData = useMemo(() => {
    return [
      { name: "COGS", value: results.cogs, color: "#6b7280" },
      { name: "Shipping & Pkg", value: Number((results.shipping + results.packaging).toFixed(2)), color: "#9ca3af" },
      { name: "Platform Fees", value: results.platformFees, color: "#d97706" },
      { name: "Ads & Returns", value: Number((results.advertisingCost + results.estimatedReturnCost).toFixed(2)), color: "#8b5cf6" },
      { name: "Net Profit", value: Math.max(0, results.netProfit), color: "#10b981" },
    ].filter((item) => item.value > 0);
  }, [results]);

  const handleSaveToCatalog = async () => {
    const newItem: CatalogItem = {
      id: Date.now().toString(),
      ...currentInput,
      netProfit: results.netProfit,
      marginPercent: results.marginPercent,
      roiPercent: results.roiPercent,
    };
    setCatalog((prev) => [newItem, ...prev]);

    try {
      await fetch("/api/calculations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          cogs,
          shipping,
          packaging,
          retailPrice,
          platform,
          advancedSettings: { returnRate, storageMonths, advertisingCost },
          results: {
            netProfit: results.netProfit,
            marginPercent: results.marginPercent,
            roi: results.roiPercent,
            totalCost: results.totalCost,
            platformFees: results.platformFees,
          },
        }),
      });
    } catch (e) {
      console.error("Failed to sync calculation", e);
    }
  };

  const handleRemoveFromCatalog = (id: string) => {
    setCatalog((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-600" />
            Seller Profit Margin Workspace
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Model product margins with real-time fee calculations.
          </p>
        </div>

        {/* Platform Switches */}
        <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
          <button
            onClick={() => setPlatform("amazon")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-sm transition-colors ${
              platform === "amazon"
                ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-600" />
            Amazon FBA
          </button>
          <button
            onClick={() => setPlatform("shopify")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-sm transition-colors ${
              platform === "shopify"
                ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Tag className="w-4 h-4 text-emerald-600" />
            Shopify Store
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
                <Sliders className="w-4 h-4 text-gray-600" /> SKU Input Variables
              </h3>
              <span className="text-xs px-2.5 py-1 rounded bg-gray-100 text-gray-600 font-mono">
                {platform === "amazon" ? "Amazon Fees" : "Shopify / Stripe Fees"}
              </span>
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Product Title / SKU</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="e.g. Silicone Spatula Set"
              />
            </div>

            {/* Target Retail Price */}
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center text-sm">
                <label className="font-semibold text-gray-800 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600" /> Target Retail Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={retailPrice}
                  onChange={(e) => setRetailPrice(Number(e.target.value))}
                  className="w-24 bg-white border border-gray-300 rounded-md px-2 py-1 text-right text-emerald-600 font-mono font-bold text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <input
                type="range"
                min="1"
                max="300"
                step="0.5"
                value={retailPrice}
                onChange={(e) => setRetailPrice(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* COGS, Shipping, Packaging */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-gray-500" /> COGS ($)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={cogs}
                  onChange={(e) => setCogs(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-gray-500" /> Shipping ($)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={shipping}
                  onChange={(e) => setShipping(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-gray-500" /> Packaging ($)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={packaging}
                  onChange={(e) => setPackaging(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Progressive Disclosure: Advanced Settings Toggle */}
            <div className="pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
              >
                <Settings className="w-3.5 h-3.5" />
                {showAdvanced ? "Hide Advanced Settings" : "+ Advanced Settings (Return rate, Ads, Storage)"}
              </button>

              {showAdvanced && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-700 mb-1 font-medium">Return Rate (%)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={returnRate}
                      onChange={(e) => setReturnRate(Number(e.target.value))}
                      className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 font-medium">Storage (Months)</label>
                    <input
                      type="number"
                      step="1"
                      value={storageMonths}
                      onChange={(e) => setStorageMonths(Number(e.target.value))}
                      className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 font-medium">Ad Spend / Unit ($)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={advertisingCost}
                      onChange={(e) => setAdvertisingCost(Number(e.target.value))}
                      className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-gray-900"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleSaveToCatalog}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" /> Save Model to Catalog
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Output Panel */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            {/* Top KPI Metrics Banner */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200">
                <span className="text-xs text-gray-500 block font-medium">Net Profit</span>
                <span
                  className={`text-xl font-extrabold font-mono ${
                    results.netProfit >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  ${results.netProfit.toFixed(2)}
                </span>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200">
                <span className="text-xs text-gray-500 block font-medium">Margin</span>
                <span
                  className={`text-xl font-extrabold font-mono ${
                    results.marginPercent >= 15
                      ? "text-emerald-600"
                      : results.marginPercent >= 0
                      ? "text-amber-600"
                      : "text-red-600"
                  }`}
                >
                  {results.marginPercent}%
                </span>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200">
                <span className="text-xs text-gray-500 block font-medium">ROI</span>
                <span className="text-xl font-extrabold text-blue-600 font-mono">
                  {results.roiPercent}%
                </span>
              </div>
            </div>

            {/* Visual Breakdown Donut Chart */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-emerald-600" /> Cost vs. Profit Breakdown
                </h4>
                <span className="text-xs text-gray-500">Retail: ${results.retailPrice}</span>
              </div>
              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [`$${val ?? 0}`, "Amount"]}
                      contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb", color: "#111827" }}
                    />
                    <Legend iconSize={8} wrapperStyle={{ fontSize: "11px", color: "#4b5563" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Cost Summary */}
            <div className="text-xs space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Platform Fees ({platform.toUpperCase()})</span>
                <span className="font-mono text-amber-700 font-semibold">${results.platformFees}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total Manufacturing & Shipping</span>
                <span className="font-mono text-gray-900 font-medium">
                  ${(results.cogs + results.shipping + results.packaging).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-900 border-t border-gray-200 pt-2 font-bold">
                <span>Total Cost Burden</span>
                <span className="font-mono">${results.totalCost}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Table */}
      {catalog.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" /> Saved Product Models ({catalog.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-700 text-xs uppercase font-bold">
                <tr>
                  <th className="p-3">SKU Name</th>
                  <th className="p-3">Platform</th>
                  <th className="p-3">Retail Price</th>
                  <th className="p-3">COGS</th>
                  <th className="p-3">Net Profit</th>
                  <th className="p-3">Margin %</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {catalog.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-medium text-gray-900">{item.productName || "Untitled SKU"}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-xs uppercase font-mono border ${item.platform === "amazon" ? "bg-amber-50 text-amber-800 border-amber-200" : "bg-emerald-50 text-emerald-800 border-emerald-200"}`}>
                        {item.platform}
                      </span>
                    </td>
                    <td className="p-3 font-mono">${item.retailPrice}</td>
                    <td className="p-3 font-mono">${item.cogs}</td>
                    <td className={`p-3 font-mono font-bold ${item.netProfit >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      ${item.netProfit}
                    </td>
                    <td className="p-3 font-mono">{item.marginPercent}%</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleRemoveFromCatalog(item.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
