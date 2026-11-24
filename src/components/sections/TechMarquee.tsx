import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
  SiFigma,
  SiFirebase,
  SiGoogleanalytics,
  SiMeta,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

/** `color` is the brand colour shown on hover (dark brand colours swapped for light ones so they show on black). */
const tech: { name: string; icon: IconType; color: string }[] = [
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
  { name: "React Native", icon: SiReact, color: "#61dafb" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
  { name: "Figma", icon: SiFigma, color: "#f24e1e" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
  { name: "Firebase", icon: SiFirebase, color: "#ffca28" },
  { name: "AWS", icon: FaAws, color: "#ff9900" },
  { name: "Google Analytics", icon: SiGoogleanalytics, color: "#e37400" },
  { name: "Meta Ads", icon: SiMeta, color: "#0866ff" },
];

export function TechMarquee({ heading }: { heading: string }) {
  return (
    <section aria-label={heading} className="border-y border-white/10 py-10">
      <p className="text-center text-[0.7rem] tracking-[0.3em] text-ink-400 uppercase">{heading}</p>
      <div className="group mt-8 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <ul className="flex shrink-0 animate-marquee gap-12 pr-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...tech, ...tech].map(({ name, icon: Icon, color }, i) => (
            <li
              key={i}
              aria-hidden={i >= tech.length}
              style={{ "--brand": color } as React.CSSProperties}
              className="group/item flex items-center gap-3 whitespace-nowrap"
            >
              <Icon className="size-6 text-ink-400 transition duration-300 group-hover/item:text-[var(--brand)]" aria-hidden />
              <span className="font-display text-lg font-medium text-ink-400 transition duration-300 group-hover/item:text-ink-50">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
