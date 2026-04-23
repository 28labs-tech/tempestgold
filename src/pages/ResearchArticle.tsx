import React, { useEffect, useMemo } from 'react';
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

// Simple markdown to React component renderer
function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      elements.push(
        <h1 key={i} className="text-3xl font-serif text-white-accent mb-6 mt-10">
          {line.substring(2)}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl font-serif text-white-accent mb-4 mt-8">
          {line.substring(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-xl font-serif text-white-accent mb-4 mt-6">
          {line.substring(4)}
        </h3>
      );
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-2 border-gold-primary pl-6 my-6 italic text-lg text-white-accent font-serif">
          {line.substring(2)}
        </blockquote>
      );
    } else if (line.startsWith('* ')) {
      elements.push(
        <li key={i} className="ml-6 text-gray-light mb-2 list-disc">
          {renderInlineMarkdown(line.substring(2))}
        </li>
      );
    } else if (line.trim()) {
      elements.push(
        <p key={i} className="text-gray-light leading-relaxed mb-4">
          {renderInlineMarkdown(line)}
        </p>
      );
    }
    i++;
  }
  
  return <div>{elements}</div>;
}

function renderInlineMarkdown(text: string): React.ReactNode {
  // Bold
  text = text.replace(/\*\*(.*?)\*\*/g, '\x00BOLD_START\x00$1\x00BOLD_END\x00');
  text = text.replace(/__(.+?)__/g, '\x00BOLD_START\x00$1\x00BOLD_END\x00');
  
  // Italic
  text = text.replace(/\*(.*?)\*/g, '\x00ITALIC_START\x00$1\x00ITALIC_END\x00');
  text = text.replace(/_(.+?)_/g, '\x00ITALIC_START\x00$1\x00ITALIC_END\x00');
  
  const parts = text.split(/(\x00\w+_START\x00|\x00\w+_END\x00)/);
  const result: React.ReactNode[] = [];
  let mode = 'normal';
  
  for (const part of parts) {
    if (part === '\x00BOLD_START\x00') {
      mode = 'bold';
    } else if (part === '\x00BOLD_END\x00') {
      mode = 'normal';
    } else if (part === '\x00ITALIC_START\x00') {
      mode = 'italic';
    } else if (part === '\x00ITALIC_END\x00') {
      mode = 'normal';
    } else if (part) {
      if (mode === 'bold') {
        result.push(<strong key={Math.random()} className="font-bold text-white-accent">{part}</strong>);
      } else if (mode === 'italic') {
        result.push(<em key={Math.random()} className="italic text-gray-light">{part}</em>);
      } else {
        result.push(part);
      }
    }
  }
  
  return result.length > 0 ? result : text;
}
export function ResearchArticle() {
  const { id } = useParams();
  const article =
  researchArticles.find((a) => a.id === id) || researchArticles[0];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  return (
    <div className="min-h-screen bg-black-primary pt-24 pb-24">
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