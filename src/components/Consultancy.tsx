import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { services } from "../data/consultancy";

export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-description">{text}</p>}
    </div>
  );
}
export function ServiceGrid() {
  return (
    <div className="service-grid">
      {services.map((service, index) => (
        <article className="service-card" key={service.slug}>
          <div className="service-card-top">
            <service.icon size={28} strokeWidth={1.3} aria-hidden="true" />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <Link to={`/services/${service.slug}`} className="text-link">
            Explore this service <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </article>
      ))}
    </div>
  );
}
export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="site-container">
        <p className="eyebrow">Your next step</p>
        <h2>Have a Property Decision to Make?</h2>
        <p>Let's turn property information into strategic opportunity.</p>
        <div className="button-row">
          <Link to="/contact" className="button-gold">
            Get in Touch <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/services" className="button-outline">
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
export function EmptyState({
  title,
  text,
  action = true,
}: {
  title: string;
  text: string;
  action?: boolean;
}) {
  return (
    <div className="empty-state">
      <FileText size={30} strokeWidth={1.2} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{text}</p>
      {action && (
        <Link to="/contact" className="text-link">
          Discuss Your Property Needs{" "}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
export function SampleNotice() {
  return (
    <p className="sample-notice">
      Preview content: these are existing sample listings with illustrative
      photography, not verified available properties. Prices and details are for
      demonstration. Confirm all information with an adviser.
    </p>
  );
}
