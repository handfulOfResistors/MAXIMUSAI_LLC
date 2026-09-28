#!/usr/bin/env node
/**
 * Pravi (ili ažurira) Stripe proizvode i cene za pakete iz src/lib/pricing.json.
 *
 *   npm run stripe:setup
 *
 * - Čita STRIPE_SECRET_KEY iz .env.local (ili iz okruženja).
 * - Za svaki paket pravi proizvod "maximusai_<paket>" i dve cene sa lookup key-em
 *   "maximusai_<paket>_monthly" i "maximusai_<paket>_yearly".
 * - Ako se cena u pricing.json promenila, pravi novu cenu, prebacuje lookup key na nju
 *   i arhivira staru. Postojeći pretplatnici ostaju na staroj ceni dok ih ne prebaciš.
 * - Bezbedno je pokrenuti više puta.
 */
import { existsSync, readFileSync } from "node:fs";
import Stripe from "stripe";

function loadEnv(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!match || process.env[match[1]]) continue;
    let value = match[2];
    if (/^(["']).*\1$/.test(value)) value = value.slice(1, -1);
    process.env[match[1]] = value;
  }
}

loadEnv(".env.local");
loadEnv(".env");

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("Nedostaje STRIPE_SECRET_KEY. Dodaj ga u .env.local (vidi .env.example).");
  process.exit(1);
}

const stripe = new Stripe(key);
const pricing = JSON.parse(
  readFileSync(new URL("../src/lib/pricing.json", import.meta.url), "utf8")
);
const live = /^(sk|rk)_live_/.test(key);
console.log(`Stripe: ${live ? "LIVE" : "TEST"} režim, valuta ${pricing.currency.toUpperCase()}\n`);

const intervals = [
  ["monthly", "month"],
  ["yearly", "year"],
];

for (const plan of pricing.plans) {
  const productId = `maximusai_${plan.id}`;
  let product;
  try {
    product = await stripe.products.retrieve(productId);
    if (product.name !== plan.stripeName || !product.active) {
      product = await stripe.products.update(productId, { name: plan.stripeName, active: true });
    }
  } catch (error) {
    if (error?.code !== "resource_missing") throw error;
    product = await stripe.products.create({
      id: productId,
      name: plan.stripeName,
      metadata: { plan: plan.id },
    });
    console.log(`+ proizvod ${productId}`);
  }

  for (const [interval, stripeInterval] of intervals) {
    const amount = Math.round(plan[interval] * 100);
    const lookupKey = `maximusai_${plan.id}_${interval}`;
    const { data } = await stripe.prices.list({ lookup_keys: [lookupKey], limit: 1 });
    const existing = data[0];
    const existingProduct =
      typeof existing?.product === "string" ? existing.product : existing?.product?.id;

    const unchanged =
      existing &&
      existing.active &&
      existing.unit_amount === amount &&
      existing.currency === pricing.currency &&
      existing.recurring?.interval === stripeInterval &&
      existingProduct === productId;

    const label = `${(amount / 100).toFixed(2)} ${pricing.currency.toUpperCase()}/${stripeInterval}`;
    if (unchanged) {
      console.log(`= ${lookupKey}: ${label} (bez izmena)`);
      continue;
    }

    const price = await stripe.prices.create({
      product: productId,
      currency: pricing.currency,
      unit_amount: amount,
      recurring: { interval: stripeInterval },
      lookup_key: lookupKey,
      transfer_lookup_key: true,
      nickname: `${plan.id} ${interval}`,
      metadata: { plan: plan.id, interval },
    });
    if (existing?.active) {
      await stripe.prices.update(existing.id, { active: false });
    }
    console.log(`+ ${lookupKey}: ${label} (${price.id})${existing ? " — stara cena arhivirana" : ""}`);
  }
}

console.log("\nGotovo. Checkout koristi cene po lookup key-u, pa ne treba ništa menjati u kodu.");
