import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/company";
import { getDictionary, getLang } from "@/lib/i18n/server";

export function SiteHeader() {
  const lang = getLang();
  const t = getDictionary(lang);

  const links = [
    { href: "/#services", label: t.nav.services },
    { href: "/#work", label: t.nav.work },
    { href: "/pricing", label: t.nav.pricing },
    { href: "/guides", label: t.nav.guides },
    { href: "/#contact", label: t.nav.contact },
  ];
  const cta = { href: "/pricing", label: t.nav.cta };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" aria-label={`${company.brandName} — ${t.nav.home}`}>
          <Logo name={company.brandName} />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher lang={lang} label={t.nav.language} />
          <Button asChild size="sm">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher lang={lang} label={t.nav.language} />
          <MobileNav
            links={links}
            cta={cta}
            openLabel={t.nav.openMenu}
            closeLabel={t.nav.closeMenu}
          />
        </div>
      </div>
    </header>
  );
}
