import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "../data/consultancy";
import { ServiceGrid, FinalCta, EmptyState } from "../components/Consultancy";
import { SeoHead } from "../components/SeoHead";
export function Services() {
  return (
    <>
      <SeoHead
        title="Real Estate Advisory Services Botswana | Tempest Gold Property"
        description="Real estate advisory, valuations, market intelligence, feasibility, property and facilities management, project management, transactions and PropTech in Botswana."
        url="/services"
      />
      <ServicesContent />
    </>
  );
}
function ServicesContent() {
  return (
    <>
      <section className="page-intro site-container">
        <p className="eyebrow">Our services</p>
        <h1>
          Property expertise.
          <br />
          <em>Practical advice.</em>
        </h1>
        <p>
          Clearly defined advice for investors, institutions, developers,
          businesses and property owners across the property lifecycle. Each
          service connects the work involved with the decision it supports.
        </p>
      </section>
      <section className="site-container section-pad pt-0">
        <ServiceGrid />
      </section>
      <FinalCta />
    </>
  );
}
export function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  if (!service)
    return (
      <div className="page-intro site-container">
        <EmptyState
          title="Service not found"
          text="Explore our services to find the advice you need."
        />
        <Link to="/services" className="text-link">
          Explore Our Services
        </Link>
      </div>
    );
  return (
    <>
      <SeoHead
        title={`${service.title} Botswana | Tempest Gold Property`}
        description={`${service.description} Botswana-based property advice from Tempest Gold Property.`}
        url={`/services/${slug}`}
      />
      <section className="page-intro site-container">
        <Link to="/services" className="text-link">
          All Services
        </Link>
        <p className="eyebrow">Botswana property expertise</p>
        <service.icon
          className="service-detail-icon"
          size={38}
          strokeWidth={1.3}
        />
        <h1>{service.title}</h1>
        <p>{service.description}</p>
        <Link
          to={`/contact?service=${encodeURIComponent(service.title)}`}
          className="button-gold"
        >
          Discuss Your Property Needs <ArrowRight size={18} />
        </Link>
      </section>
      <section className="site-container service-detail-layout section-pad pt-0">
        <div>
          <h2>Advice shaped around your objectives.</h2>
          <h3>What the service involves</h3>
          <p>{service.description}</p>
          <h3>Who it is for</h3>
          <p>{service.audience}</p>
          <h3>The value it delivers</h3>
          <p>{service.value}</p>
          <h3>Areas of focus</h3>
          <ul className="focus-list">
            {service.focus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <h3>Start with a conversation</h3>
          <p>{service.engagement}</p>
        </div>
        <aside className="info-panel">
          <h2>Common questions</h2>
          <details>
            <summary>What should I prepare?</summary>
            <p>
              Your objectives, property location and type, relevant documents
              where available, and the decision or timeline you are working
              towards.
            </p>
          </details>
          <details>
            <summary>How is the scope agreed?</summary>
            <p>
              The scope is discussed in relation to your requirements. Fees,
              deliverables and timing should be agreed before an assignment
              begins.
            </p>
          </details>
          <details>
            <summary>Can I discuss a commercial property?</summary>
            <p>
              Yes. Our services cover residential, commercial, industrial and
              other property assets. Share your specific requirements with an
              adviser.
            </p>
          </details>
          {service.slug === "property-valuations" && (
            <Link to="/valuation" className="text-link">
              Prepare a Valuation Enquiry <ArrowRight size={16} />
            </Link>
          )}
        </aside>
      </section>
      <section className="site-container section-pad pt-0">
        <h2>Related services</h2>
        <div className="related-links">
          {services
            .filter((s) => s.slug !== slug)
            .slice(0, 4)
            .map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`}>
                {s.title}
                <ArrowRight size={14} />
              </Link>
            ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
