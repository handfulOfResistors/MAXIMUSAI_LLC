import { NextResponse } from "next/server";
import { detailsMail, isMailerConfigured, sendMail } from "@/lib/mailer";

export const runtime = "nodejs";

const topics: Record<string, string> = {
  general: "Opšte pitanje",
  website: "Paket Sajt",
  booking: "Paket Sajt + chatbot",
  ai: "Custom AI chatbot",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clean(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  // Honeypot: botovi popune skriveno polje — pravimo se da je poslato.
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const salon = clean(body.salon, 120);
  const phone = clean(body.phone, 40);
  const topic = topics[clean(body.topic, 20)] ?? topics.general;
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "too_long" }, { status: 400 });
  }
  if (!isMailerConfigured()) {
    console.error("Contact form: SMTP_USER / SMTP_PASS are not configured.");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  try {
    const { text, html } = detailsMail(
      "Nova poruka sa sajta",
      [
        ["Ime", name],
        ["Email", email],
        ["Salon", salon],
        ["Telefon", phone],
        ["Tema", topic],
      ],
      message
    );
    await sendMail({
      subject: `[${topic}] ${name}${salon ? ` — ${salon}` : ""}`,
      replyTo: email,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}
