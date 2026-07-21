import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { GamesSection } from "@/components/games-section";
import { HeroSection } from "@/components/hero-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <GamesSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
