import { NextResponse } from "next/server";
import { getStripe, siteOrigin } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Otvara Stripe Customer Portal (promena kartice, računi, otkazivanje) za kupca
 * iz završene Checkout sesije. Poziva se formom sa stranice /checkout/success.
 */
export async function POST(request: Request) {
  const origin = siteOrigin(request);
  const stripe = getStripe();
  const form = await request.formData().catch(() => null);
  const sessionId = String(form?.get("session_id") ?? "");

  if (!stripe || !sessionId.startsWith("cs_")) {
    return NextResponse.redirect(`${origin}/checkout/success?portal=error`, 303);
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const customer = typeof session.customer === "string" ? session.customer : session.customer?.id;
    if (!customer) throw new Error("Checkout session has no customer.");

    const portal = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${origin}/pricing`,
    });
    return NextResponse.redirect(portal.url, 303);
  } catch (error) {
    console.error("Portal: failed to create session:", error);
    return NextResponse.redirect(
      `${origin}/checkout/success?session_id=${encodeURIComponent(sessionId)}&portal=error`,
      303
    );
  }
}
