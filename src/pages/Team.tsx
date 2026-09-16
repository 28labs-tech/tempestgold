import { useCollection } from "../hooks/useCollection";
import { SeoHead } from "../components/SeoHead";
import { EmptyState, FinalCta } from "../components/Consultancy";
interface TeamMember {
  _id: string;
  name: string;
  title?: string;
  bio?: string;
  image?: string;
}
export function Team() {
  const { items, loading, error } = useCollection<TeamMember>("/team");
  return (
    <>
      <SeoHead
        title="Our Team | Tempest Gold Property Botswana"
        description="The people behind Tempest Gold Property's Botswana-based property advisory and consultancy services."
        url="/team"
      />
      <section className="page-intro site-container">
        <p className="eyebrow">Our team</p>
        <h1>
          Property expertise.
          <br />
          <em>Personal perspective.</em>
        </h1>
        <p>
          Professional, approachable advice aligned with your property
          objectives.
        </p>
      </section>
      <section className="site-container section-pad pt-0">
        {loading ? (
          <p role="status">Loading team profiles…</p>
        ) : items.length ? (
          <div className="property-grid">
            {items.map((p) => (
              <article className="insight-card" key={p._id}>
                {p.image && <img src={p.image} alt={p.name} loading="lazy" />}
                <div>
                  <p className="eyebrow">{p.title}</p>
                  <h2>{p.name}</h2>
                  <p>{p.bio}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title={
              error
                ? "Team profiles temporarily unavailable"
                : "Verified team profiles will be added here"
            }
            text="Names, biographies and professional credentials will be published when confirmed. No placeholder staff credentials are presented."
          />
        )}
      </section>
      <FinalCta />
    </>
  );
}
