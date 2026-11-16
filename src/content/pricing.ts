/**
 * Price list used by the project estimator (amounts in BDT).
 *
 * ⚠️  PLACEHOLDER NUMBERS — replace with your real prices before going live.
 *     Every range is [minimum, maximum].
 */
export type ProjectType = "web" | "app" | "business";
export type AddonId =
  | "ecommerce" | "accounts" | "bilingual" | "cms" | "seo"
  | "bothPlatforms" | "push" | "admin"
  | "branding" | "social" | "ads";

type Range = readonly [number, number];

export type PlanConfig = {
  /** Fixed starting price (covers `includedUnits`). */
  base: Range;
  /** Price for each unit above `includedUnits` (page / screen / month). */
  perUnit: Range;
  includedUnits: number;
  units: { min: number; max: number; initial: number };
  /** Timeline: weeks for web/app, months for business. */
  time: { unit: "weeks" | "months"; base: number; perUnit: number };
  addons: { id: AddonId; price: Range; time?: number; perUnit?: boolean }[];
};

export const currency = "BDT";

export const pricing: Record<ProjectType, PlanConfig> = {
  web: {
    base: [12000, 20000],
    perUnit: [1600, 2800],
    includedUnits: 1,
    units: { min: 1, max: 30, initial: 5 },
    time: { unit: "weeks", base: 2, perUnit: 0.2 },
    addons: [
      { id: "ecommerce", price: [20000, 36000], time: 2 },
      { id: "accounts", price: [9600, 16000], time: 1 },
      { id: "cms", price: [8000, 14400], time: 1 },
      { id: "bilingual", price: [4800, 9600], time: 0.5 },
      { id: "seo", price: [4800, 9600], time: 0.5 },
    ],
  },
  app: {
    base: [48000, 80000],
    perUnit: [3200, 5600],
    includedUnits: 5,
    units: { min: 3, max: 40, initial: 10 },
    time: { unit: "weeks", base: 5, perUnit: 0.3 },
    addons: [
      { id: "bothPlatforms", price: [24000, 40000], time: 2 },
      { id: "accounts", price: [12000, 20000], time: 1 },
      { id: "ecommerce", price: [16000, 28000], time: 1.5 },
      { id: "admin", price: [20000, 32000], time: 2 },
      { id: "push", price: [6400, 12000], time: 0.5 },
    ],
  },
  business: {
    base: [0, 0],
    perUnit: [12000, 24000],
    includedUnits: 0,
    units: { min: 1, max: 12, initial: 3 },
    time: { unit: "months", base: 0, perUnit: 1 },
    addons: [
      { id: "branding", price: [16000, 32000] },
      { id: "social", price: [8000, 16000], perUnit: true },
      { id: "ads", price: [6400, 12000], perUnit: true },
      { id: "seo", price: [6400, 12000], perUnit: true },
    ],
  },
};

export function estimate(type: ProjectType, units: number, addons: AddonId[]) {
  const plan = pricing[type];
  const extra = Math.max(0, units - plan.includedUnits);
  let min = plan.base[0] + extra * plan.perUnit[0];
  let max = plan.base[1] + extra * plan.perUnit[1];
  let time = plan.time.base + units * plan.time.perUnit;
  for (const a of plan.addons) {
    if (!addons.includes(a.id)) continue;
    const k = a.perUnit ? units : 1;
    min += a.price[0] * k;
    max += a.price[1] * k;
    time += a.time ?? 0;
  }
  const round = (n: number) => Math.round(n / 1000) * 1000;
  return { min: round(min), max: round(max), time: Math.ceil(time), timeUnit: plan.time.unit };
}
