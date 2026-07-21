import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-28">
        <p className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>{" "}
          / Privacy Policy
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: July 21, 2026
        </p>

        <div className="prose-legal mt-10 space-y-8 text-muted-foreground leading-relaxed">
          <p>
            This Privacy Policy explains how {company.legalName} (&quot;Company&quot;,
            &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a Delaware limited
            liability company, collects, uses, discloses, and protects information
            when you visit our website, contact us, or otherwise interact with our
            online services (collectively, the &quot;Services&quot;).
          </p>
          <p>
            By using the Services, you agree to the practices described in this
            Privacy Policy. If you do not agree, please do not use the Services.
          </p>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              1. Information We Collect
            </h2>
            <p>We may collect the following categories of information:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <span className="text-foreground">Contact information</span> —
                such as your name, email address, and message content when you
                reach out to us through a form or email.
              </li>
              <li>
                <span className="text-foreground">Technical information</span> —
                such as IP address, browser type, device type, operating system,
                referring URLs, and general usage data collected through server
                logs or similar technologies.
              </li>
              <li>
                <span className="text-foreground">Transaction information</span> —
                if you purchase products or services from us in the future, we may
                collect order details and related billing metadata. Payment card
                data is typically processed by third-party payment providers and is
                not stored by us in full.
              </li>
              <li>
                <span className="text-foreground">Communications</span> — records
                of correspondence you send to us, including support requests and
                business inquiries.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              2. How We Use Information
            </h2>
            <p>We use collected information to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>operate, maintain, and improve the Services;</li>
              <li>respond to inquiries and provide customer support;</li>
              <li>process orders, payments, and related business operations;</li>
              <li>monitor performance, security, and fraud prevention;</li>
              <li>comply with legal obligations; and</li>
              <li>
                communicate about updates, products, or administrative notices,
                where permitted by law.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              3. Cookies and Similar Technologies
            </h2>
            <p>
              We may use cookies, pixels, and similar technologies to operate the
              website, remember preferences, and understand how visitors use our
              Services. You can control cookies through your browser settings.
              Disabling cookies may affect certain site features.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              4. How We Share Information
            </h2>
            <p>
              We do not sell your personal information. We may share information
              with:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                service providers who help us host, analyze, communicate, or
                process payments;
              </li>
              <li>
                professional advisors such as lawyers, accountants, or auditors;
              </li>
              <li>
                authorities when required by law, legal process, or to protect
                rights, safety, and security; and
              </li>
              <li>
                parties involved in a corporate transaction, such as a merger,
                acquisition, or asset sale, subject to appropriate safeguards.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              5. Data Retention
            </h2>
            <p>
              We retain personal information only for as long as reasonably
              necessary to fulfill the purposes described in this Policy, unless a
              longer retention period is required or permitted by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              6. Data Security
            </h2>
            <p>
              We take reasonable administrative, technical, and organizational
              measures to protect personal information. However, no method of
              transmission or storage is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              7. International Visitors
            </h2>
            <p>
              Our Company is organized in the United States. If you access the
              Services from outside the United States, your information may be
              transferred to and processed in the United States or other
              jurisdictions that may have different data protection laws than your
              country of residence.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              8. Your Rights and Choices
            </h2>
            <p>
              Depending on your location, you may have rights to request access,
              correction, deletion, or restriction of your personal information, or
              to object to certain processing. To exercise available rights, contact
              us using the details below. We may need to verify your identity before
              responding.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              9. Children&apos;s Privacy
            </h2>
            <p>
              The Services are not directed to children under 13, and we do not
              knowingly collect personal information from children under 13. If you
              believe a child has provided us with personal information, please
              contact us so we can take appropriate action.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              10. Third-Party Links
            </h2>
            <p>
              Our Services may contain links to third-party websites or services.
              We are not responsible for the privacy practices of those third
              parties. We encourage you to review their privacy policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              11. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. The &quot;Last
              updated&quot; date at the top of this page will reflect the latest
              revision. Continued use of the Services after changes become
              effective constitutes acceptance of the updated Policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              12. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy or our data
              practices, contact:
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
