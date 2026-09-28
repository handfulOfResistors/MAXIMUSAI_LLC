import pricing from "./pricing.json";

export type PlanId = "website" | "booking" | "ai";
export type BillingInterval = "monthly" | "yearly";

export type Plan = {
  id: PlanId;
  stripeName: string;
  monthly: number;
  yearly: number;
  /** true = cena se prikazuje kao „od" (početna cena, veći projekti po ponudi) */
  from: boolean;
  highlight: boolean;
  /** Stripe Payment Link URL-ovi (https://buy.stripe.com/...), napravljeni ručno u Dashboard-u. */
  paymentLinks?: Partial<Record<BillingInterval, string>>;
};

export const currency = pricing.currency;
export const yearlyFreeMonths = pricing.yearlyFreeMonths;
export const plans = pricing.plans as Plan[];

export const planIds = plans.map((plan) => plan.id);
export const intervals: BillingInterval[] = ["monthly", "yearly"];

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && (planIds as string[]).includes(value);
}

export function isInterval(value: unknown): value is BillingInterval {
  return value === "monthly" || value === "yearly";
}

/**
 * URL Stripe Payment Link-a za paket i period, ili null ako link nije upisan u pricing.json.
 * Dodaje client_reference_id (npr. "booking_yearly") da webhook i stranica zahvalnosti znaju koji je paket,
 * i locale=en za engleske posetioce.
 */
export function paymentLinkUrl(plan: Plan, interval: BillingInterval, lang: "sr" | "en") {
  const base = plan.paymentLinks?.[interval]?.trim();
  if (!base) return null;
  try {
    const url = new URL(base);
    url.searchParams.set("client_reference_id", `${plan.id}_${interval}`);
    if (lang === "en") url.searchParams.set("locale", "en");
    return url.toString();
  } catch {
    return null;
  }
}

/** Čita paket i period iz Checkout sesije (metadata iz API checkout-a ili client_reference_id iz Payment Link-a). */
export function planFromSession(session: {
  metadata?: Record<string, string> | null;
  client_reference_id?: string | null;
}) {
  const [refPlan, refInterval] = (session.client_reference_id ?? "").split("_");
  const plan = session.metadata?.plan ?? refPlan;
  const interval = session.metadata?.interval ?? refInterval;
  return {
    plan: isPlanId(plan) ? plan : null,
    interval: isInterval(interval) ? interval : null,
  };
}

/** Stripe lookup key — ista vrednost se koristi u scripts/stripe-setup.mjs */
export function lookupKey(plan: PlanId, interval: BillingInterval) {
  return `maximusai_${plan}_${interval}`;
}

const symbols: Record<string, string> = { eur: "€", usd: "$", gbp: "£" };

/** Deterministički format cene (isti na serveru i u pregledaču). */
export function formatPrice(amount: number, lang: "sr" | "en") {
  const hasCents = Math.round(amount * 100) % 100 !== 0;
  const fixed = hasCents ? amount.toFixed(2) : String(Math.round(amount));
  const symbol = symbols[currency] ?? currency.toUpperCase();
  if (lang === "sr") return `${fixed.replace(".", ",")} ${symbol}`;
  return symbol.length === 1 ? `${symbol}${fixed}` : `${fixed} ${symbol}`;
}
