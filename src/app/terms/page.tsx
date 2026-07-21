import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-28">
        <p className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>{" "}
          / Terms of Service
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: July 21, 2026
        </p>

        <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and
            use of the website and related online services operated by{" "}
            {company.legalName} (&quot;Company&quot;, &quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;), a Delaware limited liability
            company. By accessing or using our Services, you agree to these Terms.
            If you do not agree, do not use the Services.
          </p>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              1. Eligibility
            </h2>
            <p>
              You must be at least 13 years old to use the Services. If you are
              under the age of majority in your jurisdiction, you may use the
              Services only with the involvement and consent of a parent or legal
              guardian. By using the Services, you represent that you have the
              legal capacity to enter into these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              2. Description of Services
            </h2>
            <p>
              {company.legalName} is an indie game development studio and digital
              games and software publisher. Our Services may include our website,
              product information, communications tools, and, where available,
              digital game or software offerings and related support.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              3. Accounts and Communications
            </h2>
            <p>
              If you create an account or contact us, you agree to provide accurate
              information and to keep it reasonably up to date. You are responsible
              for activity that occurs under your account credentials. You may
              receive administrative or transactional messages related to your use
              of the Services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              4. Acceptable Use
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>use the Services for any unlawful purpose;</li>
              <li>
                attempt to gain unauthorized access to systems, accounts, or data;
              </li>
              <li>
                interfere with or disrupt the Services, servers, or networks;
              </li>
              <li>
                reverse engineer, scrape, or copy the Services except as permitted
                by applicable law;
              </li>
              <li>
                upload or transmit malware, spam, or harmful content; or
              </li>
              <li>
                infringe the intellectual property or other rights of the Company
                or any third party.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              5. Intellectual Property
            </h2>
            <p>
              All content on the Services — including branding, logos, text,
              graphics, gameplay concepts, software, audio, and other materials —
              is owned by {company.legalName} or its licensors and is protected by
              intellectual property laws. Except for limited rights expressly
              granted to you (for example, a personal license to play a purchased
              game), no rights are transferred to you.
            </p>
            <p>
              You may not copy, modify, distribute, publicly display, sell, or
              create derivative works from our content without prior written
              permission, except as allowed by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              6. Purchases and Digital Products
            </h2>
            <p>
              If we offer paid products or services, prices, taxes, and payment
              terms will be presented at checkout. Purchases may be processed by
              third-party payment providers. Unless otherwise stated at the time of
              purchase or required by law, digital product sales are final and
              non-refundable. Any license granted for digital content is personal,
              non-exclusive, non-transferable, and limited to personal,
              non-commercial use, unless we state otherwise.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              7. Third-Party Services
            </h2>
            <p>
              The Services may link to or integrate with third-party websites,
              platforms, or tools. We do not control and are not responsible for
              third-party content, policies, or practices. Your use of third-party
              services is at your own risk and may be subject to separate terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              8. Disclaimers
            </h2>
            <p>
              THE SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS
              AVAILABLE&quot; BASIS. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE
              DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
              NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE
              UNINTERRUPTED, SECURE, OR ERROR-FREE.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              9. Limitation of Liability
            </h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, {company.legalName} AND ITS
              OFFICERS, MEMBERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE
              DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR
              RELATED TO YOUR USE OF THE SERVICES.
            </p>
            <p>
              OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THE
              SERVICES SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US
              IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED
              U.S. DOLLARS (US $100).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              10. Indemnification
            </h2>
            <p>
              You agree to defend, indemnify, and hold harmless {company.legalName}{" "}
              and its members, officers, employees, and agents from and against any
              claims, damages, losses, liabilities, and expenses (including
              reasonable attorneys&apos; fees) arising out of your use of the
              Services or your violation of these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              11. Termination
            </h2>
            <p>
              We may suspend or terminate access to the Services at any time if we
              reasonably believe you have violated these Terms or if required for
              legal, security, or operational reasons. Upon termination, provisions
              that by their nature should survive will remain in effect.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              12. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of the State of Delaware,
              United States, without regard to conflict-of-law principles. Subject
              to applicable law, exclusive venue for disputes shall be in the state
              or federal courts located in Delaware, and you consent to personal
              jurisdiction there.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              13. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. The &quot;Last
              updated&quot; date indicates the latest revision. Continued use of
              the Services after changes become effective constitutes acceptance of
              the revised Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              14. Contact
            </h2>
            <p>
              Questions about these Terms may be sent to:
            </p>
            <p className="text-foreground">
              {company.legalName}
              <br />
              Email:{" "}
              <a
                href={`mailto:${company.email}`}
                className="text-primary hover:underline"
              >
                {company.email}
              </a>
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
