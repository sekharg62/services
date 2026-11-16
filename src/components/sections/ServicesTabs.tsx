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
              className={`flex items-center gap-3 rounded-2xl border px-5 py-4 text-left transition ${
                selected
                  ? "border-gold-400/70 bg-gold-400/10 text-gold-200"
                  : "border-gold-400/15 text-ink-300 hover:border-gold-400/40 hover:text-ink-50"
              }`}
            >
              <span
                className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full border transition ${
                  selected ? "border-transparent bg-gold-400 text-ink-950" : "border-gold-400/40 text-gold-300"
                }`}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="font-display text-lg font-semibold">{s.title}</span>
            </button>
          );
        })}
      </div>

      <div
        key={active}
        id="service-panel"
        role="tabpanel"
        aria-labelledby={`service-tab-${active}`}
        className="mt-8 grid animate-fade-in items-center gap-10 rounded-3xl border border-gold-400/15 bg-ink-900 p-6 sm:p-10 lg:grid-cols-2"
      >
        <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
          <Image
            src={media.services[active]}
            alt={item.title}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 34rem, 90vw"
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-ink-50 sm:text-3xl">{item.title}</h3>
          <p className="mt-4 leading-relaxed text-ink-300">{item.description}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {item.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-ink-100">
                <Check className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <a href="#contact" className="mt-8 inline-block text-sm font-semibold tracking-[0.15em] text-gold-300 uppercase hover:text-gold-200">
            {dict.learnMore} →
          </a>
        </div>
      </div>
    </section>
  );
}
