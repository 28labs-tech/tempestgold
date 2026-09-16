import { useCollection } from "../hooks/useCollection";
import { SeoHead } from "../components/SeoHead";
import { EmptyState } from "../components/Consultancy";
interface Release {
  _id: string;
  headline: string;
  date?: string;
  publication?: string;
  excerpt?: string;
}
export function Press() {
  const { items, loading, error } = useCollection<Release>("/press");
  return (
    <>
      <SeoHead
        title="Press & Company News | Tempest Gold Property"
        description="Verified company news and press information from Tempest Gold Property, Botswana."
        url="/press"
      />
      <section className="page-intro site-container">
        <p className="eyebrow">Press & company news</p>
        <h1>
          Company news.
          <br />
          <em>Verified information.</em>
        </h1>
        <p>
          Published announcements and media information from Tempest Gold
          Property.
        </p>
      </section>
      <section className="site-container section-pad pt-0">
        {loading ? (
          <p role="status">Loading company news…</p>
        ) : items.length ? (
          <div className="case-study-grid">
            {items.map((p) => (
              <article key={p._id} className="info-panel">
                <p className="eyebrow">{p.publication}</p>
                <h2>{p.headline}</h2>
                <p>{p.date}</p>
                <p>{p.excerpt}</p>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title={
              error
                ? "Company news temporarily unavailable"
                : "Verified announcements will be added here"
            }
            text="No unsupported awards, transactions or company achievements are published."
          />
        )}
      </section>
    </>
  );
}
