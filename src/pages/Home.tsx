import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { SeoHead } from "../components/SeoHead";
import { PropertyCard } from "../components/PropertyCard";
import {
  SectionHeading,
  ServiceGrid,
  FinalCta,
  EmptyState,
  SampleNotice,
} from "../components/Consultancy";
import {
  introduction,
  differentiators,
  sectors,
  propertyCategories,
  caseStudies,
} from "../data/consultancy";
import { useProperties } from "../data/property";
import { useCollection } from "../hooks/useCollection";
import { Insight, InsightCard } from "./Research";
export function Home() {
  const navigate = useNavigate();
  const properties = useProperties();
  const research = useCollection<Insight>("/research");
  const featured = properties.items.filter((p) => p.featured).slice(0, 3);
  return (
    <div className="consultancy-home">
      <SeoHead
        title="Tempest Gold Property | Real Estate Advisory Botswana"
        description="Botswana-based real estate advisory and property consultancy. Property transactions, valuations, feasibility studies, research and property management."
        url="/"
      />
      <section className="advisory-hero">
        <img
          className="hero-photo"
          src="/images/advisory-workspace.webp"
          srcSet="/images/advisory-workspace-mobile.webp 800w, /images/advisory-workspace.webp 1600w"
          sizes="100vw"
          alt=""
        />
        <div className="hero-shade" />
        <div className="site-container hero-content">
          <p className="eyebrow">
            <MapPin size={14} aria-hidden="true" /> Botswana-based.
            Property-focused.
          </p>
          <h1>
            PROPERTY ADVICE
            <br />
            THAT MOVES YOU
            <br />
            <em>FORWARD.</em>
          </h1>
          <p className="hero-description">
            From property transactions and valuations to feasibility studies,
            market research and property management, Tempest Gold provides
            trusted real estate solutions grounded in Botswana market knowledge.
          </p>
          <div className="button-row">
            <Link to="/properties" className="button-gold">
              Explore Properties <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="button-outline">
              Speak to a Property Adviser <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="hero-foot">
            <span>
              Real Estate Expertise. Practical Advice. Better Property
              Decisions.
            </span>
            <span>Illustrative workspace photography</span>
          </div>
        </div>
      </section>
      <section className="intro-section site-container">
        <div>
          <p className="eyebrow">Who we are</p>
          <h2>
            Local understanding.
            <br />
            <em>Practical perspective.</em>
          </h2>
        </div>
        <div>
          <p>{introduction}</p>
          <Link to="/about" className="text-link">
            About Tempest Gold Property <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section-pad section-dark">
        <div className="site-container">
          <SectionHeading
            eyebrow="Across the property lifecycle"
            title="Expertise for every property decision."
            text="Professional advice and practical support, from your first question through to your next transaction, development or investment."
          />
          <ServiceGrid />
          <Link className="text-link section-link" to="/services">
            Explore Our Services <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section-pad site-container">
        <div className="section-row">
          <SectionHeading
            eyebrow="Find your next opportunity"
            title="Featured Properties"
            text="Residential, commercial and other property assets. Explore the details, then discuss your requirements with an adviser."
          />
          <Link to="/properties" className="text-link">
            Explore Properties <ArrowUpRight size={18} />
          </Link>
        </div>
        <form
          className="property-search"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const params = new URLSearchParams();
            ["q", "location", "type", "purpose"].forEach((key) => {
              const value = String(data.get(key) || "");
              if (value) params.set(key, value);
            });
            navigate(`/properties?${params}`);
          }}
        >
          <label>
            Keyword
            <input name="q" placeholder="Area, property name or feature" />
          </label>
          <label>
            Location
            <input name="location" placeholder="Botswana location" />
          </label>
          <label>
            Property type
            <select name="type">
              <option value="">All property types</option>
              {propertyCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label>
            Purpose
            <select name="purpose">
              <option value="">Sale & lease</option>
              <option value="For Sale">For Sale</option>
              <option value="To Let">Rent / Lease</option>
              <option value="Development">Development</option>
            </select>
          </label>
          <button className="button-gold">
            Search <ArrowRight size={18} />
          </button>
        </form>
        {properties.sample && <SampleNotice />}
        {properties.loading ? (
          <p role="status">Loading properties…</p>
        ) : featured.length ? (
          <div className="property-grid">
            {featured.map((p) => (
              <PropertyCard property={p} key={p.id} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Featured properties will be added here"
            text="Speak to an adviser about the property type and location you have in mind."
          />
        )}
      </section>
      <section className="why-section section-pad">
        <div className="site-container why-layout">
          <SectionHeading
            eyebrow="Why Tempest Gold?"
            title="A clearer view of your property decisions."
            text="Botswana knowledge, professional expertise and an independent perspective across the property lifecycle."
          />
          <div className="why-grid">
            {differentiators.map(([title, text], i) => (
              <article key={title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad site-container">
        <div className="section-row">
          <SectionHeading
            eyebrow="Evidence-led perspective"
            title="Research & Insights"
            text="Market reports, development insights and property commentary to support informed decisions."
          />
          <Link to="/research" className="text-link">
            Explore Research & Insights <ArrowUpRight size={18} />
          </Link>
        </div>
        {research.items.length ? (
          <div className="property-grid">
            {research.items.slice(0, 3).map((a) => (
              <InsightCard key={a._id || a.id} article={a} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={
              research.loading
                ? "Loading research…"
                : "Research publications will be added here"
            }
            text="Verified Botswana market reports and insights will appear here when available. No unsourced market figures are displayed."
          />
        )}
      </section>
      <section className="section-pad section-dark">
        <div className="site-container">
          <div className="section-row">
            <SectionHeading
              eyebrow="Our work in context"
              title="Selected Projects / Case Studies"
              text="A place for verified assignments in valuation, feasibility, market studies, development, advisory and property management."
            />
            <Link to="/projects" className="text-link">
              Explore Projects <ArrowUpRight size={18} />
            </Link>
          </div>
          {caseStudies.length ? (
            <Link to="/projects" className="button-outline">
              View Case Studies
            </Link>
          ) : (
            <EmptyState
              title="Selected assignments will be published here"
              text="Project details and outcomes will be added when verified and approved for disclosure."
            />
          )}
          <Link
            to="/contact?service=Project%20enquiry"
            className="text-link section-link"
          >
            Discuss a Similar Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section-pad site-container">
        <SectionHeading
          eyebrow="Who we serve"
          title="Different objectives. Practical property solutions."
          text="Advice for individuals, businesses, investors and institutions."
        />
        <div className="sector-grid">
          {sectors.map((s) => (
            <span key={s}>
              {s}
              <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          ))}
        </div>
        <p className="muted-small">
          Government / public sector assignments can be included where
          applicable and verified.
        </p>
      </section>
      <FinalCta />
    </div>
  );
}
