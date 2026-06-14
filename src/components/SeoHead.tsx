import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  author?: string;
}

export function SeoHead({ title, description, image, url, type = 'website', publishedTime, author }: SeoHeadProps) {
  const siteName = 'Tempest Gold';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const siteUrl = 'https://tempestgold.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const ogImage = image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article specific */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'Article' : 'WebSite',
          name: fullTitle,
          description,
          url: fullUrl,
          ...(type === 'article' && publishedTime && { datePublished: publishedTime }),
          ...(type === 'article' && author && { author: { '@type': 'Person', name: author } }),
          publisher: { '@type': 'Organization', name: siteName, url: siteUrl },
        })}
      </script>
    </Helmet>
  );
}
