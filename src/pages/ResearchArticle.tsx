import { Link, useParams } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { MarkdownRenderer } from "../components/MarkdownRenderer";
import { SeoHead } from "../components/SeoHead";
import { EmptyState } from "../components/Consultancy";
import { Insight, safeReportUrl } from "./Research";
export function ResearchArticle({ blog = false }: { blog?: boolean }) {
  const { id } = useParams();
  const base = blog ? "/blog" : "/research";
  const { items, loading, error } = useCollection<Insight>(base);
  const article = items.find((a) => (a._id || a.id) === id);
  if (loading)
    return (
      <div className="page-intro site-container" role="status">
        Loading publication…
      </div>
    );
  if (!article)
    return (
      <div className="page-intro site-container">
        <EmptyState
          title={
            error
              ? "Publication temporarily unavailable"
              : "Publication not found"
          }
          text="This publication may not have been published or may have been removed."
        />
        <Link to={base} className="text-link">
          Back to Research & Insights →
        </Link>
      </div>
    );
  const report = safeReportUrl(article.reportUrl);
  return (
    <article className="article-page site-container">
      <SeoHead
        title={article.title}
        description={article.excerpt || article.title}
        image={article.image}
        url={`${base}/${id}`}
        type="article"
        author={article.author}
        publishedTime={article.date}
      />
      <Link to={base} className="text-link">
        ← Research & Insights
      </Link>
      <p className="eyebrow">{article.category}</p>
      <h1>{article.title}</h1>
      <p className="muted-small">
        {article.date || "Publication date pending"}
        {article.author && ` · ${article.author}`}
        {article.location && ` · ${article.location}`}
      </p>
      {article.image && (
        <img
          className="article-cover"
          src={article.image}
          alt={article.title}
        />
      )}
      {article.source && (
        <p className="muted-small">Source: {article.source}</p>
      )}
      <MarkdownRenderer
        content={
          article.content ||
          article.excerpt ||
          "The full publication is not available through this website."
        }
      />
      {report && (
        <a
          href={report}
          className="button-outline"
          target="_blank"
          rel="noreferrer"
        >
          Download Report
        </a>
      )}
      <Link to="/contact" className="button-gold">
        Speak to a Property Adviser →
      </Link>
    </article>
  );
}
