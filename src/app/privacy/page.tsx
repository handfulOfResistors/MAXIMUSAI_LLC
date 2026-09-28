import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { company } from "@/lib/company";
import { getDictionary, getLang } from "@/lib/i18n/server";

export function generateMetadata(): Metadata {
  return { title: getDictionary().meta.privacyTitle, alternates: { canonical: "/privacy" } };
}

export default function PrivacyPage() {
  const lang = getLang();
  const t = getDictionary(lang);

  return (
    <LegalPage
      title={t.meta.privacyTitle}
      updatedLabel={t.legal.updated}
      updated={lang === "sr" ? "28. septembar 2026." : "September 28, 2026"}
      homeLabel={t.nav.home}
    >
      {lang === "sr" ? <PrivacySr /> : <PrivacyEn />}
    </LegalPage>
  );
}

const mail = <a href={`mailto:${company.email}`}>{company.email}</a>;

function PrivacySr() {
  return (
    <>
      <p>
        Ova politika objašnjava kako {company.legalName} („mi“), kompanija registrovana u saveznoj
        državi Delaver (SAD) sa timom u Srbiji, prikuplja, koristi i štiti podatke o ličnosti kada
        posećujete ovaj sajt, pišete nam, pretplatite se na naše usluge ili koristite sajtove,
        sisteme za zakazivanje i chatbotove koje pravimo za salone.
      </p>

      <h2>1. Koje podatke prikupljamo</h2>
      <ul>
        <li>
          <strong>Kontakt forma i email</strong> — ime, email, naziv salona, telefon i sadržaj poruke.
        </li>
        <li>
          <strong>Pretplata i plaćanje</strong> — plaćanje obrađuje Stripe. Mi dobijamo ime, email,
          adresu za račun, poreski broj (PIB) ako ga unesete, telefon, naziv salona, status
          pretplate i istoriju računa. Broj kartice nikada ne vidimo i ne čuvamo.
        </li>
        <li>
          <strong>Materijali za izradu sajta</strong> — upitnik, logo, fotografije, cenovnik, podaci
          o timu, ID Google kalendara i adresa Web aplikacije koje nam pošaljete.
        </li>
        <li>
          <strong>Tehnički podaci</strong> — serverski zapisi (IP adresa, pregledač, posećene
          stranice) i jedan neophodni kolačić <code>mx-lang</code> koji pamti izabrani jezik. Ne
          koristimo kolačiće za analitiku ni reklame.
        </li>
      </ul>

      <h2>2. Podaci klijenata vašeg salona</h2>
      <p>
        Chatbot za zakazivanje upisuje ime, telefon, email i uslugu direktno u Google kalendar u{" "}
        <strong>vašem</strong> Google nalogu. Za te podatke rukovalac ste vi (salon), a mi smo
        obrađivač samo dok imamo pristup kalendaru radi podešavanja ili podrške — pristup koji možete
        ukinuti u svakom trenutku.
      </p>
      <p>
        Kod paketa Custom AI chatbot, poruke koje posetioci pišu šalju se odabranom pružaocu jezičkog
        modela (npr. OpenAI, Anthropic ili Google) radi generisanja odgovora. Koristimo poslovne API
        usluge tih pružalaca i biramo podešavanja u kojima se podaci ne koriste za treniranje modela,
        tamo gde pružalac nudi takvu opciju.
      </p>

      <h2>3. Zašto koristimo podatke</h2>
      <ul>
        <li>da odgovorimo na upit i pripremimo ponudu;</li>
        <li>da napravimo, hostujemo i održavamo vaš sajt i sistem za zakazivanje;</li>
        <li>da naplatimo pretplatu, izdamo račun i ispunimo poreske obaveze;</li>
        <li>da vas obavestimo o izmenama usluge, cena ili ovih pravila;</li>
        <li>da zaštitimo sajt i usluge od zloupotrebe.</li>
      </ul>
      <p>
        Pravni osnov je izvršenje ugovora, naš legitimni interes (bezbednost i unapređenje usluge),
        zakonska obaveza (računovodstvo) i, gde je potrebno, vaš pristanak.
      </p>

      <h2>4. Kome prosleđujemo podatke</h2>
      <p>Podatke ne prodajemo. Delimo ih samo sa pružaocima usluga koji nam pomažu u radu:</p>
      <ul>
        <li>Stripe — obrada plaćanja i računa;</li>
        <li>Google — email (Gmail), Google Calendar i Apps Script za zakazivanje;</li>
        <li>pružalac hostinga na kome radi sajt;</li>
        <li>pružaoci jezičkih modela — samo za paket Custom AI chatbot;</li>
        <li>savetnici i državni organi, kada to zakon zahteva.</li>
      </ul>

      <h2>5. Prenos podataka u inostranstvo</h2>
      <p>
        Pošto smo američka kompanija i koristimo globalne pružaoce usluga, podaci se mogu obrađivati u
        SAD i drugim zemljama. U tim slučajevima oslanjamo se na odgovarajuće mere zaštite, kao što su
        standardne ugovorne klauzule, gde su primenljive.
      </p>

      <h2>6. Koliko dugo čuvamo podatke</h2>
      <ul>
        <li>upite iz kontakt forme — do 24 meseca od poslednje komunikacije;</li>
        <li>podatke o plaćanju i račune — koliko nalažu poreski i računovodstveni propisi;</li>
        <li>
          materijale za sajt — dok traje pretplata i do 90 dana posle njenog završetka, osim ako ranije
          zatražite brisanje.
        </li>
      </ul>

      <h2>7. Vaša prava</h2>
      <p>
        U skladu sa Zakonom o zaštiti podataka o ličnosti i GDPR-om, imate pravo na pristup, ispravku,
        brisanje, ograničenje obrade, prenosivost i prigovor, kao i pravo da povučete pristanak. Zahtev
        pošaljite na {mail}. Imate i pravo da podnesete pritužbu Povereniku za informacije od javnog
        značaja i zaštitu podataka o ličnosti.
      </p>

      <h2>8. Bezbednost</h2>
      <p>
        Primenjujemo razumne tehničke i organizacione mere zaštite. Nikada ne tražimo lozinke od vaših
        naloga — pristup kalendaru dobijamo isključivo pozivnicom koju vi kontrolišete.
      </p>

      <h2>9. Deca</h2>
      <p>Naše usluge su namenjene preduzećima i nisu namenjene licima mlađim od 16 godina.</p>

      <h2>10. Izmene</h2>
      <p>
        Ovu politiku možemo povremeno menjati. Datum poslednje izmene je naveden na vrhu stranice, a o
        značajnim izmenama pretplatnike obaveštavamo emailom.
      </p>

      <h2>11. Kontakt</h2>
      <p>
        {company.legalName} · {mail}
      </p>
    </>
  );
}

function PrivacyEn() {
  return (
    <>
      <p>
        This policy explains how {company.legalName} (“we”, “us”), a Delaware limited liability company
        with a team in Serbia, collects, uses and protects personal data when you visit this website,
        contact us, subscribe to our services, or use the websites, booking systems and chatbots we build
        for salons.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>
          <strong>Contact form and email</strong> — name, email, salon name, phone number and message.
        </li>
        <li>
          <strong>Subscription and payment</strong> — payments are processed by Stripe. We receive your
          name, email, billing address, tax ID if you provide one, phone number, salon name, subscription
          status and invoice history. We never see or store your full card number.
        </li>
        <li>
          <strong>Project materials</strong> — the intake form, logo, photos, price list, team details,
          Google Calendar ID and Web app URL you send us.
        </li>
        <li>
          <strong>Technical data</strong> — server logs (IP address, browser, pages visited) and one
          strictly necessary cookie, <code>mx-lang</code>, which remembers your language. We don&apos;t use
          analytics or advertising cookies.
        </li>
      </ul>

      <h2>2. Your salon&apos;s client data</h2>
      <p>
        The booking chatbot writes names, phone numbers, emails and services directly into the Google
        Calendar in <strong>your</strong> Google account. You (the salon) are the controller of that
        data; we act as a processor only while we have calendar access for setup or support — access you
        can revoke at any time.
      </p>
      <p>
        With the Custom AI chatbot plan, messages written by visitors are sent to the selected language
        model provider (e.g. OpenAI, Anthropic or Google) to generate replies. We use these
        providers&apos; business API services and choose settings under which data is not used for model
        training, where the provider offers that option.
      </p>

      <h2>3. How we use information</h2>
      <ul>
        <li>to answer your enquiry and prepare a quote;</li>
        <li>to build, host and maintain your website and booking system;</li>
        <li>to bill your subscription, issue invoices and meet tax obligations;</li>
        <li>to tell you about changes to the service, prices or these policies;</li>
        <li>to protect the website and services from abuse.</li>
      </ul>
      <p>
        Our legal bases are performance of a contract, our legitimate interests (security and service
        improvement), legal obligations (accounting) and, where required, your consent.
      </p>

      <h2>4. Who we share information with</h2>
      <p>We don&apos;t sell personal data. We share it only with providers that help us operate:</p>
      <ul>
        <li>Stripe — payment processing and invoicing;</li>
        <li>Google — email (Gmail), Google Calendar and Apps Script for bookings;</li>
        <li>the hosting provider that runs the website;</li>
        <li>language model providers — only for the Custom AI chatbot plan;</li>
        <li>professional advisers and authorities, where required by law.</li>
      </ul>

      <h2>5. International transfers</h2>
      <p>
        As a US company using global service providers, your data may be processed in the United States
        and other countries. Where applicable, we rely on appropriate safeguards such as standard
        contractual clauses.
      </p>

      <h2>6. How long we keep data</h2>
      <ul>
        <li>contact enquiries — up to 24 months after our last communication;</li>
        <li>payment data and invoices — as long as tax and accounting laws require;</li>
        <li>
          project materials — for the duration of your subscription and up to 90 days after it ends,
          unless you ask us to delete them sooner.
        </li>
      </ul>

      <h2>7. Your rights</h2>
      <p>
        Depending on where you live (including under the GDPR and Serbia&apos;s Law on Personal Data
        Protection), you have the right to access, correct, delete, restrict, port and object to the
        processing of your data, and to withdraw consent. Send requests to {mail}. You may also lodge a
        complaint with your local data protection authority.
      </p>

      <h2>8. Security</h2>
      <p>
        We apply reasonable technical and organisational safeguards. We never ask for your account
        passwords — we get calendar access only through an invitation that you control.
      </p>

      <h2>9. Children</h2>
      <p>Our services are intended for businesses and not for anyone under 16.</p>

      <h2>10. Changes</h2>
      <p>
        We may update this policy from time to time. The date at the top shows the latest revision, and we
        email subscribers about significant changes.
      </p>

      <h2>11. Contact</h2>
      <p>
        {company.legalName} · {mail}
      </p>
    </>
  );
}
