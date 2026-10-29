import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  GraduationCap,
  Landmark,
  MapPin,
  Trophy,
  Users,
} from "lucide-react";
import { SeoHead } from "../components/SeoHead";
import {
  SectionHeading,
  FinalCta,
  EmptyState,
} from "../components/Consultancy";
import {
  introduction,
  servicePillars,
  clients,
  memberships,
  caseStudies,
} from "../data/consultancy";
import { useCollection } from "../hooks/useCollection";
import { Insight, InsightCard } from "./Research";

const credibility = [
  "15+ years combined experience",
  "Botswana market expertise",
  "Professional affiliations",
  "Industry leadership",
  "Evidence-led advisory",
];
const clientIcons = [Landmark, Building2, Building2, Users, GraduationCap];

export function Home() {
  const research = useCollection<Insight>("/research");
  return (
    <div className="consultancy-home">
      <SeoHead
        title="Tempest Gold | Property Intelligence and Advisory Botswana"
        description="Botswana property intelligence, strategic real estate advice, valuations, research, development and property solutions."
        url="/"
      />
      <section className="advisory-hero refined-hero">
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
            <MapPin size={14} aria-hidden="true" /> Gaborone · Botswana · Africa
          </p>
          <h1>
            Property Intelligence.
            <br />
            Strategic Advisory.
            <br />
            <em>Real Results.</em>
          </h1>
          <p className="hero-description">
            Tempest Gold delivers real estate advisory, valuation, market
            intelligence and property solutions that support informed
            decisions, sustainable value creation and strategic investment.
          </p>
          <div className="button-row">
            <Link to="/contact" className="button-gold">
              Request a Consultation <ArrowRight size={18} />
            </Link>
            <Link to="/services" className="button-outline">
              Explore Our Services
            </Link>
            <Link to="/research" className="button-text-light">
              View Our Insights <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="hero-foot">
            <span>Real insight. Lasting value.</span>
            <span>People · Places · Potential</span>
          </div>
        </div>
      </section>
      <div className="credibility-bar" aria-label="Tempest Gold credentials">
        <div className="credibility-track">
          {credibility.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <section className="intro-section site-container">
        <div>
          <p className="eyebrow">About Tempest Gold</p>
          <h2>
            Evidence-led advice.
            <br />
            <em>Botswana perspective.</em>
          </h2>
        </div>
        <div>
          <p>{introduction}</p>
          <Link to="/about" className="text-link">
            About Tempest Gold <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      <section className="section-pad section-dark">
        <div className="site-container">
          <SectionHeading
            eyebrow="Our services"
            title="Comprehensive property solutions across the lifecycle."
            text="Three connected disciplines bring research, management and delivery expertise to each assignment."
          />
          <div className="pillar-grid">
            {servicePillars.map((pillar, index) => (
              <article className="pillar-card" key={pillar.title}>
                <span className="pillar-number">0{index + 1}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.strapline}</p>
                <ul>
                  {pillar.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link to={pillar.href} className="text-link">
                  Learn more <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section section-pad section-light">
        <div className="site-container">
          <SectionHeading
            eyebrow="Why Tempest Gold"
            title="Local knowledge. Professional standing. Clear evidence."
            text="Professional advice grounded in Botswana market knowledge and research-led methods."
          />
          <div className="proof-grid">
            <article>
              <strong>15+</strong>
              <span>Years of combined industry expertise</span>
            </article>
            <article>
              <strong>Botswana</strong>
              <span>Market coverage from South East to North West</span>
            </article>
            <article>
              <strong>Evidence-led</strong>
              <span>Research-grounded market methodologies</span>
            </article>
            <article>
              <strong>100%</strong>
              <span>Youth and female owned, proudly local</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad site-container light-panel">
        <SectionHeading
          eyebrow="Sector experience"
          title="Experience across property and the built environment"
          text="The company profile records assignments across financial services, property companies, development, professional services and academic research. Client identities, logos and project details will be displayed only after publication approval."
        />
        <div className="client-groups">
          {clients.map(([category], index) => {
            const Icon = clientIcons[index];
            return (
              <article key={category}>
                <Icon aria-hidden="true" />
                <h3>{category}</h3>
                <p>Selected organisations subject to disclosure approval.</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-pad section-dark">
        <div className="site-container">
          <div className="section-row">
            <SectionHeading
              eyebrow="Featured projects and case studies"
              title="Our Work in Action"
              text="Verified assignments will show the client or sector, assignment, location, scope and outcome once approved for publication."
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
              title="No case studies are currently published"
              text="The company profile records experience across market research, transactions, valuations, advisory and property management. Project details remain private until publication approval is confirmed."
            />
          )}
        </div>
      </section>

      <section className="section-pad site-container light-panel">
        <div className="section-row">
          <SectionHeading
            eyebrow="Property intelligence"
            title="Research that drives better decisions."
            text="Market reports, research, publications and property insights distinguish our advice from conventional estate agency."
          />
          <Link to="/research" className="text-link">
            Access Research & Reports <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="research-topics">
          <span>Commercial and Office Market Review</span>
          <span>Retail Market Review</span>
          <span>Industrial Market Review</span>
          <span>Hospitality Sector Study</span>
        </div>
        {research.items.length ? (
          <div className="property-grid">
            {research.items.slice(0, 3).map((article) => (
              <InsightCard key={article._id || article.id} article={article} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={
              research.loading
                ? "Loading research…"
                : "No research publications are currently available"
            }
            text="Discuss current market-research requirements directly with the advisory team."
          />
        )}
      </section>

      <section className="section-pad professional-section">
        <div className="site-container professional-grid">
          <div>
            <p className="eyebrow">Professional standing</p>
            <h2>Professional Affiliations & Industry Leadership</h2>
            <p>
              We participate in professional networks that advance real estate
              and the built environment in Botswana, Africa and internationally.
            </p>
            <ul className="membership-list">
              {memberships.map((item) => (
                <li key={item}>
                  <BadgeCheck size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside>
            <h3>Industry leadership</h3>
            <p>
              Board and committee roles in Botswana's built environment, African
              real estate leadership, teaching and research contributions.
            </p>
            <a
              className="button-outline"
              href="/documents/Tempest-Gold-Company-Profile-2026.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View Full Profile <ArrowUpRight size={17} />
            </a>
          </aside>
        </div>
      </section>

      <section className="section-pad site-container leadership-section light-panel">
        <SectionHeading
          eyebrow="Leadership, fellowships and recognition"
          title="Investing in knowledge. Driving impact."
          text="Founder and Managing Director Dr Neltah Tshepiso Mokgware-Monosi combines property practice, research and industry leadership. Her profile includes qualifications in economics and accounting, project management and real estate, alongside professional and academic contributions to the built environment."
        />
        <div className="recognition-grid">
          <article>
            <Trophy />
            <h3>Recognition</h3>
            <p>
              Young Property Person of the Year in Africa; Women in Africa
              Botswana Laureate; Best Woman-Owned Property Technology Start-Up
              Africa.
            </p>
          </article>
          <article>
            <GraduationCap />
            <h3>Knowledge</h3>
            <p>
              BA in Economics and Accounting, MSc in Project Management and PhD
              in Real Estate.
            </p>
          </article>
          <article>
            <Users />
            <h3>Leadership programmes</h3>
            <p>
              African Management Institute, Stanford Seed, Academy for Women
              Entrepreneurs, Tony Elumelu Foundation and Alibaba Global
              Initiatives.
            </p>
          </article>
        </div>
        <a
          className="text-link section-link"
          href="/documents/Tempest-Gold-Company-Profile-2026.pdf"
          target="_blank"
          rel="noreferrer"
        >
          View Our Profile <ArrowRight size={18} />
        </a>
      </section>
      <FinalCta />
    </div>
  );
}
