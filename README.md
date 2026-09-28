# MAXIMUSAI — sajt

Sajt kompanije **MAXIMUSAI LLC**: izrada sajtova, online zakazivanja i AI chatbotova za frizerske i kozmetičke salone.
Dvojezično (srpski / engleski), sa pretplatom preko Stripe-a i stranicom sa uputstvima za klijente.

## Stack

- Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui
- Stripe Checkout (pretplate) + Customer Portal + webhook
- Nodemailer (Gmail) za kontakt formu i obaveštenja o pretplatama

## Pokretanje

```bash
npm install
cp .env.example .env.local   # pa popuni vrednosti
npm run dev
```

Otvori [http://localhost:3000](http://localhost:3000).

| Skripta | Šta radi |
|---|---|
| `npm run dev` | razvojni server |
| `npm run build` / `npm run start` | produkcioni build / server |
| `npm run lint` · `npm run typecheck` | ESLint · TypeScript provera |
| `npm run stripe:setup` | pravi Stripe proizvode i cene iz `src/lib/pricing.json` |

## Stranice

| Ruta | Sadržaj |
|---|---|
| `/` | Hero, usluge, kako funkcioniše, rad za La Vie Elegance, cene, zašto mi, FAQ, kontakt |
| `/pricing` | Paketi sa pretplatom (mesečno / godišnje), poređenje, pitanja o plaćanju, forma za ponudu |
| `/guides` | Uputstva za klijente sa preuzimanjem Word/PDF fajlova (SR + EN) |
| `/checkout/success`, `/checkout/cancel` | Povratak sa Stripe plaćanja |
| `/privacy`, `/terms` | Politika privatnosti i Uslovi korišćenja (SR + EN) |

## Jezici (SR / EN)

- Svi tekstovi su u `src/lib/i18n/sr.ts` i `src/lib/i18n/en.ts` (EN mora imati iste ključeve kao SR — TypeScript to proverava).
- Podrazumevano: srpski. Izbor jezika se pamti u kolačiću `mx-lang`.
- Link sa `?lang=en` (npr. `https://maximusai.llc/guides?lang=en`) otvara stranicu na engleskom — zgodno za slanje klijentu.
- Pravni tekstovi su direktno u `src/app/privacy/page.tsx` i `src/app/terms/page.tsx` (obe verzije u istom fajlu).

## Paketi i cene

Cene su na **jednom mestu**: `src/lib/pricing.json`.

```json
{ "id": "booking", "monthly": 35, "yearly": 350, "from": false, "highlight": true }
```

- `from: true` → prikazuje „od" ispred cene i dugme „Zatraži ponudu" (Custom AI chatbot).
- `highlight: true` → istaknuta kartica „Najpopularnije".
- `yearlyFreeMonths` → tekst „2 meseca gratis" (godišnja cena se upisuje ručno).
- Tekstovi paketa (naziv, opis, stavke) su u rečnicima pod `pricing.plans`.

> **Posle svake izmene cena pokreni `npm run stripe:setup`** (prvo sa test ključem, pa sa live ključem).
> Skripta pravi novu cenu, prebacuje lookup key na nju i arhivira staru. Postojeći pretplatnici ostaju na staroj ceni.

## Stripe — dva načina naplate

1. **Payment Links (ručno u Dashboard-u)** — upiši URL-ove (`https://buy.stripe.com/...`) u `paymentLinks` za svaki paket u
   `src/lib/pricing.json`. Dugme „Pretplati se" tada vodi direktno na link, uz `client_reference_id` (npr. `booking_yearly`)
   da webhook i stranica zahvalnosti znaju koji je paket, i `locale=en` za engleske posetioce.
   Kod linka u Stripe-u podesi: *After payment → Don't show confirmation page → Redirect* na
   `https://maximusai.llc/checkout/success?session_id={CHECKOUT_SESSION_ID}`.
   **Kad menjaš cenu, napravi novu cenu i novi link u Stripe-u i zameni URL u `pricing.json`** — iznos na sajtu i u Stripe-u se ne usklađuju sami.
2. **Checkout preko API-ja** — ako je link prazan, sajt sam pravi Checkout sesiju (koraci ispod, `npm run stripe:setup`).

Za oba načina važe Customer Portal, webhook i `STRIPE_SECRET_KEY` (stranica zahvalnosti i webhook ga koriste).

## Stripe — podešavanje (API checkout)

1. **Ključevi** — [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys). Upiši `STRIPE_SECRET_KEY` u `.env.local`. Počni sa `sk_test_...`.
2. **Proizvodi i cene** — `npm run stripe:setup`. Pravi 3 proizvoda i 6 cena sa lookup key-evima
   `maximusai_<website|booking|ai>_<monthly|yearly>`. Checkout ih traži po lookup key-u, pa u kodu nema ID-jeva cena.
3. **Customer Portal** — Dashboard → Settings → Billing → **Customer portal** → uključi otkazivanje, promenu kartice i istoriju računa → **Save**.
   Bez ovog koraka dugme „Upravljaj pretplatom" ne radi. Tu kopiraj i **Login link** u `NEXT_PUBLIC_STRIPE_PORTAL_URL` (link „Upravljanje pretplatom" u futeru i na cenama).
4. **Webhook** — Dashboard → Developers → Webhooks → Add endpoint:
   - URL: `https://maximusai.llc/api/stripe/webhook`
   - Događaji: `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_failed`
   - Signing secret (`whsec_...`) upiši u `STRIPE_WEBHOOK_SECRET`.
   Za svaki događaj stiže email na `CONTACT_TO` (nova pretplata sa nazivom salona, otkazivanje, neuspelo plaćanje).
5. **Javni podaci** — Dashboard → Settings → Public details: naziv, email za podršku i URL-ovi `/terms` i `/privacy`.
   Ako želiš da kupac mora da štiklira prihvatanje uslova, postavi `STRIPE_REQUIRE_TOS=true`.
6. **Porezi** — cene su bez automatskog obračuna poreza. Ako treba PDV ili drugi porez, uključi Stripe Tax i dogovori se sa knjigovođom.

### Lokalno testiranje webhook-a

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook   # ispiše whsec_... za .env.local
```

Test kartica: `4242 4242 4242 4242`, bilo koji budući datum i CVC.

### Šta Checkout traži od kupca

Email, karticu, adresu za račun, telefon, **naziv salona** (dodatno polje) i opciono PIB/poreski broj. Kod promo kodova je uključen
(`allow_promotion_codes`) — kupone praviš u Dashboard → Products → Coupons.

Stripe Checkout nema srpski jezik; za SR posetioce koristi jezik pregledača (`locale: "auto"`), za EN engleski.

## Uputstva za klijente (`/guides`)

Fajlovi su u `public/downloads/` (Word za popunjavanje/izmene + PDF za čitanje i štampu):

| Korak | Srpski | English |
|---|---|---|
| 1. Upitnik | `01-upitnik-za-klijenta-sr` | `01-client-intake-form-en` |
| 2. Google nalog i kalendar | `02-uputstvo-google-nalog-i-kalendar-sr` | `02-guide-google-account-and-calendar-en` |
| 3. Apps Script | `03-uputstvo-apps-script-sr` | `03-guide-apps-script-setup-en` |

Izvor su dokumenti iz `La Vie Elegance/uputstva`. Kad izmeniš `.docx`, iz Worda sačuvaj i **PDF sa istim imenom** i zameni oba fajla.
Tekst na samoj stranici (koraci, tabele, rešavanje problema) je u rečnicima pod `guides`. Mapa fajlova: `src/lib/guides.ts`.

## Radovi

`src/lib/portfolio.ts` — kad sajt La Vie Elegance bude javno dostupan, upiši `liveUrl` i pojaviće se dugme „Pogledaj sajt".
Snimci ekrana su u `public/work/`.

## Kontakt forma

Postavi u `.env.local`:

1. `SMTP_USER` — Gmail adresa koja šalje (npr. `adjustrategy@gmail.com`)
2. `SMTP_PASS` — [Google App Password](https://myaccount.google.com/apppasswords) (ne obična lozinka)
3. `CONTACT_TO` — gde stižu poruke

Forma ima skriveno „honeypot" polje protiv spam botova.

## Deploy (Vercel)

1. Poveži GitHub repo na [vercel.com](https://vercel.com) → framework Next.js se prepoznaje sam.
2. U Project → Settings → Environment Variables unesi sve iz `.env.example` (sa **live** Stripe ključevima za produkciju).
3. `NEXT_PUBLIC_SITE_URL` = pravi domen (npr. `https://maximusai.llc`).
4. Posle deploya: webhook URL u Stripe-u mora da pokazuje na produkcioni domen.

## Fontovi

Fraunces (naslovi) i Source Sans 3 (tekst), lokalno u `src/app/fonts/` (latinica + č ć š ž đ), licenca SIL OFL — fajlovi `OFL-*.txt`.

## Kompanija

- MAXIMUSAI LLC · Delaware, SAD · tim u Srbiji
- adjustrategy@gmail.com
