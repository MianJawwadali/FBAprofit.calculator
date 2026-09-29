"use client";

import React, { useState, useEffect } from "react";
import { DEFAULT_CONFIG, ConfigFees } from "@/lib/calculator";
import { 
  ShieldCheck, 
  Users, 
  Download, 
  Save, 
  RefreshCw,
  TrendingUp,
  Activity,
  UserCheck,
  Lock,
  LogOut,
  KeyRound
} from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const [config, setConfig] = useState<ConfigFees>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [stats] = useState({
    dailyVisitors: 1420,
    totalCalculations: 8930,
    signups: 342,
  });

  const [users] = useState([
    { id: "1", email: "seller_alex@gmail.com", role: "Seller Pro", status: "Active", date: "2026-09-27" },
    { id: "2", email: "amazon_top_store@outlook.com", role: "Enterprise", status: "Active", date: "2026-09-26" },
    { id: "3", email: "fulfillment_ninja@shopify.com", role: "Free Tier", status: "Active", date: "2026-09-25" },
    { id: "4", email: "admin@ecommerce-profit.com", role: "Admin", status: "Active", date: "2026-09-20" },
  ]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/admin/config")
        .then((res) => res.json())
        .then((data) => {
          if (data.config) {
            setConfig(data.config);
          }
        })
        .catch((e) => console.error(e));
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
      } else {
        setAuthError(data.error || "Invalid username or password");
      }
    } catch (err) {
      setAuthError("Failed to connect to login server");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleSaveConfig = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      setMessage(data.message || "Global variables updated!");
    } catch (e) {
      setMessage("Failed to update config");
    } finally {
      setLoading(false);
    }
  };

  const exportUsersCSV = () => {
    const csvHeader = "Email,Role,Status,SignupDate\n";
    const csvRows = users.map((u) => `${u.email},${u.role},${u.status},${u.date}`).join("\n");
    const blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lead_users_export.csv";
    a.click();
  };

  // Render Admin Authentication Screen if not logged in
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gray-900 text-emerald-500 rounded-xl flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Admin Authentication</h2>
          <p className="text-xs text-gray-500">
            Please enter your administrator credentials to access the command center.
          </p>
        </div>

        {authError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
            {authError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-gray-400" /> Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="e.g. MFASCC@125"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-gray-400" /> Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="••••••••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg shadow-sm transition-colors"
          >
            Authenticate Admin Access
          </button>
        </form>
      </div>
    );
  }

  // Render Full Admin Command Center Dashboard once authenticated
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" /> Admin Command Center
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Authenticated as <span className="font-semibold text-gray-800">{username}</span> • Live Platform Management.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full font-mono border border-emerald-200">
            Session Secured
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg font-semibold border border-gray-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-red-600" /> Logout
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Daily Visitors</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 font-mono">{stats.dailyVisitors.toLocaleString()}</p>
          <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" /> +14.2% from last week
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Calculations Executed</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 font-mono">{stats.totalCalculations.toLocaleString()}</p>
          <span className="text-[10px] text-blue-600 font-medium">Average 6.3 calculations / seller</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Registered Leads</span>
            <UserCheck className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 font-mono">{stats.signups}</p>
          <span className="text-[10px] text-amber-600 font-medium">Ready for CSV export</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Global Control Form */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
              <Save className="w-4 h-4 text-emerald-600" /> Global Fee Rate Overrides
            </h3>
            <span className="text-xs text-gray-500 font-mono">Live Configuration Engine</span>
          </div>

          {message && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs border border-emerald-200">
              {message}
            </div>
          )}

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase text-amber-700">Amazon FBA Variables</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Referral Fee Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={config.amazonFeeRate}
                  onChange={(e) => setConfig({ ...config, amazonFeeRate: Number(e.target.value) })}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-gray-900 font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Pick & Pack Fee ($)</label>
                <input
                  type="number"
                  step="0.1"
                  value={config.amazonFbaPickPackFee}
                  onChange={(e) => setConfig({ ...config, amazonFbaPickPackFee: Number(e.target.value) })}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-gray-900 font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Storage / Cu.Ft ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={config.amazonMonthlyStoragePerCuFt}
                  onChange={(e) => setConfig({ ...config, amazonMonthlyStoragePerCuFt: Number(e.target.value) })}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-gray-900 font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <h4 className="text-xs font-bold uppercase text-emerald-700 pt-2 border-t border-gray-200">
              Shopify & Payment Gateway Variables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Stripe Gateway % Rate</label>
                <input
                  type="number"
                  step="0.1"
                  value={config.shopifyStripeFee}
                  onChange={(e) => setConfig({ ...config, shopifyStripeFee: Number(e.target.value) })}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-gray-900 font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Fixed Fee per Transaction ($)</label>
                <input
                  type="number"
                  step="0.05"
                  value={config.shopifyFixedFeePerTx}
                  onChange={(e) => setConfig({ ...config, shopifyFixedFeePerTx: Number(e.target.value) })}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-gray-900 font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSaveConfig}
            disabled={loading}
            className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save & Publish Fee Rules
          </button>
        </div>

        {/* Lead Table */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-emerald-600" /> Lead & User Directory
            </h3>
            <button
              onClick={exportUsersCSV}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-md flex items-center gap-1.5 font-medium transition-colors border border-gray-300"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" /> Export CSV
            </button>
          </div>

          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex justify-between items-center text-xs">
                <div>
                  <p className="font-semibold text-gray-900">{u.email}</p>
                  <span className="text-[10px] text-gray-500">Joined {u.date}</span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-gray-200 text-gray-800 font-mono block mb-1">
                    {u.role}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium">{u.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
