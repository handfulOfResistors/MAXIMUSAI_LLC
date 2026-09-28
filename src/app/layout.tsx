import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/lib/company";
import { getDictionary, getLang } from "@/lib/i18n/server";
import "./globals.css";

// Fontovi su lokalni (latinica + latin-ext za č, ć, š, ž, đ) — build ne zavisi od Google Fonts.
const sans = localFont({
  src: "./fonts/source-sans-3-var.woff2",
  variable: "--font-sans",
  weight: "300 800",
  display: "swap",
});

const display = localFont({
  src: [
    { path: "./fonts/fraunces-var.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/fraunces-italic-var.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary();
  return {
    title: {
      default: t.meta.title,
      template: `%s | ${company.brandName}`,
    },
    description: t.meta.description,
    metadataBase: new URL(company.siteUrl),
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: "website",
      locale: t.meta.ogLocale,
      siteName: company.brandName,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: t.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = getLang();

  return (
    <html lang={lang === "sr" ? "sr-Latn" : "en"}>
      <body
        className={`${sans.variable} ${display.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
