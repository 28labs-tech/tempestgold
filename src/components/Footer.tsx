import { Link } from "react-router-dom";
import { companyContact, services } from "../data/consultancy";
import { NewsletterForm } from "./NewsletterForm";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <NewsletterForm />
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
              ["Projects", "/projects"],
              ["Insights", "/research"],
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
            {companyContact.phones?.map((phone) => (
              <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`}>
                {phone}
              </a>
            ))}
            {companyContact.email && (
              <a href={`mailto:${companyContact.email}`}>
                {companyContact.email}
              </a>
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
            <p>{companyContact.registration}</p>
            {companyContact.credentials?.map((c) => (
              <p key={c}>{c}</p>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Tempest Gold Property (Pty) Ltd. All
            rights reserved.
          </p>
          <nav aria-label="Legal and administration">
            <Link to="/privacy">Privacy Notice</Link>
            <a
              href="/documents/Botswana-Data-Protection-Act.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Data Protection
            </a>
            <Link to="/cookies">Cookie Notice</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <Link to="/property-disclaimer">Property Disclaimer</Link>
            <Link to="/admin/login">Admin</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
