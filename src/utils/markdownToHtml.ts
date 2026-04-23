// Convert markdown to HTML
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3 className="text-xl font-serif text-white-accent mb-4 mt-6">$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2 className="text-2xl font-serif text-white-accent mb-4 mt-8">$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1 className="text-3xl font-serif text-white-accent mb-6 mt-10">$1</h1>');

  // Bold text
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong className="font-bold text-white-accent">$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong className="font-bold text-white-accent">$1</strong>');

  // Italic text
  html = html.replace(/\*(.*?)\*/g, '<em className="italic text-gray-light">$1</em>');
  html = html.replace(/_(.+?)_/g, '<em className="italic text-gray-light">$1</em>');

  // Blockquotes
  html = html.replace(/^> (.*?)$/gm, '<blockquote className="border-l-2 border-gold-primary pl-6 my-6 italic text-lg text-white-accent font-serif">$1</blockquote>');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" className="text-gold-primary hover:text-gold-light transition-colors">$1</a>');

  // Code blocks
  html = html.replace(/```(.*?)```/gs, '<pre className="bg-gray-dark p-4 rounded border border-gray-medium overflow-x-auto mb-6"><code className="text-gray-light text-sm">$1</code></pre>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code className="bg-gray-dark px-2 py-1 rounded text-gold-primary text-sm">$1</code>');

  // Unordered lists
  html = html.replace(/^\* (.*?)$/gm, '<li className="ml-6 text-gray-light mb-2">$1</li>');
  html = html.replace(/(<li.*?<\/li>)(\n<li)/g, '$1$2');
  html = html.replace(/^(<li.*?<\/li>)$/gm, '<ul className="mb-6">$1</ul>');

  // Paragraphs
  const lines = html.split('\n');
  html = lines.map(line => {
    if (line.trim() && !line.includes('<') && !line.includes('</')) {
      return `<p className="text-gray-light leading-relaxed mb-4">${ line }</p>`;
    }
    return line;
  }).join('\n');

  // Clean up multiple spaces
  html = html.replace(/&nbsp;/g, ' ');

  return html;
}

// Create React element from HTML string
export function renderMarkdownAsJSX(markdown: string) {
  const htmlContent = markdownToHtml(markdown);
  return htmlContent;
}
