import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/site";
import { BrandName } from "./BrandName";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-950 pt-24 pb-32">
      {/* warm light rising from the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,--theme(--color-gold-700/22%),transparent)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <h2 className="mx-auto max-w-3xl text-4xl leading-[1.05] font-semibold text-balance sm:text-6xl">
          <span className="text-gold-gradient">{dict.footer.ctaHeading}</span>
        </h2>
        <a
          href="#contact"
          className="bg-gold-gradient group mt-10 inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm font-semibold tracking-[0.15em] text-ink-950 uppercase shadow-lg shadow-gold-500/20 transition hover:brightness-110"
        >
          {dict.footer.ctaButton}
          <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </a>

        <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={36} height={36} />
            <BrandName />
          </div>
          <p className="text-sm text-ink-400">{dict.footer.tagline}</p>
          <p className="text-xs tracking-wider text-ink-600">
            © {new Date().getFullYear()} {siteConfig.name}. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
