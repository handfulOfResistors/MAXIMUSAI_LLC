import Stripe from "stripe";

let client: Stripe | null = null;

/** Vraća Stripe klijent, ili null ako STRIPE_SECRET_KEY nije podešen. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!client) {
    client = new Stripe(key, {
      appInfo: { name: "maximusai-website" },
    });
  }
  return client;
}

/** Javna adresa sajta za success/cancel linkove. */
export function siteOrigin(request: Request) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");

  const headers = request.headers;
  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  const proto = headers.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  if (host) return `${proto}://${host}`;
  return new URL(request.url).origin;
}
