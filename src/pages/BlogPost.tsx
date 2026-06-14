import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { blogPosts } from '../data/mockData';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { SeoHead } from '../components/SeoHead';
export function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id) || blogPosts[0];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  return (
    <div className="min-h-screen bg-black-primary pt-24 pb-24">
      <SeoHead
        title={post.title}
        description={post.excerpt}
        image={post.image}
        url={`/blog/${post.id}`}
        type="article"
        author={post.author}
        publishedTime={post.date}
      />
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-light hover:text-gold-primary transition-colors mb-12 text-sm uppercase tracking-wider font-bold">
          
          <ChevronLeft size={16} /> Back to Journal
        </Link>

        <header className="mb-12 text-center">
          <span className="text-gold-primary text-sm font-bold uppercase tracking-widest mb-4 block">
            {post.category}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white-accent leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-medium">
            <span className="text-white-accent font-medium">{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <figure className="mb-16 rounded-2xl overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto aspect-video object-cover" />
          
        </figure>

        <article className="prose prose-invert prose-lg max-w-none">
          <p className="text-xl text-white-accent mb-8">{post.excerpt}</p>
          {post.content && <MarkdownRenderer content={post.content} />}
        </article>

        {/* Author Bio */}
        <div className="mt-16 p-8 bg-gray-dark rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-gray-medium">
          <div className="w-20 h-20 bg-black-primary rounded-full flex items-center justify-center text-gold-primary font-serif text-2xl shrink-0 border border-gold-primary/30">
            {post.author.charAt(0)}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-serif text-xl text-white-accent mb-2">
              {post.author}
            </h3>
            <p className="text-gray-light text-sm mb-4">
              Senior Editor at Tempest Gold Journal, specializing in architectural
              trends and interior design for ultra-luxury properties.
            </p>
            <button className="text-gold-primary text-sm font-medium hover:text-gold-light transition-colors">
              View all articles
            </button>
          </div>
        </div>
      </div>
    </div>);

}