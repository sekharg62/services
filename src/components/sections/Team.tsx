import Image from "next/image";
import { Layers, Mail, Megaphone, MonitorSmartphone, PenTool } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { SiFacebook, SiGithub } from "react-icons/si";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/content/team";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

const roleIcons = { architect: Layers, frontend: MonitorSmartphone, design: PenTool, marketing: Megaphone };

export function Team({ dict, lang }: { dict: Dictionary["team"]; lang: Locale }) {
  return (
    <section id="team" className="mx-auto max-w-5xl px-4 py-24">
      <SectionHeading eyebrow={dict.eyebrow} title={dict.heading} intro={dict.intro} />
      <ul className="mt-14 grid gap-6 md:grid-cols-2">
        {team.map((member, i) => {
          const Icon = roleIcons[member.icon];
          const name = member.name[lang];
          const socials = [
            { href: member.links.linkedin, icon: FaLinkedinIn, label: "LinkedIn" },
            { href: member.links.github, icon: SiGithub, label: "GitHub" },
            { href: member.links.facebook, icon: SiFacebook, label: "Facebook" },
            { href: member.links.email && `mailto:${member.links.email}`, icon: Mail, label: "Email" },
          ].filter((s) => s.href);
          return (
            <li key={member.name.en}>
              <Reveal delay={i * 120} className="h-full">
                <article className="group relative h-full overflow-hidden rounded-lg border border-gold-400/15 bg-ink-900 p-6 transition sm:p-8 duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-2xl hover:shadow-gold-500/10">
                  <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full bg-gold-400/5 blur-3xl transition duration-500 group-hover:bg-gold-400/15" />

                  <div className="relative flex flex-col items-start gap-4 min-[400px]:flex-row min-[400px]:items-center min-[400px]:gap-5">
                    <div className="relative size-20 shrink-0 rounded-full sm:size-24 bg-gold-gradient p-[2px]">
                      <div className="relative flex size-full items-center justify-center overflow-hidden rounded-full bg-ink-950">
                        {member.photo ? (
                          <Image src={member.photo} alt={name} fill sizes="6rem" placeholder="blur" className="object-cover transition duration-500 group-hover:scale-110" />
                        ) : (
                          <Icon className="size-9 text-gold-300 transition duration-500 group-hover:scale-110" aria-hidden />
                        )}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold break-words text-ink-50 sm:text-2xl">{name}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed font-semibold tracking-[0.18em] text-gold-400 uppercase">{member.role[lang]}</p>
                    </div>
                  </div>

                  <p className="relative mt-6 leading-relaxed text-ink-300">{member.bio[lang]}</p>

                  <ul className="relative mt-6 flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <li key={skill.en} className="rounded-sm border border-gold-400/20 bg-ink-950/60 px-3 py-1 text-xs text-ink-300 transition group-hover:border-gold-400/35">
                        {skill[lang]}
                      </li>
                    ))}
                  </ul>

                  {socials.length > 0 && (
                    <div className="relative mt-6 flex gap-2 border-t border-gold-400/15 pt-6">
                      {socials.map(({ href, icon: SIcon, label }) => (
                        <a
                          key={label}
                          href={href}
                          target={label === "Email" ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          aria-label={`${name} – ${label}`}
                          className="flex size-9 items-center justify-center rounded-md border border-gold-400/25 text-ink-300 transition hover:border-gold-400 hover:bg-gold-400 hover:text-ink-950"
                        >
                          <SIcon className="size-4" aria-hidden />
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
