import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Share2,
  Bookmark,
  Twitter,
  Linkedin,
  Mail } from
'lucide-react';
import { researchArticles } from '../data/mockData';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { SeoHead } from '../components/SeoHead';
export function ResearchArticle() {
  const { id } = useParams();
  const article =
  researchArticles.find((a) => a.id === id) || researchArticles[0];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  return (
    <div className="min-h-screen bg-black-primary pt-24 pb-24">
      <SeoHead
        title={article.title}
        description={article.excerpt}
        image={article.image}
        url={`/research/${article.id}`}
        type="article"
        author={article.author}
        publishedTime={article.date}
      />
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <Link
          to="/research"
          className="inline-flex items-center gap-2 text-gray-light hover:text-gold-primary transition-colors mb-8 text-sm uppercase tracking-wider font-bold">
          
          <ChevronLeft size={16} /> Back to Research
        </Link>

        <header className="mb-8">
          <span className="text-gold-primary text-sm font-bold uppercase tracking-widest mb-4 block">
            {article.category}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white-accent leading-tight mb-6">
            {article.title}
          </h1>
          <p className="text-xl text-gray-light leading-relaxed mb-8">
            {article.excerpt}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-y border-gray-dark gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-dark rounded-full flex items-center justify-center text-gold-primary font-serif">
                {article.author.charAt(0)}
              </div>
              <div>
                <div className="text-white-accent font-medium text-sm">
                  {article.author}
                </div>
                <div className="text-gray-medium text-xs">
                  {article.date} • {article.readTime}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-light">
              <button className="hover:text-gold-primary transition-colors">
                <Twitter size={18} />
              </button>
              <button className="hover:text-gold-primary transition-colors">
                <Linkedin size={18} />
              </button>
              <button className="hover:text-gold-primary transition-colors">
                <Mail size={18} />
              </button>
              <div className="w-px h-4 bg-gray-dark mx-2"></div>
              <button className="hover:text-gold-primary transition-colors">
                <Bookmark size={18} />
              </button>
              <button className="hover:text-gold-primary transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </header>

        <figure className="mb-12">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto aspect-video object-cover" />
          
          <figcaption className="text-xs text-gray-medium mt-3 text-right">
            Source: Tempest Gold Intelligence / Unsplash
          </figcaption>
        </figure>

        <article className="prose prose-invert prose-lg max-w-none">
          {article.content && <MarkdownRenderer content={article.content} />}
        </article>

        {/* Related Research Section */}
        <div className="mt-20 pt-12 border-t border-gray-dark">
          <h3 className="font-serif text-2xl text-white-accent mb-8 inline-block border-b-2 border-gold-primary pb-2">
            More from Tempest Gold Research
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchArticles.
            filter((a) => a.id !== article.id).
            slice(0, 3).
            map((related) =>
            <Link
              key={related.id}
              to={`/research/${related.id}`}
              className="group flex flex-col gap-3">
              
                  <div className="relative aspect-video overflow-hidden bg-gray-dark rounded-lg">
                    <img
                  src={related.image}
                  alt={related.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                  </div>
                  <span className="text-gold-primary text-[10px] font-bold uppercase tracking-wider mt-2">
                    {related.category}
                  </span>
                  <h4 className="font-serif text-lg text-white-accent group-hover:text-gold-primary transition-colors leading-snug line-clamp-2">
                    {related.title}
                  </h4>
                  <div className="text-xs text-gray-medium mt-auto">
                    {related.date}
                  </div>
                </Link>
            )}
          </div>
        </div>
      </div>
    </div>);

}