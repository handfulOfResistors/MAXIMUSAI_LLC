import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { detailsMail, isMailerConfigured, sendMail } from "@/lib/mailer";
import { planFromSession, plans } from "@/lib/plans";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const planName = (id?: string | null) =>
  plans.find((plan) => plan.id === id)?.stripeName ?? id ?? "—";

const money = (amount: number | null | undefined, currency?: string | null) =>
  typeof amount === "number" ? `${(amount / 100).toFixed(2)} ${(currency ?? "").toUpperCase()}` : null;

/**
 * Stripe webhook — šalje obaveštenje na CONTACT_TO kad neko:
 *  - završi pretplatu (checkout.session.completed)
 *  - otkaže pretplatu (customer.subscription.deleted)
 *  - ne uspe da plati obnovu (invoice.payment_failed)
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    console.error("Webhook: STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET are not configured.");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "missing_signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    const payload = await request.text();
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (error) {
    console.error("Webhook: signature verification failed:", error);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  const mail = describe(event);
  if (mail) {
    if (isMailerConfigured()) {
      try {
        const { text, html } = detailsMail(mail.title, mail.rows);
        await sendMail({ subject: mail.subject, text, html, replyTo: mail.replyTo ?? undefined });
      } catch (error) {
        // Ne vraćamo grešku Stripe-u — pretplata je već obrađena, samo obaveštenje nije stiglo.
        console.error("Webhook: failed to send notification email:", error);
      }
    } else {
      console.log(`Webhook: ${mail.subject}`, mail.rows);
    }
  }

  return NextResponse.json({ received: true });
}

type Notification = {
  subject: string;
  title: string;
  rows: [string, string | null | undefined][];
  replyTo?: string | null;
};

function describe(event: Stripe.Event): Notification | null {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      if (session.mode !== "subscription") return null;
      // Payment Link-ovi iz Dashboard-a mogu imati drugačiji ključ polja — uzmi prvo tekstualno polje.
      const salon =
        session.custom_fields?.find((field) => field.key === "salon")?.text?.value ??
        session.custom_fields?.find((field) => field.text?.value)?.text?.value;
      const customer = session.customer_details;
      const { plan, interval } = planFromSession(session);
      return {
        subject: `Nova pretplata: ${planName(plan)}${salon ? ` — ${salon}` : ""}`,
        title: "Nova pretplata",
        replyTo: customer?.email,
        rows: [
          ["Paket", planName(plan)],
          ["Obračun", interval === "yearly" ? "godišnje" : interval === "monthly" ? "mesečno" : null],
          ["Iznos", money(session.amount_total, session.currency)],
          ["Salon", salon],
          ["Ime", customer?.name],
          ["Email", customer?.email],
          ["Telefon", customer?.phone],
          ["Jezik", session.metadata?.lang],
          ["Stripe kupac", typeof session.customer === "string" ? session.customer : session.customer?.id],
        ],
      };
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const price = subscription.items?.data?.[0]?.price;
      const priceLabel = price
        ? `${money(price.unit_amount, price.currency)} / ${price.recurring?.interval === "year" ? "god." : "mes."}`
        : null;
      const label = subscription.metadata?.plan ? planName(subscription.metadata.plan) : priceLabel ?? "—";
      return {
        subject: `Pretplata otkazana: ${label}`,
        title: "Pretplata je otkazana",
        rows: [
          ["Paket", subscription.metadata?.plan ? planName(subscription.metadata.plan) : null],
          ["Cena", priceLabel],
          [
            "Stripe kupac",
            typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id,
          ],
          ["Pretplata", subscription.id],
        ],
      };
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object;
      return {
        subject: `Neuspelo plaćanje: ${invoice.customer_email ?? invoice.id}`,
        title: "Plaćanje obnove nije uspelo",
        replyTo: invoice.customer_email,
        rows: [
          ["Email", invoice.customer_email],
          ["Ime", invoice.customer_name],
          ["Iznos", money(invoice.amount_due, invoice.currency)],
          ["Račun", invoice.hosted_invoice_url],
        ],
      };
    }
    default:
      return null;
  }
}
