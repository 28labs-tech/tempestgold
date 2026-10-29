import { useState } from "react";
import { useCollection } from "../hooks/useCollection";
import { SeoHead } from "../components/SeoHead";
import { EmptyState, FinalCta } from "../components/Consultancy";
import { Insight, InsightCard } from "./Research";
export function Blog() {
  const [category, setCategory] = useState("All");
  const { items, loading, error } = useCollection<Insight>("/blog");
  const categories = [
    "All",
    ...new Set(items.map((a) => a.category).filter(Boolean)),
  ];
  return (
    <>
      <SeoHead
        title="Property Commentary | Tempest Gold Property Botswana"
        description="Property commentary and practical perspectives from Tempest Gold Property, a Botswana-based advisory and property consultancy."
        url="/blog"
      />
      <section className="page-intro site-container">
        <p className="eyebrow">Property commentary</p>
        <h1>
          Perspectives on
          <br />
          <em>property decisions.</em>
        </h1>
        <p>
          Thought leadership, investment insights and commentary with a
          practical property focus.
        </p>
      </section>
      <section className="site-container section-pad pt-0">
        <div className="category-tabs">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        {loading ? (
          <p role="status">Loading commentary…</p>
        ) : items.length ? (
          <div className="property-grid">
            {items
              .filter((a) => category === "All" || a.category === category)
              .map((a) => (
                <InsightCard key={a._id || a.id} article={a} base="/blog" />
              ))}
          </div>
        ) : (
          <EmptyState
            title={
              error
                ? "Commentary temporarily unavailable"
                : "No commentary is currently published"
            }
            text="Verified editorial publications will appear here when available."
          />
        )}
      </section>
      <FinalCta />
    </>
  );
}
