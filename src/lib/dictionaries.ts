import "server-only";
import type { Locale } from "./i18n";
import type en from "@/content/dictionaries/en.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/content/dictionaries/en.json").then((m) => m.default),
  bn: () => import("@/content/dictionaries/bn.json").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
