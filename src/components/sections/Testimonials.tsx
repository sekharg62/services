"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { media } from "@/content/media";
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
    <section className="mx-auto max-w-4xl px-4 py-24">
      <SectionHeading eyebrow={dict.eyebrow} title={dict.heading} />
      <div
        className="relative mt-14 rounded-3xl border border-gold-400/20 bg-ink-900 px-6 py-12 text-center sm:px-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        aria-roledescription="carousel"
      >
        <Quote className="mx-auto size-10 text-gold-400/60" aria-hidden />
        <figure key={index} className="animate-fade-in" aria-live="polite">
          <blockquote className="mt-6 font-display text-xl leading-relaxed font-light text-ink-50 sm:text-2xl">“{t.quote}”</blockquote>
          <figcaption className="mt-8 flex items-center justify-center gap-4">
            <Image src={media.avatars[index]} alt="" width={56} height={56} className="rounded-full ring-2 ring-gold-400/60" />
            <div className="text-left">
              <p className="font-semibold text-gold-200">{t.name}</p>
              <p className="text-sm text-ink-400">{t.role}</p>
            </div>
          </figcaption>
        </figure>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button onClick={() => go(-1)} aria-label={dict.prev} className="rounded-full border border-gold-400/30 p-2 text-gold-300 transition hover:bg-gold-400 hover:text-ink-950">
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
          <button onClick={() => go(1)} aria-label={dict.next} className="rounded-full border border-gold-400/30 p-2 text-gold-300 transition hover:bg-gold-400 hover:text-ink-950">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
