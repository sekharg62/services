import { notFound } from "next/navigation";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Estimator } from "@/components/sections/Estimator";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { ServicesTabs } from "@/components/sections/ServicesTabs";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Testimonials } from "@/components/sections/Testimonials";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero dict={dict.hero} />
      <TechMarquee heading={dict.tech.heading} />
      <ServicesTabs dict={dict.services} />
      <About dict={dict.about} />
      <Process dict={dict.process} />
      <Portfolio dict={dict.portfolio} />
      <Estimator dict={dict.estimator} lang={lang} />
      <Testimonials dict={dict.testimonials} />
      <Faq dict={dict.faq} />
      <Contact dict={dict.contact} services={dict.services.items.map((s) => s.title)} />
    </>
  );
}
