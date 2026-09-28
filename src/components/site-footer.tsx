import Link from "next/link";
import { Logo } from "@/components/logo";
import { company } from "@/lib/company";
import { getDictionary } from "@/lib/i18n/server";

export function SiteFooter() {
  const t = getDictionary();
  const portalUrl = process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL;

  const pages = [
    { href: "/#services", label: t.nav.services },
    { href: "/#work", label: t.nav.work },
    { href: "/pricing", label: t.nav.pricing },
    { href: "/guides", label: t.nav.guides },
    { href: "/#contact", label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo name={company.brandName} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {t.footer.tagline}
          </p>
        </div>

        <FooterColumn title={t.footer.pages}>
          {pages.map((page) => (
            <FooterLink key={page.href} href={page.href}>
              {page.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title={t.footer.legal}>
          <FooterLink href="/privacy">{t.footer.privacy}</FooterLink>
          <FooterLink href="/terms">{t.footer.terms}</FooterLink>
          {portalUrl ? <FooterLink href={portalUrl}>{t.footer.manage}</FooterLink> : null}
        </FooterColumn>

        <FooterColumn title={t.footer.contact}>
          <a
            href={`mailto:${company.email}`}
            className="break-all text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {company.email}
          </a>
        </FooterColumn>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {company.legalName}. {t.footer.rights}
          </p>
          <p>{t.footer.entity}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">{title}</p>
      <div className="mt-4 flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  if (external) {
    return (
      <a
        href={href}
        className="text-sm text-muted-foreground transition-colors hover:text-primary"
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
      {children}
    </Link>
  );
}
