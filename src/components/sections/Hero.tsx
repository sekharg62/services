import { ArrowRight } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { SilkBackground } from "@/components/ui/SilkBackground";
import type { Dictionary } from "@/lib/dictionaries";

export function Hero({ dict }: { dict: Dictionary["hero"] }) {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-4.5rem)] items-start overflow-hidden bg-[radial-gradient(ellipse_80%_55%_at_50%_100%,--theme(--color-gold-700/45%),transparent)]"
    >
      <SilkBackground className="absolute inset-0" />

      <div className="relative mx-auto w-full max-w-4xl px-4 pt-20 pb-48 text-center sm:pt-28">
        <p className="flex animate-fade-in items-center justify-center gap-3 text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase">
          <span className="h-px w-10 bg-gold-gradient" />
          {dict.eyebrow}
          <span className="h-px w-10 bg-gold-gradient" />
        </p>
        <h1 className="mt-6 animate-fade-in text-4xl leading-tight font-semibold text-balance [animation-delay:100ms] sm:text-6xl">
          <span className="text-gold-gradient">{dict.title}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl animate-fade-in text-lg leading-relaxed text-ink-300 [animation-delay:200ms]">
          {dict.subtitle}
        </p>
        <div className="mt-10 flex animate-fade-in flex-wrap items-center justify-center gap-4 [animation-delay:300ms]">
          <a
            href="#contact"
            className="bg-gold-gradient group inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold tracking-[0.15em] text-ink-950 uppercase shadow-lg shadow-gold-500/20 transition hover:brightness-110"
          >
            {dict.cta}
            <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
          </a>
          <a
            href="#work"
            className="glass rounded-md px-7 py-3.5 text-sm font-semibold tracking-[0.15em] text-gold-200 uppercase ring-1 ring-white/15 transition ring-inset hover:ring-gold-400/50"
          >
            {dict.secondary}
          </a>
        </div>
        <dl className="mx-auto mt-14 grid max-w-xl animate-fade-in grid-cols-3 gap-4 glass rounded-lg border border-white/10 p-5 [animation-delay:400ms]">
          {dict.stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-semibold text-gold-300 sm:text-4xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
              <dd className="mt-1 text-xs tracking-wide text-ink-400">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
