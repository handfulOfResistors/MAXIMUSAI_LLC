import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import { ContactSection } from "@/components/contact-section";
import { FaqList } from "@/components/faq-list";
import { PricingSection } from "@/components/pricing-section";
import { company } from "@/lib/company";
import { getDictionary, getLang } from "@/lib/i18n/server";
import { plans } from "@/lib/plans";

export function generateMetadata(): Metadata {
  const t = getDictionary();
  return {
    title: t.meta.pricingTitle,
    description: t.meta.pricingDescription,
    alternates: { canonical: "/pricing" },
  };
}

export default function PricingPage() {
  const lang = getLang();
  const t = getDictionary(lang);

  return (
    <main className="pt-16">
      <PricingSection lang={lang} t={t.pricing} as="h1" id="plans" className="py-20 md:py-24" />

      <section className="border-t border-border bg-secondary/50 py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="section-title text-center">{t.pricingPage.compareTitle}</h2>
          <div className="mt-10 overflow-x-auto rounded-xl border border-border bg-card shadow-soft">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.pricingPage.compareFeature}
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      scope="col"
                      className="px-4 py-4 text-center font-display text-base font-semibold text-foreground"
                    >
                      {t.pricing.plans[plan.id].name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.pricingPage.compareRows.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-0">
                    <th scope="row" className="px-5 py-3.5 font-normal text-foreground">
                      {row.label}
                    </th>
                    {row.values.map((included, index) => (
                      <td key={plans[index]?.id ?? index} className="px-4 py-3.5 text-center">
                        {included ? (
                          <Check
                            className="mx-auto h-5 w-5 text-primary"
                            strokeWidth={2.5}
                            role="img"
                            aria-label={t.pricingPage.included}
                          />
                        ) : (
                          <Minus
                            className="mx-auto h-5 w-5 text-muted-foreground/50"
                            role="img"
                            aria-label={t.pricingPage.notIncluded}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="section-title text-balance">{t.pricingPage.faqTitle}</h2>
          <FaqList items={t.pricingPage.faq} />
        </div>
      </section>

      <ContactSection
        id="quote"
        t={t.contact}
        email={company.email}
        title={t.pricingPage.quoteTitle}
        lead={t.pricingPage.quoteLead}
        defaultTopic="ai"
      />
    </main>
  );
}
