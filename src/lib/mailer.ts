import nodemailer from "nodemailer";
import { company } from "@/lib/company";

type Mail = {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  to?: string;
};

export function isMailerConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

/** Šalje email preko Gmail SMTP-a (SMTP_USER / SMTP_PASS). Baca grešku ako slanje ne uspe. */
export async function sendMail({ subject, text, html, replyTo, to }: Mail) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) throw new Error("SMTP_USER / SMTP_PASS are not configured.");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"${company.brandName}" <${user}>`,
    to: to ?? process.env.CONTACT_TO ?? company.email,
    replyTo,
    subject,
    text,
    html,
  });
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Pravi jednostavan email od liste „naziv: vrednost" redova. */
export function detailsMail(title: string, rows: [string, string | null | undefined][], body?: string) {
  const filled = rows.filter((row): row is [string, string] => Boolean(row[1]));
  const text = [title, "", ...filled.map(([k, v]) => `${k}: ${v}`), ...(body ? ["", body] : [])].join(
    "\n"
  );
  const html = `
    <h2 style="font-family:Arial,sans-serif">${escapeHtml(title)}</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      ${filled
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#666">${escapeHtml(k)}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`
        )
        .join("")}
    </table>
    ${body ? `<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(body)}</p>` : ""}
  `;
  return { text, html };
}
