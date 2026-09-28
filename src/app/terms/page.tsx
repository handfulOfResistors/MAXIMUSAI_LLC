import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { company } from "@/lib/company";
import { getDictionary, getLang } from "@/lib/i18n/server";

export function generateMetadata(): Metadata {
  return { title: getDictionary().meta.termsTitle, alternates: { canonical: "/terms" } };
}

export default function TermsPage() {
  const lang = getLang();
  const t = getDictionary(lang);

  return (
    <LegalPage
      title={t.meta.termsTitle}
      updatedLabel={t.legal.updated}
      updated={lang === "sr" ? "28. septembar 2026." : "September 28, 2026"}
      homeLabel={t.nav.home}
    >
      {lang === "sr" ? <TermsSr /> : <TermsEn />}
    </LegalPage>
  );
}

const mail = <a href={`mailto:${company.email}`}>{company.email}</a>;

function TermsSr() {
  return (
    <>
      <p>
        Ovi uslovi uređuju korišćenje ovog sajta i usluga koje pruža {company.legalName} („mi“): izradu
        sajtova, sisteme za online zakazivanje, chatbotove i AI chatbotove, hosting i održavanje
        (zajedno: „Usluge“). Pretplatom ili korišćenjem Usluga prihvatate ove uslove.
      </p>

      <h2>1. Za koga su Usluge</h2>
      <p>
        Usluge su namenjene preduzećima i preduzetnicima — frizerskim, kozmetičkim i sličnim salonima.
        Pretplatom potvrđujete da nastupate u ime svog poslovanja.
      </p>

      <h2>2. Paketi</h2>
      <p>
        Sadržaj paketa opisan je na stranici <Link href="/pricing">Cene</Link>. Rad van opisanog obima
        (nove funkcije, dodatne stranice, integracije) radimo po posebnoj ponudi.
      </p>

      <h2>3. Pretplata, plaćanje i obnova</h2>
      <ul>
        <li>Pretplata se plaća unapred, mesečno ili godišnje, karticom preko Stripe-a.</li>
        <li>
          Pretplata se automatski obnavlja na kraju svakog perioda dok je ne otkažete. Pretplatom
          ovlašćujete naplatu za svaki naredni period.
        </li>
        <li>Cene su iskazane u evrima. Porezi se obračunavaju tamo gde to propisi zahtevaju.</li>
        <li>
          O promeni cene obaveštavamo vas najmanje 30 dana pre obnove. Nova cena važi od prvog
          sledećeg perioda.
        </li>
      </ul>

      <h2>4. Otkazivanje i povraćaj novca</h2>
      <p>
        Pretplatu možete otkazati u svakom trenutku, preko portala za upravljanje pretplatom ili
        emailom na {mail}. Otkazivanje stupa na snagu na kraju tekućeg plaćenog perioda, do kada Usluge
        rade normalno. Za započeti period ne vraćamo novac, osim kada to zakon nalaže.
      </p>

      <h2>5. Neuspelo plaćanje</h2>
      <p>
        Ako naplata ne uspe, Stripe će pokušati ponovo i obavestiti vas. Ako plaćanje ne bude izmireno u
        razumnom roku posle našeg obaveštenja, možemo privremeno isključiti sajt ili chatbot.
      </p>

      <h2>6. Vaše obaveze</h2>
      <ul>
        <li>da nam dostavite tačne podatke o salonu, uslugama i radnom vremenu;</li>
        <li>
          da imate prava na sadržaj koji nam šaljete (logo, fotografije, tekstove) i da njegovo
          objavljivanje ne krši prava trećih lica;
        </li>
        <li>
          da čuvate svoj Google nalog: jaka lozinka, uključena verifikacija u dva koraka i niko drugi
          nema lozinku — ni mi;
        </li>
        <li>
          da poštujete propise o zaštiti podataka prema svojim klijentima čije podatke prikuplja sistem
          za zakazivanje.
        </li>
      </ul>

      <h2>7. Google nalog i usluge trećih strana</h2>
      <p>
        Sistem za zakazivanje radi u vašem Google nalogu (Google Calendar i Apps Script), plaćanje
        obrađuje Stripe, a AI chatbot koristi spoljnog pružaoca jezičkog modela. Rad Usluga zavisi i od
        dostupnosti tih servisa. Nismo odgovorni za prekide ili izmene na njihovoj strani, ali ćemo vam
        pomoći da se problem reši u najkraćem roku.
      </p>

      <h2>8. AI chatbot</h2>
      <p>
        Odgovore AI chatbota generiše jezički model na osnovu podataka koje nam dostavite. Iako ga
        podešavamo da se drži vaših informacija, odgovori mogu biti netačni ili nepotpuni. Preporučujemo
        da povremeno proverite razgovore u mesečnom izveštaju. Paket uključuje broj razgovora naveden na
        stranici Cene; za veći obim dogovaramo prelazak na odgovarajući paket.
      </p>

      <h2>9. Intelektualna svojina</h2>
      <ul>
        <li>Vaš sadržaj (tekstovi, fotografije, logo) ostaje vaš. Dajete nam pravo da ga koristimo radi pružanja Usluga.</li>
        <li>
          Naš kod, šabloni, sistem za zakazivanje i alati ostaju naši; dok traje pretplata imate pravo
          da ih koristite za svoj salon.
        </li>
        <li>Domen se registruje na vaše ime kad god je to moguće i ostaje vaš.</li>
        <li>
          Gotov sajt možemo prikazati u svom portfoliju, osim ako nam napišete da to ne želite.
        </li>
      </ul>

      <h2>10. Prekid saradnje</h2>
      <p>
        Možemo obustaviti ili prekinuti Usluge ako se ovi uslovi ozbiljno prekrše, ako plaćanje nije
        izmireno ili iz pravnih i bezbednosnih razloga. Po završetku pretplate sajt i chatbot se
        isključuju; vaš Google kalendar i svi termini u njemu ostaju vaši.
      </p>

      <h2>11. Odricanje od garancija</h2>
      <p>
        Usluge se pružaju „takve kakve jesu“. Trudimo se da rade bez prekida, ali ne garantujemo da će
        uvek biti dostupne ili bez grešaka.
      </p>

      <h2>12. Ograničenje odgovornosti</h2>
      <p>
        U meri u kojoj zakon dozvoljava, nismo odgovorni za indirektnu ili posledičnu štetu, izgubljenu
        dobit ili izgubljene podatke. Naša ukupna odgovornost ograničena je na iznos koji ste nam
        platili u poslednjih 12 meseci.
      </p>

      <h2>13. Merodavno pravo</h2>
      <p>
        Na ove uslove primenjuje se pravo savezne države Delaver (SAD), bez obzira na kolizione norme,
        osim ako obavezni propisi vaše zemlje ne predviđaju drugačije.
      </p>

      <h2>14. Izmene uslova</h2>
      <p>
        Uslove možemo povremeno menjati. O značajnim izmenama pretplatnike obaveštavamo emailom
        najmanje 30 dana unapred.
      </p>

      <h2>15. Kontakt</h2>
      <p>
        {company.legalName} · {mail}
      </p>
    </>
  );
}

function TermsEn() {
  return (
    <>
      <p>
        These terms govern your use of this website and the services provided by {company.legalName}{" "}
        (“we”, “us”): website design and development, online booking systems, chatbots and AI chatbots,
        hosting and maintenance (together, the “Services”). By subscribing to or using the Services you
        accept these terms.
      </p>

      <h2>1. Who the Services are for</h2>
      <p>
        The Services are intended for businesses and sole traders — hair, beauty and similar salons. By
        subscribing you confirm that you are acting on behalf of your business.
      </p>

      <h2>2. Plans</h2>
      <p>
        What each plan includes is described on the <Link href="/pricing">Pricing</Link> page. Work beyond
        that scope (new features, extra pages, integrations) is quoted separately.
      </p>

      <h2>3. Subscription, billing and renewal</h2>
      <ul>
        <li>Subscriptions are paid in advance, monthly or yearly, by card through Stripe.</li>
        <li>
          Your subscription renews automatically at the end of each period until you cancel. By
          subscribing you authorise us to charge you for each renewal period.
        </li>
        <li>Prices are shown in euros. Taxes are added where the law requires.</li>
        <li>
          We will tell you about any price change at least 30 days before your renewal. The new price
          applies from the following period.
        </li>
      </ul>

      <h2>4. Cancellation and refunds</h2>
      <p>
        You can cancel at any time through the subscription portal or by emailing {mail}. Cancellation
        takes effect at the end of the current paid period, and the Services keep working until then. We
        don&apos;t refund partially used periods, except where the law requires.
      </p>

      <h2>5. Failed payments</h2>
      <p>
        If a payment fails, Stripe will retry and notify you. If it remains unpaid within a reasonable
        time after our notice, we may temporarily switch off the website or chatbot.
      </p>

      <h2>6. Your responsibilities</h2>
      <ul>
        <li>to give us accurate information about your salon, services and opening hours;</li>
        <li>
          to hold the rights to the content you send us (logo, photos, text) and ensure that publishing
          it doesn&apos;t infringe anyone else&apos;s rights;
        </li>
        <li>
          to keep your Google account secure: a strong password, two-step verification switched on, and
          nobody else holding the password — including us;
        </li>
        <li>
          to comply with data protection law towards your clients whose details the booking system
          collects.
        </li>
      </ul>

      <h2>7. Your Google account and third-party services</h2>
      <p>
        The booking system runs in your Google account (Google Calendar and Apps Script), payments are
        handled by Stripe, and the AI chatbot uses an external language model provider. The Services
        depend on those services being available. We aren&apos;t responsible for outages or changes on
        their side, but we will help you resolve any issue as quickly as possible.
      </p>

      <h2>8. AI chatbot</h2>
      <p>
        AI chatbot replies are generated by a language model based on the information you provide. We
        configure it to stick to your information, but replies may still be inaccurate or incomplete. We
        recommend reviewing conversations in the monthly report. Each plan includes the number of
        conversations shown on the Pricing page; for higher volumes we will agree on a suitable plan.
      </p>

      <h2>9. Intellectual property</h2>
      <ul>
        <li>Your content (text, photos, logo) remains yours. You grant us the right to use it to provide the Services.</li>
        <li>
          Our code, templates, booking system and tools remain ours; while your subscription is active you
          may use them for your salon.
        </li>
        <li>Your domain is registered in your name wherever possible and remains yours.</li>
        <li>We may show your finished website in our portfolio unless you tell us you&apos;d rather we didn&apos;t.</li>
      </ul>

      <h2>10. Termination</h2>
      <p>
        We may suspend or end the Services for a serious breach of these terms, non-payment, or legal and
        security reasons. When a subscription ends, the website and chatbot are switched off; your Google
        Calendar and all bookings in it remain yours.
      </p>

      <h2>11. Disclaimer</h2>
      <p>
        The Services are provided “as is”. We work hard to keep them running without interruption, but we
        don&apos;t guarantee that they will always be available or error-free.
      </p>

      <h2>12. Limitation of liability</h2>
      <p>
        To the extent permitted by law, we are not liable for indirect or consequential damages, lost
        profits or lost data. Our total liability is limited to the amount you paid us in the preceding 12
        months.
      </p>

      <h2>13. Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Delaware, USA, without regard to
        conflict-of-law rules, unless mandatory law in your country provides otherwise.
      </p>

      <h2>14. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. We will email subscribers about significant changes
        at least 30 days in advance.
      </p>

      <h2>15. Contact</h2>
      <p>
        {company.legalName} · {mail}
      </p>
    </>
  );
}
