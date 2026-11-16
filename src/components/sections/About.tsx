import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { media } from "@/content/media";
import type { Dictionary } from "@/lib/dictionaries";

export function About({ dict }: { dict: Dictionary["about"] }) {
  return (
    <section className="bg-ink-900/60 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 lg:grid-cols-2">
        <Reveal className="relative">
          <div aria-hidden className="absolute -top-4 -left-4 h-2/3 w-2/3 rounded-3xl border border-gold-400/25" />
          <div className="relative aspect-[6/7] overflow-hidden rounded-3xl">
            <Image
              src={media.aboutTeam}
              alt={dict.imageAlt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 34rem, 90vw"
              className="object-cover grayscale-[35%] transition duration-700 hover:scale-105 hover:grayscale-0"
            />
          </div>
        </Reveal>
        <Reveal delay={150}>
          <SectionHeading eyebrow={dict.eyebrow} title={dict.heading} align="left" />
          <p className="mt-6 leading-relaxed text-ink-300">{dict.body}</p>
          <ul className="mt-8 space-y-4">
            {dict.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-ink-100">
                <CheckCircle2 className="size-5 shrink-0 text-gold-400" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
