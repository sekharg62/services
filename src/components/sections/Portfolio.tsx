"use client";

import Image from "next/image";
import { ArrowUpRight, Check, X } from "lucide-react";
import { useRef, useState, type PointerEvent } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { media } from "@/content/media";
import type { Dictionary } from "@/lib/dictionaries";

type Filter = keyof Dictionary["portfolio"]["filters"];

/** Card that tilts towards the cursor with a gold glare (mouse only; static on touch). */
function TiltCard({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string }) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * 16}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 16}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
    el.style.setProperty("--glare", "1");
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--glare", "0");
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gold-400/15 text-left transition-transform duration-300 ease-out [transform:perspective(900px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] [transform-style:preserve-3d] hover:border-gold-400/50 hover:shadow-2xl hover:shadow-gold-500/10 focus-visible:outline-2 focus-visible:outline-gold-400"
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[var(--glare,0)] mix-blend-overlay transition-opacity duration-300 [background:radial-gradient(circle_at_var(--gx,50%)_var(--gy,50%),rgba(255,226,150,0.55),transparent_55%)]"
      />
    </button>
  );
}

export function Portfolio({ dict }: { dict: Dictionary["portfolio"] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const filters = Object.keys(dict.filters) as Filter[];
  const items = dict.items
    .map((item, index) => ({ ...item, index, image: media.portfolio[index] }))
    .filter((item) => filter === "all" || item.category === filter);

  const open = (index: number) => {
    setSelected(index);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const project = selected === null ? null : dict.items[selected];

  return (
    <section id="work" className="bg-ink-900/60 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.heading} />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full px-5 py-2 text-sm transition ${
                filter === f
                  ? "bg-gold-gradient font-semibold text-ink-950"
                  : "border border-gold-400/25 text-ink-300 hover:border-gold-400/60 hover:text-gold-200"
              }`}
            >
              {dict.filters[f]}
            </button>
          ))}
        </div>

        <ul key={filter} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title} style={{ animationDelay: `${i * 80}ms` }} className="animate-fade-in">
              <TiltCard onClick={() => open(item.index)} label={`${dict.open}: ${item.title}`}>
                <Image
                  src={item.image}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent opacity-90" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 [transform:translateZ(40px)]">
                  <span>
                    <span className="inline-block rounded-full bg-ink-950/80 px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.25em] text-gold-300 uppercase">
                      {dict.filters[item.category as Filter]}
                    </span>
                    <span className="mt-2 block font-display text-xl font-semibold text-ink-50">{item.title}</span>
                  </span>
                  <span className="flex size-10 shrink-0 translate-y-2 items-center justify-center rounded-full bg-gold-400 text-ink-950 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="size-5" aria-hidden />
                  </span>
                </span>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialog}
        onClick={(e) => e.target === dialog.current && close()}
        aria-labelledby="project-title"
        className="m-auto max-h-[90svh] w-[min(64rem,calc(100%-2rem))] overflow-y-auto rounded-3xl border border-gold-400/25 bg-ink-900 p-0 text-ink-100 shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm open:animate-fade-in"
      >
        {project && selected !== null && (
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[32rem]">
              <Image src={media.portfolio[selected]} alt={project.title} fill placeholder="blur" sizes="(min-width: 1024px) 34rem, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink-900" />
            </div>
            <div className="relative p-6 sm:p-10">
              <button
                onClick={close}
                aria-label={dict.close}
                className="absolute top-4 right-4 rounded-full border border-gold-400/30 p-2 text-gold-300 transition hover:bg-gold-400 hover:text-ink-950"
              >
                <X className="size-5" />
              </button>
              <p className="text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase">{dict.filters[project.category as Filter]}</p>
              <h3 id="project-title" className="mt-3 pr-10 text-3xl font-semibold text-ink-50">{project.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-300">{project.summary}</p>

              <h4 className="mt-8 text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">{dict.deliverablesLabel}</h4>
              <ul className="mt-3 space-y-2">
                {project.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-ink-100">
                    <Check className="size-4 shrink-0 text-gold-400" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>

              <h4 className="mt-8 text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">{dict.techLabel}</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li key={t} className="rounded-full border border-gold-400/25 px-3 py-1 text-sm text-ink-300">{t}</li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={close}
                className="bg-gold-gradient mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-[0.15em] text-ink-950 uppercase transition hover:brightness-110"
              >
                {dict.cta}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
