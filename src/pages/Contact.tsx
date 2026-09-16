import { useSearchParams } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";
import { SeoHead } from "../components/SeoHead";
import { EnquiryForm } from "../components/EnquiryForm";
import { companyContact } from "../data/consultancy";
export function Contact() {
  const [params] = useSearchParams();
  return (
    <>
      <SeoHead
        title="Speak to a Property Adviser | Tempest Gold Property Botswana"
        description="Discuss buying, selling, leasing, valuations, feasibility studies, property management and investment advice with Tempest Gold Property."
        url="/contact"
      />
      <section className="page-intro site-container">
        <p className="eyebrow">Speak to a Property Adviser</p>
        <h1>
          Let's discuss
          <br />
          <em>your property needs.</em>
        </h1>
        <p>
          Whether you are buying, selling, leasing, developing or managing a
          property, start with a conversation about your objectives.
        </p>
      </section>
      <section className="contact-layout site-container section-pad pt-0">
        <div>
          <div className="contact-item">
            <MapPin aria-hidden="true" />
            <div>
              <h2>Botswana-based advice</h2>
              <p>
                {companyContact.address ||
                  "Verified office address will be added here."}
              </p>
            </div>
          </div>
          <div className="contact-item">
            <Phone aria-hidden="true" />
            <div>
              <h2>Call an adviser</h2>
              {companyContact.phone ? (
                <a href={`tel:${companyContact.phone.replace(/\s/g, "")}`}>
                  {companyContact.phone}
                </a>
              ) : (
                <p>Verified telephone details pending.</p>
              )}
              {companyContact.hours && <p>{companyContact.hours}</p>}
            </div>
          </div>
          <div className="contact-item">
            <Mail aria-hidden="true" />
            <div>
              <h2>Email</h2>
              {companyContact.email ? (
                <a href={`mailto:${companyContact.email}`}>
                  {companyContact.email}
                </a>
              ) : (
                <p>Verified email address pending.</p>
              )}
            </div>
          </div>
          {companyContact.social?.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
              {s.name}
            </a>
          ))}
          <div className="info-panel">
            <h3>A useful starting point</h3>
            <p>
              Share the location, property type, service required and your
              timing. We can then discuss the appropriate scope and next steps.
            </p>
          </div>
        </div>
        <div className="info-panel">
          <h2>Request a Consultation</h2>
          <EnquiryForm
            service={params.get("service") || ""}
            property={params.get("property") || undefined}
            intent={params.get("intent") || "Request a Consultation"}
          />
        </div>
      </section>
    </>
  );
}
