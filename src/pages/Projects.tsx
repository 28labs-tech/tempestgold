import { Link } from "react-router-dom";
import { caseStudies } from "../data/consultancy";
import { SeoHead } from "../components/SeoHead";
import { EmptyState, FinalCta } from "../components/Consultancy";
export function Projects() {
  return (
    <>
      <SeoHead
        title="Projects & Case Studies | Tempest Gold Property Botswana"
        description="Selected property assignments in valuation, feasibility studies, market research, development, advisory and property management in Botswana."
        url="/projects"
      />
      <section className="page-intro site-container">
        <p className="eyebrow">Projects / Case Studies</p>
        <h1>
          Property challenges.
          <br />
          <em>Practical perspectives.</em>
        </h1>
        <p>
          Selected assignments demonstrating the scope of property advice, from
          valuation and feasibility studies to development and management.
          Project information is published only when verified and permitted for
          disclosure.
        </p>
      </section>
      <section className="site-container section-pad pt-0">
        {caseStudies.length ? (
          <div className="case-study-grid">
            {caseStudies.map((p) => (
              <article key={p.id} className="info-panel">
                <p className="eyebrow">{p.service}</p>
                <h2>{p.title}</h2>
                <dl>
                  <dt>Location</dt>
                  <dd>{p.location}</dd>
                  {p.sector && (
                    <>
                      <dt>Client sector</dt>
                      <dd>{p.sector}</dd>
                    </>
                  )}
                  <dt>Challenge</dt>
                  <dd>{p.challenge}</dd>
                  <dt>Scope of work</dt>
                  <dd>{p.scope}</dd>
                  <dt>Key findings / outcome</dt>
                  <dd>{p.outcome}</dd>
                </dl>
                <Link
                  to={`/contact?service=${encodeURIComponent(p.service)}`}
                  className="text-link"
                >
                  Discuss a Similar Project →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No case studies are currently published"
            text="Project information is withheld until the assignment details and publication permission are confirmed. Discuss relevant experience directly with an adviser."
          />
        )}
        <div className="related-links">
          {[
            "Valuation",
            "Feasibility Studies",
            "Market Studies",
            "Development",
            "Advisory",
            "Property Management",
          ].map((s) => (
            <Link to={`/contact?service=${encodeURIComponent(s)}`} key={s}>
              Discuss {s} →
            </Link>
          ))}
        </div>
        <Link to="/contact?service=Project%20enquiry" className="button-gold">
          Discuss a Similar Project →
        </Link>
      </section>
      <FinalCta />
    </>
  );
}
