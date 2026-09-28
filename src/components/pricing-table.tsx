"use client";

import Link from "next/link";
import { Check, CreditCard, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fill, type Lang } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/sr";
import { formatPrice, paymentLinkUrl, type BillingInterval, type Plan, type PlanId } from "@/lib/plans";
import { cn } from "@/lib/utils";

type Props = {
  lang: Lang;
  t: Dictionary["pricing"];
  plans: Plan[];
  freeMonths: number;
  email: string;
  portalUrl?: string;
};

export function PricingTable({ lang, t, plans, freeMonths, email, portalUrl }: Props) {
  const [interval, setBillingInterval] = useState<BillingInterval>("monthly");
  const [loading, setLoading] = useState<PlanId | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Povratak dugmetom „Nazad" sa Stripe stranice vraća stranicu iz keša — resetuj stanje.
  useEffect(() => {
    const onShow = (event: PageTransitionEvent) => {
      if (event.persisted) setLoading(null);
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  async function subscribe(plan: PlanId) {
    setError(null);
    setLoading(plan);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, interval, lang }),
      });
      const data = (await response.json().catch(() => null)) as {
        url?: string;
        error?: string;
      } | null;

      if (response.ok && data?.url) {
        window.location.assign(data.url);
        return;
      }
      setError(
        data?.error === "not_configured"
          ? fill(t.errors.notConfigured, { email })
          : fill(t.errors.generic, { email })
      );
    } catch {
      setError(t.errors.network);
    }
    setLoading(null);
  }

  return (
    <div>
      <div className="flex justify-center">
        <div
          role="group"
          aria-label={`${t.monthly} / ${t.yearly}`}
          className="inline-flex items-center rounded-full border border-border bg-card p-1 shadow-soft"
        >
          {(["monthly", "yearly"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setBillingInterval(value)}
              aria-pressed={interval === value}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                interval === value
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {value === "monthly" ? t.monthly : t.yearly}
              {value === "yearly" ? (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                    interval === "yearly"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                  )}
                >
                  {fill(t.yearlyBadge, { months: freeMonths })}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="mx-auto mt-8 max-w-2xl rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-center text-sm text-destructive"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-3">
        {plans.map((plan) => {
          const text = t.plans[plan.id];
          const amount = interval === "monthly" ? plan.monthly : plan.yearly;
          const isLoading = loading === plan.id;
          const link = paymentLinkUrl(plan, interval, lang);

          return (
            <article
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-7 shadow-soft",
                plan.highlight ? "border-primary shadow-lift ring-1 ring-primary" : "border-border"
              )}
            >
              {plan.highlight ? (
                <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary-foreground">
                  {t.popular}
                </span>
              ) : null}

              <h3 className="font-display text-2xl font-semibold text-foreground">{text.name}</h3>
              <p className="mt-2 min-h-[3rem] text-[0.95rem] leading-snug text-muted-foreground">
                {text.tagline}
              </p>

              <div className="mt-6 flex items-baseline gap-1.5">
                {plan.from ? (
                  <span className="text-sm font-semibold text-muted-foreground">{t.from}</span>
                ) : null}
                <span className="font-display text-5xl font-semibold tracking-tight text-foreground tabular-nums">
                  {formatPrice(amount, lang)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {interval === "monthly" ? t.perMonth : t.perYear}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {interval === "monthly"
                  ? t.monthlyNote
                  : fill(t.yearlyNote, { amount: formatPrice(plan.yearly / 12, lang) })}
              </p>

              {link ? (
                <Button
                  asChild
                  size="lg"
                  variant={plan.highlight ? "default" : "outline"}
                  className="mt-7 w-full"
                >
                  <a href={link}>{t.subscribe}</a>
                </Button>
              ) : (
                <Button
                  type="button"
                  size="lg"
                  variant={plan.highlight ? "default" : "outline"}
                  className="mt-7 w-full"
                  disabled={loading !== null}
                  onClick={() => subscribe(plan.id)}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      {t.redirecting}
                    </>
                  ) : (
                    t.subscribe
                  )}
                </Button>
              )}
              {plan.from ? (
                <Link
                  href="/pricing#quote"
                  className="mt-3 text-center text-sm font-semibold text-primary hover:underline"
                >
                  {t.quote}
                </Link>
              ) : null}

              <ul className="mt-7 space-y-3 border-t border-border pt-6">
                {text.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-[0.95rem] leading-snug text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.from ? (
                <p className="mt-6 rounded-lg bg-muted px-3.5 py-3 text-xs leading-relaxed text-muted-foreground">
                  {t.aiNote}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 text-center text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 shrink-0" />
          {t.secure}
        </p>
        {portalUrl ? (
          <a href={portalUrl} className="font-semibold text-primary hover:underline">
            {t.manage}
          </a>
        ) : null}
      </div>
    </div>
  );
}
