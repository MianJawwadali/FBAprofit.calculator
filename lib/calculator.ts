export interface CalculationInput {
  productName?: string;
  cogs: number;
  shipping: number;
  packaging: number;
  retailPrice: number;
  platform: "amazon" | "shopify";
  returnRate?: number; // percentage e.g. 2%
  storageMonths?: number;
  advertisingCost?: number;
}

export interface ConfigFees {
  amazonFeeRate: number; // e.g. 15%
  amazonFbaPickPackFee: number; // e.g. $4.50
  amazonMonthlyStoragePerCuFt: number; // e.g. $0.87
  shopifyStripeFee: number; // e.g. 2.9%
  shopifyFixedFeePerTx: number; // e.g. $0.30
  shopifyAppOverhead: number; // e.g. $29 allocated or flat
}

export const DEFAULT_CONFIG: ConfigFees = {
  amazonFeeRate: 15,
  amazonFbaPickPackFee: 4.5,
  amazonMonthlyStoragePerCuFt: 0.87,
  shopifyStripeFee: 2.9,
  shopifyFixedFeePerTx: 0.3,
  shopifyAppOverhead: 0,
};

export interface ProfitBreakdown {
  retailPrice: number;
  cogs: number;
  shipping: number;
  packaging: number;
  advertisingCost: number;
  platformFees: number;
  estimatedReturnCost: number;
  totalCost: number;
  netProfit: number;
  marginPercent: number;
  roiPercent: number;
}

export function calculateProfit(
  input: CalculationInput,
  config: ConfigFees = DEFAULT_CONFIG
): ProfitBreakdown {
  const retail = Math.max(0, input.retailPrice || 0);
  const cogs = Math.max(0, input.cogs || 0);
  const shipping = Math.max(0, input.shipping || 0);
  const packaging = Math.max(0, input.packaging || 0);
  const adCost = Math.max(0, input.advertisingCost || 0);
  const returnRate = Math.max(0, input.returnRate || 0);
  const storageMonths = Math.max(0, input.storageMonths || 1);

  let platformFees = 0;

  if (input.platform === "amazon") {
    const referralFee = retail * (config.amazonFeeRate / 100);
    const storageFee = config.amazonMonthlyStoragePerCuFt * storageMonths;
    platformFees = referralFee + config.amazonFbaPickPackFee + storageFee;
  } else {
    // Shopify calculation
    const gatewayFee = retail * (config.shopifyStripeFee / 100) + config.shopifyFixedFeePerTx;
    platformFees = gatewayFee + config.shopifyAppOverhead;
  }

  const estimatedReturnCost = retail * (returnRate / 100);
  const totalCost = cogs + shipping + packaging + adCost + platformFees + estimatedReturnCost;
  const netProfit = retail - totalCost;
  const marginPercent = retail > 0 ? (netProfit / retail) * 100 : 0;
  const roiPercent = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  return {
    retailPrice: Number(retail.toFixed(2)),
    cogs: Number(cogs.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    packaging: Number(packaging.toFixed(2)),
    advertisingCost: Number(adCost.toFixed(2)),
    platformFees: Number(platformFees.toFixed(2)),
    estimatedReturnCost: Number(estimatedReturnCost.toFixed(2)),
    totalCost: Number(totalCost.toFixed(2)),
    netProfit: Number(netProfit.toFixed(2)),
    marginPercent: Number(marginPercent.toFixed(2)),
    roiPercent: Number(roiPercent.toFixed(2)),
  };
}
