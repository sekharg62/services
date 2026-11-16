import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/site";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-gold-400/15 bg-ink-950 pt-12 pb-32 text-center">
      <Image src="/White.png" alt="" width={40} height={40} className="mx-auto opacity-90" />
      <p className="mt-4 font-display text-2xl text-gold-gradient">{siteConfig.name}</p>
      <p className="mt-2 text-sm text-ink-400">{dict.footer.tagline}</p>
      <p className="mt-6 text-xs tracking-wider text-ink-400">
        © {new Date().getFullYear()} {siteConfig.name}. {dict.footer.rights}
      </p>
    </footer>
  );
}
