"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fill } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/sr";

type Status = "idle" | "loading" | "success" | "error";
type Topic = keyof Dictionary["contact"]["topics"];
type ErrorCode = keyof Dictionary["contact"]["errors"];

type Props = {
  t: Dictionary["contact"];
  email: string;
  id?: string;
  title?: string;
  lead?: string;
  defaultTopic?: Topic;
};

export function ContactSection({
  t,
  email,
  id = "contact",
  title,
  lead,
  defaultTopic = "general",
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorCode, setErrorCode] = useState<ErrorCode>("send_failed");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? "");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: field("name"),
          email: field("email"),
          salon: field("salon"),
          phone: field("phone"),
          topic: field("topic"),
          message: field("message"),
          website: field("website"),
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        const code = payload?.error;
        setErrorCode(code && code in t.errors ? (code as ErrorCode) : "send_failed");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorCode("network");
      setStatus("error");
    }
  }

  const topics = Object.entries(t.topics) as [Topic, string][];

  return (
    <section id={id} className="border-t border-border py-24 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="section-title mt-4 text-balance">{title ?? t.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{lead ?? t.lead}</p>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {t.direct}
          </p>
          <a
            href={`mailto:${email}`}
            className="mt-2 inline-flex items-center gap-2 break-all text-lg font-semibold text-primary hover:underline"
          >
            <Mail className="h-5 w-5 shrink-0" />
            {email}
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={`${id}-name`} label={t.name}>
              <Input id={`${id}-name`} name="name" autoComplete="name" required maxLength={120} />
            </Field>
            <Field id={`${id}-email`} label={t.email}>
              <Input
                id={`${id}-email`}
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={200}
              />
            </Field>
            <Field id={`${id}-salon`} label={t.salon} hint={t.optional}>
              <Input id={`${id}-salon`} name="salon" autoComplete="organization" maxLength={120} />
            </Field>
            <Field id={`${id}-phone`} label={t.phone} hint={t.optional}>
              <Input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={40} />
            </Field>
          </div>

          <Field id={`${id}-topic`} label={t.topic}>
            <select
              id={`${id}-topic`}
              name="topic"
              defaultValue={defaultTopic}
              className="flex h-11 w-full rounded-md border border-input bg-card px-3 text-base text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
            >
              {topics.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>

          <Field id={`${id}-message`} label={t.message}>
            <Textarea
              id={`${id}-message`}
              name="message"
              required
              maxLength={5000}
              placeholder={t.messagePlaceholder}
            />
          </Field>

          {/* Zamka za spam botove — ljudi ovo polje ne vide. */}
          <div className="hidden" aria-hidden>
            <label htmlFor={`${id}-website`}>Website</label>
            <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button type="submit" size="lg" disabled={status === "loading"}>
              {status === "loading" ? t.sending : t.send}
            </Button>
            {status === "success" ? (
              <p className="text-sm font-medium text-success" role="status">
                {t.success}
              </p>
            ) : null}
          </div>
          {status === "error" ? (
            <p className="text-sm text-destructive" role="alert">
              {t.errors[errorCode]} {fill(t.fallback, { email })}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {hint ? <span className="ml-1 font-normal text-muted-foreground">({hint})</span> : null}
      </Label>
      {children}
    </div>
  );
}
