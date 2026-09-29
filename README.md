# E-Commerce Profit Margin Analyzer & SaaS Platform

A comprehensive, full-stack SaaS application built to help e-commerce sellers model, analyze, and optimize product profit margins across multiple platforms (Amazon FBA, Shopify, etc.). It includes real-time calculation engines, dynamic visualization charts, persistent catalog building, micro-tools, programmatic SEO landing pages, and a secure Admin Command Center.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server & Client Components)
- **Language:** TypeScript
- **Database:** MongoDB
- **Data Modeling / ODM:** [Mongoose](https://mongoosejs.com/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) with `bcryptjs` password hashing
- **Styling & UI:** Tailwind CSS, `clsx`, `tailwind-merge`, Lucide React icons
- **Data Visualization:** [Recharts](https://recharts.org/) (Donut / Pie & Bar charts)

---

## 🗄️ Database Schemas & Models

The MongoDB database is managed via Mongoose schemas defined under `/models`:

| Collection | Key Fields | Description |
| :--- | :--- | :--- |
| **`Users`** | `email`, `hashedPassword`, `role` (`user` / `admin`), `createdAt` | Manages authentication and separates standard seller accounts from administrator command access. |
| **`Calculations`** | `userId`, `productName`, `cogs`, `shipping`, `packaging`, `retailPrice`, `platform` | Stores individual product profitability models so users can build a persistent catalog across multiple SKUs. |
| **`AppConfig`** | `amazonFeeRate`, `shopifyStripeFee`, `lastUpdated` | Stores global variables managed from the Admin Dashboard to dynamically adjust platform fee calculations without redeploying code. |
| **`TrafficStats`** | `date`, `uniqueViews`, `calculationsRun`, `signups` | Feeds performance analytics and user engagement charts on the backend Admin Dashboard. |

---

## ✨ Core Features

### 1. Seller Workspace (User Interface)
- **Real-Time Margin Engine:** Instantly calculates Net Profit, Return on Investment (ROI), and Margin percentages as inputs (COGS, shipping, packaging, retail price) are adjusted.
- **Platform Context Toggles:** Easily switch calculations between **Amazon FBA** (factoring pick, pack, and storage fees) and **Shopify** (gateway percentages, transaction fees, and overhead).
- **Interactive Visual Breakdown:** Dynamic Recharts visualization showing real-time cost distribution (Manufacturing, Shipping, Platform Fees, Net Profit).
- **Persistent SKU Catalog:** Authenticated users can save and side-by-side model calculations for multiple products.

### 2. Admin Dashboard (Command Center)
- **Global Variable Control:** Interface for admins to update fee rates (Amazon FBA rates, Shopify gateway fees) dynamically.
- **Usage & Traffic Analytics:** Real-time metrics tracking total site traffic, calculations run, and conversion rates.
- **User Management:** Manage registered sellers, monitor activity, and view subscription details.

### 3. SEO & Micro-Tools Strategy
- **Programmatic Landing Pages:** Targeted routes (e.g., `/amazon-fba-calculator-for-electronics`) for long-tail search intent.
- **Un-gated Micro-Tools:** Free standalone calculators (e.g., `/tools/shopify-fee-calculator`) serving as lead magnets.
- **Structured Data:** Built-in JSON-LD (`SoftwareApplication`, `FAQPage`) for search engine rich snippets.

---

## 📁 Project Structure

```text
my-app/
├── app/                      # Next.js App Router (Pages, API Routes, Layouts)
│   ├── amazon-fba-calculator-for-electronics/  # Programmatic SEO page
│   ├── api/                  # Backend REST API Routes (Auth, Admin, Calculations)
│   └── tools/                # Un-gated micro-tools (Shopify Fee Calculator)
├── components/               # React Components
│   ├── AdminDashboard.tsx    # Admin command center UI
│   ├── SellerWorkspace.tsx   # Core profit margin calculator workspace
│   └── ...
├── lib/                      # Helper libraries & DB connections (Mongoose client)
├── models/                   # Mongoose Database Schemas (User, Calculation, AppConfig, TrafficStats)
├── public/                   # Static assets
├── .env                      # Environment configuration
├── AGENTS.md                 # System architecture and requirements document
└── package.json              # Project dependencies and scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.x or higher)
- **MongoDB** instance (local or MongoDB Atlas URI)

### 2. Environment Setup
Create a `.env.local` file in the project root and add your configuration details:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### 3. Installation
Install the project dependencies:

```bash
npm install
```

### 4. Running the Development Server
Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Compiles and builds the production application.
- `npm run start`: Runs the compiled production build.
- `npm run lint`: Executes ESLint code checks.
