import { NextResponse } from "next/server";
import { isLang } from "@/lib/i18n/config";
import { isInterval, isPlanId, lookupKey } from "@/lib/plans";
import { getStripe, siteOrigin } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Pravi Stripe Checkout sesiju (mode: subscription) za izabrani paket i period.
 * Cena se traži po lookup key-u (npr. maximusai_booking_monthly) — vidi scripts/stripe-setup.mjs.
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    console.error("Checkout: STRIPE_SECRET_KEY is not configured.");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const { plan, interval } = body;
  const lang = isLang(body.lang) ? body.lang : "sr";
  if (!isPlanId(plan) || !isInterval(interval)) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  try {
    const key = lookupKey(plan, interval);
    const prices = await stripe.prices.list({ lookup_keys: [key], active: true, limit: 1 });
    const price = prices.data[0];
    if (!price) {
      console.error(`Checkout: no active Stripe price with lookup key "${key}". Run npm run stripe:setup.`);
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }

    const origin = siteOrigin(request);
    const metadata = { plan, interval, lang };

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: price.id, quantity: 1 }],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      // Stripe Checkout nema srpski; "auto" koristi jezik pregledača (ili engleski).
      locale: lang === "en" ? "en" : "auto",
      allow_promotion_codes: true,
      billing_address_collection: "required",
      tax_id_collection: { enabled: true },
      phone_number_collection: { enabled: true },
      custom_fields: [
        {
          key: "salon",
          label: { type: "custom", custom: lang === "en" ? "Salon name" : "Naziv salona" },
          type: "text",
          text: { maximum_length: 80 },
        },
      ],
      ...(process.env.STRIPE_REQUIRE_TOS === "true"
        ? { consent_collection: { terms_of_service: "required" as const } }
        : {}),
      metadata,
      subscription_data: { metadata },
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout: failed to create session:", error);
    return NextResponse.json({ error: "checkout_failed" }, { status: 500 });
  }
}
