"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { company } from "@/lib/company";

type Status = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(
          payload?.error || "Something went wrong. Please try again."
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  return (
    <section id="contact" className="relative border-t border-border/70 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Contact
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Let&apos;s talk business, publishing, or partnerships.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Reach us directly by email or send a short message through the form.
          </p>
          <a
            href={`mailto:${company.email}`}
            className="mt-8 inline-block text-lg text-primary transition-colors hover:text-primary/80"
          >
            {company.email}
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" autoComplete="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" required />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending…" : "Send message"}
          </Button>
          {status === "success" ? (
            <p className="text-sm text-primary" role="status">
              Message sent. We&apos;ll get back to you soon.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm text-destructive" role="alert">
              {errorMessage} You can also email us at {company.email}.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
