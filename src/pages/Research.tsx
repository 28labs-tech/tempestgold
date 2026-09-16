import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Download } from "lucide-react";
import { useCollection } from "../hooks/useCollection";
import { insightCategories } from "../data/consultancy";
import { SeoHead } from "../components/SeoHead";
import { EmptyState, FinalCta } from "../components/Consultancy";
export interface Insight {
  id?: string;
  _id?: string;
  title: string;
  category: string;
  date?: string;
  location?: string;
  excerpt?: string;
  author?: string;
  image?: string;
  content?: string;
  reportUrl?: string;
  source?: string;
}
export function safeReportUrl(url?: string) {
  if (!url) return undefined;
  try {
    const parsed = new URL(url, window.location.origin);
    return ["https:", "http:"].includes(parsed.protocol)
      ? parsed.href
      : undefined;
  } catch {
    return undefined;
  }
}
export function InsightCard({
  article,
  base = "/research",
}: {
  article: Insight;
  base?: string;
}) {
  const report = safeReportUrl(article.reportUrl);
  return (
    <article className="insight-card">
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          width="600"
          height="400"
        />
      )}
      <div>
        <p className="eyebrow">{article.category || "Property Insights"}</p>
        <h3>
          <Link to={`${base}/${article._id || article.id}`}>
            {article.title}
          </Link>
        </h3>
        <p className="muted-small">
          {article.date || "Publication date pending"}
          {article.location && ` · ${article.location}`}
        </p>
        <p>{article.excerpt}</p>
        {article.source && (
          <p className="muted-small">Source: {article.source}</p>
        )}
        <Link to={`${base}/${article._id || article.id}`} className="text-link">
          Read the Market Insight <ArrowUpRight size={16} />
        </Link>
        {report && (
          <a
            href={report}
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            Download Report <Download size={16} />
          </a>
        )}
      </div>
    </article>
  );
}
export function Research() {
  const [category, setCategory] = useState("All");
  const { items, loading, error } = useCollection<Insight>("/research");
  const filtered = items.filter(
    (a) => category === "All" || a.category === category,
  );
  return (
    <>
      <SeoHead
        title="Research & Insights | Botswana Property Market | Tempest Gold Property"
        description="Botswana property market reports, feasibility and development insights, investment commentary and research publications supporting evidence-led decisions."
        url="/research"
      />
      <section className="page-intro site-container">
        <p className="eyebrow">Research & Insights</p>
        <h1>
          Evidence for
          <br />
          <em>better decisions.</em>
        </h1>
        <p>
          Market reports, feasibility and development insights, property
          commentary and investment perspectives. A Botswana-focused resource
          for understanding opportunities and risks.
        </p>
      </section>
      <section className="section-pad site-container pt-0">
        <div className="category-tabs" aria-label="Filter research by category">
          {["All", ...insightCategories].map((c) => (
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
          <p role="status">Loading research…</p>
        ) : filtered.length ? (
          <div className="property-grid">
            {filtered.map((a) => (
              <InsightCard key={a._id || a.id} article={a} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={
              error
                ? "Research is temporarily unavailable"
                : "Research publications will be added here"
            }
            text={
              category === "All"
                ? "Verified Botswana market reports and research will appear here when available. Market statistics require a source and date; no unsourced figures are presented."
                : `No publications are available in ${category} yet.`
            }
          />
        )}
      </section>
      <FinalCta />
    </>
  );
}
