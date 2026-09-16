import { Link } from "react-router-dom";
import { companyContact, services } from "../data/consultancy";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <img src="/images/logo.png" alt="" width="34" height="34" />
              <span>
                TEMPEST GOLD<small>PROPERTY</small>
              </span>
            </Link>
            <p>
              Real Estate Expertise.
              <br />
              Practical Advice.
              <br />
              Better Property Decisions.
            </p>
            <span className="eyebrow">Botswana-based property consultancy</span>
            {companyContact.social?.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
                {s.name}
              </a>
            ))}
          </div>
          <div>
            <h2>Company</h2>
            {[
              ["About Us", "/about"],
              ["Services", "/services"],
              ["Properties", "/properties"],
              ["Research & Insights", "/research"],
              ["Projects / Case Studies", "/projects"],
              ["Our Team", "/team"],
              ["Careers", "/careers"],
              ["Press", "/press"],
            ].map(([label, path]) => (
              <Link key={path} to={path}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <h2>Services</h2>
            {services.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`}>
                {s.title}
              </Link>
            ))}
          </div>
          <div>
            <h2>Contact</h2>
            <p>Botswana</p>
            {companyContact.address && <p>{companyContact.address}</p>}
            {companyContact.phone && (
              <a href={`tel:${companyContact.phone.replace(/\s/g, "")}`}>
                {companyContact.phone}
              </a>
            )}
            {companyContact.email && (
              <a href={`mailto:${companyContact.email}`}>
                {companyContact.email}
              </a>
            )}
            {!companyContact.email && !companyContact.phone && (
              <p>Verified contact details will be added here.</p>
            )}
            <Link to="/contact">Speak to a Property Adviser</Link>
            {!!companyContact.locations?.length && (
              <>
                <h2>Locations</h2>
                {companyContact.locations.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </>
            )}
            <h2>Professional information</h2>
            <p>
              {companyContact.registration ||
                "Company registration details pending verification."}
            </p>
            {companyContact.credentials?.map((c) => (
              <p key={c}>{c}</p>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Tempest Gold Property. All rights
            reserved.
          </p>
          <nav aria-label="Legal and administration">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/property-disclaimer">Property Disclaimer</Link>
            <Link to="/admin/login">Admin</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
