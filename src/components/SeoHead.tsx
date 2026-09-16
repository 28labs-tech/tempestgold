import { Helmet } from "react-helmet-async";

interface SeoHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  author?: string;
  noIndex?: boolean;
}

export function SeoHead({
  title,
  description,
  image,
  url,
  type = "website",
  publishedTime,
  author,
  noIndex = false,
}: SeoHeadProps) {
  const siteName = "Tempest Gold Property";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const ogImage = image || `${siteUrl}/images/logofull.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noIndex ? "noindex, follow" : "index, follow"}
      />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_BW" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article specific */}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {author && <meta property="article:author" content={author} />}

      {/* Structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === "article" ? "Article" : "WebSite",
          name: fullTitle,
          description,
          url: fullUrl,
          ...(type === "article" &&
            publishedTime && { datePublished: publishedTime }),
          ...(type === "article" &&
            author && { author: { "@type": "Person", name: author } }),
          publisher: { "@type": "Organization", name: siteName, url: siteUrl },
        })}
      </script>
    </Helmet>
  );
}
