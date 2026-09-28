import { PricingTable } from "@/components/pricing-table";
import { company } from "@/lib/company";
import { fill, type Lang } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/sr";
import { plans, yearlyFreeMonths } from "@/lib/plans";

type Props = {
  lang: Lang;
  t: Dictionary["pricing"];
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

export function PricingSection({ lang, t, as: Heading = "h2", id = "pricing", className }: Props) {
  return (
    <section id={id} className={className ?? "border-t border-border py-24 md:py-28"}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t.eyebrow}</p>
          <Heading className="section-title mt-4 text-balance">{t.title}</Heading>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {fill(t.lead, { months: yearlyFreeMonths })}
          </p>
        </div>
        <div className="mt-12">
          <PricingTable
            lang={lang}
            t={t}
            plans={plans}
            freeMonths={yearlyFreeMonths}
            email={company.email}
            portalUrl={process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL || undefined}
          />
        </div>
      </div>
    </section>
  );
}
