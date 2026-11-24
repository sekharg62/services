"use client";

import { AppWindow, Check, Clock, Code2, TrendingUp } from "lucide-react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { currency, packagePrices, popularPlan, type PackageCategory } from "@/content/packages";
import { prefillContact } from "@/lib/contactPrefill";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

const categories: { id: PackageCategory; icon: typeof Code2 }[] = [
  { id: "web", icon: Code2 },
  { id: "app", icon: AppWindow },
  { id: "business", icon: TrendingUp },
];

export function Pricing({ dict, lang, whatsapp }: { dict: Dictionary["pricing"]; lang: Locale; whatsapp: Dictionary["whatsapp"] }) {
  const [category, setCategory] = useState<PackageCategory>("web");
  const cat = dict.categories[category];
  const config = packagePrices[category];

  const money = (n: number) =>
    new Intl.NumberFormat(lang === "bn" ? "bn-BD" : "en-BD", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
  const messageFor = (i: number) =>
    dict.message
      .replace("{plan}", cat.plans[i].name)
      .replace("{category}", cat.label)
      .replace("{price}", money(config.prices[i]) + (config.monthly ? dict.perMonth : ""));

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeading eyebrow={dict.eyebrow} title={dict.heading} intro={dict.intro} />

      <div role="tablist" aria-label={dict.heading} className="mx-auto mt-10 grid w-full max-w-md grid-cols-3 gap-1 rounded-lg border border-gold-400/20 bg-ink-900 p-1 sm:flex sm:w-fit sm:max-w-none sm:rounded-lg">
        {categories.map(({ id, icon: Icon }) => {
          const on = id === category;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={on}
              aria-controls="pricing-plans"
              onClick={() => setCategory(id)}
              className={`flex min-w-0 flex-col items-center justify-center gap-1.5 rounded-md px-1.5 py-2.5 text-center text-xs leading-tight transition sm:flex-row sm:gap-2 sm:rounded-md sm:px-5 sm:text-sm ${
                on ? "bg-gold-gradient font-semibold text-ink-950" : "text-ink-300 hover:text-gold-200"
              }`}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              <span className="sm:whitespace-nowrap">{dict.categories[id].label}</span>
            </button>
          );
        })}
      </div>

      <ul id="pricing-plans" role="tabpanel" key={category} className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        {cat.plans.map((plan, i) => {
          const popular = i === popularPlan;
          return (
            <li
              key={plan.name}
              style={{ animationDelay: `${i * 90}ms` }}
              className={`relative flex animate-fade-in flex-col rounded-lg border p-8 transition duration-300 hover:-translate-y-1 ${
                popular
                  ? "border-gold-400/70 bg-gradient-to-b from-ink-800 to-ink-900 shadow-2xl shadow-gold-500/10 lg:-my-3 lg:py-11"
                  : "border-gold-400/15 bg-ink-900 hover:border-gold-400/40"
              }`}
            >
              {popular && (
                <span className="bg-gold-gradient absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-sm px-4 py-1 text-xs font-semibold tracking-wide whitespace-nowrap text-ink-950">
                  {dict.popular}
                </span>
              )}
              <h3 className="text-xl font-semibold text-ink-50">{plan.name}</h3>
              <p className="mt-2 min-h-12 text-sm leading-relaxed text-ink-400">{plan.description}</p>

              <p className="mt-6 flex items-baseline gap-1">
                <span className={`font-display text-4xl font-semibold tabular-nums ${popular ? "text-gold-gradient" : "text-ink-50"}`}>
                  {money(config.prices[i])}
                </span>
                {config.monthly && <span className="text-sm text-ink-400">{dict.perMonth}</span>}
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-400">
                <Clock className="size-3.5 text-gold-400" aria-hidden />
                {dict.delivery}: <span className="text-ink-300">{plan.delivery}</span>
              </p>

              <ul className="mt-6 flex-1 space-y-3 border-t border-gold-400/15 pt-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink-100">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => prefillContact({ serviceIndex: config.serviceIndex, message: messageFor(i) })}
                className={`mt-8 w-full rounded-md px-6 py-3 text-sm font-semibold tracking-[0.15em] uppercase transition ${
                  popular
                    ? "bg-gold-gradient text-ink-950 shadow-lg shadow-gold-500/20 hover:brightness-110"
                    : "border border-gold-400/40 text-gold-200 hover:border-gold-300 hover:bg-gold-400/10"
                }`}
              >
                {dict.cta}
              </button>
              <a
                href={whatsappLink(messageFor(i))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 text-sm text-[#4ade80] transition hover:text-[#25d366]"
              >
                <SiWhatsapp className="size-4" aria-hidden />
                {whatsapp.ask}
              </a>
            </li>
          );
        })}
      </ul>

      <p className="mt-12 text-center text-sm text-ink-400">
        {dict.custom}{" "}
        <a href="#contact" className="font-semibold text-gold-300 underline-offset-4 hover:underline">
          {dict.customCta} →
        </a>
      </p>
    </section>
  );
}
