import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/company";
import { fill } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/server";
import { planFromSession } from "@/lib/plans";
import { getStripe } from "@/lib/stripe";

export function generateMetadata(): Metadata {
  return { title: getDictionary().meta.successTitle, robots: { index: false } };
}

type Props = { searchParams: { session_id?: string; portal?: string } };

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const t = getDictionary();
  const sessionId = searchParams.session_id?.startsWith("cs_") ? searchParams.session_id : null;
  const details = sessionId ? await loadSession(sessionId) : null;
  const portalUrl = process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL;

  const rows = details
    ? [
        { label: t.checkout.planLabel, value: details.plan ? t.pricing.plans[details.plan].name : null },
        {
          label: t.checkout.intervalLabel,
          value: details.interval ? t.checkout.intervals[details.interval] : null,
        },
        { label: t.checkout.emailLabel, value: details.email },
      ].filter((row) => row.value)
    : [];

  return (
    <main className="pt-16">
      <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6 md:py-28">
        <CircleCheck className="h-12 w-12 text-success" strokeWidth={1.75} />
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {t.checkout.successTitle}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t.checkout.successLead}</p>

        {rows.length ? (
          <dl className="mt-8 divide-y divide-border rounded-xl border border-border bg-card">
            {rows.map((row) => (
              <div key={row.label} className="flex justify-between gap-6 px-5 py-3.5 text-sm">
                <dt className="text-muted-foreground">{row.label}</dt>
                <dd className="text-right font-semibold text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <h2 className="mt-12 font-display text-2xl font-semibold text-foreground">
          {t.checkout.nextTitle}
        </h2>
        <ol className="mt-5 space-y-4">
          {t.checkout.next.map((step, index) => (
            <li key={step} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                {index + 1}
              </span>
              <span className="pt-0.5 leading-relaxed text-foreground">
                {fill(step, { email: company.email })}
              </span>
            </li>
          ))}
        </ol>

        {searchParams.portal === "error" ? (
          <p
            role="alert"
            className="mt-8 flex gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            {fill(t.checkout.portalError, { email: company.email })}
          </p>
        ) : null}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild size="lg">
            <Link href="/guides">{t.checkout.guidesCta}</Link>
          </Button>
          {sessionId && details ? (
            <form action="/api/portal" method="post">
              <input type="hidden" name="session_id" value={sessionId} />
              <Button type="submit" size="lg" variant="outline" className="w-full sm:w-auto">
                {t.checkout.manage}
              </Button>
            </form>
          ) : portalUrl ? (
            <Button asChild size="lg" variant="outline">
              <a href={portalUrl}>{t.checkout.manage}</a>
            </Button>
          ) : null}
          <Button asChild size="lg" variant="ghost">
            <Link href="/">{t.checkout.home}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

async function loadSession(sessionId: string) {
  const stripe = getStripe();
  if (!stripe) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.status !== "complete") return null;
    const { plan, interval } = planFromSession(session);
    return { plan, interval, email: session.customer_details?.email ?? null };
  } catch (error) {
    console.error("Success page: failed to load checkout session:", error);
    return null;
  }
}
