"use client";

import { AppWindow, Check, Code2, Send, TrendingUp } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTween } from "@/components/ui/useTween";
import { currency, estimate, pricing, type AddonId, type ProjectType } from "@/content/pricing";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export const ESTIMATE_EVENT = "estimate:apply";
export type EstimateDetail = { serviceIndex: number; message: string };

const types: { id: ProjectType; icon: typeof Code2; serviceIndex: number }[] = [
  { id: "web", icon: Code2, serviceIndex: 0 },
  { id: "app", icon: AppWindow, serviceIndex: 1 },
  { id: "business", icon: TrendingUp, serviceIndex: 2 },
];

export function Estimator({ dict, lang }: { dict: Dictionary["estimator"]; lang: Locale }) {
  const [type, setType] = useState<ProjectType>("web");
  const [units, setUnits] = useState(pricing.web.units.initial);
  const [addons, setAddons] = useState<AddonId[]>([]);

  const plan = pricing[type];
  const result = estimate(type, units, addons);
  const min = useTween(result.min);
  const max = useTween(result.max);
  const time = useTween(result.time);

  const locale = lang === "bn" ? "bn-BD" : "en-BD";
  const money = (n: number) =>
    new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(Math.round(n / 1000) * 1000);
  const num = (n: number) => new Intl.NumberFormat(locale).format(Math.round(n));
  const timeLabel = result.timeUnit === "weeks" ? dict.result.weeks : dict.result.months;

  const chooseType = (t: ProjectType) => {
    setType(t);
    setUnits(pricing[t].units.initial);
    setAddons([]);
  };
  const toggle = (id: AddonId) => setAddons((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const send = () => {
    const message = dict.result.message
      .replace("{type}", dict.types[type].label)
      .replace("{size}", num(units))
      .replace("{unit}", dict.types[type].unit)
      .replace("{features}", addons.length ? addons.map((a) => dict.addons[a]).join(", ") : dict.result.none)
      .replace("{price}", `${money(result.min)} – ${money(result.max)}`)
      .replace("{time}", `${num(result.time)} ${timeLabel}`);
    const serviceIndex = types.find((t) => t.id === type)!.serviceIndex;
    window.dispatchEvent(new CustomEvent<EstimateDetail>(ESTIMATE_EVENT, { detail: { serviceIndex, message } }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const pct = ((units - plan.units.min) / (plan.units.max - plan.units.min)) * 100;
  const stepTitle = "flex items-center gap-3 font-display text-lg text-ink-50";
  const stepNum = "flex size-7 items-center justify-center rounded-full border border-gold-400/50 font-sans text-xs text-gold-300";

  return (
    <section id="estimate" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeading eyebrow={dict.eyebrow} title={dict.heading} intro={dict.intro} />

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-10 rounded-3xl border border-gold-400/15 bg-ink-900 p-6 sm:p-10">
          {/* 1. type */}
          <fieldset>
            <legend className={stepTitle}><span className={stepNum}>1</span>{dict.steps.type}</legend>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {types.map(({ id, icon: Icon }) => {
                const on = id === type;
                return (
                  <label
                    key={id}
                    className={`flex cursor-pointer flex-col items-center gap-3 rounded-2xl border p-5 text-center transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold-400 ${
                      on ? "border-gold-400/70 bg-gold-400/10" : "border-gold-400/15 hover:border-gold-400/40"
                    }`}
                  >
                    <input type="radio" name="type" value={id} checked={on} onChange={() => chooseType(id)} className="sr-only" />
                    <span className={`flex size-12 items-center justify-center rounded-full transition ${on ? "bg-gold-400 text-ink-950" : "border border-gold-400/40 text-gold-300"}`}>
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className={`font-semibold ${on ? "text-gold-200" : "text-ink-100"}`}>{dict.types[id].label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* 2. size */}
          <div>
            <label htmlFor="units" className={stepTitle}><span className={stepNum}>2</span>{dict.steps.size}</label>
            <div className="mt-6 flex items-center gap-5">
              <input
                id="units"
                type="range"
                min={plan.units.min}
                max={plan.units.max}
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, var(--color-gold-400) ${pct}%, var(--color-ink-700) ${pct}%)` }}
                className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-gold-300 [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold-300 [&::-webkit-slider-thumb]:shadow-[0_0_0_6px_rgba(212,175,55,0.2)]"
              />
              <output htmlFor="units" className="w-28 shrink-0 text-right">
                <span className="font-display text-3xl text-gold-300">{num(units)}</span>{" "}
                <span className="text-sm text-ink-400">{dict.types[type].unit}</span>
              </output>
            </div>
          </div>

          {/* 3. add-ons */}
          <fieldset>
            <legend className={stepTitle}><span className={stepNum}>3</span>{dict.steps.features}</legend>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {plan.addons.map(({ id }) => {
                const on = addons.includes(id);
                return (
                  <label
                    key={id}
                    className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold-400 ${
                      on ? "border-gold-400 bg-gold-400 font-semibold text-ink-950" : "border-gold-400/25 text-ink-300 hover:border-gold-400/60 hover:text-gold-200"
                    }`}
                  >
                    <input type="checkbox" checked={on} onChange={() => toggle(id)} className="sr-only" />
                    <Check className={`size-4 transition-all ${on ? "w-4 opacity-100" : "-ml-2 w-0 opacity-0"}`} aria-hidden />
                    {dict.addons[id]}
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* result */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gold-400/40 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-8 sm:p-10 lg:sticky lg:top-24 lg:self-start">
          <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-gold-400/15 blur-3xl" />
          <div className="relative" aria-live="polite">
            <p className="text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase">{dict.result.price}</p>
            <p className="mt-3 font-display text-3xl leading-tight text-ink-50 tabular-nums sm:text-4xl">
              <span className="text-gold-gradient">{money(min)}</span>
              <span className="mx-2 text-ink-400">–</span>
              <span className="text-gold-gradient">{money(max)}</span>
            </p>

            <p className="mt-10 text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase">{dict.result.timeline}</p>
            <p className="mt-3 font-display text-3xl text-ink-50 tabular-nums">
              {num(time)} <span className="font-sans text-base text-ink-400">{timeLabel}</span>
            </p>
          </div>
          <div className="relative mt-12">
            <button
              onClick={send}
              className="bg-gold-gradient group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-[0.15em] text-ink-950 uppercase shadow-lg shadow-gold-500/20 transition hover:brightness-110"
            >
              {dict.result.cta}
              <Send className="size-4 transition group-hover:translate-x-1" aria-hidden />
            </button>
            <p className="mt-4 text-center text-xs text-ink-400">{dict.result.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
