import { Link } from "react-router-dom";
import { SeoHead } from "../components/SeoHead";
import { SectionHeading, FinalCta } from "../components/Consultancy";
import { differentiators, sectors, companyContact } from "../data/consultancy";
export function About() {
  return (
    <>
      <SeoHead
        title="About Tempest Gold Property | Botswana Property Consultancy"
        description="Botswana-based real estate advisory and property consultancy supporting individuals, businesses, investors and institutions across the property lifecycle."
        url="/about"
      />
      <section className="page-intro site-container">
        <p className="eyebrow">About us</p>
        <h1>
          Real Estate Expertise.
          <br />
          Practical Advice.
          <br />
          <em>Better Property Decisions.</em>
        </h1>
        <p>
          Tempest Gold Property is a Botswana-based real estate advisory and
          property consultancy providing professional property solutions to
          individuals, businesses, investors and institutions. Our work spans
          property transactions, valuations, market research, feasibility
          studies, property management, project management and investment
          advisory.
        </p>
      </section>
      <section className="intro-section site-container">
        <h2>
          Good decisions start
          <br />
          with <em>good advice.</em>
        </h2>
        <div>
          <p>
            We combine practical market experience with evidence-led analysis to
            help our clients understand opportunities, manage risks and make
            better property decisions.
          </p>
          <p>
            Our approach brings Botswana market context, professional judgement
            and your objectives together. From acquisition and development
            through management, leasing, transactions and disposal, the advice
            should serve the decision you need to make.
          </p>
          <Link to="/services" className="text-link">
            Explore Our Services →
          </Link>
        </div>
      </section>
      <section className="section-pad section-dark">
        <div className="site-container">
          <SectionHeading eyebrow="Our approach" title="Why Tempest Gold?" />
          <div className="why-grid">
            {differentiators.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad site-container">
        <SectionHeading
          eyebrow="Client-centred property advice"
          title="Who we serve"
        />
        <div className="sector-grid">
          {sectors.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </section>
      <section className="section-pad leadership-profile">
        <div className="site-container leadership-profile-grid">
          <div>
            <p className="eyebrow">Founder and Managing Director</p>
            <h2>Dr Neltah Tshepiso Mokgware-Monosi</h2>
          </div>
          <div>
            <p>
              Dr Mokgware-Monosi combines real estate practice, market research,
              teaching and industry leadership. Her published company profile
              records a BA in Economics and Accounting, an MSc in Project
              Management and a PhD in Real Estate, together with contributions
              to professional networks in Botswana, Africa and internationally.
            </p>
            <p>
              Her work supports Tempest Gold's evidence-led approach to
              valuation, market intelligence, development and strategic
              property decisions.
            </p>
            <a
              href="/documents/Tempest-Gold-Company-Profile-2026.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              View the Company Profile →
            </a>
          </div>
        </div>
      </section>
      <section className="section-pad site-container pt-0">
        <div className="info-panel">
          <h2>Professional information</h2>
          <p>
            {companyContact.registration}
          </p>
          {companyContact.credentials?.map((c) => <p key={c}>{c}</p>)}
          <Link to="/team" className="text-link">
            Our Team →
          </Link>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
