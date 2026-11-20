import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/site";
import { BrandName } from "./BrandName";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-gold-400/15 bg-ink-950 pt-12 pb-32 text-center">
      <Image src="/logo.png" alt="" width={56} height={56} className="mx-auto" />
      <p className="mt-5">
        <BrandName size="lg" className="items-center" />
      </p>
      <p className="mt-2 text-sm text-ink-400">{dict.footer.tagline}</p>
      <p className="mt-6 text-xs tracking-wider text-ink-400">
        © {new Date().getFullYear()} {siteConfig.name}. {dict.footer.rights}
      </p>
    </footer>
  );
}
