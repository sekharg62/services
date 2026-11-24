"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/lib/dictionaries";

export function Testimonials({ dict }: { dict: Dictionary["testimonials"] }) {
  const count = dict.items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);
  const t = dict.items[index];

  return (
    <section className="mx-auto max-w-4xl px-4 py-28">
      <SectionHeading eyebrow={dict.eyebrow} title={dict.heading} />
      <div
        className="card relative mt-14 overflow-hidden rounded-lg px-6 pt-24 pb-12 text-center sm:px-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        aria-roledescription="carousel"
      >
        <span aria-hidden className="text-gold-gradient pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 font-display text-[9rem] leading-none opacity-25 select-none">&ldquo;</span>
        <figure key={index} className="animate-fade-in" aria-live="polite">
          <blockquote className="relative font-display text-xl leading-relaxed font-light text-balance text-ink-50 sm:text-3xl sm:leading-snug">“{t.quote}”</blockquote>
          <figcaption className="mt-8">
            <span aria-hidden className="mx-auto mb-4 block h-px w-12 bg-gold-gradient" />
            <p className="font-semibold text-gold-200">{t.name}</p>
            <p className="mt-1 text-sm text-ink-400">{t.role}</p>
          </figcaption>
        </figure>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button onClick={() => go(-1)} aria-label={dict.prev} className="rounded-md bg-white/5 p-2 text-gold-300 ring-1 ring-white/10 transition ring-inset hover:bg-gold-400 hover:text-ink-950">
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex gap-2">
            {dict.items.map((item, i) => (
              <button
                key={item.name}
                onClick={() => setIndex(i)}
                aria-label={`${i + 1} / ${count}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-gold-400" : "w-2 bg-ink-600 hover:bg-gold-700"}`}
              />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label={dict.next} className="rounded-md bg-white/5 p-2 text-gold-300 ring-1 ring-white/10 transition ring-inset hover:bg-gold-400 hover:text-ink-950">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
