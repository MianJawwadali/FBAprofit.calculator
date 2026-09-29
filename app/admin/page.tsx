"use client";

import React from "react";
import AdminDashboard from "@/components/AdminDashboard";
import Link from "next/link";
import { Shield, ArrowLeft, ExternalLink } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
      {/* Admin Host Top Bar */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center text-white font-bold shadow-sm">
              <Shield className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-base leading-none">Admin Command Host</h1>
              <span className="text-[10px] text-gray-500 font-mono">Restricted Management Console</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-semibold text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-300 bg-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Seller Workspace
            </Link>
          </div>
        </div>
      </header>

      {/* Admin Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDashboard />
      </main>

      <footer className="border-t border-gray-200 py-6 mt-12 bg-white text-gray-500 text-xs text-center">
        <p>© 2026 MarginPro Admin Host. Isolated Management Infrastructure.</p>
      </footer>
    </div>
  );
}
