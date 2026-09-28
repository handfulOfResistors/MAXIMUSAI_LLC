import { AboutSection } from "@/components/about-section";
import { CaseStudySection } from "@/components/case-study-section";
import { ContactSection } from "@/components/contact-section";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { PricingSection } from "@/components/pricing-section";
import { ProcessSection } from "@/components/process-section";
import { ServicesSection } from "@/components/services-section";
import { company } from "@/lib/company";
import { getDictionary, getLang } from "@/lib/i18n/server";

export default function HomePage() {
  const lang = getLang();
  const t = getDictionary(lang);

  return (
    <main>
      <HeroSection t={t} />
      <ServicesSection t={t.services} />
      <ProcessSection t={t.process} />
      <CaseStudySection t={t.work} />
      <PricingSection lang={lang} t={t.pricing} />
      <AboutSection t={t.why} />
      <FaqSection t={t.faq} />
      <ContactSection t={t.contact} email={company.email} />
    </main>
  );
}
