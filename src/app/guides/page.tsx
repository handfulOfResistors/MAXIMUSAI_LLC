import type { Metadata } from "next";
import {
  Check,
  Clock,
  Download,
  FileText,
  Info,
  Mail,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/company";
import { fill, type Lang } from "@/lib/i18n/config";
import { getDictionary, getLang } from "@/lib/i18n/server";
import type { Dictionary } from "@/lib/i18n/sr";
import { downloadHref, guideFiles, isGuideKey } from "@/lib/guides";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  const t = getDictionary();
  return {
    title: t.meta.guidesTitle,
    description: t.meta.guidesDescription,
    alternates: { canonical: "/guides" },
  };
}

export default function GuidesPage() {
  const lang = getLang();
  const t = getDictionary(lang);
  const g = t.guides;

  const toc = [
    ...g.steps.map((step, index) => ({ href: `#step-${index + 1}`, label: `${index + 1}. ${step.title}` })),
    { href: `#step-${g.steps.length + 1}`, label: `${g.steps.length + 1}. ${g.finalTitle}` },
    { href: "#security", label: g.securityTitle.split(" — ")[0] },
    { href: "#daily", label: g.dailyTitle },
    { href: "#updates", label: g.updateTitle },
    { href: "#troubleshooting", label: g.troubleTitle },
  ];

  return (
    <main className="pt-16">
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_90%_0%,hsl(343_70%_93%/0.9),transparent_70%)]"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow">{g.eyebrow}</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground text-balance sm:text-5xl">
              {g.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{g.lead}</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <h2 className="text-sm font-semibold text-foreground">{g.overviewTitle}</h2>
            <table className="mt-3 w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-muted-foreground">
                  {g.overviewHeaders.map((header) => (
                    <th key={header} scope="col" className="pb-2 pr-3 font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {g.overviewRows.map((row) => (
                  <tr key={row[0]} className="border-t border-border">
                    <th scope="row" className="py-2.5 pr-3 font-semibold text-foreground">
                      {row[0]}
                    </th>
                    <td className="py-2.5 pr-3 text-muted-foreground">{row[1]}</td>
                    <td className="py-2.5 text-muted-foreground">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[220px_1fr]">
        <nav aria-label={g.contents} className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {g.contents}
            </p>
            <ul className="mt-4 space-y-2.5 border-l border-border">
              {toc.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="-ml-px block border-l border-transparent pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="min-w-0 space-y-8">
          {g.steps.map((step, index) => (
            <StepCard key={step.key} step={step} number={index + 1} lang={lang} g={g} />
          ))}

          <article
            id={`step-${g.steps.length + 1}`}
            className="scroll-mt-24 rounded-2xl border border-primary/30 bg-accent p-6 sm:p-8"
          >
            <StepNumber number={g.steps.length + 1} label={g.step} />
            <h2 className="mt-3 font-display text-2xl font-semibold text-foreground">{g.finalTitle}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-foreground/80">{g.finalBody}</p>
          </article>

          <section id="security" className="scroll-mt-24 rounded-2xl bg-ink p-6 text-ink-foreground sm:p-8">
            <h2 className="flex items-center gap-3 font-display text-2xl font-semibold">
              <ShieldCheck className="h-6 w-6 text-[hsl(343_80%_78%)]" />
              {g.securityTitle}
            </h2>
            <ol className="mt-6 grid gap-5 md:grid-cols-2">
              {g.security.map((rule, index) => (
                <li key={rule} className="flex gap-4">
                  <span className="font-display text-2xl font-semibold text-[hsl(343_80%_78%)]">
                    {index + 1}
                  </span>
                  <p className="leading-relaxed text-ink-muted">{rule}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="daily" className="scroll-mt-24 pt-6">
            <h2 className="section-title">{g.dailyTitle}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{g.dailyLead}</p>
            <DataTable headers={g.dailyHeaders} rows={g.dailyRows} />
            <div className="mt-8 rounded-xl border border-border bg-card p-6">
              <h3 className="flex items-center gap-2 font-semibold text-foreground">
                <TriangleAlert className="h-5 w-5 text-primary" />
                {g.dontTitle}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {g.dont.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-muted-foreground">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="updates" className="scroll-mt-24 pt-6">
            <h2 className="section-title">{g.updateTitle}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{g.updateLead}</p>
            <ol className="mt-6 space-y-3">
              {g.updateSteps.map((item, index) => (
                <li key={item} className="flex gap-4 rounded-lg border border-border bg-card px-4 py-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground">
                    {index + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed text-foreground">{item}</span>
                </li>
              ))}
            </ol>
            <Callout tone="warning" text={g.updateNote} />
          </section>

          <section id="troubleshooting" className="scroll-mt-24 pt-6">
            <h2 className="section-title">{g.troubleTitle}</h2>
            <DataTable headers={g.troubleHeaders} rows={g.troubleRows} mono />
          </section>

          <section className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-secondary/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">{g.helpTitle}</h2>
              <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">{g.helpBody}</p>
            </div>
            <Button asChild size="lg">
              <a href={`mailto:${company.email}`}>
                <Mail />
                {g.helpCta}
              </a>
            </Button>
          </section>
        </div>
      </div>
    </main>
  );
}

type Guides = Dictionary["guides"];
type Step = Guides["steps"][number];

function StepNumber({ number, label }: { number: number; label: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
      {label} {number}
    </p>
  );
}

function StepCard({ step, number, lang, g }: { step: Step; number: number; lang: Lang; g: Guides }) {
  const email = company.email;
  const files = isGuideKey(step.key) ? guideFiles[step.key] : null;
  const order: Lang[] = lang === "sr" ? ["sr", "en"] : ["en", "sr"];

  return (
    <article
      id={`step-${number}`}
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-soft [overflow-wrap:anywhere] sm:p-8"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <StepNumber number={number} label={g.step} />
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {fill(g.duration, { n: step.minutes })}
        </span>
        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
          {g.requiredFor}: {step.scope === "all" ? g.scopeAll : g.scopeBooking}
        </span>
      </div>
      <h2 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl">{step.title}</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{fill(step.summary, { email })}</p>

      {files ? (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {g.downloads}
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {order.map((fileLang) => (
              <div key={fileLang} className="rounded-xl border border-border bg-muted/60 p-3">
                <p className="px-1 text-sm font-semibold text-foreground">
                  {fileLang === "sr" ? g.langSr : g.langEn}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <DownloadLink
                    href={downloadHref(files[fileLang], "docx")}
                    label="Word"
                    hint={step.key === "intake" ? g.wordHint : g.wordHintRead}
                  />
                  <DownloadLink href={downloadHref(files[fileLang], "pdf")} label="PDF" hint={g.pdfHint} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">{g.youDo}</h3>
          <ol className="mt-4 space-y-3">
            {step.doing.map((item, index) => (
              <li key={item} className="flex gap-3 leading-relaxed text-muted-foreground">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-foreground">
                  {index + 1}
                </span>
                <span>{fill(item, { email })}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">{g.youSend}</h3>
          <ul className="mt-4 space-y-3">
            {step.send.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-foreground">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${email}`}
            className="mt-5 inline-flex items-center gap-2 break-all text-sm font-semibold text-primary hover:underline"
          >
            <Mail className="h-4 w-4 shrink-0" />
            {email}
          </a>
        </div>
      </div>

      {step.note ? <Callout tone={step.note.tone} text={step.note.text} /> : null}
    </article>
  );
}

function DownloadLink({ href, label, hint }: { href: string; label: string; hint: string }) {
  const Icon = label === "PDF" ? FileText : Download;
  return (
    <a
      href={href}
      download
      title={hint}
      className="group flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 transition-colors hover:border-primary hover:bg-accent"
    >
      <Icon className="h-4 w-4 shrink-0 text-primary" />
      <span className="min-w-0 leading-tight">
        <span className="block text-sm font-semibold text-foreground">{label}</span>
        <span className="block truncate text-[11px] text-muted-foreground">{hint}</span>
      </span>
    </a>
  );
}

function Callout({ tone, text }: { tone: string; text: string }) {
  const warning = tone === "warning";
  const Icon = warning ? TriangleAlert : Info;
  return (
    <p
      className={cn(
        "mt-6 flex gap-3 rounded-lg border px-4 py-3 text-sm leading-relaxed",
        warning
          ? "border-amber-300/70 bg-amber-50 text-amber-950"
          : "border-sky-200 bg-sky-50 text-sky-950"
      )}
    >
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", warning ? "text-amber-600" : "text-sky-600")} />
      <span>{text}</span>
    </p>
  );
}

function DataTable({ headers, rows, mono }: { headers: string[]; rows: string[][]; mono?: boolean }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/60">
            {headers.map((header) => (
              <th key={header} scope="col" className="px-5 py-3 font-semibold text-foreground">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-border align-top last:border-0">
              <th
                scope="row"
                className={cn(
                  "w-[36%] px-5 py-3.5 font-semibold text-foreground",
                  mono && row[0].includes(":") && "font-mono text-[13px]"
                )}
              >
                {row[0]}
              </th>
              <td className="px-5 py-3.5 leading-relaxed text-muted-foreground">{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
