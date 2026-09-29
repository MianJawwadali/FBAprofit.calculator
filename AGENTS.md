# SaaS Project Plan: E-commerce Profit Margin Analyzer

## System Architecture & Tech Stack Implementation

* **Framework:** Next.js (App Router). Handles both the front-end React interface and the secure backend API routes. Server components manage secure database connections, while client components handle real-time slider and input updates.
* **Database:** MongoDB.
* **Data Modeling:** Mongoose.
* **Styling:** Tailwind CSS combined with shadcn/ui for a highly polished, minimalist, and accessible interface.
* **Authentication:** NextAuth.js to handle user logins and secure admin access seamlessly.

## Core Feature Specification

### 1. User-Facing Interface (The Seller's Workspace)
* **Real-Time Margin Engine:** Sellers input COGS (Cost of Goods Sold), supplier shipping rates, and packaging costs. Net profit and margin percentages update instantaneously as the target retail price is adjusted.
* **Platform Context Toggles:** One-click switches between Amazon FBA (applying pick, pack, and storage fees) and Shopify (calculating payment gateway percentages and app overhead). 
* **Persistent Catalog Building:** Authenticated users can save calculations for multiple SKUs. Sellers can model margins for different products (e.g., spatulas, storage containers, premium cookware) side-by-side to determine viability.
* **Visual Breakdown:** A minimalist donut chart or stacked bar chart that visually breaks down costs (e.g., 30% Manufacturing, 20% Shipping, 15% Platform Fees, 35% Net Profit).

### 2. Admin Dashboard (Command Center)
* **Global Variable Control:** A secure interface to edit the tool's underlying math without redeploying code (e.g., updating Amazon's FBA weight handling fees or Shopify's basic tier transaction percentages).
* **Usage Analytics:** Real-time tracking of daily visitors, total calculations executed, and the most common product categories users are modeling. 
* **Lead & User Management:** View all registered users, their subscription tiers, and last login dates, with the ability to export to a CSV for marketing campaigns.

## Mongoose Database Schema Design

| Collection | Key Fields | Purpose |
| :--- | :--- | :--- |
| `Users` | `email`, `hashedPassword`, `role` (user/admin), `createdAt` | Manages authentication and differentiates your admin account from standard sellers. |
| `Calculations` | `userId`, `productName`, `cogs`, `shipping`, `retailPrice`, `platform` | Stores individual product models so users can build a persistent catalog. |
| `AppConfig` | `amazonFeeRate`, `shopifyStripeFee`, `lastUpdated` | Stores the global variables managed in the admin dashboard. |
| `TrafficStats` | `date`, `uniqueViews`, `calculationsRun`, `signups` | Feeds the analytics charts on the backend dashboard. |

## UI/UX Strategy

* **The "Dashboard" Feel:** The user interface functions as a professional financial tool. Lock critical output numbers (Net Profit, ROI, Margin) to the side or top of the viewport so they remain visible while scrolling.
* **Progressive Disclosure:** Hide complex, granular inputs (e.g., "Estimated Return Rate" or "Storage Months") behind an "Advanced Settings" toggle to keep the initial interface clean and approachable.
* **Minimalist Palette:** Utilize a strict, clean color scheme—white backgrounds, light gray borders, dark gray text, and a single vibrant accent color (like emerald green) strictly reserved for positive profit numbers and primary call-to-action buttons. 

## SEO & Growth Strategy

* **Programmatic Landing Pages:** Utilize Next.js dynamic routing to generate specific pages targeting long-tail search intent (e.g., `/amazon-fba-calculator-for-electronics`, `/shopify-margin-calculator-for-home-decor`).
* **Micro-Tools:** Extract a small portion of the tool's logic (e.g., a "Shopify Transaction Fee Calculator") and host it on an un-gated page as a lead magnet to draw organic traffic.
* **Technical SEO:** Implement `SoftwareApplication` and `FAQPage` schema markup so search engines recognize the page as a functional tool, enabling rich snippets in search results.