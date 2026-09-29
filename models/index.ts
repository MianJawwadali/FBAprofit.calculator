import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  hashedPassword?: string;
  name?: string;
  role: "user" | "admin";
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String },
  name: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export interface ICalculation extends Document {
  userId?: string;
  productName: string;
  cogs: number;
  shipping: number;
  packaging: number;
  retailPrice: number;
  platform: "amazon" | "shopify";
  advancedSettings: {
    returnRate: number; // e.g. percentage
    storageMonths: number;
    advertisingCost: number;
  };
  results: {
    netProfit: number;
    marginPercent: number;
    roi: number;
    totalCost: number;
    platformFees: number;
  };
  createdAt: Date;
}

const CalculationSchema = new Schema<ICalculation>({
  userId: { type: String },
  productName: { type: String, required: true },
  cogs: { type: Number, required: true },
  shipping: { type: Number, required: true },
  packaging: { type: Number, default: 0 },
  retailPrice: { type: Number, required: true },
  platform: { type: String, enum: ["amazon", "shopify"], required: true },
  advancedSettings: {
    returnRate: { type: Number, default: 2 },
    storageMonths: { type: Number, default: 1 },
    advertisingCost: { type: Number, default: 0 },
  },
  results: {
    netProfit: { type: Number, required: true },
    marginPercent: { type: Number, required: true },
    roi: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    platformFees: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

export const Calculation: Model<ICalculation> =
  mongoose.models.Calculation || mongoose.model<ICalculation>("Calculation", CalculationSchema);

export interface IAppConfig extends Document {
  amazonFeeRate: number; // percentage e.g. 15
  amazonFbaPickPackFee: number; // fixed fee e.g. 4.5
  amazonMonthlyStoragePerCuFt: number; // e.g. 0.87
  shopifyStripeFee: number; // percentage e.g. 2.9
  shopifyFixedFeePerTx: number; // e.g. 0.30
  shopifyAppOverhead: number; // e.g. 29.0
  lastUpdated: Date;
}

const AppConfigSchema = new Schema<IAppConfig>({
  amazonFeeRate: { type: Number, default: 15 },
  amazonFbaPickPackFee: { type: Number, default: 4.5 },
  amazonMonthlyStoragePerCuFt: { type: Number, default: 0.87 },
  shopifyStripeFee: { type: Number, default: 2.9 },
  shopifyFixedFeePerTx: { type: Number, default: 0.30 },
  shopifyAppOverhead: { type: Number, default: 29.0 },
  lastUpdated: { type: Date, default: Date.now },
});

export const AppConfig: Model<IAppConfig> =
  mongoose.models.AppConfig || mongoose.model<IAppConfig>("AppConfig", AppConfigSchema);

export interface ITrafficStats extends Document {
  date: string; // YYYY-MM-DD
  uniqueViews: number;
  calculationsRun: number;
  signups: number;
  topCategories: Map<string, number>;
}

const TrafficStatsSchema = new Schema<ITrafficStats>({
  date: { type: String, required: true, unique: true },
  uniqueViews: { type: Number, default: 0 },
  calculationsRun: { type: Number, default: 0 },
  signups: { type: Number, default: 0 },
  topCategories: { type: Map, of: Number, default: {} },
});

export const TrafficStats: Model<ITrafficStats> =
  mongoose.models.TrafficStats || mongoose.model<ITrafficStats>("TrafficStats", TrafficStatsSchema);
