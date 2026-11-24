import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { media } from "@/content/media";
import type { Dictionary } from "@/lib/dictionaries";

export function About({ dict }: { dict: Dictionary["about"] }) {
  return (
    <section className="relative py-28">
      <div aria-hidden className="rule-gold absolute inset-x-0 top-0" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 lg:grid-cols-2">
        <Reveal className="relative">
          {/* gold corner ticks framing the photo */}
          <span aria-hidden className="absolute -top-3 -left-3 size-10 border-t border-l border-gold-400/70" />
          <span aria-hidden className="absolute -right-3 -bottom-3 size-10 border-r border-b border-gold-400/70" />
          <div className="relative aspect-[6/7] overflow-hidden rounded-lg ring-1 ring-white/10">
            <Image
              src={media.aboutTeam}
              alt={dict.imageAlt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 34rem, 90vw"
              className="object-cover grayscale-[35%] transition duration-700 hover:scale-105 hover:grayscale-0"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
          </div>
        </Reveal>
        <Reveal delay={150}>
          <SectionHeading eyebrow={dict.eyebrow} title={dict.heading} align="left" />
          <p className="mt-6 text-lg leading-relaxed text-ink-400">{dict.body}</p>
          <ul className="mt-10 border-t border-white/10">
            {dict.points.map((p, i) => (
              <li key={p} className="group flex items-baseline gap-5 border-b border-white/10 py-4 text-ink-100">
                <span className="font-display text-sm text-gold-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="transition group-hover:translate-x-1 group-hover:text-gold-100">{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
