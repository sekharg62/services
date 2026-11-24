"use client";

import Image from "next/image";
import { CheckCircle2, Send } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT_PREFILL_EVENT, type ContactPrefill } from "@/lib/contactPrefill";
import { media } from "@/content/media";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig, whatsappLink } from "@/lib/site";

type Field = "name" | "email" | "service" | "message";

export function Contact({ dict, services, whatsapp }: { dict: Dictionary["contact"]; services: string[]; whatsapp: Dictionary["whatsapp"] }) {
  const f = dict.form;
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [prefill, setPrefill] = useState<ContactPrefill | null>(null);

  // Pricing packages send their summary here: pre-fill the service + message fields.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      setSent(false);
      setErrors({});
      setPrefill((e as CustomEvent<ContactPrefill>).detail);
    };
    window.addEventListener(CONTACT_PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(CONTACT_PREFILL_EVENT, onPrefill);
  }, []);

  useEffect(() => {
    if (!prefill) return;
    if (serviceRef.current) serviceRef.current.value = services[prefill.serviceIndex] ?? "";
    if (messageRef.current) messageRef.current.value = prefill.message;
  }, [prefill, services]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const value = (k: string) => String(data.get(k) ?? "").trim();

    const next: Partial<Record<Field, string>> = {};
    for (const k of ["name", "email", "service", "message"] as Field[]) if (!value(k)) next[k] = f.errors.required;
    if (value("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email"))) next.email = f.errors.email;
    setErrors(next);
    if (Object.keys(next).length) return;

    const details = [
      `${f.name}: ${value("name")}`,
      `${f.email}: ${value("email")}`,
      ...(value("phone") ? [`${f.phone}: ${value("phone")}`] : []),
      `${f.service}: ${value("service")}`,
    ];
    const body = `${details.join("\n")}\n\n${value("message")}`;
    const subject = `${value("service")} — ${value("name")}`;
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const input =
    "w-full rounded-md border border-gold-400/20 bg-ink-950 px-4 py-3 text-ink-50 placeholder:text-ink-400 transition outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20";
  const err = (k: Field) =>
    errors[k] && (
      <p id={`${k}-error`} className="mt-1.5 text-xs text-red-400">
        {errors[k]}
      </p>
    );

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-24">
      <div className="grid overflow-hidden rounded-lg border border-gold-400/20 bg-ink-900 lg:grid-cols-[1fr_1.2fr]">
        <div className="relative min-h-[26rem]">
          <Image src={media.contactOffice} alt={dict.imageAlt} fill placeholder="blur" sizes="(min-width: 1024px) 30rem, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/20" />
          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
            <SectionHeading eyebrow={dict.eyebrow} title={dict.heading} intro={dict.subtitle} align="left" />
            <p className="mt-6 text-sm text-ink-300">{whatsapp.contactPrompt}</p>
            <a
              href={whatsappLink(whatsapp.greeting)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#25d366] px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-lg shadow-black/40 transition hover:brightness-110"
            >
              <SiWhatsapp className="size-4" aria-hidden />
              {whatsapp.label}
            </a>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          {sent ? (
            <div className="flex h-full animate-fade-in flex-col items-center justify-center gap-4 py-16 text-center" role="status">
              <CheckCircle2 className="size-14 text-gold-400" aria-hidden />
              <p className="max-w-sm text-lg text-ink-100">{f.success}</p>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-ink-300">{f.name}</label>
                <input id="name" name="name" autoComplete="name" className={input} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                {err("name")}
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-ink-300">{f.email}</label>
                <input id="email" name="email" type="email" autoComplete="email" className={input} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                {err("email")}
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm text-ink-300">{f.phone}</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" className={input} />
              </div>
              <div>
                <label htmlFor="service" className="mb-2 block text-sm text-ink-300">{f.service}</label>
                <select ref={serviceRef} id="service" name="service" defaultValue="" className={input} aria-invalid={!!errors.service} aria-describedby={errors.service ? "service-error" : undefined}>
                  <option value="" disabled>{f.servicePlaceholder}</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {err("service")}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm text-ink-300">{f.message}</label>
                <textarea ref={messageRef} id="message" name="message" rows={5} className={`${input} resize-none`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
                {err("message")}
              </div>
              <button
                type="submit"
                className="bg-gold-gradient group inline-flex items-center justify-center gap-2 rounded-md px-8 py-3.5 text-sm font-semibold tracking-[0.15em] text-ink-950 uppercase shadow-lg shadow-gold-500/20 transition hover:brightness-110 sm:col-span-2 sm:justify-self-start"
              >
                {f.submit}
                <Send className="size-4 transition group-hover:translate-x-1" aria-hidden />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
