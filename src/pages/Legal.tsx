import { useLocation, Link } from "react-router-dom";
import { SeoHead } from "../components/SeoHead";
export function Legal() {
  const { pathname } = useLocation();
  const privacy = pathname === "/privacy",
    disclaimer = pathname === "/property-disclaimer",
    cookies = pathname === "/cookies";
  const title = privacy
    ? "Privacy Notice"
    : disclaimer
      ? "Property Disclaimer"
      : cookies
        ? "Cookie Notice"
      : "Website Terms";
  return (
    <article className="article-page site-container">
      <SeoHead
        title={`${title} | Tempest Gold Property`}
        description={`${title} for the Tempest Gold Property website and property enquiries.`}
        url={pathname}
      />
      <p className="eyebrow">Website information</p>
      <h1>{title}</h1>
      {privacy ? (
        <>
          <h2>Enquiry information</h2>
          <p>
            The enquiry forms ask for your name, email address, optional phone
            number, service required and message. These details help explain
            your requirements and allow a response.
          </p>
          <h2>How the form works</h2>
          <p>
            When you submit, your details are sent to our server and emailed to
            the advisory team through our email provider. Delivery metadata is
            retained for up to 24 hours to prevent duplicate submissions; the
            enquiry body is not stored in the website database. Copies in the
            company mailbox are used to respond to your enquiry. Selected
            valuation documents stay on your device and are not attached.
          </p>
          <h2>Browser storage</h2>
          <p>
            The admin area stores an authentication token in your browser after
            login. This authorizes administrative actions. Public pages do not
            require an admin login.
          </p>
          <h2>External services</h2>
          <p>
            The website uses externally hosted fonts and may show externally
            hosted images. Opening a report or email link uses an external
            service; its own privacy practices apply.
          </p>
          <h2>Full company policy</h2>
          <p>
            This notice describes processing carried out through the website.
            Questions about access, correction, deletion, objection or other
            data-protection rights can be sent to{" "}
            <a href="mailto:info@tempestgold.online">
              info@tempestgold.online
            </a>
            . Requests are assessed under the applicable Botswana requirements.
          </p>
          <h2>Newsletter and your choices</h2>
          <p>
            We use your name and email address to send the Tempest Gold
            newsletter only after you actively opt in. Every marketing email
            must provide a free way to unsubscribe. You may also email{" "}
            <a href="mailto:info@tempestgold.online">info@tempestgold.online</a>{" "}
            to withdraw consent, request access or correction, or ask a question
            about your information.
          </p>
          <h2>Consent records</h2>
          <p>
            Website forms record the consent wording version and submission
            time with the email request. Optional marketing consent is recorded
            separately from the acknowledgement needed to answer an enquiry.
          </p>
          <p>
            <a
              href="/documents/Botswana-Data-Protection-Act.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Read the Botswana Data Protection Act supplied by Tempest Gold.
            </a>
          </p>
        </>
      ) : cookies ? (
        <>
          <h2>Current use of browser storage</h2>
          <p>
            Public pages currently use local browser storage only to remember
            that the cookie notice has been acknowledged. This is an essential
            preference and does not track activity across other websites.
          </p>
          <h2>Administrative access</h2>
          <p>
            The restricted administration area stores an authentication token
            after an authorised user signs in. Public visitors do not receive
            this token.
          </p>
          <h2>Analytics and advertising</h2>
          <p>
            Analytics and advertising cookies are not currently active. If
            non-essential tracking is introduced, the notice and controls must
            be updated before activation so visitors can make an appropriate
            choice.
          </p>
          <h2>Managing storage</h2>
          <p>
            You can clear stored website data through your browser settings.
            Clearing the preference will cause the essential-storage notice to
            appear again on your next visit.
          </p>
        </>
      ) : disclaimer ? (
        <>
          <h2>Confirm before making a decision</h2>
          <p>
            Property prices, availability, descriptions, photographs and
            measurements must be confirmed with an adviser. A listing is
            informational and does not constitute a binding offer.
          </p>
          <h2>Property-specific information</h2>
          <p>
            Request verified tenure, zoning, intended use, area and investment
            information where relevant. Missing information is not an assurance
            that a property is suitable for a particular purpose.
          </p>
          <h2>Pricing</h2>
          <p>
            Amounts are shown in Botswana Pula (BWP / P). Rental prices are
            monthly where indicated. POA means price on application; enquiries
            remain available.
          </p>
        </>
      ) : (
        <>
          <h2>Use of website information</h2>
          <p>
            This website provides information about property services and
            listings. General content is not a substitute for advice agreed for
            your specific assignment.
          </p>
          <h2>Professional assignments</h2>
          <p>
            Scope, fees, deliverables and timing must be agreed before an
            assignment begins. A consultation enquiry does not create an
            appointment or service agreement.
          </p>
          <h2>Links and publications</h2>
          <p>
            External links may take you to third-party websites. Research should
            be assessed in its stated market context and publication date.
          </p>
          <h2>Company terms</h2>
          <p>
            Information on this website is supplied in good faith for general
            information. Intellectual property in original website content
            remains with its respective owner. You may not present website
            content as professional advice or reproduce it commercially without
            permission.
          </p>
          <h2>Newsletter terms</h2>
          <p>
            The newsletter may contain market commentary, company news and
            service information. Subscription is optional and does not create a
            professional assignment. You can unsubscribe at any time at no cost.
          </p>
        </>
      )}
      <Link to="/contact" className="text-link">
        Speak to a Property Adviser →
      </Link>
    </article>
  );
}
