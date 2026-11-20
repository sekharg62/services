/**
 * Fixed package prices (BDT). Names, features and delivery times are in the dictionaries
 * (`pricing.categories.*.plans`) — keep the same order: Starter, Business, Premium.
 *
 * ⚠️  PLACEHOLDER PRICES — replace with your real prices before going live.
 */
export type PackageCategory = "web" | "app" | "business";

export const currency = "BDT";

export const packagePrices: Record<PackageCategory, { prices: [number, number, number]; monthly: boolean; serviceIndex: number }> = {
  web: { prices: [15000, 35000, 65000], monthly: false, serviceIndex: 0 },
  app: { prices: [50000, 90000, 150000], monthly: false, serviceIndex: 1 },
  business: { prices: [10000, 18000, 30000], monthly: true, serviceIndex: 2 },
};

/** Index of the highlighted "Most popular" plan. */
export const popularPlan = 1;
