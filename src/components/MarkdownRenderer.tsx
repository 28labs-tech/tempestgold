import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert prose-lg max-w-none
      prose-headings:font-serif prose-headings:text-white-accent
      prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-6
      prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
      prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-4
      prose-p:text-gray-light prose-p:leading-relaxed prose-p:mb-4
      prose-strong:font-bold prose-strong:text-white-accent
      prose-em:italic prose-em:text-gray-light
      prose-blockquote:border-l-2 prose-blockquote:border-gold-primary prose-blockquote:pl-6 prose-blockquote:my-6 prose-blockquote:italic prose-blockquote:text-lg prose-blockquote:text-white-accent prose-blockquote:font-serif
      prose-li:text-gray-light prose-li:mb-2
      prose-a:text-gold-primary prose-a:hover:text-gold-light prose-a:transition-colors
      prose-code:bg-gray-dark prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-gold-primary prose-code:text-sm
      prose-pre:bg-gray-dark prose-pre:border prose-pre:border-gray-medium prose-pre:rounded prose-pre:p-4
      prose-img:rounded-lg
    ">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
