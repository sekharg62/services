"use client";

import Image from "next/image";
import { AppWindow, Check, Code2, TrendingUp } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { media } from "@/content/media";
import type { Dictionary } from "@/lib/dictionaries";

const icons = [Code2, AppWindow, TrendingUp];

export function ServicesTabs({ dict }: { dict: Dictionary["services"] }) {
  const [active, setActive] = useState(0);
  const item = dict.items[active];

  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeading eyebrow={dict.eyebrow} title={dict.heading} intro={dict.intro} />

      <div role="tablist" aria-label={dict.heading} className="mt-12 grid gap-3 sm:grid-cols-3">
        {dict.items.map((s, i) => {
          const Icon = icons[i % icons.length];
          const selected = i === active;
          return (
            <button
              key={s.title}
              role="tab"
              id={`service-tab-${i}`}
              aria-selected={selected}
              aria-controls="service-panel"
              onClick={() => setActive(i)}
              className={`group relative flex items-center gap-4 overflow-hidden rounded-lg px-5 py-4 text-left transition duration-300 ${
                selected ? "border-gold text-ink-50" : "card text-ink-400 hover:text-ink-50"
              }`}
            >
              <span
                className={`inline-flex size-10 shrink-0 items-center justify-center rounded-md transition ${
                  selected ? "bg-gold-gradient text-ink-950" : "bg-white/5 text-gold-300 group-hover:bg-white/10"
                }`}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="font-display text-lg font-semibold">{s.title}</span>
              <span className="ml-auto font-display text-xs text-ink-600 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {/* active indicator: gold line along the bottom edge */}
              <span
                aria-hidden
                className={`absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent transition-opacity duration-300 ${selected ? "opacity-100" : "opacity-0"}`}
              />
            </button>
          );
        })}
      </div>

      <div
        key={active}
        id="service-panel"
        role="tabpanel"
        aria-labelledby={`service-tab-${active}`}
        className="card mt-6 grid animate-fade-in items-center gap-10 rounded-lg p-5 sm:p-8 lg:grid-cols-2"
      >
        <div className="relative aspect-[3/2] overflow-hidden rounded-md ring-1 ring-white/10">
          <Image
            src={media.services[active]}
            alt={item.title}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 34rem, 90vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-ink-950/60 via-transparent to-gold-400/10" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-ink-50 sm:text-4xl">{item.title}</h3>
          <p className="mt-4 text-lg leading-relaxed text-ink-400">{item.description}</p>
          <ul className="mt-8 grid border-t border-white/10 sm:grid-cols-2">
            {item.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 border-b border-white/10 py-3 text-sm text-ink-100 sm:odd:pr-4">
                <Check className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <a href="#contact" className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold tracking-[0.15em] text-gold-300 uppercase hover:text-gold-200">
            {dict.learnMore}
            <span aria-hidden className="h-px w-8 bg-gold-400 transition-all duration-300 group-hover:w-14" />
          </a>
        </div>
      </div>
    </section>
  );
}
