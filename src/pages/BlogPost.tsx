import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { blogPosts } from '../data/mockData';

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
export function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id) || blogPosts[0];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  return (
    <div className="min-h-screen bg-black-primary pt-24 pb-24">
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