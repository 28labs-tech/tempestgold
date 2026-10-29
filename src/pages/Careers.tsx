import { useState } from "react";
import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { SeoHead } from "../components/SeoHead";
import { EmptyState } from "../components/Consultancy";
interface Position {
  _id: string;
  title: string;
  department?: string;
  location?: string;
  type?: string;
  description?: string;
}
export function Careers() {
  const [department, setDepartment] = useState("All");
  const { items, loading, error } = useCollection<Position>("/careers");
  return (
    <>
      <SeoHead
        title="Careers | Tempest Gold Property Botswana"
        description="Career opportunities at Tempest Gold Property, a Botswana-based real estate advisory and property consultancy."
        url="/careers"
      />
      <section className="page-intro site-container">
        <p className="eyebrow">Careers</p>
        <h1>
          Practical expertise.
          <br />
          <em>Shared purpose.</em>
        </h1>
        <p>
          Work focused on helping clients make better property decisions.
          Verified opportunities are published below when available.
        </p>
      </section>
      <section className="site-container section-pad pt-0">
        <div className="category-tabs">
          {[
            "All",
            ...new Set(items.map((p) => p.department).filter(Boolean)),
          ].map((d) => (
            <button
              key={d}
              aria-pressed={d === department}
              onClick={() => setDepartment(d || "All")}
            >
              {d}
            </button>
          ))}
        </div>
        {loading ? (
          <p role="status">Loading opportunities…</p>
        ) : items.length ? (
          <div className="case-study-grid">
            {items
              .filter(
                (p) => department === "All" || p.department === department,
              )
              .map((p) => (
                <article className="info-panel" key={p._id}>
                  <p className="eyebrow">{p.department}</p>
                  <h2>{p.title}</h2>
                  <p>{[p.location, p.type].filter(Boolean).join(" · ")}</p>
                  <p>{p.description}</p>
                  <Link
                    to={`/contact?service=${encodeURIComponent(`Career enquiry: ${p.title}`)}`}
                    className="text-link"
                  >
                    Enquire About This Role →
                  </Link>
                </article>
              ))}
          </div>
        ) : (
          <EmptyState
            title={
              error
                ? "Opportunities temporarily unavailable"
                : "No verified vacancies are listed yet"
            }
            text="Tempest Gold is not currently advertising a vacancy through this website."
          />
        )}
      </section>
    </>
  );
}
